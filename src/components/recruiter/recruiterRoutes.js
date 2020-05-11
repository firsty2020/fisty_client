import Projects from './Projects';
import ProjectDetails from '../admin/Project/ProjectDetails';


const recruiterRoutes = [
    {
        path: '/recruiter/projects/:projectId',
        component: ProjectDetails,
        name: 'Детали проекта'
    },
    {
        path: '/recruiter/projects',
        component: Projects,
        name: 'Проекты'
    },

];


export default recruiterRoutes
