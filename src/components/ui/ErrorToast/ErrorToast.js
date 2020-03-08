import ReactDOM from 'react-dom';
import { Toast } from 'react-bootstrap';
import { AlertCircle } from 'react-feather';
import React from 'react';
import './ErrorToast.css';


export const ErrorToast = ({ container, message }) => (
    <div>
        { ReactDOM.createPortal(
            <Toast animation={true}>
                <Toast.Header closeButton={false}>
                    <AlertCircle color="red" className="mr-3"/>
                    <div className="toast-header-title">
                        <strong>Произошла ошибка</strong>
                    </div>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>, container) }
    </div>
);


export default ErrorToast;
