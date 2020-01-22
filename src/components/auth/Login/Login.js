import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { authPending, authFailed, authSucceed } from '../authReducer';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { getAuthToken } from '../auth';
import  AlertNotice from '../../AlertNotice';


const Login = ({ pending, success, getAuthToken, push, error }) => {

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
            { error ? <AlertNotice errorMsg={error} type="danger" /> : null }
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    { formSubmitted && !email ? <p className="mt-1 alert-danger">Email is required</p> : null }
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    { formSubmitted && !password ? <p className="mt-1 alert-danger">Password is required</p> : null }
                </Form.Group>
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    block
                    disabled={!password || !email || pending}
                >
                    Login
                </Button>
            </Form>
            <div className="mt-2">
                <Link to="/register">Dont have an account? Register Here</Link>
            </div>
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
