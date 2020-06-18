import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    AlertNotice,
    BackButton,
    ConfirmationModal,
    CreateButton,
    TableList
} from '../../ui';
import { deleteProject, getProjects, resetProjectState } from '../../admin/adminActions';
import { projectDeletedSelector, projectsSelector } from '../../admin/adminReducer';
import { Link } from 'react-router-dom';
import { When } from 'react-if';
import { autoToggleAlert } from '../../../helpers/utils';
import { push } from 'connected-react-router';
import Pagination from '../../Pagination';
import NotesModal from '../../admin/project/NotesModal';

const Projects = ({
                      projects,
                      match,
                      params,
                      deleted,
                      hideBackButton,
                      getProjects,
                      deleteProject,
                      resetProjectState,
                      push,
                  }) => {

    const [ projectIdToDelete, setProjectIdToDelete ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState(null);
    const [ notesProject, setNotesProject ] = useState(null)

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

    const projectsTableLayout = {
        headings: [
            '#', 'название', 'Кол-во выполненных ЦД', 'Доля Выполненных ЦД', 'действия', 'заметки',
        ],
        createRow: ({
                        id,
                        name,
                        completed_targeted_actions_count,
                        target_action_amount,
                    }) => [
            id,
            name,
            completed_targeted_actions_count,
            target_action_amount,
        ],
    };

    const shouldActions = (isEditing) => {
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
                onViewNotes={(project)=> setNotesProject(project)}
                onClickRow={({ id }) => push(`${match.url}/${id}`)}
                onEditItem={shouldActions(true)}
                onDeleteItem={shouldActions()}
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
});

const mapDispatchToProps = { getProjects, deleteProject, resetProjectState, push };


Projects.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Projects);
