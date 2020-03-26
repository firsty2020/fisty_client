import React from 'react';
import ContactPersonsList from '../ContactPersons/ContactPersonsList';


const ContactPersons = ({ match }) => {

    const params = { branch: match.params.branchId };

    return (
        <div>
            <ContactPersonsList
                match={match}
                params={params}
                backPath={`/admin/companies/${match.params.companyId}/branches/${match.params.branchId}`}
                pathToCreate={`${match.url}/create`}
            />
        </div>
    );
};


ContactPersons.propTypes = {
};


export default ContactPersons;
