import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { authPending, authFailed, authSucceed } from '../authReducer';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { getAuthToken } from '../auth';


const Login = ({ pending, success, getAuthToken, push }) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ formSubmitted, setFormSubmitted ] = useState(false);

    useEffect(() => {
        if (success) {
            push('/dashboard');
        }
    }, [ success, push ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!email || !password) return;
        getAuthToken(email, password);
    };

    return (
        <div className='registration-form-container'>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Почт. адрес"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    { formSubmitted && !email ? <p className="mt-1 alert-danger">введите почт. адрес</p> : null }
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    { formSubmitted && !password ? <p className="mt-1 alert-danger">введите пароль</p> : null }
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    block
                    disabled={!password || !email || pending}
                >
                    Ввоити
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

const mapDispatchToProps = dispatch => bindActionCreators({ getAuthToken, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
