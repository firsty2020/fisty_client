import React from 'react';
import { string, func } from 'prop-types';
import { DropDown } from '../../ui';
import { countriesOptions, extendedOptions } from '../../../helpers/utils';

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
        options = [ ...countriesOptions, ...extendedOptions ];
    } else {
        options = countriesOptions;
    }

    return (
        <DropDown
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
