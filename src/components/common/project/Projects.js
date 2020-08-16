import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    AlertNotice,
    BackButton,
    ConfirmationModal,
    CreateButton,
    TableList
} from '../../ui';
import { getProjects } from '../../admin/adminActions';
import { projectsSelector } from '../../admin/adminReducer';
import { Link } from 'react-router-dom';
import { When } from 'react-if';
import { autoToggleAlert } from '../../../helpers/utils';
import { push } from 'connected-react-router';
import Pagination from '../../Pagination';
import NotesModal from '../../admin/project/NotesModal';
import { deleteProject, resetProjectState, copyEntity, resetCopyState } from '../commonActions';
import { projectDeletedSelector, copiedEntitySelector } from '../commonReducer';
import { extractUserDataFromToken } from '../../auth/auth';
import UpdateProjectStatus from './UpdateProjectStatus';

const Projects = ({
                      projects,
                      match,
                      params,
                      deleted,
                      copiedEntity,
                      hideBackButton,
                      getProjects,
                      deleteProject,
                      resetProjectState,
                      copyEntity,
                      resetCopyState,
                      push,
                  }) => {

    const [ projectIdToDelete, setProjectIdToDelete ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState(null);
    const [ notesProject, setNotesProject ] = useState(null);
    const [ projectIdToCopy, setProjectIdToCopy ] = useState(null);

    useEffect(() => {
        getProjects(generateParams());
    }, [ getProjects, match.params.vacancyId ]);

    useEffect(() => {
        if (deleted) {
            autoToggleAlert('Вы успешно удалили проект', setSuccessMessage);
            resetProjectState();
            getProjects(generateParams());
        }
    }, [ deleted, resetProjectState, getProjects ] );

    useEffect(() => {
        if (copiedEntity) {
            autoToggleAlert('Проект скопирован', setSuccessMessage);
            resetCopyState();
            setProjectIdToCopy(null);
            push(`${match.url}/edit/${copiedEntity.id}`);
        }
    }, [ copiedEntity, resetCopyState, getProjects ]);

    const showActions = !!match.params.vacancyId;

    const generateParams = () => {
        if (params) return params;
        const { vacancyId, companyId } = match.params;
        return vacancyId ? { vacancy: vacancyId } : { company: companyId }
    };

    const handleDeleteProject = () => {
        deleteProject(projectIdToDelete);
        setProjectIdToDelete(null);
    };

    const handleStatusUpdated = () => {
        getProjects(generateParams());
        autoToggleAlert('Статус обновлен', setSuccessMessage);
    }

    const projectsTableLayout = {
        headings: [
            '#', 'название', 'статус', 'Кол-во выполненных ЦД',
            'Доля Выполненных ЦД', 'действия', 'заметки',
        ],
        createRow: ({
                        id,
                        name,
                        completed_targeted_actions_count,
                        target_action_amount,
                    }) => [
            id,
            name,
            <UpdateProjectStatus
                key={id}
                updated={handleStatusUpdated}
                project={(projects || {}).results.find((project) => project.id === id)}
            />,
            completed_targeted_actions_count,
            target_action_amount,
        ],
    };

    const shouldShowActions = (isEditing) => {
        if (!showActions) {
            projectsTableLayout.headings = [
                '#', 'название', 'Кол-во выполненных ЦД', 'Доля Выполненных ЦД', 'заметки'];
            return null
        }
        if (isEditing) {
            return ({ id }) => push(`${match.url}/edit/${id}`)
        } else {
            return ({ id }) => setProjectIdToDelete(id);
        }
    };
    
    const allowCopy = () => {
        const role = (extractUserDataFromToken() || {}).role;
        if (role !== 'admin' || !showActions)
            return null;
        return ({ id }) => setProjectIdToCopy(id);
    }

    const generatePath = () => {
        let backPath;
        const { companyId, applicationId, vacancyId } = match.params;
        if (!showActions) {
            return { backPath: `/admin/companies/${companyId}`};
        }
        if (companyId) {
            backPath = `/admin/companies/${companyId}/applications/${applicationId}/vacancies/${vacancyId}`;
        } else {
            backPath = `/admin/applications/${applicationId}/vacancies/${vacancyId}`;
        }
        return { backPath, forwardPath: `${backPath}/project/create` };
    };

    return (
        <div>
            <When condition={!!notesProject}>
                <NotesModal
                    onClose={() => setNotesProject(null)}
                    project={notesProject}/>
            </When>
            <When condition={!!successMessage}>
                <AlertNotice type="success" message={successMessage}/>
            </When>
            <ConfirmationModal
                show={!!projectIdToCopy}
                question="Вы уверены, что хотите копировать этот проект?"
                onConfirm={() => copyEntity('project', projectIdToCopy)}
                onCancel={() => setProjectIdToCopy(null)}
            />
            <When condition={!!projectIdToDelete}>
                <ConfirmationModal
                    onConfirm={handleDeleteProject}
                    show={!!projectIdToDelete}
                    onCancel={() => setProjectIdToDelete(null)}
                    question="Вы уверены, что хотите удалить этот проект?"/>
            </When>
            { hideBackButton ? null : (
                <BackButton path={generatePath().backPath}/>
            )}
            { showActions ? (
                <Link to={generatePath().forwardPath}>
                    <CreateButton />
                </Link>
            ) : null }
            <TableList
                onCopy={allowCopy()}
                onViewNotes={(project)=> setNotesProject(project)}
                onClickRow={({ id }) => push(`${match.url}/${id}`)}
                onEditItem={shouldShowActions(true)}
                onDeleteItem={shouldShowActions()}
                layout={projectsTableLayout}
                data={(projects || {}).results}
            />
            <Pagination
                action={getProjects}
                data={projects}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    projects: projectsSelector(state),
    deleted: projectDeletedSelector(state),
    copiedEntity: copiedEntitySelector(state),
});

const mapDispatchToProps = {
    getProjects,
    deleteProject,
    resetProjectState,
    push,
    copyEntity,
    resetCopyState,
};


export default connect(mapStateToProps, mapDispatchToProps)(Projects);
