import React from 'react';
import { Alert } from 'react-bootstrap';


const AlertNotice = ({ errorMsg, type }) => {
    return (
        <div style={{ 'margin': '50px'}}>
            <Alert variant={type}>
                {errorMsg}
            </Alert>
        </div>
    );
};

export default AlertNotice;
