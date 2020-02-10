import React, {useEffect} from 'react';
import logo from '../../../assets/img/logo_blue_container.png';
import './AuthFormContainer.css';


const AuthFormContainer = ({ children }) => {

    useEffect(() => {
        /*document.body.classList.add('grey-bg');
        return () => document.body.classList.remove('grey-bg') ;*/
    }, [] );

    return (
        <div className="registration-container">
            <div className="registration-form-container">
                <div className="logo-container">
                    <img src={logo} alt="firsty logo" className="logo_blue"/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthFormContainer;
