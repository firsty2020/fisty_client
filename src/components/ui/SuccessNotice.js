import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { string } from 'prop-types';


const SuccessAlert = ({ title, body }) => {
    return (
        <Alert variant="success">
            <Alert.Heading>{title}</Alert.Heading>
            <hr/>
            <p className="mb-0">{body}</p>
        </Alert>
    )
};

SuccessAlert.propTypes = {
    title: string.isRequired,
    body: string.isRequired,

};



export default SuccessAlert;
