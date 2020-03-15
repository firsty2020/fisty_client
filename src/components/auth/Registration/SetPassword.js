import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import {AuthFormContainer, SuccessNotice} from '../../ui';
import { REGEX } from '../../../validation';
import classNames from 'classnames';
import * as Yup from 'yup';
import ERROR_MESSAGES from '../../../constants/messages';
import { setPassword } from '../auth';
import {
    setPasswordPendingSelector,
    setPasswordResolvedSelector
} from '../../auth/authReducer';
import { When } from 'react-if';
import { push } from 'connected-react-router';


const validationSchema = Yup.object().shape({
    password: Yup.string()
        .matches(REGEX.LATIN_ALPHABET_NUMBERS_SYMBOLS, ERROR_MESSAGES.PASSWORD_INVALID_ALPHABET)
        .min(8, ERROR_MESSAGES.PASSWORD_INVALID_LENGTH)
        .required(ERROR_MESSAGES.PASSWORD_REQUIRED),
    repeat_password: Yup.string()
        .matches(REGEX.LATIN_ALPHABET_NUMBERS_SYMBOLS, ERROR_MESSAGES.PASSWORD_INVALID_ALPHABET)
        .min(8, ERROR_MESSAGES.PASSWORD_INVALID_LENGTH)
        .required(ERROR_MESSAGES.REPEAT_PASSWORD_REQUIRED),
});

const SetPassword = ({ match, setPasswordResolved, pending, setPassword, push }) => {

    useEffect(() => {
        if (setPasswordResolved) {
            setTimeout(() => push('/login'), 3000);
        }
    }, [ setPasswordResolved, push ]);

    return (
        <div>
            <AuthFormContainer title="Создать Пароль">
                <When condition={!!setPasswordResolved}>
                    <SuccessNotice
                        title="Регистрация удалась"
                        body="Можете войти в свой аккаунт"
                    />
                </When>
                <Formik
                    initialValues={{
                        password: '',
                        repeat_password: '',
                    }}
                    validationSchema={validationSchema}
                    validate={({ password, repeat_password }) => {
                        return password !== repeat_password ?
                            { repeat_password: ERROR_MESSAGES.PASSWORDS_NOT_MATCH }
                            : null;
                    }}
                    onSubmit={(values) => {
                        setPassword(values, match.params.passwordToken);
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
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Пароль"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={classNames('rounded-0', { 'is-invalid': touched.repeat_password && errors.repeat_password})}
                                />
                                {touched.password && errors.password ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.password}</span>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="password"
                                    name="repeat_password"
                                    placeholder="Повторите Пароль"
                                    value={values.repeat_password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={classNames('rounded-0', { 'is-invalid': touched.repeat_password && errors.repeat_password})}
                                />
                                {touched.repeat_password && errors.repeat_password ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.repeat_password}</span>
                                ) : null}
                            </Form.Group>
                            <div className="round-button-container">
                                <button
                                    disabled={pending}
                                    type="submit"
                                    >Создать
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </AuthFormContainer>
        </div>
    );
};

const mapStateToProps = state => ({
    setPasswordResolved: setPasswordResolvedSelector(state),
    pending: setPasswordPendingSelector(state),
});


const mapDispatchToProps = { setPassword, push };


SetPassword.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);
