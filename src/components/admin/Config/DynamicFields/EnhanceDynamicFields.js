import React from 'react';
import {
    getDynamicFields,
    removeDynamicField,
    createDynamicField,
    updateDynamicField
} from './DynamicFieldsActions';
import {baseURL} from '../../../../axios';


const EnhanceDynamicFields = (WrappedComponent) => (props) => {

    let getDynamicFieldsAction;
    let removeDynamicFieldAction;
    let createDynamicFieldAction;
    let updateDynamicFieldAction;

    const { projectId } = props.match.params;
    
    if (projectId) {
        getDynamicFieldsAction = (params) => getDynamicFields
            .bind(null, { ...params, project: projectId }, 'projects/custom-fields/');
        removeDynamicFieldAction = (id) => removeDynamicField.bind(null, id, 'projects/custom-fields');
        createDynamicFieldAction = (data) => {
            data.project = `${baseURL}projects/${projectId}/`;
            return createDynamicField.bind(null, data, 'projects/custom-fields/');
        };
        updateDynamicFieldAction = (data) => updateDynamicField.bind(null, data, 'projects/custom-fields');
    } else {
        getDynamicFieldsAction = (params) => getDynamicFields.bind(null, params);
        removeDynamicFieldAction = (id) => removeDynamicField.bind(null, id);
        createDynamicFieldAction = (data) => createDynamicField.bind(null, data);
        updateDynamicFieldAction = (data) => updateDynamicField.bind(null, data);
    }

    return (
        <WrappedComponent
            getDynamicFields={getDynamicFieldsAction}
            removeDynamicField={removeDynamicFieldAction}
            createDynamicField={createDynamicFieldAction}
            updateDynamicField={updateDynamicFieldAction}
            {...props}
        />
    );
};


export default EnhanceDynamicFields;
