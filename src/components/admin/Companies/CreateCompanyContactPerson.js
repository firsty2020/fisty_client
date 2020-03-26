import React from 'react';
import CreateContactPerson from './ContactPersons/CreateContactPerson';
import {baseURL} from '../../../axios';


const CreateCompanyContactPerson = ({ match }) => {

    const companyId = match.params.companyId;

    const entity = {
        name: 'company',
        url: `${baseURL}companies/${companyId}/`
    };

    return (
        <div>
            <CreateContactPerson
                match={match}
                entity={entity}
                successPath={`/admin/companies/${companyId}/contact-persons`}
            />
        </div>
    );
};

CreateCompanyContactPerson.propTypes = {
};


export default CreateCompanyContactPerson;
