import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Col, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { authPendingSelector, authSuccessSelector } from '../authReducer';
import { completeRegistration } from '../auth';
import { push } from 'connected-react-router'
import { completeRegistrationSchema } from '../../../validation';
import { Formik } from 'formik';
import { bool, func, shape, string } from 'prop-types';
import { When } from 'react-if';
import CountryCodeItem from './CountryCodeItem';
import CountriesDropdown from './CountriesDropdown';
import armenianFlag from '../../../assets/icons/armenia.png'
import belorussianFlag from '../../../assets/icons/belorussia.png'
import russianFlag from '../../../assets/icons/russia.png'
import ukrainianFlag from '../../../assets/icons/ukraine.png'
import { SuccessNotice, AuthFormContainer } from '../../ui';
import { generateDays, generateMonths, generateYears } from '../../../utils';

import Select from 'react-select';


const months = generateMonths();
const years = generateYears();
const days = generateDays();

const languageOptions = [
    { value: 'Английский', label: 'Английский' },
    { value: 'Русский', label: 'Русский' },
];

const CompleteRegistration = ({
                                  match,
                                  pending,
                                  success,
                                  push,
                                  completeRegistration,
                              }) => {

    const [ countryCode, setCountryCode ] = useState('');

    useEffect(() => {
        if (success) {
            setTimeout(() =>  push('/login'), 3000);
        }
    }, [success, push]);

    const transformUserData = (values) => {
        const userDetails = { ...values };
        userDetails.phone_number = countryCode + userDetails.phone_number;
        userDetails.date_of_birth =
            `${values.date_of_birth.year}-${values.date_of_birth.month}-${values.date_of_birth.day}`;
        userDetails.languages = values.languages.map((item) => item.value);
        return userDetails;
    };

    //TODO: temp solution before sign out implemented
    localStorage.clear();

    return (
        <div>
            <AuthFormContainer title="Завершите Регистрацию" size="lg">
                <When condition={success}>
                    <SuccessNotice
                        title="Регистрация прошла успешно"
                        body="Ввойдите в свой аккаунт"
                    />
                </When>
                <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        phone_number: '',
                        city: '',
                        country: -1,
                        citizenship: -1,
                        date_of_birth: {
                            year: -1,
                            month: -1,
                            day: -1,
                        },
                        middle_name: '',
                        education: -1,
                        gender: -1,
                        accept: false,
                        languages: [],
                    }}
                    validationSchema={completeRegistrationSchema}
                    onSubmit={(values) => {
                        const userDetails = transformUserData(values);
                        completeRegistration(userDetails, match.params.passwordToken);
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          setFieldTouched,
                          setFieldValue,
                      }) => (
                        <Form onSubmit={handleSubmit} className="mx-auto">
                            <Form.Group>
                                <Form.Row>
                                    <Col>
                                        <p className="form-control-label">Фамилия</p>
                                        <Form.Control
                                            type="text"
                                            name="last_name"
                                            placeholder="Фамилия"
                                            value={values.last_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={touched.last_name && errors.last_name ? 'is-invalid' : ''}
                                        />
                                        {touched.last_name && errors.last_name ? (
                                            <p className="mt-1 invalid-feedback">{errors.last_name}</p>
                                        ) : null}
                                    </Col>
                                    <Col>
                                        <p className="form-control-label">Имя</p>
                                        <Form.Control
                                            type="text"
                                            placeholder="Имя"
                                            name="first_name"
                                            value={values.first_name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={touched.first_name && errors.first_name ? 'is-invalid' : ''}
                                        />
                                        {touched.first_name && errors.first_name ? (
                                            <p className="mt-1 invalid-feedback">{errors.first_name}</p>
                                        ) : null}
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Отчество</p>
                                <Form.Control
                                    type="text"
                                    placeholder="Отчество"
                                    name="middle_name"
                                    value={values.middle_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={touched.middle_name && errors.middle_name ? 'is-invalid' : ''}
                                />
                                {touched.middle_name && errors.middle_name ? (
                                    <p className="mt-1 invalid-feedback">{errors.middle_name}</p>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                Пол
                                <Form.Control
                                    name="gender"
                                    value={values.gender}
                                    as="select"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    <option value='male'>Мужской</option>
                                    <option  value='female'>Женский</option>
                                    <option disabled value={-1}>Пол</option>
                                </Form.Control>
                                {touched.gender && errors.gender ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.gender}</span>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Дата рождения</p>
                                <Form.Row>
                                    <Col>
                                        <Form.Control
                                            name="date_of_birth.year"
                                            value={values.date_of_birth.year}
                                            as="select"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        >
                                            {years.map((year) =>
                                                <option
                                                    key={year}
                                                    value={year}>{year}</option>
                                            )}
                                            <option disabled value={-1}>Год</option>
                                        </Form.Control>
                                        {(touched.date_of_birth && touched.date_of_birth.year) && (errors.date_of_birth && errors.date_of_birth.year) ? (
                                            <span className="mt-1 invalid-feedback-visible">{errors.date_of_birth.year}</span>
                                        ) : null}
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            name="date_of_birth.month"
                                            value={values.date_of_birth.month}
                                            as="select"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        >
                                            {months.map((month) =>
                                                <option
                                                    key={month.title}
                                                    value={month.value}
                                                >{month.title}</option>
                                            )}
                                            <option disabled value={-1}>Месяц</option>
                                        </Form.Control>
                                        {(touched.date_of_birth && touched.date_of_birth.month) && (errors.date_of_birth && errors.date_of_birth.month) ? (
                                            <span className="mt-1 invalid-feedback-visible">{errors.date_of_birth.month}</span>
                                        ) : null}
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            name="date_of_birth.day"
                                            value={values.date_of_birth.day}
                                            as="select"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        >
                                            {days.map((day) =>
                                                <option
                                                    value={day}
                                                    key={day}
                                                >{day}</option>
                                            )}
                                            <option disabled value={-1}>День</option>
                                        </Form.Control>
                                        {(touched.date_of_birth && touched.date_of_birth.day) && (errors.date_of_birth && errors.date_of_birth.day) ? (
                                            <span className="mt-1 invalid-feedback-visible">{errors.date_of_birth.day}</span>
                                        ) : null}
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Гражданство</p>
                                <CountriesDropdown
                                    value={values.citizenship}
                                    name="citizenship"
                                    placeHolder="Гражданство"
                                    onBlur={handleBlur}
                                    onSelectCountry={handleChange}
                                    className={touched.citizenship && errors.citizenship ? 'is-invalid' : ''}
                                />
                                {touched.citizenship && errors.citizenship ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.citizenship}</p>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <p className="form-control-label">Номер Телефона</p>
                                <InputGroup>
                                    <Dropdown
                                        onSelect={setCountryCode}>
                                        <Dropdown.Toggle
                                            variant="success"
                                            id="dropdown-basic"
                                        >{countryCode ? countryCode : 'Код Страны'}</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <CountryCodeItem
                                                value="+374"
                                                imgSrc={armenianFlag}
                                            />
                                            <CountryCodeItem
                                                value="+375"
                                                imgSrc={belorussianFlag}
                                            />
                                            <CountryCodeItem
                                                value="+7"
                                                imgSrc={russianFlag}
                                            />
                                            <CountryCodeItem
                                                value="+380"
                                                imgSrc={ukrainianFlag}
                                            />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Form.Control
                                        type="tel"
                                        value={values.phone_number}
                                        name="phone_number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Номер Телефона"
                                        className={touched.phone_number && errors.phone_number ? 'is-invalid' : ''}
                                    />
                                    {touched.phone_number && errors.phone_number ? (
                                        <p className="mt-1 invalid-feedback">{errors.phone_number}</p>
                                    ) : null}
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                Образование
                                <Form.Control
                                    name="education"
                                    value={values.education}
                                    as="select"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    <option value='male'>Начальное</option>
                                    <option  value='female'>Среднее</option>
                                    <option  value='other'>Высшее</option>
                                    <option disabled value={-1}>Выберите образование</option>
                                </Form.Control>
                                {touched.education && errors.education ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.education}</span>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                Знание языков
                                <Select
                                    name="languages"
                                    value={values.languages}
                                    onBlur={(e) => setFieldTouched('languages', e)}
                                    onChange={(e) => setFieldValue('languages', e)}
                                    options={languageOptions}
                                    placeholder="Выберите языки"
                                    isMulti>
                                </Select>
                                {touched.languages && errors.languages ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.languages}</span>
                                ) : null}
                            </Form.Group>
                            <h6 className="text-center">Постоянное место жительства</h6>
                            <Form.Group>
                                <Form.Row>
                                    <Col>
                                        <p className="form-control-label">Страна</p>
                                        <CountriesDropdown
                                            value={values.country}
                                            name="country"
                                            placeHolder="Страна"
                                            onBlur={handleBlur}
                                            onSelectCountry={handleChange}
                                            className={touched.country && errors.country ? 'is-invalid' : ''}
                                        />

                                        {touched.country && errors.country ? (
                                            <p className="mt-1 invalid-feedback-visible">{errors.country}</p>
                                        ) : null}
                                    </Col>
                                    <Col>
                                        <p className="form-control-label">Город</p>
                                        <Form.Control
                                            type="text"
                                            placeholder="Город"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="city"
                                            value={values.city}
                                            className={touched.city && errors.city ? 'is-invalid' : ''}
                                        />
                                        {touched.city && errors.city ? (
                                            <p className="mt-1 invalid-feedback">{errors.city}</p>
                                        ) : null}
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="accept"
                                            value={values.accept}
                                            label="Я принимаю условия Пользовательского Соглашения" />
                                {touched.accept && errors.accept ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.accept}</p>
                                ) : null}
                            </Form.Group>
                            <div className="round-button-container">
                                <button
                                    type="submit"
                                    disabled={pending}>Зарегистрироваться
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
    pending: authPendingSelector(state),
    success: authSuccessSelector(state),
});

const mapDispatchToProps = { completeRegistration, push };


CompleteRegistration.propTypes = {
    pending: bool.isRequired,
    success: bool.isRequired,
    match: shape({
        params: shape(
            { passwordToken: string.isRequired })
    }).isRequired,
    push: func.isRequired,
    completeRegistration: func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(CompleteRegistration);
