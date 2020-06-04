import Projects from './Projects';
import ProjectDetails from '../admin/Project/ProjectDetails';
import NotificationsList from './NotificationsList';
import Leads from '../admin/Lead/Leads';
import CreateCandidate from '../common/candidates/CreateCandidate';
import Candidates from '../common/candidates/Candidates';
import CandidateDetails from '../common/candidates/CandidateDetails';


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
    {
        path: '/recruiter/candidates/:candidateId',
        component: CandidateDetails,
        name: 'Детали кандидата'
    },
    {
        path: '/recruiter/candidates',
        component: Candidates,
        name: 'Кандидаты'
    },

];


export default recruiterRoutes
