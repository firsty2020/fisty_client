import React from 'react';
import { Alert } from 'react-bootstrap';
import { oneOf, string } from 'prop-types';


const AlertNotice = ({ message, type }) => {
    return (
        <div className="text-center position-fixed right-fixed-alert">
            <Alert variant={type} className="green-shadow">
                {message}
            </Alert>
        </div>
    );
};


AlertNotice.propTypes = {
    message: string,
    type: oneOf(['danger', 'success']).isRequired, // this component relies on bootsrap, so be sure proper type is passed
};


export default AlertNotice;
