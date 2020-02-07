import React from 'react';
import logo from '../../../assets/img/logo@2x.png';
import './AuthFormContainer.css';


const AuthFormContainer = ({ children }) => {
    return (
        <div className="gradient-container">
            <div className="registration-form-container">
                <div className="logo-container">
                    <img src={logo} alt="firsty logo"/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthFormContainer;
