import Projects from './Projects';
import ProjectDetails from './ProjectDetails';
import ManageRecruiters from './ManageRecruiters';

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
]
