import UserList from './Users/Users';
import Companies from './Companies/Companies';


export const navigation =  {
    top: [
        {
            name: 'Кабинет',
            url: '/admin',
            icon: 'Home',
        },
        { divider: true },
        {
            name: 'Пользователи',
            icon: 'Users',
            url: '/admin/users/all',
        },
        {
            name: 'Компании',
            icon: 'Briefcase',
            url: '/admin/companies',
        },
    ],
    bottom: [
        {
            name: 'Account',
            url: '/dashboard',
            icon: 'User',
            badge: {
                variant: 'success',
                text: '3',
            },
        },
    ],
};


export const adminRoutes = [
    {
        path: '/admin/users/:status',
        component: UserList,
    },
    {
        path: '/admin/companies',
        component: Companies,
    },
];
