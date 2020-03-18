import CompanyDashboard from './CompanyDashboard';
import CreateApplication from './CreateApplication';


export const routes = [
    {
        path: '/company',
        component: CompanyDashboard,
    },
    {
        path: '/company/application/create',
        component: CreateApplication,
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
    ],
    bottom: [
        {
            name: 'Выйти',
            url: '/login',
            icon: 'LogOut',
        },
    ],
};
