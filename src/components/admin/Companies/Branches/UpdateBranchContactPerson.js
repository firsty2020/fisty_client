import React from 'react';
import UpdateContactPerson from '../ContactPersons/UpdateContactPerson';


const UpdateBranchContactPerson = ({ match }) => {

    const { companyId, branchId } = match.params;

    return (
        <div>
            <UpdateContactPerson
                match={match}
                successPath={`/admin/companies/${companyId}/branches/${branchId}/contact-persons`}
            />
        </div>
    );
};


UpdateBranchContactPerson.propTypes = {
};


export default UpdateBranchContactPerson;
