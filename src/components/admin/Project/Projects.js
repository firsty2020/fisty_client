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


const projectsTableLayout = {
    headings: [
        '#', 'название', 'действия',
    ],
    createRow: (project, index) => [
        index + 1,
        project.name,
    ],
};

const Projects = ({
                      projects,
                      match,
                      deleted,
                      getProjects,
                      deleteProject,
                      resetProjectState,
                  }) => {

    const [ projectIdToDelete, setProjectIdToDelete ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState(null);

    useEffect(() => {
        const { vacancyId } = match.params;
        getProjects({ vacancy: vacancyId });
    }, [ getProjects, match.params.vacancyId ]);

    useEffect(() => {
        if (deleted) {
            autoToggleAlert('Вы успешно удалили проект', setSuccessMessage);
            resetProjectState();
            getProjects();
        }
    }, [ deleted, resetProjectState, getProjects ] );

    const handleDeleteProject = () => {
        deleteProject(projectIdToDelete);
        setProjectIdToDelete(null);
    };

    const generateBackPath = () => {
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
            <BackButton path={generateBackPath().backPath}/>
            <Link to={generateBackPath().forwardPath}>
                <CreateButton />
            </Link>
            <TableList
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

const mapDispatchToProps = { getProjects, deleteProject, resetProjectState };


Projects.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Projects);
