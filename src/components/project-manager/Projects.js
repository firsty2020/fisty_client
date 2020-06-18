import React from 'react';
import ProjectList from '../common/project/Projects';
import { extractUserDataFromToken } from '../auth/auth';


const Projects = ({ match, }) => {

    const userId = (extractUserDataFromToken() || {}).user_id;
    const params = { manager: userId };

    return (
        <div>
            <ProjectList
                hideBackButton
                match={match}
                params={params} />
        </div>

    );
};

export default Projects;
