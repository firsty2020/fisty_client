import React from 'react';
import { Form } from 'react-bootstrap';


const CountriesDropdown = ({ value, placeHolder,  onSelectCountry, onBlur }) => {
    return (
        <Form.Control
            value={value}
            as="select"
            onBlur={onBlur}
            onChange={onSelectCountry}
        >
            <option value="armenia">Armenia</option>
            <option value="belarus">Belarus</option>
            <option value="russia">Russia</option>
            <option value="ukraine">Ukraine</option>
            <option disabled value={-1}>{placeHolder}</option>
        </Form.Control>
    );
};

export default CountriesDropdown;
