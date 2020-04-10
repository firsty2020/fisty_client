import React from 'react';
import { string, func } from 'prop-types';
import Select from 'react-select';


let countriesOptions = [
    { value: 'россия', label: 'Россия'},
    { value: 'армения', label: 'Армения'},
    { value: 'беларусь', label: 'Беларусь'},
    { value: 'украина', label: 'Украина'},
];

const extendedOptions = [
    { value: 'казахстан', label: 'Казахстан'},
    { value: 'киргизия', label: 'Киргизия'},
    { value: 'узбекистан', label: 'Узбекистан'},
    { value: 'таджикистан', label: 'Таджикистан'},
    { value: 'грузия', label: 'Грузия'},
    { value: 'другое', label: 'другое'},
];

let options;
const CountriesDropdown = ({
                               extended,
                               value,
                               name,
                               placeHolder,
                               onChange,
                               onBlur
                           }) => {

    if (extended) {
        options = [ ...countriesOptions, ...extendedOptions];
    } else {
        options = countriesOptions;
    }

    return (
        <Select
            name={name}
            value={value}
            placeholder={placeHolder}
            options={options}
            onBlur={onBlur}
            onChange={onChange}
            isMulti={!!extended}
        />
    );
};


CountriesDropdown.propTypes = {
    // value: string.isRequired,
    name: string.isRequired,
    placeHolder: string.isRequired,
    onChange: func.isRequired,
    onBlur: func.isRequired,
};

export default CountriesDropdown;
