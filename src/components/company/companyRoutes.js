import CreateApplication from './CreateApplication';
import Applications from './Applications';
import ApplicationDetails from '../common/ApplicationDetails';
import Vacancies from './Vacancies';
import VacancyDetails from './VacancyDetails';


export const companyRoutes = [
    {
        path: '/company/application/create',
        component: CreateApplication,
    },
    {
        path: '/company/applications/:applicationId',
        component: ApplicationDetails,
    },
    {
        path: '/company/applications',
        component: Applications,
    },
    {
        path: '/company/vacancies',
        component: Vacancies,
    },
    {
        path: '/company/vacancies/:vacancyId',
        component: VacancyDetails,
    },
];


export const companyNavigation =  {
    top: [
        {
            name: 'Кабинет',
            url: '/company',
            icon: 'Home',
        },
        { divider: true },
        {
            name: 'Подать Заявку',
            url: '/company/application/create',
            icon: 'Edit3',
        },
        {
            name: 'Заявки',
            url: '/company/applications',
            icon: 'FileText',
        },
        {
            name: 'Вакансии',
            url: '/company/vacancies',
            icon: 'Briefcase',
        },
    ],
    bottom: [
        {
            name: 'Выйти',
            url: '/login',
            icon: 'LogOut',
        },
    ],
};
