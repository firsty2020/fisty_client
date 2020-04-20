import React, {useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { createProject } from '../adminActions';
import { connect } from 'react-redux';
import ProjectForm from './ProjectForm';
import { getVacancy } from '../../common/commonActions';
import { vacancySelector } from '../../common/commonReducer';
import { When } from 'react-if';
import { projectCreatedSelector } from '../adminReducer';
import { AlertNotice } from '../../ui';
import { push } from 'connected-react-router';


const CreateProject = ({
                           match,
                           vacancy,
                           created,
                           createProject,
                           getVacancy,
                           push,
                       }) => {

    useEffect(() => {
        getVacancy(match.params.vacancyId);
    }, [ getVacancy, match.params.vacancyId ]);

    useEffect(() => {
        if (created) {
            setTimeout(() => push(generateBackPath()), 3000);
        }
    }, [ created, push ]);


    const handleCreateProject = (data) => {
        data.company = vacancy.company;
        data.vacancy = vacancy.url;
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
});

const mapDispatchToProps = { createProject, getVacancy, push };



export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
