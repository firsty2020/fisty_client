import Projects from './Projects';
import ProjectDetails from '../admin/Project/ProjectDetails';
import NotificationsList from './NotificationsList';
import Leads from '../admin/Lead/Lead';
import CreateCandidate from './CreateCandidate';


const recruiterRoutes = [
    {
        path: '/recruiter/projects/:projectId/create-candidate',
        component: CreateCandidate,
        name: 'Кандидат'
    },
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
    {
        path: '/recruiter/notifications',
        component: NotificationsList,
        name: 'Уведомления'
    },
    {
        path: '/recruiter/leads',
        component: Leads,
        name: 'Лиды'
    },

];


export default recruiterRoutes
