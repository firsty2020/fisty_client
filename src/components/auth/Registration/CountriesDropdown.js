import React from 'react';
import { string, number, oneOfType, func } from 'prop-types';
import Select from 'react-select';


const countriesOptions = [
    { value: 'россия', label: 'Россия'},
    { value: 'армения', label: 'Армения'},
    { value: 'беларусь', label: 'Беларусь'},
    { value: 'украина', label: 'Украина'},
];


const CountriesDropdown = ({value, name, placeHolder, onChange, onBlur}) => (
    <Select
        name={name}
        value={value}
        placeholder={placeHolder}
        options={countriesOptions}
        onBlur={onBlur}
        onChange={onChange}
    />
);


CountriesDropdown.propTypes = {
    // value: string.isRequired,
    name: string.isRequired,
    placeHolder: string.isRequired,
    onChange: func.isRequired,
    onBlur: func.isRequired,
};

export default CountriesDropdown;
