import React from 'react';
import { Alert } from 'react-bootstrap';


const ErrorAlert = ({ errorMsg }) => {
    return (
        <div style={{ 'margin': '50px'}}>
            <Alert variant="danger">
                {errorMsg}
            </Alert>
        </div>
    );
};

export default ErrorAlert;
