import React, {useEffect, useState} from 'react';
import {Button, Form, Row} from 'react-bootstrap';
import { dynamicFieldSchema } from '../../../../helpers/schemas';
import LabeledFieldHolder from '../../../ui/FormFieldLabeled';
import { CheckBox, RadioButton, TagsInputField, DropDown } from '../../../ui';
import { Formik } from 'formik';


const dateFormatOptions = [
    { value: '%Y-%m-%d', label: 'yyyy-MM-dd', },
    { value: '%Y/%m/%d', label: 'yyyy/MM/dd', },
    { value: '%d-%m-%Y', label: 'dd-MM-yyyy', },
    { value: '%d/%m/%Y', label: 'dd/MM/yyyy', },
    { value: '%d-%m-%y', label: 'dd-MM-yy', },
    { value: '%d/%m/%y', label: 'dd/MM/YY', },
];


const initialValues = {
    field_type: '',
    name: '',
    display_name: '',
    position: '',
    placeholder: '',
    tooltip_value: '',
    is_required: false,
    field_configuration: {
        file_extensions: [],
        choices: [],
        date_format: ''
    }
};


const populateForm = (initialValues, field, roles) => {
    const values = {};
    for (let key in initialValues) {
        values[key] = field[key];
    }
    return values;
};


const DynamicFieldForm = ({ pending, field, onSubmit, onClose }) => {

    const [ formValues, setFormValues ] = useState(initialValues);

    useEffect(() => {
        if (field) {
            setFormValues(populateForm(initialValues, field));
        }
    }, [ field ]);

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={formValues}
                validationSchema={dynamicFieldSchema}
                onSubmit={(values) => {
                    onSubmit(values);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      setFieldTouched,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                        <LabeledFieldHolder
                            label="Тип поля *">
                            <div className="d-flex justify-content-between">
                                <RadioButton
                                    value={values.field_type}
                                    checked={values.field_type === 'text'}
                                    custom
                                    label="Текст"
                                    inline
                                    name="field_type"
                                    onChange={() => setFieldValue('field_type', 'text')}
                                    onBlur={(e) => setFieldTouched('field_type', e)}
                                />
                                <RadioButton
                                    inline
                                    value={values.field_type}
                                    checked={values.field_type === 'file'}
                                    onChange={() => setFieldValue('field_type', 'file')}
                                    onBlur={(e) => setFieldTouched('field_type', e)}
                                    custom
                                    label="Загрузка Файла"
                                    name="field_type"
                                />
                                <RadioButton
                                    inline
                                    value={values.field_type}
                                    checked={values.field_type === 'date'}
                                    onChange={() => setFieldValue('field_type', 'date')}
                                    onBlur={(e) => setFieldTouched('field_type', e)}
                                    custom
                                    label="Дата"
                                    name="field_type"
                                />
                                <RadioButton
                                    value={values.field_type}
                                    custom
                                    id="label-padding-0"
                                    label="Выпадающий список"
                                    inline
                                    name="field_type"
                                    checked={values.field_type === 'choice'}
                                    onChange={() => setFieldValue('field_type', 'choice')}
                                    onBlur={(e) => setFieldTouched('field_type', e)}
                                />
                            </div>
                            {touched.field_type && errors.field_type ? (
                                <p className="mt-1 invalid-feedback-visible text-left">{errors.field_type}</p>
                            ) : null}
                        </LabeledFieldHolder>
                        <LabeledFieldHolder
                            label="Название *"
                        >
                            <Form.Control
                                value={values.name}
                                name="name"
                                placeholder="Введите название"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.name && errors.name ? (
                                <p className="mt-1 invalid-feedback-visible text-left">{errors.name}</p>
                            ) : null}
                        </LabeledFieldHolder>
                        <LabeledFieldHolder label="Отображаемое название *"
                        >
                            <Form.Control
                                value={values.display_name}
                                name="display_name"
                                placeholder="Введите отображаемое название"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.display_name && errors.display_name ? (
                                <p className="mt-1 invalid-feedback-visible text-left">{errors.display_name}</p>
                            ) : null}
                        </LabeledFieldHolder>
                        <LabeledFieldHolder label="Placeholder *">
                            <Form.Control
                                value={values.placeholder}
                                name="placeholder"
                                placeholder="Введите placeholder"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.placeholder && errors.placeholder ? (
                                <p className="mt-1 invalid-feedback-visible text-left">{errors.placeholder}</p>
                            ) : null}
                        </LabeledFieldHolder>
                        <LabeledFieldHolder
                            label="Tooltip *"
                        >
                            <Form.Control
                                value={values.tooltip_value}
                                name="tooltip_value"
                                placeholder="Введите tooltip"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.tooltip_value && errors.tooltip_value ? (
                                <p className="mt-1 invalid-feedback-visible text-left">{errors.tooltip_value}</p>
                            ) : null}
                        </LabeledFieldHolder>
                        <LabeledFieldHolder
                            label="Порядковый номер *"
                            as={Row}
                        >
                            <Form.Control
                                value={values.position}
                                name="position"
                                placeholder="Введите порядковый номер"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="number"
                            />
                            {touched.position && errors.position ? (
                                <p className="mt-1 invalid-feedback-visible text-left">{errors.position}</p>
                            ) : null}
                        </LabeledFieldHolder>
                        {values.field_type === 'file' ? (
                            <LabeledFieldHolder label="Формат файла">
                                <TagsInputField
                                    value={values.field_configuration.file_extensions || []}
                                    onChange={(e) => setFieldValue('field_configuration.file_extensions', e)}
                                    onlyUnique
                                    placeholder='Введите допустимые форматы файла'
                                />
                            </LabeledFieldHolder>
                        ) : null}
                        {values.field_type === 'choice' ? (
                            <LabeledFieldHolder label="Варианты выбора *">
                                <TagsInputField
                                    value={values.field_configuration.choices || []}
                                    onChange={(e) => setFieldValue('field_configuration.choices', e)}
                                    onlyUnique
                                    placeholder='Введите варианты выбора'
                                />
                                {touched.field_configuration
                                && touched.field_configuration.choices
                                && errors.field_configuration
                                && errors.field_configuration.choices ? (
                                    <p className="mt-1 invalid-feedback-visible text-left">{errors.field_configuration.choices}</p>
                                ) : null}
                            </LabeledFieldHolder>
                        ) : null}
                        {values.field_type === 'date' ? (
                            <LabeledFieldHolder
                                label="Формат даты *"
                            >
                                <DropDown
                                    name="field_configuration.date_format"
                                    value={values.field_configuration.date_format}
                                    onBlur={(e) => setFieldTouched('field_configuration.date_format', e)}
                                    onChange={(e) => setFieldValue('field_configuration.date_format', e)}
                                    placeholder="Выберите формат даты"
                                    options={dateFormatOptions}/>
                                {touched.field_configuration
                                && touched.field_configuration.date_format
                                && errors.field_configuration
                                && errors.field_configuration.date_format ? (
                                    <p className="mt-1 invalid-feedback-visible text-left">{errors.field_configuration.date_format}</p>
                                ) : null}
                            </LabeledFieldHolder>
                        ) : null}

                        <LabeledFieldHolder
                            controlId="required-field"
                            label="Обязательное поле"
                        >
                            <CheckBox
                                inline
                                custom
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="is_required"
                                checked={values.is_required}
                                value={values.is_required}
                            />
                        </LabeledFieldHolder>
                        <Button
                            onClick={() => onClose()}
                            className="mr-1"
                            variant="secondary" >Отменить</Button>
                        <Button
                            type="submit"
                            variant="warning"
                            disabled={pending}>{field ? 'Сохранить' : 'Создать'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};


export default DynamicFieldForm;
