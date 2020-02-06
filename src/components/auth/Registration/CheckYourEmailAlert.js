import React from 'react';
import Alert from 'react-bootstrap/Alert';


const CheckYourEmailAlert = () => {
    return (
        <Alert variant="success">
            <Alert.Heading>Check your email.</Alert.Heading>
            <hr/>
            <p className="mb-0">
                You should have received an email with further details.
            </p>
        </Alert>
    )
};


export default CheckYourEmailAlert;
