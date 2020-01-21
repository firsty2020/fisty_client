import React from 'react';
import { Dropdown } from 'react-bootstrap';


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

export default CountryCodeItem;
