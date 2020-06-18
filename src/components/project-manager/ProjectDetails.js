import React from 'react';
import ProjectData from '../common/project/ProjectDetails';
import { Link } from 'react-router-dom';
import PrimaryButton from '../ui/PrimaryButton';

const ProjectDetails = ({ match }) => {
   return (
       <div>
           <ProjectData
               match={match}
           />
            <Link to={`/project-manager/projects/${match.params.projectId}/recruiters`}>
                <PrimaryButton
                    text="Рекрутеры"
                />
            </Link>
       </div>

   );
};

export default ProjectDetails;
