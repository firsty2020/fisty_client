import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    AlertNotice,
    BackButton,
    ConfirmationModal,
    CreateButton,
    TableList
} from '../../ui';
import { deleteProject, getProjects, resetProjectState } from '../adminActions';
import { projectDeletedSelector, projectsSelector } from '../adminReducer';
import { Link } from 'react-router-dom';
import { When } from 'react-if';
import { autoToggleAlert } from '../../../helpers/utils';
import { push } from 'connected-react-router';


const projectsTableLayout = {
    headings: [
        '#', 'название', 'Кол-во выполненных ЦД', 'Доля Выполненных ЦД', 'действия',
    ],
    createRow: ({ name, target_action_count, target_action_amount}, index) => [
        index + 1,
        name,
        target_action_count,
        target_action_amount,
    ],
};

const Projects = ({
                      projects,
                      match,
                      deleted,
                      getProjects,
                      deleteProject,
                      resetProjectState,
                      push,
                  }) => {

    const [ projectIdToDelete, setProjectIdToDelete ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState(null);

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

    const generateParams = () => {
        const { vacancyId, companyId } = match.params;
        return vacancyId ? { vacancy: vacancyId } : { company: companyId }
    };

    const handleDeleteProject = () => {
        deleteProject(projectIdToDelete);
        setProjectIdToDelete(null);
    };

    const generatePath = () => {
        let backPath;
        let forwardPath;
        const { companyId, applicationId, vacancyId } = match.params;
        if (companyId) {
            backPath = `/admin/companies/${companyId}/applications/${applicationId}/vacancies/${vacancyId}`;
            forwardPath = `${backPath}/project/create`;
        } else {
            backPath = `/admin/applications/${applicationId}/vacancies/${vacancyId}`;
            forwardPath = `${backPath}/project/create`
        }
        return { backPath, forwardPath };
    };

    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice type="success" message={successMessage}/>
            </When>
            <When condition={!!projectIdToDelete}>
                <ConfirmationModal
                    onConfirm={handleDeleteProject}
                    show={!!projectIdToDelete}
                    onCancel={() => setProjectIdToDelete(null)}
                    question="Вы уверены, что хотите удалить этот проект?"/>
            </When>
            <BackButton path={generatePath().backPath}/>
            <Link to={generatePath().forwardPath}>
                <CreateButton />
            </Link>
            <TableList
                onClickRow={({ id }) => push(`${match.url}/${id}`)}
                onEditItem={({ id }) => push(`${match.url}/edit/${id}`)}
                onDeleteItem={({ id }) => setProjectIdToDelete(id)}
                layout={projectsTableLayout}
                data={projects}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    projects: projectsSelector(state),
    deleted: projectDeletedSelector(state),
});

const mapDispatchToProps = { getProjects, deleteProject, resetProjectState, push };


Projects.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Projects);
