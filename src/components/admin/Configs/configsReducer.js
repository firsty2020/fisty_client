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
    ADMIN_CONFIGS_GET_INDUSTRY_RESOLVED,
    ADMIN_CONFIGS_GET_INDUSTRY_FAILED,
    ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_PENDING,
    ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_FAILED,
    ADMIN_CONFIGS_GET_SPECIFICATION_OPTION_FAILED,
    ADMIN_CONFIGS_GET_SPECIFICATION_OPTION_RESOLVED,
    ADMIN_CONFIGS_CREATE_LOCATION_PENDING,
    ADMIN_CONFIGS_CREATE_LOCATION_FAILED,
    ADMIN_CONFIGS_CREATE_LOCATION_RESOLVED,
    ADMIN_CONFIGS_GET_LOCATIONS_PENDING,
    ADMIN_CONFIGS_GET_LOCATIONS_FAILED,
    ADMIN_CONFIGS_GET_LOCATIONS_RESOLVED,
} from '../../../constants/actionTypes';


export const configs = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CONFIGS_ADD_INDUSTRY_PENDING:
            return {
                ...state,
                addIndustryOptionPending: true,
                addIndustryOptionResolved: false
            };
        case ADMIN_CONFIGS_ADD_INDUSTRY_RESOLVED:
            return {
                ...state,
                addIndustryOptionPending: false,
                addIndustryOptionResolved: true
            };
        case ADMIN_CONFIGS_ADD_INDUSTRY_FAILED:
            return {
                ...state,
                addIndustryOptionPending: false,
                addIndustryOptionResolved: false
            };

        case ADMIN_CONFIGS_GET_INDUSTRIES_PENDING:
            return { ...state, getIndustryOptionsPending: true };
        case ADMIN_CONFIGS_GET_INDUSTRIES_RESOLVED:
            return {
                ...state,
                getIndustryOptionsPending: false,
                industryOptions: action.payload,
                updateIndustryOptionResolved: false,
                removeIndustryOptionResolved: false,
            };
        case ADMIN_CONFIGS_GET_INDUSTRIES_FAILED:
            return {
                ...state,
                getIndustryOptionsPending: false,
                industryOptions: []
            };

        case ADMIN_CONFIGS_GET_INDUSTRY_RESOLVED:
            return {
                ...state,
                getIndustryOptionPending: false,
                industryOption: action.payload,
            };
        case ADMIN_CONFIGS_GET_INDUSTRY_FAILED:
            return {
                ...state,
                getIndustryOptionPending: false,
                industryOption: null
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
                addSpecificationOptionResolved: false
            };
        case ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_FAILED:
            return {
                ...state,
                addSpecificationOptionPending: false,
                addSpecificationOptionResolved: false
            };
        case ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_RESOLVED:
            return {
                ...state,
                addSpecificationOptionPending: false,
                addSpecificationOptionResolved: true
            };

        case ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_RESOLVED:
            return {
                ...state,
                getSpecificationOptionsPending: false,
                specificationOptions: action.payload,
            };

        case ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_PENDING:
            return {
                ...state,
                getSpecificationOptionsPending: true,
                removeSpecificationOptionResolved: false,
                updateSpecificationOptionResolved: false,
            };

        case ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_FAILED:
            return {
                ...state,
                getSpecificationOptionsPending: false,
                specificationOptions: [],
            };

        case ADMIN_CONFIGS_GET_SPECIFICATION_OPTION_RESOLVED:
            return {
                ...state,
                getSpecificationOptionsPending: false,
                specificationOptions: action.payload,
            };

        case ADMIN_CONFIGS_GET_SPECIFICATION_OPTION_FAILED:
            return {
                ...state,
                getSpecificationOptionPending: false,
                specificationOption: null,
            };


        case ADMIN_CONFIGS_UPDATE_SPECIFICATION_OPTION_RESOLVED:
            return {
                ...state,
                updateSpecificationOptionPending: false,
                updateSpecificationOptionResolved: true
            };

        case ADMIN_CONFIGS_REMOVE_INDUSTRY_RESOLVED:
            return {
                ...state,
                removeIndustryOptionPending: false,
                removeIndustryOptionResolved: true
            };
        case ADMIN_CONFIGS_REMOVE_INDUSTRY_PENDING:
            return {
                ...state,
                removeIndustryOptionPending: true,
                removeIndustryOptionResolved: false
            };

        case ADMIN_CONFIGS_REMOVE_SPECIFICATION_OPTION_RESOLVED:
            return {
                ...state,
                removeSpecificationOptionPending: false,
                removeSpecificationOptionResolved: true
            };

        case ADMIN_CONFIGS_REMOVE_SPECIFICATION_OPTION_PENDING:
            return {
                ...state,
                removeSpecificationOptionPending: true,
                removeSpecificationOptionResolved: false,
            };

        case ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_PENDING:
            return {
                ...state,
                createContactPersonRolePending: true,
                createContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_FAILED:
            return {
                ...state,
                createContactPersonRolePending: false,
                createContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_RESOLVED:
            return {
                ...state,
                createContactPersonRolePending: false,
                createContactPersonRoleResolved: true,
            };

        case ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_PENDING:
            return {
                ...state,
                getContactPersonRolesPending: true,
                contactPersonRoles: [],
                createContactPersonRoleResolved: false,
                updateContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_FAILED:
            return {
                ...state,
                getContactPersonRolesPending: false,
                contactPersonRoles: [],
            };

        case ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_RESOLVED:
            return {
                ...state,
                getContactPersonRolesPending: false,
                contactPersonRoles: action.payload,
            };

        case ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_PENDING:
            return {
                ...state,
                removeContactPersonRolePending: true,
                removeContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_FAILED:
            return {
                ...state,
                removeContactPersonRolePending: false,
                removeContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_RESOLVED:
            return {
                ...state,
                removeContactPersonRolePending: false,
                removeContactPersonRoleResolved: true,
            };

        case ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_PENDING:
            return {
                ...state,
                updateContactPersonRolePending: true,
                updateContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_FAILED:
            return {
                ...state,
                updateContactPersonRolePending: false,
                updateContactPersonRoleResolved: false,
            };

        case ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_RESOLVED:
            return {
                ...state,
                updateContactPersonRolePending: false,
                updateContactPersonRoleResolved: true,
            };

        case ADMIN_CONFIGS_CREATE_LOCATION_PENDING:
            return {
                ...state,
                createLocationPending: true,
                createLocationResolved: false,
            };

        case ADMIN_CONFIGS_CREATE_LOCATION_FAILED:
            return {
                ...state,
                createLocationPending: false,
                createLocationResolved: false,
            };

        case ADMIN_CONFIGS_CREATE_LOCATION_RESOLVED:
            return {
                ...state,
                createLocationPending: false,
                createLocationResolved: true,
            };

        case ADMIN_CONFIGS_GET_LOCATIONS_PENDING:
            return {
                ...state,
            };

        case ADMIN_CONFIGS_GET_LOCATIONS_FAILED:
            return {
                ...state,
                locations: [],
            };

        case ADMIN_CONFIGS_GET_LOCATIONS_RESOLVED:
            return {
                ...state,
                locations: action.payload,
            };

        default:
            return state;
    }
};


export const addIndustryOptionPendingSelector = state => state.admin.configs.addIndustryOptionPending;
export const addIndustryOptionResolvedSelector = state => state.admin.configs.addIndustryOptionResolved;

export const industryOptionsSelector = state => state.admin.configs.industryOptions;
export const industryOptionSelector = state => state.admin.configs.industryOption;

export const updateIndustryOptionResoledSelector = state => state.admin.configs.updateIndustryOptionResolved;

export const specificationOptionsSelector = state => state.admin.configs.specificationOptions;
export const specificationOptionSelector = state => state.admin.configs.specificationOption;

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

export const createLocationPendingSelector = state => state.admin.configs.createLocationPending;
export const createLocationResolvedSelector = state => state.admin.configs.createLocationResolved;

export const locationsSelector = state => state.admin.configs.locations;
