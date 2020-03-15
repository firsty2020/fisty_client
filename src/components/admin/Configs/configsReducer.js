import {
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
} from '../../../constants/actionTypes';


export const configs = (state = {}, action) => {
    switch (action.type) {
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

        default:
            return state;
    }
};


export const addIndustryOptionPendingSelector = state => state.admin.configs.addIndustryOptionPending;
export const addIndustryOptionFailedSelector = state => state.admin.configs.addIndustryOptionFailed;
export const addIndustryOptionResolvedSelector = state => state.admin.configs.addIndustryOptionResolved;

export const industryOptionsSelector = state => state.admin.configs.industryOptions;

export const updateIndustryOptionResoledSelector = state => state.admin.configs.updateIndustryOptionResolved;

export const specificationOptionsSelector = state => state.admin.configs.specificationOptions;

export const addSpecificationOptionResolvedSelector = state => state.admin.configs.addSpecificationOptionResolved;

export const updateSpecificationOptionResolvedSelector = state => state.admin.configs.updateSpecificationOptionResolved;

export const removeIndustryOptionsResolvedSelector = state => state.admin.configs.removeIndustryOptionResolved;
export const removeSpecificationOptionsResolvedSelector = state => state.admin.configs.removeSpecificationOptionResolved;

export const createContactPersonRolePendingSelector = state => state.admin.configs.createContactPersonRolePending;
export const createContactPersonRoleResolvedSelector = state => state.admin.configs.createContactPersonRoleResolved;

export const contactPersonRolesSelector = state => state.admin.configs.contactPersonRoles;

export const contactPersonRoleRemovedSelector = state => state.admin.configs.removeContactPersonRoleResolved;

export const updateContactPersonRolePendingSelector = state => state.admin.configs.updateContactPersonRolePending;
export const updateContactPersonRoleResolvedSelector = state => state.admin.configs.updateContactPersonRoleResolved;
