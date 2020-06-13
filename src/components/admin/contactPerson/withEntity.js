import React from 'react';
import { baseURL } from '../../../axios';
import { string } from 'prop-types';


const withEntity = (WrappedComponent, entityName) => (props) => {

    const { branchId, companyId } = props.match.params;

    const entities = {
        branch: {
            url: `${baseURL}companies/branch/${branchId}/`,
            successPath: `/admin/companies/${companyId}/branches/${branchId}/contact-persons`
        },
        company: {
            url: `${baseURL}companies/${companyId}/`,
            successPath: `/admin/companies/${companyId}/contact-persons`
        },
        base: {
            successPath: `/admin/users`
        }
    };

    return (
        <WrappedComponent
            entity={{ name: entityName, url: entities[entityName].url }}
            successPath={entities[entityName].successPath}
            {...props}
        />
    );
};

withEntity.proptypes = {
    entityName: string.isRequired,
};

export default withEntity;
