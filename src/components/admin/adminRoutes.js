import UserList from './User/Users';
import Companies from './Company/Companies';
import CreateCompany from './Company/CreateCompany';
import Roles from './Config/Roles/Roles';
import CompanyDetails from './Company/CompanyDetails';
import ContactPersons from './Company/ContactPersons';
import BranchContactPersons from './Branch/ContactPersons';
import Locations from './Config/Locations';
import Industries from './Config/Industries';
import Specifications from './Config/Specifications';
import CreateApplication from './Company/CreateApplication';
import Applications from './Application/Applications';
import CompanyApplications from './Company/Applications';
import CreateBranch from './Branch/CreateBranch';
import Branches from './Branch/Branches';
import UpdateBranch from './Branch/UpdateBranch';
import BranchDetails from './Branch/BranchDetails';
import CreateContactPerson from './contactPerson/CreateContactPerson';
import DynamicFields from './Config/DynamicFields/DynamicFields';
import ApplicationDetails from '../common/ApplicationDetails';
import withEntity from './contactPerson/withEntity';
import UpdateContactPerson from './contactPerson/UpdateContactPerson';
import withApplicationsTableLayout
    from './Application/withApplicationsTableLayout';
import Vacancies from './Vacancy/Vacancies';
import VacancyDetails from './Vacancy/VacancyDetails';
import Projects from './Project/Projects';
import Categories from './Config/Categories';
import Subcategories from './Config/Subcategories/Subcategories';
import CreateProject from './Project/CreateProject';
import UpdateProject from './Project/UpdateProject';
import ProjectDetails from './Project/ProjectDetails';
import EnhanceDynamicFields from './Config/DynamicFields/EnhanceDynamicFields';
import Analytics from './Analytics/Analytics';



const adminRoutes = [
    {
        path: '/admin',
        component: Analytics,
        name: 'Кабинет администратора'
    },
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
        path: '/admin/companies/:companyId/projects/:projectId/custom-fields',
        component: EnhanceDynamicFields(DynamicFields),
        name: 'Поля проекта'
    },
    {
        path: '/admin/companies/:companyId/projects/:projectId',
        component: ProjectDetails,
        name: 'Детали проекта'
    },
    {
        path: '/admin/companies/:companyId/projects',
        component: Projects,
        name: 'Проекты'
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
        path: '/admin/companies/:companyId/applications/:applicationId/vacancies/:vacancyId/projects/:projectId/custom-fields',
        component: EnhanceDynamicFields(DynamicFields),
        name: 'Поля проекта'
    },
    {
        path: '/admin/companies/:companyId/applications/:applicationId/vacancies/:vacancyId/projects/:projectId',
        component: ProjectDetails,
        name: 'Детали Проекта'
    },
    {
        path: '/admin/companies/:companyId/applications/:applicationId/vacancies/:vacancyId/projects',
        component: Projects,
        name: 'Проекты'
    },
    {
        path: '/admin/companies/:companyId/applications/:applicationId/vacancies/:vacancyId/project/create',
        component: CreateProject,
        name: 'Создать проект'
    },
    {
        path: '/admin/companies/:companyId/applications/:applicationId/vacancies/:vacancyId/projects/edit/:projectId',
        component: UpdateProject,
        name: 'Редактировать проект'
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
        path: '/admin/applications/:applicationId/vacancies/:vacancyId/projects/:projectId/custom-fields',
        component: EnhanceDynamicFields(DynamicFields),
        name: 'Поля проекта'
    },
    {
        path: '/admin/applications/:applicationId/vacancies/:vacancyId/projects/:projectId',
        component: ProjectDetails,
        name: 'Детали Проекта'
    },
    {
        path: '/admin/applications/:applicationId/vacancies/:vacancyId/projects',
        component: Projects,
        name: 'Проекты'
    },
    {
        path: '/admin/applications/:applicationId/vacancies/:vacancyId/projects/edit/:projectId',
        component: UpdateProject,
        name: 'Редактировать проект'
    },
    {
        path: '/admin/applications/:applicationId/vacancies/:vacancyId/project/create',
        component: CreateProject,
        name: 'Создать проект'
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
        component: EnhanceDynamicFields(DynamicFields),
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
