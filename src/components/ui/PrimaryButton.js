import React from 'react';
import {Button, Form} from 'react-bootstrap';


const PrimaryButton = (props) => (
    <Button
        variant="warning"
        {...props}
    >{props.text}</Button>
);


export default PrimaryButton;
