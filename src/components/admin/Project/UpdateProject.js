import React, {useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { getProject, resetProjectState, updateProject } from '../adminActions';
import { connect } from 'react-redux';
import ProjectForm from './ProjectForm';
import { When } from 'react-if';
import { projectSelector, projectUpdatedSelector } from '../adminReducer';
import { AlertNotice } from '../../ui';
import { push } from 'connected-react-router';


const UpdateProject = ({
                           match,
                           updated,
                           project,
                           getProject,
                           updateProject,
                           resetProjectState,
                           push,
                       }) => {


    useEffect(() => {
        getProject(match.params.projectId)
    }, [ getProject, match.params.projectId ]);

    useEffect(() => {
        if (updated) {
            setTimeout(() => {
                push(generateBackPath());
                resetProjectState();
            }, 3000);
        }
    }, [ updated, push, resetProjectState ]);

    const handleCreateProject = (data) => {
        console.log(data, 'data');
        updateProject(data);
    };

    const generateBackPath = () => {
        const { companyId, applicationId, vacancyId } = match.params;
        if (companyId) {
            return `/admin/companies/${companyId}/applications/${applicationId}/vacancies/${vacancyId}/projects`;
        }
        return `/admin/applications/${applicationId}/vacancies/${vacancyId}/projects`;
    };


    return (
        <Container className="mt-10-auto">
            <When condition={!!updated}>
                <AlertNotice type="success" message="Вы успешно обновили проект" />
            </When>
            <ProjectForm
                project={project}
                backPath={generateBackPath()}
                onSubmit={(data) => handleCreateProject(data)}
                match={match}/>
        </Container>
    )
};


const mapStateToProps = state => ({
    updated: projectUpdatedSelector(state),
    project: projectSelector(state),
});

const mapDispatchToProps = { push, resetProjectState, getProject, updateProject };



export default connect(mapStateToProps, mapDispatchToProps)(UpdateProject);
