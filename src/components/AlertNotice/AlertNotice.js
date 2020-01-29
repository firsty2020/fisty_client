import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';


const AlertNotice = ({ message, type }) => {
    return (
        <div style={{ 'margin': '50px'}}>
            <Alert variant={type}>
                {message}
            </Alert>
        </div>
    );
};

AlertNotice.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['danger', 'success']).isRequired, // this component relies on bootsrap, so be sure proper type is passed
};

export default AlertNotice;
