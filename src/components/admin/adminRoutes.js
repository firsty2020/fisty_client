import UserList from './Users/Users';
import Companies from './Companies/Companies';
import CreateCompany from './Companies/CreateCompany';
import Roles from './Configs/Roles/Roles';
import CompanyDetails from './Companies/CompanyDetails';
import ContactPersons from './Companies/ContactPersons';
import BranchContactPersons from './Branches/ContactPersons';
import Locations from './Configs/Locations';
import Industries from './Configs/Industries';
import Specifications from './Configs/Specifications';
import CreateApplication from './Companies/CreateApplication';
import Applications from './Applications/Applications';
import CompanyApplications from './Companies/Applications';
import CreateBranch from './Branches/CreateBranch';
import Branches from './Branches/Branches';
import UpdateBranch from './Branches/UpdateBranch';
import BranchDetails from './Branches/BranchDetails';
import CreateContactPerson from './contactPerson/CreateContactPerson';
import DynamicFields from './Configs/DynamicFields/DynamicFields';
import ApplicationDetails from '../common/ApplicationDetails';
import withEntity from './contactPerson/withEntity';
import UpdateContactPerson from './contactPerson/UpdateContactPerson';
import withApplicationsTableLayout
    from './Applications/withApplicationsTableLayout';
import Vacancies from './Applications/Vacancies';
import VacancyDetails from './Applications/VacancyDetails';
import Projects from './Projects/Projects';
import Categories from './Configs/Categories';
import Subcategories from './Configs/Subcategories/Subcategories';


const adminRoutes = [
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
        path: '/admin/company/create',
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
        component: withEntity(CreateContactPerson, 'company'),
        name: 'Создать контактное лицо компании',
    },
    {
        path: '/admin/companies/:companyId/contact-persons/edit/:contactPersonId',
        component: withEntity(UpdateContactPerson, 'company'),
        name: 'Править контактное лицо компании',
    },
    {
        path: '/admin/companies/:companyId/applications/:applicationId/vacancies/:vacancyId/projects',
        component: Projects,
        name: 'Проекты'
    },
    {
        path: '/admin/companies/:companyId/applications/:applicationId/vacancies/:vacancyId',
        component: VacancyDetails,
        name: 'Детали вакансии'
    },
    {
        path: '/admin/companies/:companyId/applications/:applicationId/vacancies',
        component: Vacancies,
        name: 'Вакансии'
    },
    {
        path: '/admin/companies/:companyId/applications/:applicationId',
        component: ApplicationDetails,
        name: 'Детали заявки',
    },
    {
        path: '/admin/companies/:companyId/application/create',
        component: CreateApplication,
        name: 'Создать заявку',
    },
    {
        path: '/admin/companies/:companyId/applications',
        component: withApplicationsTableLayout(CompanyApplications),
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
        component: withEntity(UpdateContactPerson, 'branch'),
        name: 'Править контактное лицо бранча',
    },
    {
        path: '/admin/companies/:companyId/branches/:branchId/contact-persons/create',
        component: withEntity(CreateContactPerson, 'branch'),
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
        path: '/admin/applications/:applicationId/vacancies/:vacancyId/projects',
        component: Projects,
        name: 'Проекты'
    },
    {
        path: '/admin/applications/:applicationId/vacancies/:vacancyId',
        component: VacancyDetails,
        name: 'Детали вакансии'
    },
    {
        path: '/admin/applications/:applicationId/vacancies',
        component: Vacancies,
        name: 'Вакансии'
    },
    {
        path: '/admin/applications/:applicationId',
        component: ApplicationDetails,
        name: 'Детали заявки'
    },
    {
        path: '/admin/applications',
        component: withApplicationsTableLayout(Applications),
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
    {
        path: '/admin/configs/dynamic-fields',
        component: DynamicFields,
        name: 'Динамичные поля'
    },
    {
        path: '/admin/configs/categories',
        component: Categories,
        name: 'Категории'
    },
    {
        path: '/admin/configs/subcategories',
        component: Subcategories,
        name: 'Подкатегории'
    },
];


export default adminRoutes
