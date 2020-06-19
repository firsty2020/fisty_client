import React, {useEffect} from 'react';
import { Container } from 'react-bootstrap';
import {
    resetProjectState,
    setProjectRecruiters,
    updateProject
} from '../adminActions';
import { connect } from 'react-redux';
import ProjectForm from './ProjectForm';
import { When } from 'react-if';
import {
    projectUpdatedSelector,
    recruitersSet
} from '../adminReducer';
import { AlertNotice } from '../../ui';
import { push } from 'connected-react-router';
import { extractIdFromUrl } from '../../../helpers/utils';
import { getProject } from '../../common/commonActions';
import { projectSelector } from '../../common/commonReducer';


const UpdateProject = ({
                           match,
                           updated,
                           project,
                           recruitersSet,
                           getProject,
                           updateProject,
                           setProjectRecruiters,
                           resetProjectState,
                           push,
                       }) => {


    useEffect(() => {
        getProject(match.params.projectId)
    }, [ getProject, match.params.projectId ]);

    useEffect(() => {
        if (updated && recruitersSet) {
            setTimeout(() => {
                push(generateBackPath());
                resetProjectState();
            }, 3000);
        }
    }, [ updated, push, recruitersSet, resetProjectState ]);

    const handleUpdateProject = (data) => {
        const recruiters = (data.recruiter || []).map((item) => Number(extractIdFromUrl(item)));
        delete data.recruiter;
        const recruitersData = {
            recruiters,
            project: project.url,
        };
        setProjectRecruiters(recruitersData);
        updateProject(project.id, data);
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
                onSubmit={(data) => handleUpdateProject(data)}
                match={match}/>
        </Container>
    )
};


const mapStateToProps = state => ({
    updated: projectUpdatedSelector(state),
    project: projectSelector(state),
    recruitersSet: recruitersSet(state),
});

const mapDispatchToProps = {
    push,
    resetProjectState,
    getProject,
    updateProject,
    setProjectRecruiters,
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateProject);
