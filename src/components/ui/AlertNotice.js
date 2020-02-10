import React from 'react';
import { Alert } from 'react-bootstrap';
import {bool, oneOf, oneOfType, string} from 'prop-types';


const AlertNotice = ({ message, type }) => {
    return (
        <div className="text-center">
            <Alert variant={type}>
                {message}
            </Alert>
        </div>
    );
};

AlertNotice.propTypes = {
    message: oneOfType([ string.isRequired, bool.isRequired ]),
    type: oneOf(['danger', 'success']).isRequired, // this component relies on bootsrap, so be sure proper type is passed
};

export default AlertNotice;
