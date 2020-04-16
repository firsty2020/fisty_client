import React from 'react';
import Select from 'react-select';


const DropDown = (props) => (
    <Select
        styles={{
            option: (provided, { isSelected, isFocused}) => ({
                ...provided,
                backgroundColor:
                    isSelected ? '#F47421' :
                    isFocused  ? '#FFE7D3'
                        : '#FFF',
            }),
        }}
        {...props}
    />
);


export default DropDown;
