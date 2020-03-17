import UserList from './Users/Users';
import Companies from './Companies/Companies';
import CreateCompany from './Companies/CreateCompany';
import CreateBranch from './Companies/CreateBranch';
import CreateContactPerson from './Companies/ContactPersons/CreateContactPerson';
import Roles from './Configs/Roles/Roles';
import CompanyDetails from './Companies/CompanyDetails';
import ContactPersons from './Companies/ContactPersons/ContactPersons';
import UpdateContactPerson from './Companies/ContactPersons/UpdateContactPerson';
import Locations from './Configs/Locations';
import Industries from './Configs/Industries';
import Specifications from './Configs/Specifications';


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
                    name: 'Отрасль',
                    icon: 'GitBranch',
                    url: '/admin/configs/industries',
                    matcher: '/industries',
                },
                {
                    name: 'Специфика',
                    icon: 'Aperture',
                    url: '/admin/configs/specifications',
                    matcher: '/specifications',
                },
                {
                    name: 'Местонахождения',
                    icon: 'MapPin',
                    url: '/admin/configs/locations',
                    matcher: '/locations',
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
        path: '/admin/configs/industries',
        component: Industries,
        name: 'Отрасль'
    },
    {
        path: '/admin/configs/specifications',
        component: Specifications,
        name: 'Специфика'
    },
    {
        path: '/admin/configs/roles',
        component: Roles,
        name: 'Роли'
    },
    {
        path: '/admin/configs/locations',
        component: Locations,
        name: 'Местонахождения'
    },
];
