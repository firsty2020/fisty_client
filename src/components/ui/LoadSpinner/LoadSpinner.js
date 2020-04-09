import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadSpinner.css'


const LoadSpinner = () => (
    <div className="text-center m-a-xl centered-spinner">
        <Spinner
            variant="warning"
            animation="border"
        />
    </div>
);


export default LoadSpinner;
