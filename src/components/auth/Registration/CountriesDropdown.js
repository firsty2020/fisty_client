import React from 'react';
import { Form } from 'react-bootstrap';


const CountriesDropdown = ({ value, placeHolder,  onSelectCountry }) => {
    return (
        <Form.Control
            value={value}
            as="select"
            onChange={onSelectCountry}
        >
            <option value="armenia">Армениа</option>
            <option value="belarus">Белорусь</option>
            <option value="russia">Россия</option>
            <option value="ukraine">Украина</option>
            <option disabled value={-1}>{placeHolder}</option>
        </Form.Control>
    );
};

export default CountriesDropdown;
