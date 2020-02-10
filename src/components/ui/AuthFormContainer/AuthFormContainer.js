import React from 'react';
import { string } from 'prop-types';
import logo from '../../../assets/img/logo_blue_container.png';
import './AuthFormContainer.css';


const AuthFormContainer = ({ children, title, subtitle }) => {

    return (
        <div className="registration-container">
            <div className="registration-form-container">
                <div className="logo-container">
                    <img src={logo} alt="firsty logo" className="logo_blue"/>
                </div>
                <div className="title-container">
                    <span>{title}</span>
                </div>
                <div className="subtitle-container">
                    <span>{subtitle}</span>
                </div>
                {children}
            </div>
        </div>
    );
};


AuthFormContainer.propTypes = {
    title: string.isRequired,
    subtitle: string,
};

export default AuthFormContainer;
