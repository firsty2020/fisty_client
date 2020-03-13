import {
    ADMIN_GET_USERS_PENDING,
    ADMIN_GET_USERS_FAILED,
    ADMIN_GET_USERS_RESOLVED,
    ADMIN_CREATE_COMPANY_PENDING,
    ADMIN_CREATE_COMPANY_RESOLVED,
    ADMIN_GET_COMPANIES_RESOLVED,
    ADMIN_CREATE_COMPANY_FAILED,
    ADMIN_GET_COMPANIES_PENDING,
    ADMIN_CONFIGS_ADD_INDUSTRY_PENDING,
    ADMIN_CONFIGS_ADD_INDUSTRY_RESOLVED,
    ADMIN_CONFIGS_ADD_INDUSTRY_FAILED,
    ADMIN_CONFIGS_GET_INDUSTRIES_PENDING,
    ADMIN_CONFIGS_GET_INDUSTRIES_RESOLVED,
    ADMIN_CONFIGS_GET_INDUSTRIES_FAILED,
    ADMIN_CONFIGS_UPDATE_INDUSTRY_PENDING,
    ADMIN_CONFIGS_UPDATE_INDUSTRY_RESOLVED,
    ADMIN_CONFIGS_UPDATE_INDUSTRY_FAILED,
    ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_PENDING,
    ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_FAILED,
    ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_RESOLVED,
    ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_RESOLVED,
    ADMIN_CONFIGS_UPDATE_SPECIFICATION_OPTION_RESOLVED,
    ADMIN_CONFIGS_REMOVE_INDUSTRY_RESOLVED,
    ADMIN_CONFIGS_REMOVE_SPECIFICATION_OPTION_RESOLVED,
    ADMIN_CONFIGS_REMOVE_INDUSTRY_PENDING,
    ADMIN_CONFIGS_REMOVE_SPECIFICATION_OPTION_PENDING,
    ADMIN_GET_COMPANIES_FAILED,
    ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_PENDING,
    ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_FAILED,
    ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_RESOLVED,
    ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_FAILED,
    ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_RESOLVED,
    ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_PENDING,
    ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_PENDING,
    ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_RESOLVED,
    ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_FAILED,
    ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_PENDING,
    ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_FAILED,
    ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_RESOLVED,
    ADMIN_CREATE_CONTACT_PERSON_PENDING,
    ADMIN_CREATE_CONTACT_PERSON_FAILED,
    ADMIN_CREATE_CONTACT_PERSON_RESOLVED,
    ADMIN_GET_CONTACT_PERSONS_PENDING,
    ADMIN_GET_CONTACT_PERSONS_FAILED,
    ADMIN_GET_CONTACT_PERSONS_RESOLVED,
    ADMIN_REMOVE_CONTACT_PERSON_PENDING,
    ADMIN_REMOVE_CONTACT_PERSON_FAILED,
    ADMIN_REMOVE_CONTACT_PERSON_RESOLVED,
    ADMIN_GET_CONTACT_PERSON_PENDING,
    ADMIN_GET_CONTACT_PERSON_FAILED,
    ADMIN_GET_CONTACT_PERSON_RESOLVED,
    ADMIN_UPDATE_CONTACT_PERSON_PENDING,
    ADMIN_UPDATE_CONTACT_PERSON_FAILED,
    ADMIN_UPDATE_CONTACT_PERSON_RESOLVED,
    AUTH_SET_PASSWORD_PENDING,
    AUTH_SET_PASSWORD_FAILED, AUTH_SET_PASSWORD_RESOLVED,
} from '../../constants/actionTypes';

const initialState = {getUsersPending: false, getUsersError: null, users: []};

export const admin = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_GET_USERS_PENDING:
            return {
                ...state,
                getUsersPending: true,
                getUsersError: null,
                users: []
            };
        case ADMIN_GET_USERS_FAILED:
            return {
                ...state,
                getUsersError: action.payload,
                getUsersPending: false,
                users: []
            };
        case ADMIN_GET_USERS_RESOLVED:
            return {
                ...state,
                users: action.payload,
                getUsersPending: false,
                getUsersError: null
            };

        case ADMIN_CREATE_COMPANY_PENDING:
            return {
                ...state,
                companyCreated: false,
                createCompanyError: null,
                createCompanyPending: true
            };
        case ADMIN_CREATE_COMPANY_RESOLVED:
            return {
                ...state,
                companyCreated: true,
                createCompanyError: null,
                createCompanyPending: false
            };
        case ADMIN_CREATE_COMPANY_FAILED:
            return {
                ...state,
                companyCreated: false,
                createCompanyError: action.error,
                createCompanyPending: false
            };

        case ADMIN_GET_COMPANIES_PENDING:
            return {...state, companies: [], getCompaniesPending: true};
        case ADMIN_GET_COMPANIES_RESOLVED:
            return {
                ...state,
                companies: action.payload,
                getCompaniesPending: false
            };
        case ADMIN_GET_COMPANIES_FAILED:
            return {...state, companies: [], getCompaniesPending: false};

        case ADMIN_CONFIGS_ADD_INDUSTRY_PENDING:
            return {
                ...state,
                addIndustryOptionPending: true,
                addIndustryOptionFailed: false,
                addIndustryOptionResolved: false
            };
        case ADMIN_CONFIGS_ADD_INDUSTRY_RESOLVED:
            return {
                ...state,
                addIndustryOptionPending: false,
                addIndustryOptionFailed: false,
                addIndustryOptionResolved: true
            };
        case ADMIN_CONFIGS_ADD_INDUSTRY_FAILED:
            return {
                ...state,
                addIndustryOptionPending: false,
                addIndustryOptionFailed: false,
                addIndustryOptionResolved: false
            };

        case ADMIN_CONFIGS_GET_INDUSTRIES_PENDING:
            return {
                ...state,
                getIndustryOptionsPending: true,
                getIndustryOptionsFailed: false,
                industryOptions: []
            };
        case ADMIN_CONFIGS_GET_INDUSTRIES_RESOLVED:
            return {
                ...state,
                getIndustryOptionsPending: false,
                getIndustryOptionsFailed: false,
                industryOptions: action.payload,
                updateIndustryOptionResolved: false,
                removeIndustryOptionResolved: false,
            };
        case ADMIN_CONFIGS_GET_INDUSTRIES_FAILED:
            return {
                ...state,
                getIndustryOptionsPending: false,
                getIndustryOptionsFailed: true,
                industryOptions: []
            };

        case ADMIN_CONFIGS_UPDATE_INDUSTRY_PENDING:
            return {
                ...state,
                updateIndustryOptionPending: true,
                updateIndustryOptionError: false,
                updateIndustryOptionResolved: false
            };
        case ADMIN_CONFIGS_UPDATE_INDUSTRY_RESOLVED:
            return {
                ...state,
                updateIndustryOptionPending: false,
                updateIndustryOptionError: false,
                updateIndustryOptionResolved: true
            };
        case ADMIN_CONFIGS_UPDATE_INDUSTRY_FAILED:
            return {
                ...state,
                updateIndustryOptionPending: true,
                updateIndustryOptionError: true,
                updateIndustryOptionResolved: false
            };

        case ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_PENDING:
            return {
                ...state,
                addSpecificationOptionPending: true,
                addSpecificationOptionFailed: false,
                addSpecificationOptionResolved: false
            };
        case ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_FAILED:
            return {
                ...state,
                addSpecificationOptionPending: false,
                addSpecificationOptionFailed: true,
                addSpecificationOptionResolved: false
            };
        case ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_RESOLVED:
            return {
                ...state,
                addSpecificationOptionPending: false,
                addSpecificationOptionFailed: false,
                addSpecificationOptionResolved: true
            };

        case ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_RESOLVED:
            return {
                ...state,
                getSpecificationOptionsPending: false,
                getSpecificationOptionsFailed: false,
                specificationOptions: action.payload,
                removeSpecificationOptionResolved: false,
                updateSpecificationOptionResolved: false,
            };

        case ADMIN_CONFIGS_UPDATE_SPECIFICATION_OPTION_RESOLVED:
            return {
                ...state,
                updateSpecificationOptionPending: false,
                updateSpecificationOptionFailed: false,
                updateSpecificationOptionResolved: true
            };

        case ADMIN_CONFIGS_REMOVE_INDUSTRY_RESOLVED:
            return {
                ...state,
                removeIndustryOptionPending: false,
                removeIndustryOptionFailed: false,
                removeIndustryOptionResolved: true
            };
        case ADMIN_CONFIGS_REMOVE_INDUSTRY_PENDING:
            return {
                ...state,
                removeIndustryOptionPending: true,
                removeIndustryOptionFailed: false,
                removeIndustryOptionResolved: false
            };

        case ADMIN_CONFIGS_REMOVE_SPECIFICATION_OPTION_RESOLVED:
            return {
                ...state,
                removeSpecificationOptionPending: false,
                removeSpecificationOptionFailed: false,
                removeSpecificationOptionResolved: true
            };

        case ADMIN_CONFIGS_REMOVE_SPECIFICATION_OPTION_PENDING:
            return {
                ...state,
                removeSpecificationOptionPending: true,
                removeSpecificationOptionFailed: false,
                removeSpecificationOptionResolved: false,
            };

        case ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_PENDING:
            return {
                ...state,
                createContactPersonRolePending: true,
                createContactPersonRoleFailed: false,
                createContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_FAILED:
            return {
                ...state,
                createContactPersonRolePending: false,
                createContactPersonRoleFailed: true,
                createContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_RESOLVED:
            return {
                ...state,
                createContactPersonRolePending: false,
                createContactPersonRoleFailed: false,
                createContactPersonRoleResolved: true,
            };

        case ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_PENDING:
            return {
                ...state,
                getContactPersonRolesPending: true,
                getContactPersonRolesFailed: false,
                contactPersonRoles: [],
                createContactPersonRoleResolved: false,
                updateContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_FAILED:
            return {
                ...state,
                getContactPersonRolesPending: false,
                getContactPersonRolesFailed: true,
                contactPersonRoles: [],
            };

        case ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_RESOLVED:
            return {
                ...state,
                getContactPersonRolesPending: false,
                getContactPersonRolesFailed: false,
                contactPersonRoles: action.payload,
            };

        case ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_PENDING:
            return {
                ...state,
                removeContactPersonRolePending: true,
                removeContactPersonRoleFailed: false,
                removeContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_FAILED:
            return {
                ...state,
                removeContactPersonRolePending: false,
                removeContactPersonRoleFailed: true,
                removeContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_RESOLVED:
            return {
                ...state,
                removeContactPersonRolePending: false,
                removeContactPersonRoleFailed: false,
                removeContactPersonRoleResolved: true,
            };

        case ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_PENDING:
            return {
                ...state,
                updateContactPersonRolePending: true,
                updateContactPersonRoleFailed: false,
                updateContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_FAILED:
            return {
                ...state,
                updateContactPersonRolePending: false,
                updateContactPersonRoleFailed: true,
                updateContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_RESOLVED:
            return {
                ...state,
                updateContactPersonRolePending: false,
                updateContactPersonRoleFailed: false,
                updateContactPersonRoleResolved: true,
            };

        case ADMIN_CREATE_CONTACT_PERSON_PENDING:
            return {
                ...state,
                createContactPersonPending: true,
                createContactPersonFailed: false,
                createContactPersonResolved: false,
            };

        case ADMIN_CREATE_CONTACT_PERSON_FAILED:
            return {
                ...state,
                createContactPersonPending: false,
                createContactPersonFailed: true,
                createContactPersonResolved: false,
            };

        case ADMIN_CREATE_CONTACT_PERSON_RESOLVED:
            return {
                ...state,
                createContactPersonPending: false,
                createContactPersonFailed: false,
                createContactPersonResolved: true,
            };

        case ADMIN_GET_CONTACT_PERSONS_PENDING:
            return {
                ...state,
                getContactPersonsPending: true,
                getContactPersonsFailed: false,
                contactPersons: [],
                createContactPersonResolved: false,
                updateContactPersonResolved: false,
            };

        case ADMIN_GET_CONTACT_PERSONS_FAILED:
            return {
                ...state,
                getContactPersonsPending: false,
                getContactPersonsFailed: true,
                contactPersons: [],
            };

        case ADMIN_GET_CONTACT_PERSONS_RESOLVED:
            return {
                ...state,
                getContactPersonsPending: false,
                getContactPersonsFailed: false,
                contactPersons: action.payload,
            };

        case ADMIN_REMOVE_CONTACT_PERSON_PENDING:
            return {
                ...state,
                removeContactPersonPending: true,
                removeContactPersonFailed: false,
                removeContactPersonResolved: false,
            };

        case ADMIN_REMOVE_CONTACT_PERSON_FAILED:
            return {
                ...state,
                removeContactPersonPending: false,
                removeContactPersonFailed: true,
                removeContactPersonResolved: false,
            };

        case ADMIN_REMOVE_CONTACT_PERSON_RESOLVED:
            return {
                ...state,
                removeContactPersonPending: false,
                removeContactPersonFailed: false,
                removeContactPersonResolved: true,
            };

        case ADMIN_GET_CONTACT_PERSON_PENDING:
            return {
                ...state,
                getContactPersonPending: true,
                getContactPersonFailed: false,
                contactPerson: null,
            };

        case ADMIN_GET_CONTACT_PERSON_FAILED:
            return {
                ...state,
                getContactPersonPending: false,
                getContactPersonFailed: true,
                contactPerson: null,
            };

        case ADMIN_GET_CONTACT_PERSON_RESOLVED:
            return {
                ...state,
                getContactPersonPending: false,
                getContactPersonFailed: false,
                contactPerson: action.payload,
            };

        case ADMIN_UPDATE_CONTACT_PERSON_PENDING:
            return {
                ...state,
                updateContactPersonPending: true,
                updateContactPersonFailed: false,
                updateContactPersonResolved: false,
            };

        case ADMIN_UPDATE_CONTACT_PERSON_FAILED:
            return {
                ...state,
                updateContactPersonPending: false,
                updateContactPersonFailed: true,
                updateContactPersonResolved: false,
            };

        case ADMIN_UPDATE_CONTACT_PERSON_RESOLVED:
            return {
                ...state,
                updateContactPersonPending: false,
                updateContactPersonFailed: false,
                updateContactPersonResolved: true,
            };

        case AUTH_SET_PASSWORD_PENDING:
            return {
                setPasswordPending: true,
                setPasswordFailed: false,
                setPasswordResolved: false,
            };

        case AUTH_SET_PASSWORD_FAILED:
            return {
                setPasswordPending: false,
                setPasswordFailed: true,
                setPasswordResolved: false,
            };

        case AUTH_SET_PASSWORD_RESOLVED:
            return {
                setPasswordPending: false,
                setPasswordFailed: false,
                setPasswordResolved: true,
            };

        default:
            return state;
    }
};


export const usersSelector = (state) => state.admin.users;
export const usersErrorSelector = (state) => state.admin.getUsersError;
export const usersPendingSelector = (state) => state.admin.getUsersPending;

export const createCompanySuccessSelector = (state) => state.admin.companyCreated;
export const createCompanyPendingSelector = (state) => state.admin.createCompanyPending;

export const companiesSelector = (state) => state.admin.companies;
export const getCompaniesPendingSelector = state => state.admin.getCompaniesPending;

export const addIndustryOptionPendingSelector = state => state.admin.addIndustryOptionPending;
export const addIndustryOptionFailedSelector = state => state.admin.addIndustryOptionFailed;
export const addIndustryOptionResolvedSelector = state => state.admin.addIndustryOptionResolved;

export const industryOptionsSelector = state => state.admin.industryOptions;

export const updateIndustryOptionResoledSelector = state => state.admin.updateIndustryOptionResolved;

export const specificationOptionsSelector = state => state.admin.specificationOptions;

export const addSpecificationOptionResolvedSelector = state => state.admin.addSpecificationOptionResolved;

export const updateSpecificationOptionResolvedSelector = state => state.admin.updateSpecificationOptionResolved;

export const removeIndustryOptionsResolvedSelector = state => state.admin.removeIndustryOptionResolved;
export const removeSpecificationOptionsResolvedSelector = state => state.admin.removeSpecificationOptionResolved;

export const createContactPersonRolePendingSelector = state => state.admin.createContactPersonRolePending;
export const createContactPersonRoleResolvedSelector = state => state.admin.createContactPersonRoleResolved;

export const contactPersonRolesSelector = state => state.admin.contactPersonRoles;

export const contactPersonRoleRemovedSelector = state => state.admin.removeContactPersonRoleResolved;

export const updateContactPersonRolePendingSelector = state => state.admin.updateContactPersonRolePending;
export const updateContactPersonRoleResolvedSelector = state => state.admin.updateContactPersonRoleResolved;

export const contactPersonCreatedSelector = state => state.admin.createContactPersonResolved;
export const createContactPersonPendingSelector = state => state.admin.createContactPersonPending;

export const contactPersonsSelector = state => state.admin.contactPersons;
export const contactPersonSelector = state => state.admin.contactPerson;

export const removeContactPersonResolvedSelector = state => state.admin.removeContactPersonResolved;

export const updateContactPersonResolvedSelector = state => state.admin.updateContactPersonResolved;

export const setPasswordResolvedSelector = state => state.admin.setPasswordResolved;
export const setPasswordPendingSelector = state => state.admin.setPasswordPending;
