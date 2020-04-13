import React, {useEffect, useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import { branchSchema } from '../../../helpers/schemas';
import { Formik } from 'formik';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getLocations } from '../Configs/configsApi';
import { locationsSelector } from '../Configs/configsReducer';
import {
    generateSelectOptions,
    transformReactSelectFields
} from '../../../helpers/utils';
import { getContactPersons } from '../contactPerson/contactPersonActions';
import {contactPersonsSelector, contactPersonsState} from '../adminReducer';
import { baseURL } from '../../../axios';
import { Link } from 'react-router-dom';


const fillForm = (initialValues, data, locationsOptions, contactPersonsOptions) => {
    const values = {};
    for (let key in initialValues) {
        if (initialValues.hasOwnProperty(key) && key !== 'contact_person' && key !== 'location')
            values[key] = data[key];
    }
    values.location = locationsOptions.find(option => option.value === data.location);
    values.contact_person = contactPersonsOptions.filter(option => data.contact_person.includes(option.value));
    return values;
};

const initialValues = {
    name: '',
    address: '',
    location: '',
    contact_person: [],
    company:  '',
};

let formValues;


const BranchForm = ({
                        match,
                        locations,
                        contactPersons,
                        pending,
                        branch,
                        getLocations,
                        getContactPersons,
                        onSubmit,
                    }) => {

    const [ locationsOptions, setLocationsOptions ] = useState([]);
    const [ contactPersonOptions, setContactPersonOptions ] = useState([]);

    useEffect(() => {
        formValues.company = `${baseURL}companies/${match.params.companyId}/`;
    }, [ match.params.companyId ]);

    useEffect(() => {
        const params = { company: match.params.companyId, show_all: true };
        getLocations({ show_all: true });
        getContactPersons(params);
    }, [ getLocations, getContactPersons, match.params.companyId ]);

    useEffect(() => {
        if (locations && locations.length) {
            setLocationsOptions(generateSelectOptions(locations, 'url', 'name'));
        }
    }, [ locations ]);

    useEffect(() => {
        if (contactPersons && contactPersons.length) {
            setContactPersonOptions(generateSelectOptions(
                contactPersons,
                'url',
                (item) => item.first_name + ' ' + item.last_name)
            );
        }
    }, [ contactPersons ]);

    if (branch
        && contactPersons
        && contactPersons.length
        && locations
        && locations.length
    ) {
        formValues = fillForm(initialValues, branch, locationsOptions, contactPersonOptions);
    } else {
        formValues = initialValues;
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={formValues}
                validationSchema={branchSchema}
                onSubmit={(values) => {
                    const branchData = JSON.parse(JSON.stringify(values));
                    const transformedData = transformReactSelectFields(
                        ['location', 'contact_person'],
                        branchData,
                    );
                    onSubmit(transformedData);
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
                      setFieldValue
                  }) => (
                    <Form onSubmit={handleSubmit}>
                        <p className="form-control-label">Название *</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Название Хаба / Бранча"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.name && errors.name ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.name}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Адрес *</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="address"
                                placeholder="Адрес Хаба / Бранча"
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.address && errors.address ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.address}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Местонахождение *</p>
                        <Form.Group>
                            <Select
                                name="location"
                                placeholder="Введите местонахождение"
                                value={values.location}
                                options={locationsOptions}
                                onBlur={(e) => setFieldTouched('location', e)}
                                onChange={(e) => setFieldValue('location', e)}
                            />
                            {touched.location && errors.location ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.location}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Контакнтные лица *</p>
                        <Form.Group>
                            <Select
                                type="text"
                                name="contact_person"
                                placeholder="Выберите из списка"
                                value={values.contact_person}
                                options={contactPersonOptions}
                                onBlur={(e) => setFieldTouched('contact_person', e)}
                                onChange={(e) => setFieldValue('contact_person', e || [])}
                                isMulti
                            />
                            {touched.contact_person && errors.contact_person ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.contact_person}</span>
                            ) : null}
                        </Form.Group>
                        <div className="text-center">
                            <Link to={`/admin/companies/${match.params.companyId}/branches`}>
                                <Button
                                    className="mr-2"
                                    variant="secondary">Отменить
                                </Button>
                            </Link>
                            <Button
                                variant="warning"
                                disabled={pending}
                                type="submit">{branch ? 'Обновить' : 'Создать'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};


const mapStateToProps = state => ({
    locations: locationsSelector(state),
    contactPersons: contactPersonsSelector(state),
});

const mapDispatchToProps = {
    getLocations,
    getContactPersons,
};


BranchForm.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(BranchForm);
