import React from 'react';
import {Form} from 'react-bootstrap';
import { string, number, oneOfType, func } from 'prop-types';


const CountriesDropdown = ({value, name, placeHolder, onSelectCountry, onBlur}) => {
    return (
        <Form.Control
            name={name}
            value={value}
            as="select"
            onBlur={onBlur}
            onChange={onSelectCountry}
        >
            <option value="armenia">Армения</option>
            <option value="belarus">Беларусь</option>
            <option value="russia">Россия</option>
            <option value="ukraine">Украина</option>
            <option disabled value={-1}>{placeHolder}</option>
        </Form.Control>
    );
};


CountriesDropdown.propTypes = {
    value: oneOfType([string, number]).isRequired,
    name: string.isRequired,
    placeHolder: string.isRequired,
    onSelectCountry: func.isRequired,
    onBlur: func.isRequired,
};

export default CountriesDropdown;
