import React from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';


const CompanyDetails = ({ layout, data, showSpinner, match }) => {
    return (
        <div>
            <Link to={`${match.url}/contact-persons`}>
                <Button
                    onClick={() => null}
                    variant="primary">Контактные лица
                </Button>
            </Link>

        </div>
    );

};



export default CompanyDetails;
