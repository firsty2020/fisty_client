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
    ADMIN_CONFIGS_REMOVE_LOCATION_FAILED,
    ADMIN_CONFIGS_REMOVE_LOCATION_RESOLVED,
    ADMIN_CONFIGS_UPDATE_LOCATION_FAILED,
    ADMIN_CONFIGS_UPDATE_LOCATION_RESOLVED,
    ADMIN_CONFIGS_CREATE_DYNAMIC_FIELD,
    ADMIN_CONFIGS_GET_DYNAMIC_FIELDS,
    ADMIN_CONFIGS_SET_DYNAMIC_FIELD_CREATED,
    ADMIN_CONFIGS_REMOVE_DYNAMIC_FIELD,
    ADMIN_CONFIGS_SET_DYNAMIC_FIELD_REMOVED,
    ADMIN_CONFIGS_UPDATE_DYNAMIC_FIELD,
    ADMIN_CONFIGS_SET_DYNAMIC_FIELD_UPDATED,
    ADMIN_CONFIGS_GET_LOCATIONS,
    ADMIN_CONFIGS_CATEGORY_CREATE,
    ADMIN_CONFIGS_CATEGORIES_GET,
    ADMIN_CONFIGS_CATEGORY_DELETE,
    ADMIN_CONFIGS_CATEGORY_UPDATE,
    ADMIN_CONFIGS_CATEGORY_RESET_STATE,
    ADMIN_CONFIGS_SUBCATEGORY_CREATE,
    ADMIN_CONFIGS_SUBCATEGORY_RESET_STATE,
    ADMIN_CONFIGS_SUBCATEGORIES_GET,
    ADMIN_CONFIGS_SUBCATEGORY_DELETE,
    ADMIN_CONFIGS_SUBCATEGORY_UPDATE,
} from '../../../helpers/constants/actionTypes';


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
            return {...state, getIndustryOptionsPending: true};
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
                specificationOption: [],
            };

        case ADMIN_CONFIGS_GET_SPECIFICATION_OPTION_RESOLVED:
            return {
                ...state,
                getSpecificationOptionsPending: false,
                specificationOption: action.payload,
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

        case ADMIN_CONFIGS_GET_LOCATIONS:
            return {
                ...state,
                locations: action.payload.results,
                createLocationResolved: false,
                removeLocationResolved: false,
                updateLocationResolved: false,
            };

        case ADMIN_CONFIGS_REMOVE_LOCATION_FAILED:
            return {
                ...state,
                removeLocationPending: false,
                removeLocationResolved: false,
            };

        case ADMIN_CONFIGS_REMOVE_LOCATION_RESOLVED:
            return {
                ...state,
                removeLocationPending: false,
                removeLocationResolved: true,
            };

        case ADMIN_CONFIGS_UPDATE_LOCATION_FAILED:
            return {
                ...state,
                updateLocationPending: false,
                updateLocationResolved: false
            };

        case ADMIN_CONFIGS_UPDATE_LOCATION_RESOLVED:
            return {
                ...state,
                updateLocationPending: false,
                updateLocationResolved: true
            };

        case ADMIN_CONFIGS_CREATE_DYNAMIC_FIELD:
            return {
                ...state,
                dynamicFieldCreated: true,
            };

        case ADMIN_CONFIGS_GET_DYNAMIC_FIELDS:
            return {
                ...state,
                dynamicFields: action.payload.results
            };

        case ADMIN_CONFIGS_SET_DYNAMIC_FIELD_CREATED:

            return {
                ...state,
                dynamicFieldCreated: false
            };

        case ADMIN_CONFIGS_SET_DYNAMIC_FIELD_REMOVED:
            return {
                ...state,
                dynamicFieldRemoved: false
            };

        case ADMIN_CONFIGS_SET_DYNAMIC_FIELD_UPDATED:
            return {
                ...state,
                dynamicFieldUpdated: action.payload
            };

        case ADMIN_CONFIGS_REMOVE_DYNAMIC_FIELD:
            return {
                ...state,
                dynamicFieldRemoved: true,
            };
        case ADMIN_CONFIGS_UPDATE_DYNAMIC_FIELD:
            return {
                ...state,
                dynamicFieldUpdated: true,
            };

        case ADMIN_CONFIGS_CATEGORY_CREATE:
            return { ...state,  categoryCreated: true };

        case ADMIN_CONFIGS_CATEGORIES_GET:
            return { ...state,  categories: action.payload.results };

        case ADMIN_CONFIGS_CATEGORY_DELETE:
            return { ...state, categoryDeleted: true };

        case ADMIN_CONFIGS_CATEGORY_UPDATE:
            return { ...state, categoryUpdated: true };

        case ADMIN_CONFIGS_CATEGORY_RESET_STATE:
            return {
                ...state,
                categoryCreated: false,
                categoryDeleted: false,
                categoryUpdated: false
            };

        case ADMIN_CONFIGS_SUBCATEGORY_CREATE:
            return { ...state,  subcategoryCreated: true };

        case ADMIN_CONFIGS_SUBCATEGORIES_GET:
            return { ...state,  subcategories: action.payload.results };

        case ADMIN_CONFIGS_SUBCATEGORY_DELETE:
            return {
                ...state,
                subcategoryDeleted: true,
            };

        case ADMIN_CONFIGS_SUBCATEGORY_UPDATE:
            return {
                ...state,
                subcategoryUpdated: true,
            };
        case ADMIN_CONFIGS_SUBCATEGORY_RESET_STATE:
            return {
                ...state,
                subcategoryCreated: false,
                subcategoryDeleted: false,
                subcategoryUpdated: false,
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
export const removeLocationResolvedSelector = state => state.admin.configs.removeLocationResolved;
export const updateLocationResolvedSelector = state => state.admin.configs.updateLocationResolved;

export const dynamicFieldCreatedSelector = state => state.admin.configs.dynamicFieldCreated;
export const dynamicFieldRemovedSelector = state => state.admin.configs.dynamicFieldRemoved;
export const dynamicFieldUpdatedSelector = state => state.admin.configs.dynamicFieldUpdated;
export const dynamicFieldsSelector = state => state.admin.configs.dynamicFields;

export const categoryCreatedSelector = state => state.admin.configs.categoryCreated;
export const categoriesSelector = state => state.admin.configs.categories;
export const categoryDeletedSelector = state => state.admin.configs.categoryDeleted;
export const categoryUpdatedSelector = state => state.admin.configs.categoryUpdated;

export const subcategoryCreatedSelector = state => state.admin.configs.subcategoryCreated;
export const subcategoryDeletedSelector = state => state.admin.configs.subcategoryDeleted;
export const subcategoryUpdatedSelector = state => state.admin.configs.subcategoryUpdated;
export const subcategoriesSelector = state => state.admin.configs.subcategories;
