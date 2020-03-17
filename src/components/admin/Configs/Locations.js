import React, { useEffect } from 'react';
import { Button, Form, InputGroup, Container, Table, Col } from 'react-bootstrap';
import { Popover } from '../../ui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createLocation, getLocations } from './configsApi';
import {
    createLocationPendingSelector,
    createLocationResolvedSelector,
    locationsSelector
} from './configsReducer';
import { connect } from 'react-redux';
import { Edit, Trash } from 'react-feather';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Введите местонахождение'),
});


let setFormikFieldValue;


const Locations = ({ pending, locations, created, createLocation, getLocations }) => {

    useEffect(() => {
        getLocations();
    }, [ getLocations ]);

    useEffect(() => {
        if (created) {
            getLocations();
        }
    }, [ created, getLocations ]);

    return (
        <div>
            <Container>
                <Formik
                    initialValues={{
                        name: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        createLocation(values.name);
                        resetForm();
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          setFieldValue
                      }) => {
                        setFormikFieldValue = setFieldValue;
                        return (
                            <Form onSubmit={handleSubmit}>
                                {/* <Popover
                            show={!!false}
                            placement="bottom"
                            el={null}
                            body="Редактировать здесь"
                        />*/}
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Добавить местонахождение"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        // ref={{}}
                                    />
                                    <InputGroup.Append>
                                        <Button
                                            disabled={pending}
                                            type="submit"
                                            variant="outline-primary">Сохранить
                                        </Button>
                                    </InputGroup.Append>
                                    {touched.name && errors.name ? (
                                        <span
                                            className="mt-1 invalid-feedback-visible">{errors.name}</span>
                                    ) : null}
                                </InputGroup>
                            </Form>
                        );
                    }}
                </Formik>
                <Table>
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th width="5%">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(locations || []).map(({ id, name }) => (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>
                                <div className="d-flex justify-content-around">
                                    <Trash
                                        onClick={() => alert('NIY')}
                                        className="cursor-pointer" color="red"/>
                                    <Edit
                                        onClick={() => alert('NIY')}
                                        className="cursor-pointer"
                                        color="blue"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};


const mapStateToProps = state => ({
    pending: createLocationPendingSelector(state),
    locations: locationsSelector(state),
    created: createLocationResolvedSelector(state),
});

const mapDispatchToProps = {
    createLocation,
    getLocations,
};


Locations.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Locations);
