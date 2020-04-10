import React from 'react';
import { Form } from 'react-bootstrap';
import { generateUId } from '../../helpers/utils';


const CheckBox = (props) => (
    <Form.Check
        id={generateUId()}
        label=''
        className="warning-control-custom"
        type="checkbox"
        {...props}
    />
);


export default CheckBox;
