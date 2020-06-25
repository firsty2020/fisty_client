import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { DropDown } from '../../ui';
import {
    capitalizeFirstLetter,
    clearEmptyFields,
    copyObject,
    countriesOptions,
    educationOptions,
    genderOptions,
    languageOptions,
    transformReactSelectFields,
} from '../../../helpers/utils';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import {
    generateDays,
    generateMonths,
    generateYears,
    transFormDatesArray,
} from '../../../helpers/dates';
import { connect } from 'react-redux';
import { isLoadingSelector } from '../../common/commonReducer';
import { recruiterSchema } from '../../../helpers/schemas';
import * as Yup from 'yup';

const schema = recruiterSchema.concat(Yup.object().shape({
    sub_role: Yup.string()
        .required('Выберите тип')
}));


const subRoleOptions = [
    { value: 'internal', label: 'Внутренний (Internal)'},
    { value: 'external', label: 'Внешний (External)'},
    { value: 'free_lance', label: 'Фрилансер (Freelancer)'},
    { value: 'agency', label: 'Агентство (Agency)'},
]

const initialValues = {
    first_name: '',
    last_name: '',
    middle_name: '',
    citizenship: '',
    country: '',
    city: '',
    email: '',
    phone_number: '',
    gender: '',
    education: '',
    languages: '',
    date_of_birth: {
        year: '',
        month: '',
        day: '',
    },
    sub_role: '',
};



let formValues;


const fillForm = (initialValues, user) => {
    const values = {};
    for (let key in initialValues) {
        if (initialValues.hasOwnProperty(key) && user[key]) {
            values[key] = user[key];
        } else {
            values[key] = '';
        }
    }
    values.citizenship = { value: user.citizenship || '', label: capitalizeFirstLetter(values.citizenship) || '' };
    values.country = { value: user.country || '', label: capitalizeFirstLetter(values.country) || '' };
    values.education = { value: user.education || '', label: capitalizeFirstLetter(values.education) || '' };
    values.languages = (user.languages || []).map((language) => ({ value: language || '', label: language || ''}));
    const [ year, month, day ] = (user.date_of_birth || '').split('-')
    values.date_of_birth = {
        year: { value: year || '', label: year || ''},
        month: { value: month || '', label: month || '' },
        day: { value: day || '', label: day || '' }
    };
    values.gender = { value: user.gender || '', label: capitalizeFirstLetter(user.gender) || ''};
    values.sub_role = subRoleOptions.find(({ value }) => value === user.sub_role);
    return values;
};

const monthsOptions = generateMonths();
const yearsOptions = transFormDatesArray(generateYears());
const daysOptions = transFormDatesArray(generateDays());

const RecruiterForm = ({ pending, recruiter, onSubmit }) => {

    if (recruiter) {
        formValues = fillForm(initialValues, recruiter);
    } else {
        formValues = initialValues;
    }

    return (
        <Formik
            validationSchema={schema}
            enableReinitialize
            initialValues={formValues}
            onSubmit={(values) => {
                let data = copyObject(values);
                data = transformReactSelectFields([
                    'citizenship', 'country', 'gender', 'education',
                    'languages', 'sub_role'
                ], data);
                if (values.date_of_birth.year.value) {
                    data.date_of_birth =
                        `${values.date_of_birth.year.value}-${values.date_of_birth.month.value}-${values.date_of_birth.day.value}`;
                } else {
                    delete data.date_of_birth;
                }
                data = clearEmptyFields(data);
                onSubmit(data);
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  setFieldTouched,
                  setFieldValue,
              }) => (
                <Form onSubmit={handleSubmit}>
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
                                />
                                {touched.last_name && errors.last_name ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.last_name}</p>
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
                                />
                                {touched.first_name && errors.first_name ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.first_name}</p>
                                ) : null}
                            </Col>
                            <Col>
                                <p className="form-control-label">Отчество</p>
                                <Form.Control
                                    type="text"
                                    placeholder="Отчество"
                                    name="middle_name"
                                    value={values.middle_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.middle_name && errors.middle_name ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.middle_name}</p>
                                ) : null}
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <p className="form-control-label">Эл. почта</p>
                                <Form.Control
                                    readOnly={!!recruiter}
                                    type="text"
                                    name="email"
                                    placeholder="you@example.com"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                {touched.email && errors.email ? (
                                    <span
                                        className="mt-1 invalid-feedback-visible">{errors.email}</span>
                                ) : null}
                            </Col>
                            <Col>
                                <p className="form-control-label">Тип</p>
                                <DropDown
                                    name="sub_role"
                                    options={subRoleOptions}
                                    placeholder="Выберите тип"
                                    value={values.sub_role}
                                    onBlur={(e) => setFieldTouched('sub_role', e)}
                                    onChange={(e) => setFieldValue('sub_role', e)}
                                />
                                {touched.sub_role && errors.sub_role ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.sub_role}</span>
                                ) : null}
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <p>Телефон</p>
                        <Form.Control
                            type="tel"
                            value={values.phone_number}
                            name="phone_number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Номер Телефона"
                        />
                        {touched.phone_number && errors.phone_number ? (
                            <p className="mt-1 invalid-feedback-visible">{errors.phone_number}</p>
                        ) : null}
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Col>
                                <p className="form-control-label">Граждандство</p>
                                <DropDown
                                    name="citizenship"
                                    options={countriesOptions}
                                    placeholder="Выберите граждандство"
                                    value={values.citizenship}
                                    onBlur={(e) => setFieldTouched('citizenship', e)}
                                    onChange={(e) => setFieldValue('citizenship', e || '')}
                                />
                                {touched.citizenship && errors.citizenship ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.citizenship}</span>
                                ) : null}
                            </Col>
                            <Col>
                                <p className="form-control-label">Страна</p>
                                <Form.Group>
                                    <DropDown
                                        name="country"
                                        options={countriesOptions}
                                        placeholder="Выберите страну"
                                        value={values.country}
                                        onBlur={(e) => setFieldTouched('country', e)}
                                        onChange={(e) => setFieldValue('country', e || '')}
                                    />
                                    {touched.country && errors.country ? (
                                        <span className="mt-1 invalid-feedback-visible">{errors.country}</span>
                                    ) : null}
                                </Form.Group>
                            </Col>
                            <Col>
                                <p className="form-control-label">Город</p>
                                <Form.Control
                                    type="text"
                                    placeholder="Город"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.city && errors.city ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.city}</span>
                                ) : null}
                            </Col>
                        </Form.Row>
                        <Form.Group>
                            <p className="form-control-label">Образование</p>
                            <DropDown
                                name="education"
                                options={educationOptions}
                                placeholder="Выберите из списка"
                                value={values.education}
                                onBlur={(e) => setFieldTouched('education', e)}
                                onChange={(e) => setFieldValue('education', e || '')}
                            />
                            {touched.education && errors.education ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.education}</span>
                            ) : null}
                        </Form.Group>
                    </Form.Group>
                    <Form.Group>
                        Знание языков
                        <DropDown
                            name="languages"
                            value={values.languages}
                            onBlur={(e) => setFieldTouched('languages', e || [])}
                            onChange={(e) => setFieldValue('languages', e || [])}
                            options={languageOptions}
                            placeholder="Выберите языки"
                            isMulti>
                        </DropDown>
                        {touched.languages && errors.languages ? (
                            <span className="mt-1 invalid-feedback-visible">{errors.languages}</span>
                        ) : null}
                    </Form.Group>
                    <Form.Group>
                        <p className="form-control-label">Дата рождения</p>
                        <Form.Row>
                            <Col>
                                <DropDown
                                    name="date_of_birth.year"
                                    value={values.date_of_birth.year}
                                    placeholder="Год"
                                    options={yearsOptions}
                                    onBlur={(e) => setFieldTouched('date_of_birth.year', e)}
                                    onChange={(e) => setFieldValue('date_of_birth.year', e || '')}
                                />
                                {(touched.date_of_birth && touched.date_of_birth.year) && (errors.date_of_birth && errors.date_of_birth.year) ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.date_of_birth.year}</span>
                                ) : null}
                            </Col>
                            <Col>
                                <DropDown
                                    name="date_of_birth.month"
                                    value={values.date_of_birth.month}
                                    placeholder="Месяц"
                                    options={monthsOptions}
                                    onBlur={(e) => setFieldTouched('date_of_birth.month', e)}
                                    onChange={(e) => setFieldValue('date_of_birth.month', e || '')}

                                />
                                {(touched.date_of_birth && touched.date_of_birth.month) && (errors.date_of_birth && errors.date_of_birth.month) ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.date_of_birth.month}</span>
                                ) : null}
                            </Col>
                            <Col>
                                <DropDown
                                    name="date_of_birth.day"
                                    placeholder="День"
                                    value={values.date_of_birth.day}
                                    options={daysOptions}
                                    onBlur={(e) => setFieldTouched('date_of_birth.day', e)}
                                    onChange={(e) => setFieldValue('date_of_birth.day', e || '')}
                                />
                                {(touched.date_of_birth && touched.date_of_birth.day) && (errors.date_of_birth && errors.date_of_birth.day) ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.date_of_birth.day}</span>
                                ) : null}
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        Пол
                        <DropDown
                            name="gender"
                            value={values.gender}
                            options={genderOptions}
                            placeholder="Выберите пол"
                            onBlur={(e) => setFieldTouched('gender', e)}
                            onChange={(e) => setFieldValue('gender', e || '')}
                        />
                        {touched.gender && errors.gender ? (
                            <span className="mt-1 invalid-feedback-visible">{errors.gender}</span>
                        ) : null}
                    </Form.Group>
                    <div className="text-center">
                        <Link to={'/admin/users'}>
                            <Button
                                className="mr-2"
                                variant="secondary">Отменить
                            </Button>
                        </Link>
                        <Button
                            variant="warning"
                            disabled={pending}
                            type="submit">Сохранить
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

const mapStateToProps = (state) => ({
   pending: isLoadingSelector(state),
});

export default connect(mapStateToProps, null)(RecruiterForm);
