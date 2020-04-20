import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { BackButton, CreateButton, TableList } from '../../ui';
import { getProjects } from '../adminActions';
import { projectsSelector } from '../adminReducer';
import CreateProject from './CreateProject';
import {Link} from 'react-router-dom';


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
            <BackButton path={generateBackPath().backPath}/>
            <Link to={generateBackPath().forwardPath}>
                <CreateButton />
            </Link>
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
