import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, Form } from 'react-bootstrap';
import {
    authPending,
    authFailed,
    authSucceed,
} from '../authReducer';
import { bindActionCreators } from 'redux';
import { setPassword as submitSetPassword } from '../auth';
import { push } from 'connected-react-router'


const SetPassword = ({ match, pending, success, push, history, submitSetPassword }) => {

    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ notMatch, setNotMatch ] = useState(false);

    useEffect(() => {
        if (success) {
            setTimeout(() => push('/login'), 2000);
        }
    }, [ success, push ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!password || !repeatPassword) {
            return;
        }
        if (password !== repeatPassword) {
            return setNotMatch(true);
        }
        submitSetPassword(password, repeatPassword, match.params.passwordToken);
    };

    return (
        <div className='registration-form-container'>
            { notMatch ?
                <Alert variant="danger">
                    Введенные поля не совпадают, пожалуйста исправьте ошибку!
                </Alert> : null
            }
            { success ?
                <Alert variant="success">
                    Вы успешно зарегистрировались!
                </Alert> : null
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    { formSubmitted && !password ? <p className="mt-1 alert-danger">введите пароль</p> : null }
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Подтвердите Пароль"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    { formSubmitted && !repeatPassword ? <p className="mt-1 alert-danger">подтвердите пароль</p> : null }
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    block
                    disabled={!password || !repeatPassword || pending}
                >
                    Подтвердить
                </Button>
            </Form>
        </div>
    );
};

const mapStateToProps = state => ({
    pending: authPending(state),
    error: authFailed(state),
    success: authSucceed(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ submitSetPassword, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);
