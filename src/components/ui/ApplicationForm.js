import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { applicationSchema } from '../../helpers/schemas';
import { Formik } from 'formik';
import Select from 'react-select';
import CountriesDropdown from '../auth/Registration/CountriesDropdown';
import {
    clearEmptyFields,
    transformReactSelectFields
} from '../../helpers/utils';
import { Link } from 'react-router-dom';
import RadioButton from './RadioButton';
import { CheckBox } from './index';


const scheduleOptions = [
    { value: '2/2', label: '2/2' },
    { value: '5/2', label: '5/2' },
    { value: '7/2', label: '7/2' },
];

const languageOptions = [
    { value: 'английский', label: 'Английский' },
    { value: 'китайский', label: 'Китайский' },
    { value: 'французский', label: 'Французский' },
    { value: 'немецкий', label: 'Немецкий' },
];

const driverLicenceOptions = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
    { value: 'd', label: 'D' },
];

const updateCheckboxValue = (setFieldValue, value, fieldName, values) => {
    const set = new Set(values);
    if (set.has(value)) {
        set.delete(value)
    } else {
        set.add(value);
    }
    setFieldValue(fieldName, Array.from(set));
};


const ApplicationForm = ({ pending, backUrl, onSubmitApplication }) => {
    return (
        <div>
            <Container>
                <h3 className="text-center mt-4">Заявкa</h3>
                <div className="mt-5">
                    <Formik
                        initialValues={{
                            position: '',
                            employees_count: '',
                            job_description: '',
                            bonus_enabled: '',
                            salary: '',
                            formalization_type: '',
                            responsibilities: '',
                            citizenship: '',
                            gender: '',
                            age: {
                                from: '',
                                to: '',
                            },
                            education: '',
                            russian_level: '',
                            other_languages: '',
                            _has_driver_license: '',
                            driver_license: '',
                            mobile_availability: '',
                            appearance_requirements: '',
                            comments: '',
                            city: '',
                            address: '',
                            responsibilities_comments: '',
                            schedule: '',

                        }}
                        validationSchema={applicationSchema}
                        onSubmit={(values) => {
                            const clearedData = clearEmptyFields(JSON.parse(JSON.stringify(values)));
                            const transformedData = transformReactSelectFields(
                                ['citizenship', 'schedule', 'other_languages', 'driver_license'],
                                clearedData
                            );
                            transformedData.age = [ transformedData.age.from, transformedData.age.to ];
                            delete transformedData._has_driver_license;
                            onSubmitApplication(transformedData);
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
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <p>Наименование должности *</p>
                                    <Form.Control
                                        type="text"
                                        name="position"
                                        placeholder="Введите наименование должности"
                                        value={values.position}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.position && errors.position ? (
                                        <span className="mt-1 invalid-feedback-visible">{errors.position}</span>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Необходимое количество сотрудников *</p>
                                    <Form.Control
                                        type="number"
                                        name="employees_count"
                                        placeholder="Введите количество сотрудников"
                                        value={values.employees_count}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.employees_count && errors.employees_count ? (
                                        <span className="mt-1 invalid-feedback-visible">{errors.employees_count}</span>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Условия работы *</p>
                                    <Form.Control
                                        as="textarea"
                                        name="job_description"
                                        placeholder="Опишите условия работы"
                                        value={values.job_description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.job_description && errors.job_description ? (
                                        <span className="mt-1 invalid-feedback-visible">{errors.job_description}</span>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Бонусы *</p>
                                    <RadioButton
                                        inline
                                        custom
                                        name="bonus_enabled"
                                        value={values.bonus_enabled}
                                        label="Есть"
                                        onChange={() => setFieldValue('bonus_enabled', true)}
                                        onBlur={(e) => setFieldTouched('bonus_enabled', e)}
                                    />
                                    <RadioButton
                                        inline
                                        custom
                                        value={values.bonus_enabled}
                                        name="bonus_enabled"
                                        label="Нет"
                                        onChange={() => setFieldValue('bonus_enabled', false)}
                                        onBlur={(e) => setFieldTouched('bonus_enabled', e)}
                                    />
                                    <br/>
                                    {touched.bonus_enabled && errors.bonus_enabled ? (
                                        <span className="mt-1 invalid-feedback-visible">{errors.bonus_enabled}</span>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Примерный совокупный заработок в месяц *</p>
                                    <Form.Control
                                        type="number"
                                        name="salary"
                                        placeholder="Примерный совокупный заработок в месяц в рублях"
                                        value={values.salary}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.salary && errors.salary ? (
                                        <span className="mt-1 invalid-feedback-visible">{errors.salary}</span>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Вид оформления *</p>
                                    <div className="d-flex justify-content-between">
                                        <RadioButton
                                            inline
                                            custom
                                            name="formalization_type"
                                            value={values.formalization_type}
                                            label="Трудовой договор"
                                            onChange={() => setFieldValue('formalization_type', 'трудовой договор')}
                                            onBlur={(e) => setFieldTouched('formalization_type', e)}
                                        />
                                        <RadioButton
                                            inline
                                            custom
                                            name="formalization_type"
                                            value={values.formalization_type}
                                            label="Самозанятый"
                                            onChange={() => setFieldValue('formalization_type', 'самозанятый')}
                                            onBlur={(e) => setFieldTouched('formalization_type', e)}
                                        />
                                        <RadioButton
                                            inline
                                            custom
                                            name="formalization_type"
                                            value={values.formalization_type}
                                            label="Договор гражданско-правового характера"
                                            onChange={() => setFieldValue('formalization_type', 'договор гражданско-правового характера')}
                                            onBlur={(e) => setFieldTouched('formalization_type', e)}
                                        />
                                        <RadioButton
                                            inline
                                            custom
                                            name="formalization_type"
                                            value={values.formalization_type}
                                            label="Агентский договор"
                                            onChange={() => setFieldValue('formalization_type', 'агентский договор')}
                                            onBlur={(e) => setFieldTouched('formalization_type', e)}
                                        />
                                        <RadioButton
                                            inline
                                            custom
                                            name="formalization_type"
                                            value={values.formalization_type}
                                            label="Другое"
                                            onChange={() => setFieldValue('formalization_type', 'другое')}
                                            onBlur={(e) => setFieldTouched('formalization_type', e)}
                                        />
                                    </div>
                                    {touched.formalization_type && errors.formalization_type ? (
                                        <span className="mt-1 invalid-feedback-visible">{errors.formalization_type}</span>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Функционал *</p>
                                    <Form.Control
                                        as="textarea"
                                        name="responsibilities"
                                        placeholder="Напишите несколькими предложениями что будет делать сотрудник"
                                        value={values.responsibilities}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.responsibilities && errors.responsibilities ? (
                                        <span className="mt-1 invalid-feedback-visible">{errors.responsibilities}</span>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>График работы *</p>
                                    <Select
                                        name="schedule"
                                        placeholder="Выберите из списка"
                                        value={values.schedule}
                                        options={scheduleOptions}
                                        onBlur={(e) => setFieldTouched('schedule', e)}
                                        onChange={(e) => setFieldValue('schedule', e)}
                                    />
                                    {touched.schedule && errors.schedule ? (
                                        <span className="mt-1 invalid-feedback-visible">{errors.schedule}</span>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Другое</p>
                                    <Form.Control
                                        as="textarea"
                                        name="responsibilities_comments"
                                        placeholder="Комментарии"
                                        value={values.responsibilities_comments}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Form.Group>
                                <h4 className="text-center mt-4">Требования к Должности</h4>
                                <Form.Group>
                                    <p className="form-control-label">Гражданство *</p>
                                    <CountriesDropdown
                                        extended
                                        value={values.citizenship}
                                        name="citizenship"
                                        placeHolder="Выберите из списка"
                                        onBlur={(e) => setFieldTouched('citizenship', e || [])}
                                        onChange={(e) => setFieldValue('citizenship', e || [])}
                                        className={touched.citizenship && errors.citizenship ? 'is-invalid' : ''}
                                    />
                                    {touched.citizenship && errors.citizenship ? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.citizenship}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Пол *</p>
                                    <CheckBox
                                        inline
                                        custom
                                        name="gender"
                                        value={values.gender}
                                        label="Мужской"
                                        onChange={() => updateCheckboxValue(setFieldValue, 'мужской', 'gender', values.gender)}
                                        onBlur={(e) => setFieldTouched('gender', e)}
                                    />
                                    <CheckBox
                                        inline
                                        custom
                                        name="gender"
                                        value={values.gender}
                                        label="Женский"
                                        onChange={() => updateCheckboxValue(setFieldValue, 'женский', 'gender', values.gender)}
                                        onBlur={(e) => setFieldTouched('gender', e)}
                                    />
                                    <br/>
                                    {touched.gender && errors.gender ? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.gender}</p>
                                    ) : null}
                                </Form.Group>
                                <p>Возраст *</p>
                                <Form.Row className="d-flex">
                                    <Form.Group className="flex-fill">
                                        <Form.Control
                                            type="text"
                                            name="age.from"
                                            placeholder="от"
                                            value={values.age.from}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.age && touched.age.from && errors.age && errors.age.from? (
                                            <p className="mt-1 invalid-feedback-visible">{errors.age.from}</p>
                                        ) : null}
                                    </Form.Group>
                                    -
                                    <Form.Group className="flex-fill">
                                        <Form.Control
                                            type="text"
                                            name="age.to"
                                            placeholder="до"
                                            value={values.age.to}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.age && touched.age.to && errors.age && errors.age.to? (
                                            <p className="mt-1 invalid-feedback-visible">{errors.age.to}</p>
                                        ) : null}
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group>
                                    <p>Образование *</p>
                                    <CheckBox
                                        className="warning-control-custom"
                                        inline
                                        custom
                                        name="education"
                                        value={values.education}
                                        label="Среднее"
                                        onChange={() => updateCheckboxValue(setFieldValue, 'среднее', 'education', values.education)}
                                        onBlur={(e) => setFieldTouched('education', e)}
                                    />
                                    <CheckBox
                                        inline
                                        custom
                                        name="education"
                                        value={values.education}
                                        label="Среднее специальное"
                                        onChange={() => updateCheckboxValue(setFieldValue, 'среднее специальное', 'education', values.education)}
                                        onBlur={(e) => setFieldTouched('education', e)}
                                    />
                                    <CheckBox
                                        inline
                                        custom
                                        name="education"
                                        value={values.education}
                                        label="Высшее неоконченное"
                                        onChange={() => updateCheckboxValue(setFieldValue, 'высшее неоконченное', 'education', values.education)}
                                        onBlur={(e) => setFieldTouched('education', e)}
                                    />
                                    <CheckBox
                                        inline
                                        custom
                                        name="education"
                                        value={values.education}
                                        label="Высшее"
                                        onChange={() => updateCheckboxValue(setFieldValue, 'Высшее', 'education', values.education)}
                                        onBlur={(e) => setFieldTouched('education', e)}
                                    />
                                    {touched.education && errors.education? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.education}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Уровень владения русским языком *</p>
                                    <RadioButton
                                        inline
                                        custom
                                        name="russian_level"
                                        value={values.russian_level}
                                        label="Родной"
                                        onChange={() => setFieldValue('russian_level', 'родной')}
                                        onBlur={(e) => setFieldTouched('russian_level', e)}
                                    />
                                    <RadioButton
                                        inline
                                        custom
                                        name="russian_level"
                                        value={values.russian_level}
                                        label="С акцентом"
                                        onChange={() => setFieldValue('russian_level', 'с акцентом')}
                                        onBlur={(e) => setFieldTouched('russian_level', e)}
                                    />
                                    <br/>
                                    {touched.russian_level && errors.russian_level ? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.russian_level}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    Другие языки
                                    <Select
                                        className="mt-3"
                                        name="other_languages"
                                        value={values.other_languages}
                                        onBlur={(e) => setFieldTouched('other_languages', e || [])}
                                        onChange={(e) => setFieldValue('other_languages', e || [])}
                                        options={languageOptions}
                                        placeholder="Выберите языки"
                                        isMulti>
                                    </Select>
                                    {touched.languages && errors.languages ? (
                                        <span className="mt-1 invalid-feedback-visible">{errors.languages}</span>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Наличие водительских прав</p>
                                    <RadioButton
                                        inline
                                        custom
                                        name="_has_driver_license"
                                        value={values._has_driver_license}
                                        label="Да"
                                        onChange={() => setFieldValue('_has_driver_license', true)}
                                        onBlur={(e) => setFieldTouched('_has_driver_license', e)}
                                    />
                                    <RadioButton
                                        inline
                                        custom
                                        name="_has_driver_license"
                                        value={values._has_driver_license}
                                        label="Нет"
                                        onChange={(e) => {
                                            setFieldValue('driver_license', []);
                                            setFieldValue('_has_driver_license', false)
                                        }}
                                        onBlur={(e) => setFieldTouched('_has_driver_license', e)}
                                    />
                                    <br/>
                                    {values._has_driver_license ? (
                                        <Select
                                            className="mt-3"
                                            name="driver_license"
                                            value={values.driver_license}
                                            onBlur={(e) => setFieldTouched('driver_license', e || [])}
                                            onChange={(e) => setFieldValue('driver_license', e || [])}
                                            options={driverLicenceOptions}
                                            placeholder="Выберите категории"
                                            isMulti>
                                        </Select>
                                    ) : null }
                                    {touched.driver_license && errors.driver_license ? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.driver_license}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Требования к мобильному телефону</p>
                                    <Form.Control
                                        type="text"
                                        name="mobile_availability"
                                        placeholder="Требования к мобильному телефону (если есть)"
                                        value={values.mobile_availability}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <p>Требования к внешности</p>
                                    <Form.Control
                                        type="text"
                                        name="appearance_requirements"
                                        placeholder="Требования к внешности (если есть)"
                                        value={values.appearance_requirements}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <p>Комментарий</p>
                                    <Form.Control
                                        as="textarea"
                                        name="comments"
                                        placeholder="Напишите дополнительные пожелания"
                                        value={values.comments}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Form.Group>
                                <hr/>
                                <Form.Group>
                                    <p>Город поиска *</p>
                                    <Form.Control
                                        name="city"
                                        placeholder="Введите город поиска"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.city && errors.city ? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.city}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Адрес хабов / магазинов / точек, куда приглашать кандитатов *</p>
                                    <Form.Control
                                        name="address"
                                        placeholder="Введите адрес"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.address && errors.address ? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.address}</p>
                                    ) : null}
                                </Form.Group>
                                <div className="text-center">
                                    {backUrl ?
                                        <Link to={backUrl}>
                                            <Button
                                                className="mr-2"
                                                variant="secondary">Отменить
                                            </Button>
                                        </Link>
                                        : null}
                                    <Button
                                        disabled={pending}
                                        type="submit"
                                        variant="warning">Подать Заявку
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </div>
    );
};


export default ApplicationForm;
