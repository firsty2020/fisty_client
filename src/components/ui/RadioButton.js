import React from 'react';
import { Form } from 'react-bootstrap';
import { generateUId } from '../../helpers/utils';


const RadioButton = (props) => {
    const id = generateUId();

    return (
        <Form.Check
            className="warning-control-custom"
            type="radio"
            id={id}
            {...props}
        />
    )
};


export default RadioButton;
