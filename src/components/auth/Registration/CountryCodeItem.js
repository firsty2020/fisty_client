import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { string } from 'prop-types';


const CountryCodeItem = ({ value, imgSrc }) => {
    return (
        <Dropdown.Item
            eventKey={value}
            href="#"
        >
            <img
                alt="flag"
                className="country-flag-icon"
                src={imgSrc}
            /> {value}
        </Dropdown.Item>
    );
};


CountryCodeItem.propTypes = {
    value: string.isRequired,
    imgSrc: string.isRequired,
};


export default CountryCodeItem;
