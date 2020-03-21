import CompanyDashboard from './CompanyDashboard';
import CreateApplication from './CreateApplication';
import Applications from './Applications';


export const routes = [
    {
        path: '/company',
        component: CompanyDashboard,
    },
    {
        path: '/company/application/create',
        component: CreateApplication,
    },
    {
        path: '/company/applications',
        component: Applications,
    },
];


export const navigation =  {
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
