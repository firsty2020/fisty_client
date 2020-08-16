import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { setProjectRecruiters } from '../adminActions';
import { connect } from 'react-redux';
import ProjectForm from './ProjectForm';
import { getVacancy, createProject, resetProjectState } from '../../common/commonActions';
import { vacancySelector, projectCreatedSelector } from '../../common/commonReducer';
import { When } from 'react-if';
import { recruitersSet} from '../adminReducer';
import { AlertNotice } from '../../ui';
import { push } from 'connected-react-router';
import { copyObject, extractIdFromUrl } from '../../../helpers/utils';
import { getFlows } from '../Config/configsActions';


const CreateProject = ({
                           match,
                           vacancy,
                           created,
                           recruitersSet,
                           createProject,
                           getVacancy,
                           setProjectRecruiters,
                           push,
                           resetProjectState,
                           getFlows,
                       }) => {

    const [ projectData, setProjectData ] = useState(null);

    useEffect(() => {
        getVacancy(match.params.vacancyId);
        getFlows({ show_all: true });
    }, [ getVacancy, match.params.vacancyId ]);

    useEffect(() => {
        if (created && !recruitersSet) {
            setRecruiters();
        }
        if (created && recruitersSet) {
            setTimeout(() => {
                push(generateBackPath());
                resetProjectState();
            }, 3000);
        }
    }, [ created, push, resetProjectState, recruitersSet ]);

    const setRecruiters = () => {
        const recruitersData = {
            recruiters: (projectData.recruiter || []).map((r) => extractIdFromUrl(r)),
            project: created.url,
        };
        setProjectRecruiters(recruitersData)
    };

    const handleCreateProject = (data) => {
        setProjectData(copyObject(data));
        data.company = vacancy.company;
        data.vacancy = vacancy.url;
        delete data.recruiter;
        createProject(data);
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
            <When condition={!!created}>
                <AlertNotice type="success" message="Вы успешно создали проект" />
            </When>
            <ProjectForm
                backPath={generateBackPath()}
                onSubmit={(data) => handleCreateProject(data)}
                match={match}/>
        </Container>
    )
};


const mapStateToProps = state => ({
    vacancy: vacancySelector(state),
    created: projectCreatedSelector(state),
    recruitersSet: recruitersSet(state),
});

const mapDispatchToProps = {
    createProject,
    getVacancy,
    push,
    setProjectRecruiters,
    resetProjectState,
    getFlows,
};



export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
