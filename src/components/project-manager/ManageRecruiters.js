import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    getProject,
    updateProject,
    getUsers,
    resetProjectState,
} from '../common/commonActions';
import {
    projectSelector,
    usersSelector,
    projectUpdatedSelector,
} from '../common/commonReducer';
import Container from 'react-bootstrap/Container';
import {
    AlertNotice,
    BackButton,
    ConfirmationModal,
    CreateButton,
    TableList,
} from '../ui';
import {
    autoToggleAlert,
    copyObject,
    extractIdFromUrl
} from '../../helpers/utils';
import { When } from 'react-if';
import LinkRecruiter from './LinkRecruiter';
import Pagination from '../Pagination';

const usersTableLayout = {
    headings: [
        '#', 'Имя', 'Фамилия', 'Эл. Почта', 'Действия',
    ],
    createRow: ({ url, first_name, last_name, email }) => [
        extractIdFromUrl(url), first_name,  last_name, email,
    ],
};


const ManageRecruiters = ({
                              match,
                              users,
                              project,
                              updated,
                              getUsers,
                              getProject,
                              updateProject,
                              resetProjectState,
                          }) => {

    const [ recruiterUrlToUnlink, setRecruiterUrlToUnlink ] = useState(null);
    const [ isLinkingRecruiter, setIsLinkingRecruiter ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ linked, setLinked ] = useState(false);

    const params = { role: 'recruiter', project: match.params.projectId };

    useEffect(() => {
        getUsers(params);
        getProject(match.params.projectId);
    }, [ getUsers, getProject ]);

    useEffect(() => {
        const message = linked ? 'Рекрутер успешно добавлен' : 'Рекрутер успешно удален из списка';
        if (updated) {
            resetProjectState();
            getUsers(params);
            getProject(match.params.projectId);
            autoToggleAlert(message, setSuccessMessage);
        }
    })

    const handleUnlinkRecruiter = () => {
        if (!project) return;
        let recruiters = copyObject(project.recruiters);
        const index = recruiters.findIndex((url) => url === recruiterUrlToUnlink);
        recruiters.splice(index, 1);
        updateProject(project.id, { recruiters });
        setRecruiterUrlToUnlink(null);
    };

    const handleModalClose = (recruiters) => {
        if (recruiters) {
            setLinked(true);
            updateProject(project.id, { recruiters });
        }
        setIsLinkingRecruiter(false);
    };

    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice
                    type="success"
                    message={successMessage}/>
            </When>
            <When condition={!!isLinkingRecruiter}>
                <LinkRecruiter
                    onHide={(linked) => handleModalClose(linked)}
                    show={!!isLinkingRecruiter}
                    project={project}
                />
            </When>
            <ConfirmationModal
                show={!!recruiterUrlToUnlink}
                onCancel={() => setRecruiterUrlToUnlink(null)}
                onConfirm={handleUnlinkRecruiter}
                question="Вы уверены, что хотите удалить ректурета из проекта?"
            />
            <Container>
                <BackButton path={`/project-manager/projects/${match.params.projectId}`}/>
                <CreateButton
                    onClick={() => setIsLinkingRecruiter(true)}
                    text="Добавить"
                />
                <TableList
                    layout={usersTableLayout}
                    data={(users || {}).results}
                    onUnlink={({ url }) => setRecruiterUrlToUnlink(url)}
                />
            </Container>
            <Pagination data={users} action={getUsers}/>
        </div>
    );
};


const mapStateToProps = (state) => ({
    users: usersSelector(state),
    project: projectSelector(state),
    updated: projectUpdatedSelector(state),
});

const mapDispatchToProps = {
    getUsers,
    getProject,
    updateProject,
    resetProjectState,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecruiters);
