import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { BackButton, CreateButton, TableList } from '../../ui';
import { getProjects } from '../adminActions';
import { projectsSelector } from '../adminReducer';
import CreateProject from './CreateProject';


const projectsTableLayout = {
    headings: [
        '#', 'название',
    ],
    createRow: (project, index) => [
        index + 1,
        project.name,
    ],
};

const Projects = ({ projects, match, getProjects }) => {

    const [ isCreatingProject, setIsCreatingProject ] = useState(true);

    useEffect(() => {
        const { vacancyId } = match.params;
        getProjects({ vacancy: vacancyId });
    }, [ getProjects, match.params.vacancyId ]);

    const generateBackPath = () => {
        const { companyId, applicationId, vacancyId } = match.params;
        if (companyId) {
            return `/admin/companies/${companyId}/applications/${applicationId}/vacancies/${vacancyId}`
        }
        return `/admin/applications/${applicationId}/vacancies/${vacancyId}`
    };

    return (
        <div>
            <BackButton path={generateBackPath()}/>
            <CreateButton
                onClick={() => setIsCreatingProject(true)}/>
            {/*{isCreatingProject ? (
                <CreateProject match={match} />
                ) : null}*/}
            <TableList
                layout={projectsTableLayout}
                data={projects}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    projects: projectsSelector(state),
});

const mapDispatchToProps = { getProjects };


Projects.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Projects);
