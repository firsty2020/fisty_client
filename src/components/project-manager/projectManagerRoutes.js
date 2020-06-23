import Projects from './Projects';
import ProjectDetails from './ProjectDetails';
import ManageRecruiters from './ManageRecruiters';
import Candidates from './Candidates';

export default [
    {
        path: '/project-manager/',
    },
    {
        path: '/project-manager/projects',
        component: Projects,
        name: 'Проекты'
    },
    {
        path: '/project-manager/projects/:projectId',
        component: ProjectDetails,
        name: 'Детали проекта'
    },
    {
        path: '/project-manager/projects/:projectId/recruiters',
        component: ManageRecruiters,
        name: 'Рекрутеры'
    },
    {
        path: '/project-manager/projects/:projectId/candidates',
        component: Candidates,
        name: 'Кандидаты'
    },
]
