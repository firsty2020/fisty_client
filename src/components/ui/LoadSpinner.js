import React from 'react';
import { Spinner } from 'react-bootstrap';


const LoadSpinner = () => (
    <div className="text-center m-a-xl">
        <Spinner
            variant="primary"
            animation="border"
        />
    </div>
);


export default LoadSpinner;
