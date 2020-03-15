import UserList from './Users/Users';
import Companies from './Companies/Companies';
import CreateCompany from './Companies/CreateCompany';
import CreateBranch from './Companies/CreateBranch';
import CreateContactPerson from './Companies/ContactPersons/CreateContactPerson';
import DynamicFields from './Configs/DynamicFields/DynamicFields';
import Roles from './Configs/Roles/Roles';
import CompanyDetails from './Companies/CompanyDetails';
import ContactPersons from './Companies/ContactPersons/ContactPersons';
import UpdateContactPerson from './Companies/ContactPersons/UpdateContactPerson';


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
            matcher: '/users'
        },
        {
            name: 'Компании',
            icon: 'Briefcase',
            url: '/admin/companies',
            matcher: '/companies',
        },
        {
            name: 'Настройки',
            icon: 'Settings',
            children: [
                {
                    name: 'Динамичные поля',
                    icon: 'Sliders',
                    url: '/admin/configs/dynamic-fields',
                    matcher: '/dynamic-fields',
                },
                {
                    name: 'Роли',
                    icon: 'Users',
                    url: '/admin/configs/roles',
                    matcher: '/roles',
                },
            ]
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
        name: 'Пользователи'
    },
    {
        path: '/admin/companies',
        component: Companies,
        name: 'Компании'
    },
    {
        path: '/admin/companies/create',
        component: CreateCompany,
        name: 'Создать компанию'
    },
    {
        path: '/admin/companies/:companyId',
        component: CompanyDetails,
        name: 'Детали компании',
    },
    {
        path: '/admin/companies/:companyId/contact-persons',
        component: ContactPersons,
        name: 'Контактные Лица',
    },
    {
        path: '/admin/companies/:companyId/contact-persons/create',
        component: CreateContactPerson,
        name: 'Контактные Лица',
    },
    {
        path: '/admin/companies/:companyId/contact-persons/:contactPersonId',
        component: UpdateContactPerson,
        name: 'Контактные Лица',
    },
    {
        path: '/admin/companies/branches/create',
        component: CreateBranch,
        name: 'Создать бранч'
    },
    {
        path: '/admin/configs/dynamic-fields',
        component: DynamicFields,
        name: 'Динамичные Поля'
    },
    {
        path: '/admin/configs/roles',
        component: Roles,
        name: 'Роли'
    },
];
