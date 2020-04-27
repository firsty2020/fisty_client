import React from 'react';
import { Form } from 'react-bootstrap';
import { generateUId } from '../../helpers/utils';


const RadioButton = (props) => (
    <Form.Check
        custom
        className="warning-control-custom"
        type="radio"
        id={generateUId()}
        {...props}
    />
);


export default RadioButton;
