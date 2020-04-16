import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import logo from '../../../assets/images/logotype-Firsty-fixed.png';
import './AuthFormContainer.css';


const AuthFormContainer = ({ children, title, subtitle, size }) => {

    return (
        <div className="registration-container">
            <div className={classNames('registration-form-container', {'max-width-600': size === 'lg'} )}>
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
    size: string,
};


export default AuthFormContainer;
