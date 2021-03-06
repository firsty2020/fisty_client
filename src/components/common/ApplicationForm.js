import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { applicationSchema } from '../../helpers/schemas';
import { Formik } from 'formik';
import {
    clearEmptyFields, countriesOptions, extendedOptions,
    transformReactSelectFields
} from '../../helpers/utils';
import { Link } from 'react-router-dom';
import { CheckBox, DropDown, RadioButton } from '../ui';

const russianOptions = [
    { value: 'Базовый', label: 'Базовый'},
    { value: 'Средний', label: 'Средний'},
    { value: 'Продвинутый', label: 'Продвинутый'},
    { value: 'Носитель языка', label: 'Носитель языка'},
];

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

const citizenshipOptions = [ ...countriesOptions, ...extendedOptions, { value: 'Не Важно', label: 'Не Важно'} ];

const updateCheckboxValue = (setFieldValue, value, fieldName, values) => {
    const set = new Set(values);
    if (set.has(value)) {
        set.delete(value)
    } else {
        set.add(value);
    }
    setFieldValue(fieldName, Array.from(set));
};

let formValues = null;
const initialValues = {
    position: '',
    employees_count: '',
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
};

const ApplicationForm = ({
                             pending,
                             backUrl,
                             application,
                             onSubmitApplication,
                         }) => {

    const populateForm = () => {
        const values = {};
        for (let key in application) {
            values[key] = application[key];
        }
        values.age = {
            from: application.age[0],
            to: application.age[1],
        };
        values.citizenship = application.citizenship
            .map(c => citizenshipOptions.find(option => option.value.toLowerCase() === c.toLowerCase()));
        values.schedule = scheduleOptions.find(({ value }) => value === application.schedule);
        values.russian_level = russianOptions.find(({ value }) => value === application.russian_level);
        values.other_languages = (application.other_languages || [])
            .map(c => languageOptions.find(option => option.value.toLowerCase() === c.toLowerCase()));
        values._has_driver_license = !!application.driver_license;
        values.driver_license = (application.driver_license || [])
            .map(c => driverLicenceOptions.find(option => option.value.toLowerCase() === c.toLowerCase()));
        return values;
    };

    if (application) {
        formValues = populateForm();
    } else {
        formValues = initialValues;
    }

    if (!formValues) {
        return null;
    }

    return (
        <div>
            <Container>
                <h3 className="text-center mt-4">Заявкa</h3>
                <div className="mt-5">
                    <Formik
                        enableReinitialize
                        initialValues={formValues}
                        validationSchema={applicationSchema}
                        onSubmit={(values) => {
                            const clearedData = clearEmptyFields(JSON.parse(JSON.stringify(values)));
                            const transformedData = transformReactSelectFields(
                                ['citizenship', 'schedule', 'russian_level', 'other_languages', 'driver_license'],
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
                                    <p>Примерный совокупный заработок в месяц * - net</p>
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
                                        <CheckBox
                                            inline
                                            custom
                                            checked={values.formalization_type.includes('трудовой договор')}
                                            name="formalization_type"
                                            value={values.formalization_type}
                                            label="Трудовой договор"
                                            onChange={() => updateCheckboxValue(setFieldValue, 'трудовой договор', 'formalization_type', values.formalization_type)}
                                            onBlur={(e) => setFieldTouched('formalization_type', e)}
                                        />
                                        <CheckBox
                                            inline
                                            custom
                                            checked={values.formalization_type.includes('самозанятый')}
                                            name="formalization_type"
                                            value={values.formalization_type}
                                            label="Самозанятый"
                                            onChange={() => updateCheckboxValue(setFieldValue, 'самозанятый', 'formalization_type', values.formalization_type)}
                                            onBlur={(e) => setFieldTouched('formalization_type', e)}
                                        />
                                        <CheckBox
                                            inline
                                            custom
                                            checked={values.formalization_type.includes('договор гражданско-правового характера')}
                                            name="formalization_type"
                                            value={values.formalization_type}
                                            label="Договор гражданско-правового характера"
                                            onChange={() => updateCheckboxValue(setFieldValue, 'договор гражданско-правового характера', 'formalization_type', values.formalization_type)}
                                            onBlur={(e) => setFieldTouched('formalization_type', e)}
                                        />
                                        <CheckBox
                                            inline
                                            custom
                                            checked={values.formalization_type.includes('агентский договор')}
                                            name="formalization_type"
                                            value={values.formalization_type}
                                            label="Агентский договор"
                                            onChange={() => updateCheckboxValue(setFieldValue, 'агентский договор', 'formalization_type', values.formalization_type)}
                                            onBlur={(e) => setFieldTouched('formalization_type', e)}
                                        />
                                        <CheckBox
                                            inline
                                            custom
                                            checked={values.formalization_type.includes('другое')}
                                            name="formalization_type"
                                            value={values.formalization_type}
                                            label="Другое"
                                            onChange={() => updateCheckboxValue(setFieldValue, 'другое', 'formalization_type', values.formalization_type)}
                                            onBlur={(e) => setFieldTouched('formalization_type', e)}
                                        />
                                    </div>
                                    {touched.formalization_type && errors.formalization_type ? (
                                        <span className="mt-1 invalid-feedback-visible">{errors.formalization_type}</span>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Обязанности *</p>
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
                                    <DropDown
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
                                    <p>Дополнительно</p>
                                    <Form.Control
                                        as="textarea"
                                        name="responsibilities_comments"
                                        placeholder="Комментарии"
                                        value={values.responsibilities_comments || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Form.Group>
                                <h4 className="text-center mt-4">Требования к Должности</h4>
                                <Form.Group>
                                    <p className="form-control-label">Гражданство *</p>
                                    <DropDown
                                        options={citizenshipOptions}
                                        value={values.citizenship}
                                        name="citizenship"
                                        placeholder="Выберите из списка"
                                        onBlur={(e) => setFieldTouched('citizenship', e || [])}
                                        onChange={(e) => setFieldValue('citizenship', e || [])}
                                        className={touched.citizenship && errors.citizenship ? 'is-invalid' : ''}
                                        isMulti
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
                                        checked={values.gender.includes('мужской')}
                                        name="gender"
                                        value={values.gender}
                                        label="Мужской"
                                        onChange={() => updateCheckboxValue(setFieldValue, 'мужской', 'gender', values.gender)}
                                        onBlur={(e) => setFieldTouched('gender', e)}
                                    />
                                    <CheckBox
                                        inline
                                        custom
                                        checked={values.gender.includes('женский')}
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
                                        checked={values.education.includes('среднее')}
                                        name="education"
                                        value={values.education}
                                        label="Среднее"
                                        onChange={() => updateCheckboxValue(setFieldValue, 'среднее', 'education', values.education)}
                                        onBlur={(e) => setFieldTouched('education', e)}
                                    />
                                    <CheckBox
                                        inline
                                        custom
                                        checked={values.education.includes('среднее специальное')}
                                        name="education"
                                        value={values.education}
                                        label="Среднее специальное"
                                        onChange={() => updateCheckboxValue(setFieldValue, 'среднее специальное', 'education', values.education)}
                                        onBlur={(e) => setFieldTouched('education', e)}
                                    />
                                    <CheckBox
                                        inline
                                        custom
                                        checked={values.education.includes('высшее неоконченное')}
                                        name="education"
                                        value={values.education}
                                        label="Высшее неоконченное"
                                        onChange={() => updateCheckboxValue(setFieldValue, 'высшее неоконченное', 'education', values.education)}
                                        onBlur={(e) => setFieldTouched('education', e)}
                                    />
                                    <CheckBox
                                        inline
                                        custom
                                        checked={values.education.includes('высшее')}
                                        name="education"
                                        value={values.education}
                                        label="Высшее"
                                        onChange={() => updateCheckboxValue(setFieldValue, 'высшее', 'education', values.education)}
                                        onBlur={(e) => setFieldTouched('education', e)}
                                    />
                                    {touched.education && errors.education? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.education}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <p>Уровень владения русским языком *</p>
                                    <DropDown
                                        options={russianOptions}
                                        value={values.russian_level}
                                        name="russian_level"
                                        placeholder="Выберите из списка"
                                        onBlur={(e) => setFieldTouched('russian_level', e)}
                                        onChange={(e) => setFieldValue('russian_level', e)}
                                    />
                                    {touched.russian_level && errors.russian_level ? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.russian_level}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    Другие языки
                                    <DropDown
                                        className="mt-3"
                                        name="other_languages"
                                        value={values.other_languages}
                                        onBlur={(e) => setFieldTouched('other_languages', e || [])}
                                        onChange={(e) => setFieldValue('other_languages', e || [])}
                                        options={languageOptions}
                                        placeholder="Выберите языки"
                                        isMulti
                                    />
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
                                        checked={values._has_driver_license}
                                        value={values._has_driver_license}
                                        label="Да"
                                        onChange={() => setFieldValue('_has_driver_license', true)}
                                        onBlur={(e) => setFieldTouched('_has_driver_license', e)}
                                    />
                                    <RadioButton
                                        inline
                                        custom
                                        name="_has_driver_license"
                                        checked={!values._has_driver_license}
                                        value={values._has_driver_license}
                                        label="Нет"
                                        onChange={() => {
                                            setFieldValue('driver_license', []);
                                            setFieldValue('_has_driver_license', false)
                                        }}
                                        onBlur={(e) => setFieldTouched('_has_driver_license', e)}
                                    />
                                    <br/>
                                    {values._has_driver_license ? (
                                        <DropDown
                                            className="mt-3"
                                            name="driver_license"
                                            value={values.driver_license}
                                            onBlur={(e) => setFieldTouched('driver_license', e || [])}
                                            onChange={(e) => setFieldValue('driver_license', e || [])}
                                            options={driverLicenceOptions}
                                            placeholder="Выберите категории"
                                            isMulti
                                        />
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
                                        value={values.mobile_availability || ''}
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
                                        value={values.appearance_requirements || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <p>Дополнительные требования</p>
                                    <Form.Control
                                        as="textarea"
                                        name="comments"
                                        placeholder="Напишите дополнительные требования"
                                        value={values.comments || ''}
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
