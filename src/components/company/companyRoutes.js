import CreateApplication from './CreateApplication';
import Applications from './Applications';
import ApplicationDetails from '../common/ApplicationDetails';


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
    ],
    bottom: [
        {
            name: 'Выйти',
            url: '/login',
            icon: 'LogOut',
        },
    ],
};
