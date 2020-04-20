import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { bool, func } from 'prop-types';
import classNames from 'classnames';
import { If, Then, Else, When } from 'react-if';
import { SuccessNotice } from '../../ui';
import { AuthFormContainer } from '../../ui/';
import { registerUser } from '../authActions';
import { userRegisteredSelector } from '../authReducer';
import { userRegistrationSchema } from '../../../helpers/schemas';
import ERROR_MESSAGES from '../../../helpers/constants/messages'
import { isLoadingSelector } from '../../common/commonReducer';


class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldShowPassword: false,
            shouldShowRepeatPassword: false,
        };
        //TODO: temp solution before sign out implemented
        localStorage.clear();
    }

    toggleShowPassword = (shouldShowPassword) =>
        this.setState({ shouldShowPassword });

    toggleShowRepeatPassword = (shouldShowRepeatPassword) =>
        this.setState({ shouldShowRepeatPassword });

    render() {

        const { shouldShowPassword, shouldShowRepeatPassword } = this.state;
        const { registrationPending, registrationSuccess } = this.props;

        return (
            <div>
                <AuthFormContainer
                    title="Регистрация"
                    subtitle="Фрилансеры"
                >
                    <When condition={registrationSuccess}>
                        <SuccessNotice
                            title="Регистрация удалась"
                            body="Потвердите адрес электронной почты"
                        />
                    </When>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            repeat_password: '',
                        }}
                        validationSchema={userRegistrationSchema}
                        onSubmit={(values) => {
                            this.props.registerUser(values);
                        }}
                        validate={({ password, repeat_password }) => {
                            if (password !== repeat_password) {
                                return { repeat_password: ERROR_MESSAGES.PASSWORDS_NOT_MATCH }
                            }
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                          }) => (
                            <Form onSubmit={handleSubmit} className="registration-form">
                                <Form.Group>
                                    <p className="form-control-label">Эл. почта</p>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="you@example.com"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={classNames('rounded-0', { 'is-invalid': touched.email && errors.email})}
                                    />
                                    {touched.email && errors.email ? (
                                        <span className="mt-1 invalid-feedback">{errors.email}</span>
                                    ) : null}
                                </Form.Group>
                                <p className="form-control-label">Пароль</p>
                                <Form.Group>
                                    <InputGroup>
                                        <Form.Control
                                            type={shouldShowPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Пароль"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={classNames('rounded-0', { 'is-invalid': touched.password && errors.password})}

                                        />
                                        <InputGroup.Append>
                                            <If condition={shouldShowPassword}>
                                                <Then>
                                                    <InputGroup.Text
                                                        onClick={() => this.toggleShowPassword(false)}
                                                        title="hide password"
                                                    ><i className="fa fa-eye-slash"/></InputGroup.Text>
                                                </Then>
                                                <Else>
                                                    <InputGroup.Text
                                                        onClick={() => this.toggleShowPassword(true)}
                                                        title="show password"
                                                    ><i className="fa fa-eye"/></InputGroup.Text>
                                                </Else>
                                            </If>
                                        </InputGroup.Append>
                                        {touched.password && errors.password ? (
                                            <span className="mt-1 invalid-feedback">{errors.password}</span>
                                        ) : null}
                                    </InputGroup>
                                </Form.Group>
                                <p className="form-control-label">Повторите Пароль</p>
                                <InputGroup>
                                    <Form.Control
                                        type={shouldShowRepeatPassword ? 'text': 'password'}
                                        name="repeat_password"
                                        placeholder="Повторите Пароль"
                                        value={values.repeat_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={classNames('rounded-0', { 'is-invalid': touched.repeat_password && errors.repeat_password})}
                                    />
                                    <InputGroup.Append>
                                        <If condition={shouldShowRepeatPassword}>
                                            <Then>
                                                <InputGroup.Text
                                                    onClick={() => this.toggleShowRepeatPassword(false)}
                                                    title="hide password"
                                                ><i className="fa fa-eye-slash"/></InputGroup.Text>
                                            </Then>
                                            <Else>
                                                <InputGroup.Text
                                                    onClick={() => this.toggleShowRepeatPassword(true)}
                                                    title="show password"
                                                ><i className="fa fa-eye"/></InputGroup.Text>
                                            </Else>
                                        </If>
                                    </InputGroup.Append>
                                    {touched.repeat_password && errors.repeat_password ? (
                                        <span className="mt-1 invalid-feedback">{errors.repeat_password}</span>
                                    ) : null}
                                </InputGroup>
                                <div className="round-button-container">
                                    <button
                                        type="submit"
                                        disabled={registrationPending}>Зарегистрироваться
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="login-link-text">
                        <Link to="/login">Есть акаунт? Войти здесь</Link>
                    </div>
                </AuthFormContainer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    registrationPending: isLoadingSelector(state),
    registrationSuccess: userRegisteredSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ registerUser }, dispatch);


Registration.propTypes = {
    registrationPending: bool,
    registrationSuccess: bool.isRequired,
    registerUser: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
