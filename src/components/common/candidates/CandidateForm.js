import React, {useEffect, useState} from 'react';
import { Container } from 'reactstrap';
import { getDynamicFields } from '../../admin/Config/DynamicFields/DynamicFieldsActions';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { dynamicFieldsSelector } from '../../admin/Config/configsReducer';
import { Button, Form } from 'react-bootstrap';
import { CheckBox, DropDown, EmptyListPlaceholder } from '../../ui';
import {
    clearEmptyFields,
    copyObject,
    generateSelectOptions,
    toBase64,
    transformReactSelectFields,
} from '../../../helpers/utils';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { leadsSelector } from '../../admin/adminReducer';
import { getLeads } from '../../admin/adminActions';
import { baseURL } from '../../../axios';
import { isLoadingSelector } from '../commonReducer';
import { candidateCreatedSelector } from '../commonReducer';
import Messages from '../../../helpers/constants/messages'

registerLocale('ru', ru)
setDefaultLocale('ru');


const dateFormatOptions = [
    { value: '%Y-%m-%d', label: 'yyyy-MM-dd', },
    { value: '%Y/%m/%d', label: 'yyyy/MM/dd', },
    { value: '%d-%m-%Y', label: 'dd-MM-yyyy', },
    { value: '%d/%m/%Y', label: 'dd/MM/yyyy', },
    { value: '%d-%m-%y', label: 'dd-MM-yy', },
    { value: '%d/%m/%y', label: 'dd/MM/yy', },
];

const formatDateOutput = (dateString, formatting) => {

    const date = new Date(dateString);
    const year = date.getFullYear();
    const shortYear = date.getYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const outputs = [
        { label: '%Y-%m-%d', output: `${year}-${month}-${day}`},
        { label: '%Y/%m/%d', output: `${year}/${month}/${day}`},
        { label: '%d-%m-%Y', output: `${day}-${month}-${year}`},
        { label: '%d/%m/%Y', output: `${day}/${month}/${year}`},
        { label: '%d-%m-%y', output: `${day}-${month}-${shortYear}`},
        { label: '%d/%m/%y', output: `${day}/${month}/${shortYear}`},
    ];

    return (outputs.find(( { label }) => label === formatting.date_format) || {}).output;

};

const CandidateForm = ({
                             match,
                             isLoading,
                             role,
                             dynamicFields,
                             leads,
                             getDynamicFields,
                             getLeads,
                             onSubmit,
                         }) => {

    const [ fileTitles, setFileTitles ] = useState({});

    useEffect(() => {
        getDynamicFields({ project: match.params.projectId, show_all: true }, 'projects/custom-fields');
        getLeads({ show_all: true });
    }, [ getDynamicFields, match.params.projectId, getLeads ]);


    if (!dynamicFields) {
        return null;
    } else if (dynamicFields && !dynamicFields.results.length) {
        return <EmptyListPlaceholder/>;
    }

    const orderedDynamicFields = dynamicFields.results.sort((a, b) => a.position - b.position);

    const initialValues = dynamicFields.results.reduce((acc, curr) => {
            acc = { ...acc, [curr.name]: '' };
            return acc;
        },
        { lead: '', });

    const validationSchemaShape =  dynamicFields.results.reduce((acc, curr) => {
            acc = { ...acc,
                [curr.name]: Yup.string()
                    .when('test',
                        (_, schema) =>  curr.is_required ? schema.required(Messages.FIELD_REQUIRED) : schema),
            }
            return acc;
        },
        { lead: Yup.string() });


    const handleFileInput = async (e, { field_configuration, name }, { setFieldValue, setFieldError }) => {
        e.persist();
        const file = e.target.files[0];
        const isValidFormat = validateFileFormat(file, field_configuration.file_extensions);
        if (!isValidFormat) {
            setFieldError(name, `Допустимые форматы файла: ${field_configuration.file_extensions.join(', ')}`);
        } else {
            setFileTitles({ ...fileTitles, [name]: file.name });
            const base64sting = await toBase64(file);
            setFieldValue(name, base64sting);
        }
    };

    const validateFileFormat = (file, allowedExtensions) => {
        const fileExt = file ? file.name.split('.').pop() : '';
        return allowedExtensions.includes(fileExt);
    };

    const toggleShowLeads = (setFieldValue, value = false) => {
        setFieldValue('show_leads', !value);
        setFieldValue('lead', '');
    };

    return (
        <div>
            <Container>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object().shape(validationSchemaShape)}
                    onSubmit={(values) => {

                        let data = copyObject(values);
                        const choiceFields = orderedDynamicFields
                            .filter((field) => field.field_type === 'choice')
                            .map(field => field.name).concat([ 'lead' ]);

                        const dateFields = orderedDynamicFields
                            .filter((field) => field.field_type === 'date')
                            .map(field => field.name);

                        dateFields.map(dateField => {
                            data[dateField] =
                                formatDateOutput(
                                    data[dateField],
                                    orderedDynamicFields.find(field => field.name === dateField).field_configuration,
                                );
                        });

                        data = transformReactSelectFields(choiceFields, data);
                        data.project = `${baseURL}projects/${match.params.projectId}/`;

                        const { lead, show_leads, project, ...form_data } = data;

                        onSubmit(clearEmptyFields({ lead, project, form_data }));
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
                          setFieldError,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <CheckBox
                                    label="Выбрать из списка лидов"
                                    custom
                                    name="show_leads"
                                    value={values.show_leads}
                                    onBlur={(e) => setFieldTouched('show_leads', e)}
                                    onChange={() => toggleShowLeads(setFieldValue, values.show_leads)}
                                />
                                {touched.lead && errors.lead ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.lead}</span>
                                ) : null}
                            </Form.Group>
                            {values.show_leads ? (
                                <Form.Group>
                                    <p className="form-control-label">Лид</p>
                                    <DropDown
                                        isDisabled={!leads}
                                        isClearable
                                        name="lead"
                                        placeholder="Выберите из списка"
                                        value={values.lead}
                                        onBlur={(e) => setFieldTouched('lead', e)}
                                        onChange={(e) => setFieldValue('lead', e)}
                                        options={generateSelectOptions((leads || {}).results, 'url', ({ first_name, last_name }) => `${first_name} ${last_name}`)}
                                    />
                                    {touched.lead && errors.lead ? (
                                        <span className="mt-1 invalid-feedback-visible">{errors.lead}</span>
                                    ) : null}
                                </Form.Group>
                            ) : null}
                            {orderedDynamicFields
                                .map(({ url, field_type, display_name, placeholder, name, field_configuration }) => {
                                    return (
                                        <React.Fragment key={url}>
                                            <p className="form-control-label">{display_name}</p>
                                            {field_type === 'text' ? (
                                                <Form.Group>
                                                    <Form.Control
                                                        type="text"
                                                        name={name}
                                                        placeholder={placeholder}
                                                        value={values[name]}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {touched[name] && errors[name] ? (
                                                        <span className="mt-1 invalid-feedback-visible">{errors[name]}</span>
                                                    ) : null}
                                                </Form.Group>
                                            ) : null }
                                            {field_type === 'choice' ? (
                                                <Form.Group>
                                                    <DropDown
                                                        name={name}
                                                        placeholder={placeholder}
                                                        value={values[name]}
                                                        onBlur={(e) => setFieldTouched(name, e)}
                                                        onChange={(e) => setFieldValue(name, e)}
                                                        options={field_configuration.choices.map((choice) => ({ value: choice, label: choice }))}
                                                    />
                                                    {touched[name] && errors[name] ? (
                                                        <span className="mt-1 invalid-feedback-visible">{errors[name]}</span>
                                                    ) : null}
                                                </Form.Group>
                                            ) : null }
                                            {field_type === 'file' ? (
                                                <Form.Group>
                                                    <Form.File
                                                        custom
                                                        name={name}
                                                        label={fileTitles[name] ? fileTitles[name] : placeholder}
                                                        data-browse="загрузить"
                                                        onChange={(e) => handleFileInput(e, { field_configuration,  name }, { setFieldError, setFieldValue })}
                                                        onBlur={handleBlur}
                                                    />
                                                    {touched[name] && errors[name] ? (
                                                        <span className="mt-1 invalid-feedback-visible">{errors[name]}</span>
                                                    ) : null}
                                                </Form.Group>

                                            ) : null }
                                            {field_type === 'date' ? (
                                                <div className="datepicker-container mb-3">
                                                    <DatePicker
                                                        name={name}
                                                        selected={values[name]}
                                                        value={values[name]}
                                                        onChange={date => setFieldValue(name, date || '')}
                                                        className="form-control"
                                                        dateFormat={(dateFormatOptions.find(({ value }) => value === field_configuration.date_format)|| {}).label}
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        maxDate={new Date()}
                                                        placeholderText={`Формат: ${(dateFormatOptions.find(({ value }) => value === field_configuration.date_format)|| {}).label}`}
                                                    />
                                                    {touched[name] && errors[name] ? (
                                                        <span className="mt-1 invalid-feedback-visible">{errors[name]}</span>
                                                    ) : null}
                                                </div>
                                            ) : null }
                                        </React.Fragment>
                                    );
                                })
                            }
                            <div className="text-center">
                                <Link to={role === 'admin' ? `/${role}/candidates` : `/${role}/projects` }>
                                    <Button
                                        className="mr-2"
                                        variant="secondary">Отменить
                                    </Button>
                                </Link>
                                <Button
                                    variant="warning"
                                    disabled={isLoading}
                                    type="submit">Создать
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
}


const mapStateToProps = state => ({
    dynamicFields: dynamicFieldsSelector(state),
    leads: leadsSelector(state),
    isLoading: isLoadingSelector(state),
    created: candidateCreatedSelector(state),
});

const mapDispatchToProps = {
    getDynamicFields,
    getLeads,
    push,
};



export default connect(mapStateToProps, mapDispatchToProps)(CandidateForm);
