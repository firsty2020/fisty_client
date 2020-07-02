import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {
    getCandidate,
    resetCandidateState,
    updateCandidate
} from '../commonActions';
import {
    candidateSelector,
    candidateUpdatedSelector,
    isLoadingSelector
} from '../commonReducer';
import * as Yup from 'yup';
import {
    autoToggleAlert,
    clearEmptyFields,
    copyObject,
    extractIdFromUrl,
    generateSelectOptions,
    toBase64,
    transformReactSelectFields,
} from '../../../helpers/utils';
import { Button, Form } from 'react-bootstrap';
import {AlertNotice, CheckBox, DropDown} from '../../ui';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { getDynamicFields } from '../../admin/Config/DynamicFields/DynamicFieldsActions';
import { getLeads } from '../../admin/adminActions';
import { leadsSelector } from '../../admin/adminReducer';
import Messages from '../../../helpers/constants/messages';
import { dynamicFieldsSelector } from '../../admin/Config/configsReducer';
import { dateFormatOptions, formatDateOutput, validateFileFormat } from '../../../helpers/utils';
import { When } from 'react-if';
import { push } from 'connected-react-router';
import {extractUserDataFromToken} from '../../auth/auth';


const UpdateCandidate = ({
                             match,
                             candidate,
                             dynamicFields,
                             leads,
                             isLoading,
                             updated,
                             getCandidate,
                             getDynamicFields,
                             getLeads,
                             updateCandidate,
                             resetCandidateState,
                             push,
                         }) => {

    const [ fileTitles, setFileTitles ] = useState({});
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ formValues, setFormValues ] = useState(null);

    useEffect(() => {
        getCandidate(match.params.candidateId);
        getDynamicFields({ project: match.params.projectId, show_all: true }, 'projects/custom-fields/');
        getLeads({ show_all: true });
    }, [
        match.params.projectId,
        match.params.candidateId,
        getDynamicFields,
        getLeads,
        getCandidate,
    ]);

    useEffect(() => {
        if (updated) {
            autoToggleAlert('Кандидат успешно обновлен', setSuccessMessage);
            setTimeout(() => {
                resetCandidateState();
                push(generateBackPath());
            }, 2000);
        }
    }, [updated, resetCandidateState,]);


    if (!candidate || !dynamicFields) {
        return null;
    }

    const orderedDynamicFields = dynamicFields.results.sort((a, b) => a.position - b.position);

    if (!formValues) {
        let init = {};
        if (candidate.lead) {
            init.show_leads = true;
            init.lead = { value: candidate.lead, label: `${candidate.lead_details.first_name || ''} ${candidate.lead_details.last_name || ''}`  }
        }

        const values = candidate.candidate_fields.reduce((acc, curr) => {

            if (curr.main_field_info.field_type === 'choice') {
                acc[curr.field] = { label: curr.value, value: curr.value};
            }
            if (curr.main_field_info.field_type === 'date') {
                const date = formatDateOutput(curr.value, curr.main_field_info.field_configuration, true);
                acc[curr.field] = new Date(date);
            }
            if (curr.main_field_info.field_type === 'text') {
                acc[curr.field] = curr.value;
            }
            if (curr.main_field_info.field_type === 'file') {
                setFileTitles({ ...fileTitles, [curr.field]: curr.file_value })
            }
            return acc;
        }, init);
        setFormValues(values);
    }

    const validationSchemaShape =  orderedDynamicFields.reduce((acc, curr) => {
            acc = { ...acc,
                [curr.name]: Yup.string()
                    .when('__init__',
                        (_, schema) =>  curr.is_required ? schema.required(Messages.FIELD_REQUIRED) : schema),
            }
            return acc;
        },
        { lead: Yup.string().nullable() });

    const toggleShowLeads = (setFieldValue, value = false) => {
        setFieldValue('show_leads', !value);
        setFieldValue('lead', null);
    };

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

    const generateBackPath = () => {
        const user = extractUserDataFromToken();
        if (user.role === 'project_manager') {
            return `/project-manager/projects/${match.params.projectId}/candidates`;
        }
        if (user.role === 'admin') {
            return `/admin/candidates`;
        }
    };

    if (!formValues) {
        return null
    }


    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice
                    type="success"
                    message={successMessage}/>
            </When>
            <Formik
                initialValues={formValues}
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

                    const { lead, show_leads, project, ...form_data } = data;

                    updateCandidate(extractIdFromUrl(candidate.url), clearEmptyFields({ lead, project, form_data }));
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
                                checked={values.show_leads}
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
                                                    className="file-field"
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
                                            </Form.Group>) : null }
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
                            <Link to={generateBackPath()}>
                                <Button
                                    className="mr-2"
                                    variant="secondary">Отменить
                                </Button>
                            </Link>
                            <Button
                                variant="warning"
                                disabled={isLoading}
                                type="submit">Сохранить
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const mapStateToProps = (state) => ({
    candidate: candidateSelector(state),
    leads: leadsSelector(state),
    dynamicFields: dynamicFieldsSelector(state),
    isLoading: isLoadingSelector(state),
    updated: candidateUpdatedSelector(state),
});

const mapDispatchToProps = {
    getCandidate,
    getDynamicFields,
    getLeads,
    updateCandidate,
    push,
    resetCandidateState,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCandidate);
