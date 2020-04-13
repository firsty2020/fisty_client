import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { BackButton, CreateButton, TableList } from '../../ui';
import { getProjects } from '../adminActions';
import { projectsSelector } from '../adminReducer';


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
            <CreateButton/>
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
