import React from 'react';
import UpdateContactPerson from './ContactPersons/UpdateContactPerson';


const UpdateCompanyContactPerson = ({ match }) => (
    <div>
        <UpdateContactPerson
            match={match}
            successPath={`/admin/companies/${match.params.companyId}/contact-persons`}
        />
    </div>
);


UpdateCompanyContactPerson.propTypes = {
};


export default UpdateCompanyContactPerson;
