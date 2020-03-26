import UserList from './Users/Users';
import Companies from './Companies/Companies';
import CreateCompany from './Companies/CreateCompany';
import Roles from './Configs/Roles/Roles';
import CompanyDetails from './Companies/CompanyDetails';
import ContactPersons from './Companies/ContactPersons';
import BranchContactPersons from './Companies/Branches/ContactPersons';
import Locations from './Configs/Locations';
import Industries from './Configs/Industries';
import Specifications from './Configs/Specifications';
import CreateApplication from './Companies/CreateApplication';
import Applications from './Applications';
import CompanyApplications from './Companies/Applications';
import CreateBranch from './Companies/Branches/CreateBranch';
import Branches from './Companies/Branches/Branches';
import UpdateBranch from './Companies/Branches/UpdateBranch';
import BranchDetails from './Companies/Branches/BranchDetails';
import CreateCompanyContactPerson
    from './Companies/CreateCompanyContactPerson';
import CreateBranchContactPerson
    from './Companies/Branches/CreateBranchContactPerson';
import UpdateCompanyContactPerson
    from './Companies/UpdateCompanyContacPerson';
import UpdateBranchContactPerson
    from './Companies/Branches/UpdateBranchContactPerson';


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
            name: 'Заявки',
            icon: 'FileText',
            url: '/admin/applications',
            matcher: '/applications',
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
            name: 'Выйти',
            url: '/login',
            icon: 'LogOut',
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
        name: 'Контактные лица компании',
    },
    {
        path: '/admin/companies/:companyId/contact-persons/create',
        component: CreateCompanyContactPerson,
        name: 'Создать контактное лицо компании',
    },
    {
        path: '/admin/companies/:companyId/contact-persons/edit/:contactPersonId',
        component: UpdateCompanyContactPerson,
        name: 'Править контактное лицо компании',
    },
    {
        path: '/admin/companies/:companyId/application/create',
        component: CreateApplication,
        name: 'Создать заявку',
    },
    {
        path: '/admin/companies/:companyId/application',
        component: CompanyApplications,
        name: 'Заявки',
    },
    {
        path: '/admin/companies/:companyId/branch/create',
        component: CreateBranch,
        name: 'Создать бранч',
    },
    {
        path: '/admin/companies/:companyId/branches/edit/:branchId',
        component: UpdateBranch,
        name: 'Править бранч',
    },
    {
        path: '/admin/companies/:companyId/branches/:branchId/contact-persons',
        component: BranchContactPersons,
        name: 'Контактные лица бранча',
    },
    {
        path: '/admin/companies/:companyId/branches/:branchId/contact-persons/edit/:contactPersonId',
        component: UpdateBranchContactPerson,
        name: 'Править контактное лицо бранча',
    },
    {
        path: '/admin/companies/:companyId/branches/:branchId/contact-persons/create',
        component: CreateBranchContactPerson,
        name: 'Создать контактное лицо бранча',
    },
    {
        path: '/admin/companies/:companyId/branches/:branchId',
        component: BranchDetails,
        name: 'Детали бранча',
    },
    {
        path: '/admin/companies/:companyId/branches',
        component: Branches,
        name: 'Бранчи'
    },
    {
        path: '/admin/applications',
        component: Applications,
        name: 'Заявки'
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
