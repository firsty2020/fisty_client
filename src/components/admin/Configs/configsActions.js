import {
    ADMIN_CONFIGS_ADD_INDUSTRY_FAILED,
    ADMIN_CONFIGS_ADD_INDUSTRY_PENDING,
    ADMIN_CONFIGS_ADD_INDUSTRY_RESOLVED,
    ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_FAILED,
    ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_PENDING,
    ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_RESOLVED,
    ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_FAILED,
    ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_PENDING,
    ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_RESOLVED,
    ADMIN_CONFIGS_CREATE_LOCATION_PENDING,
    ADMIN_CONFIGS_CREATE_LOCATION_RESOLVED,
    ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_FAILED,
    ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_PENDING,
    ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_RESOLVED,
    ADMIN_CONFIGS_GET_INDUSTRIES_FAILED,
    ADMIN_CONFIGS_GET_INDUSTRIES_PENDING,
    ADMIN_CONFIGS_GET_INDUSTRIES_RESOLVED,
    ADMIN_CONFIGS_GET_INDUSTRY_FAILED,
    ADMIN_CONFIGS_GET_INDUSTRY_RESOLVED,
    ADMIN_CONFIGS_GET_LOCATIONS_FAILED,
    ADMIN_CONFIGS_GET_LOCATIONS_PENDING, ADMIN_CONFIGS_GET_LOCATIONS_RESOLVED,
    ADMIN_CONFIGS_GET_SPECIFICATION_OPTION_FAILED,
    ADMIN_CONFIGS_GET_SPECIFICATION_OPTION_RESOLVED,
    ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_FAILED,
    ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_PENDING,
    ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_RESOLVED,
    ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_PENDING,
    ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_RESOLVED,
    ADMIN_CONFIGS_REMOVE_INDUSTRY_FAILED,
    ADMIN_CONFIGS_REMOVE_INDUSTRY_PENDING,
    ADMIN_CONFIGS_REMOVE_INDUSTRY_RESOLVED,
    ADMIN_CONFIGS_REMOVE_SPECIFICATION_OPTION_RESOLVED,
    ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_FAILED,
    ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_PENDING,
    ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_RESOLVED,
    ADMIN_CONFIGS_UPDATE_INDUSTRY_FAILED,
    ADMIN_CONFIGS_UPDATE_INDUSTRY_PENDING,
    ADMIN_CONFIGS_UPDATE_INDUSTRY_RESOLVED,
    ADMIN_CONFIGS_UPDATE_SPECIFICATION_OPTION_FAILED,
    ADMIN_CONFIGS_UPDATE_SPECIFICATION_OPTION_PENDING,
    ADMIN_CONFIGS_UPDATE_SPECIFICATION_OPTION_RESOLVED
} from '../../../constants/actionTypes';

/*** Actions for creating options for industry field ***/

export const addIndustryOptionPending = () => ({
    type: ADMIN_CONFIGS_ADD_INDUSTRY_PENDING,
});

export const addIndustryOptionFailed = (err) => ({
    type: ADMIN_CONFIGS_ADD_INDUSTRY_FAILED,
    error: err,
});

export const addIndustryOptionResolved = () => ({
    type: ADMIN_CONFIGS_ADD_INDUSTRY_RESOLVED,
});

/******************************************/


/*** Actions for fetching options for industry field ***/

export const getIndustryOptionsPending = () => ({
    type: ADMIN_CONFIGS_GET_INDUSTRIES_PENDING,
});

export const getIndustryOptionsFailed = (error) => ({
    type: ADMIN_CONFIGS_GET_INDUSTRIES_FAILED,
    error,
});

/**
 * @param industries { string }
 * @returns payload: [ industries ], type: string
 */
export const getIndustryOptionsResolved = (industries) => ({
    type: ADMIN_CONFIGS_GET_INDUSTRIES_RESOLVED,
    payload: industries
});

/******************************************/

/*** Actions for fetching a single option for industry field ***/

export const getIndustryOptionFailed = () => ({
    type: ADMIN_CONFIGS_GET_INDUSTRY_FAILED,
});

export const getIndustryOptionResolved = (industry) => ({
    type: ADMIN_CONFIGS_GET_INDUSTRY_RESOLVED,
    payload: industry
});


/******************************************/


/*** Actions for updating options for industry field ***/

export const updateIndustryOptionPending = () => ({
    type: ADMIN_CONFIGS_UPDATE_INDUSTRY_PENDING,
});

export const updateIndustryOptionFailed = (error) => ({
    type: ADMIN_CONFIGS_UPDATE_INDUSTRY_FAILED,
    error,
});

export const updateIndustryOptionResolved = () => ({
    type: ADMIN_CONFIGS_UPDATE_INDUSTRY_RESOLVED,
});

/******************************************/


/*** Actions for removing options for industry field ***/

export const removeIndustryOptionPending = () => ({
    type: ADMIN_CONFIGS_REMOVE_INDUSTRY_PENDING,
});

export const removeIndustryOptionFailed = (error) => ({
    type: ADMIN_CONFIGS_REMOVE_INDUSTRY_FAILED,
    error,
});

export const removeIndustryOptionResolved = () => ({
    type: ADMIN_CONFIGS_REMOVE_INDUSTRY_RESOLVED,
});

/******************************************/


/*** Actions for creating options for specification field ***/

export const addSpecificationOptionPending = () => ({
    type: ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_PENDING,
});

export const addSpecificationOptionFailed = (err) => ({
    type: ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_FAILED,
    error: err,
});

export const addSpecificationOptionResolved = () => ({
    type: ADMIN_CONFIGS_ADD_SPECIFICATION_OPTION_RESOLVED,
});

/******************************************/


/*** Actions for fetching options for specification field ***/

export const getSpecificationOptionsPending = () => ({
    type: ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_PENDING,
});

export const getSpecificationOptionsFailed = (err) => ({
    type: ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_FAILED,
    error: err,
});

export const getSpecificationOptionsResolved = (specifications) => ({
    type: ADMIN_CONFIGS_GET_SPECIFICATION_OPTIONS_RESOLVED,
    payload: specifications,
});

/******************************************/


/*** Actions for fetching a single option for specification field ***/

export const getSpecificationOptionFailed = () => ({
    type: ADMIN_CONFIGS_GET_SPECIFICATION_OPTION_FAILED,
});

export const getSpecificationOptionResolved = (specification) => ({
    type: ADMIN_CONFIGS_GET_SPECIFICATION_OPTION_RESOLVED,
    payload: specification,
});

/******************************************/



/*** Actions for updating options for industry field ***/

export const updateSpecificationOptionPending = () => ({
    type: ADMIN_CONFIGS_UPDATE_SPECIFICATION_OPTION_PENDING,
});

export const updateSpecificationOptionFailed = (error) => ({
    type: ADMIN_CONFIGS_UPDATE_SPECIFICATION_OPTION_FAILED,
    error,
});

export const updateSpecificationOptionResolved = () => ({
    type: ADMIN_CONFIGS_UPDATE_SPECIFICATION_OPTION_RESOLVED,
});

/******************************************/


/*** Actions for updating options for industry field ***/

export const removeSpecificationOptionResolved = () => ({
    type: ADMIN_CONFIGS_REMOVE_SPECIFICATION_OPTION_RESOLVED,
});

/******************************************/


/*** Actions for creating roles for contact persons ***/

export const createContactPersonRolePending = () => ({
    type: ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_PENDING,
});

export const createContactPersonRoleResolved = () => ({
    type: ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_RESOLVED,
});

export const createContactPersonRoleFailed = () => ({
    type: ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_FAILED,
});


/******************************************/


/*** Actions for creating roles for contact persons ***/

export const getContactPersonRolesPending = () => ({
    type: ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_PENDING,
});

export const getContactPersonRolesResolved = (roles) => ({
    type: ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_RESOLVED,
    payload: roles,
});

export const getContactPersonRolesFailed = () => ({
    type: ADMIN_CONFIGS_GET_CONTACT_PERSON_ROLES_FAILED,
});


/******************************************/


/*** Actions for creating roles for contact persons ***/

export const removeContactPersonRolePending = () => ({
    type: ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_PENDING,
});

export const removeContactPersonRoleResolved = () => ({
    type: ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_RESOLVED,
});

export const removeContactPersonRoleFailed = () => ({
    type: ADMIN_CONFIGS_REMOVE_CONTACT_PERSON_ROLE_PENDING,
});

/******************************************/



/*** Actions for updating roles for contact persons ***/

export const updateContactPersonRolePending = () => ({
    type: ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_PENDING,
});

export const updateContactPersonRoleResolved = () => ({
    type: ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_RESOLVED,
});

export const updateContactPersonRoleFailed = () => ({
    type: ADMIN_CONFIGS_UPDATE_CONTACT_PERSON_ROLE_FAILED,
});


/******************************************/


/*** Actions for creating location  ***/

export const createLocationPending = () => ({
    type: ADMIN_CONFIGS_CREATE_LOCATION_PENDING,
});

export const createLocationFailed = (err) => ({
    type: ADMIN_CONFIGS_CREATE_CONTACT_PERSON_ROLE_FAILED,
    error: err,
});

export const createLocationResolved = () => ({
    type: ADMIN_CONFIGS_CREATE_LOCATION_RESOLVED,
});

/******************************************/


/*** Actions for fetching locations  ***/

export const getLocationsPending = () => ({
    type: ADMIN_CONFIGS_GET_LOCATIONS_PENDING,
});

export const getLocationsFailed = () => ({
    type: ADMIN_CONFIGS_GET_LOCATIONS_FAILED,
});

export const getLocationsResolved = (locations) => ({
    type: ADMIN_CONFIGS_GET_LOCATIONS_RESOLVED,
    payload: locations
});

/******************************************/
