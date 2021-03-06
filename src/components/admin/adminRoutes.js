import Users from './User/Users';
import Companies from './Company/Companies';
import CreateCompany from './Company/CreateCompany';
import Roles from './Config/Roles/Roles';
import CompanyDetails from './Company/CompanyDetails';
import ContactPersons from './Company/ContactPersons';
import BranchContactPersons from './Branch/ContactPersons';
import Locations from './Config/Locations/Locations';
import Industries from './Config/Industries';
import Specifications from './Config/Specifications';
import CreateApplication from './Application/CreateApplication';
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
import Projects from '../common/project/Projects';
import Categories from './Config/Categories';
import Subcategories from './Config/Subcategories/Subcategories';
import CreateProject from './project/CreateProject';
import UpdateProject from './project/UpdateProject';
import ProjectDetails from '../common/project/ProjectDetails';
import EnhanceDynamicFields from './Config/DynamicFields/EnhanceDynamicFields';
import Analytics from './Analytics/Analytics';
import Statuses from './Config/Statuses/Statuses';
import Leads from './Lead/Leads';
import Candidates from '../common/candidates/Candidates';
import CreateCandidate from '../common/candidates/CreateCandidate';
import CandidateDetails from '../common/candidates/CandidateDetails';
import UserDetails from './User/UserDetails';
import UpdateUser from './User/UpdateUser';
import UpdateCompany from './Company/UpdateCompany';
import CreateRecruiter from './User/CreateRecruiter';
import CreateProjectManager from './User/CreateProjectManager';
import UpdateCandidate from '../common/candidates/UpdateCandidate';
import UpdateApplication from './Application/UpdateApplication';
import Flows from './Config/Flows/Flows';
import Flow from './Config/Flows/Flow';


const adminRoutes = [
    {
        path: '/admin',
        component: Analytics,
        name: 'Кабинет администратора'
    },
    {
        path: '/admin/users',
        component: Users,
        name: 'Пользователи'
    },
    {
        path: '/admin/users/create/recruiter',
        component: CreateRecruiter,
        name: 'Создать рекрутера'
    },
    {
        path: '/admin/users/create/project-manager',
        component: CreateProjectManager,
        name: 'Создать менеджера проекта'
    },
    {
        path: '/admin/user/:userId/edit',
        component: UpdateUser,
        name: 'Редактировать пользователя'
    },
    {
        path: '/admin/user/contact-person/:contactPersonId/edit',
        component: withEntity(UpdateContactPerson, 'base'),
        name: 'Редактировать контактное лицо'
    },
    {
        path: '/admin/user/:userId',
        component: UserDetails,
        name: 'Детали пользователя'
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
        path: '/admin/companies/:companyId/edit',
        component: UpdateCompany,
        name: 'Редактировать компанию',
    },
    {
        path: '/admin/companies/:companyId',
        component: CompanyDetails,
        name: 'Детали компании',
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
        path: '/admin/companies/:companyId/applications/edit/:applicationId',
        component: UpdateApplication,
        name: 'Редактировать заявку',
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
        path: '/admin/leads',
        component: Leads,
        name: 'Лиды'
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
        name: 'Локации'
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
    {
        path: '/admin/configs/statuses',
        component: Statuses,
        name: 'Статусы'
    },
    {
        path: '/admin/projects/:projectId/create-candidate',
        component: CreateCandidate,
        name: 'Добавить кандидата'
    },
    {
        path: '/admin/candidates/:candidateId',
        component: CandidateDetails,
        name: 'Детали кандидата'
    },
    {
        path: '/admin/projects/:projectId/candidates/:candidateId/edit',
        component: UpdateCandidate,
        name: 'Редактировать кандидата'
    },
    {
        path: '/admin/candidates',
        component: Candidates,
        name: 'Кандидаты'
    },
    {
        path: '/admin/configs/flows',
        component: Flows,
        name: 'Процессы'
    },
    {
        path: '/admin/configs/flows/:flowId',
        component: Flow,
        name: 'Процесс'
    },
];


export default adminRoutes
