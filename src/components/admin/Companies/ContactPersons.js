import React from 'react';
import ContactPersonsList from './ContactPersons/ContactPersonsList';


const ContactPersons = ({ match }) => {

    const params = { company: match.params.companyId };
    
    return (
        <div>
            <ContactPersonsList
                match={match}
                params={params}
                backPath={`/admin/companies/${params.company}`}
                pathToCreate={`${match.url}/create`}
            />
        </div>
    );
};


ContactPersons.propTypes = {
};


export default ContactPersons;
