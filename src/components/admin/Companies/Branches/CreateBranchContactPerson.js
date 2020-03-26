import React from 'react';
import CreateContactPerson from '../ContactPersons/CreateContactPerson';
import {baseURL} from '../../../../axios';


const CreateBranchContactPerson = ({ match }) => {

    const branchId = match.params.branchId;

    const entity = {
        name: 'branch',
        url: `${baseURL}companies/branch/${branchId}/`
    };

    return (
        <div>
            <CreateContactPerson
                match={match}
                entity={entity}
                successPath={`/admin/companies/${match.params.companyId}/branches/${branchId}/contact-persons`}
            />
        </div>
    );
};

CreateBranchContactPerson.propTypes = {
};


export default CreateBranchContactPerson;
