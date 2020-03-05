import React, {useEffect, useRef, useState} from 'react';
import { Button, Container, Form, Row, Col, Table, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import { Trash, Edit } from 'react-feather';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { addIndustryOption, getIndustryOptions, updateIndustryOption } from './configsApi';
import {
    addIndustryOptionFailedSelector,
    addIndustryOptionPendingSelector,
    addIndustryOptionResolvedSelector,
    industryOptionsSelector,
    updateIndustryOptionResoledSelector
} from '../adminReducer';
import { scrollToRef } from '../../../utils';
import { Popover } from '../../ui';


const validationSchema = Yup.object().shape({
    field: Yup.string()
        .required('Введите опцию'),
});

let setFormikFieldValue;


const DynamicFields = ({
                           addIndustryOption,
                           addIndustryPending,
                           addIndustryResolved,
                           updateIndustryOptionResolved,
                           industryOptions,
                           getIndustryOptions,
                           updateIndustryOption,
                       }) => {

    const [ industryOptionToEdit, setIndustryOptionToEdit ] = useState(null);

    useEffect(() => {
        if (addIndustryResolved === false) return;
        getIndustryOptions();
    }, [ getIndustryOptions, addIndustryResolved ]);

    useEffect(() => {
        if (updateIndustryOptionResolved) {
            getIndustryOptions();
        }
    }, [ updateIndustryOptionResolved, getIndustryOptions ] );

    const handleEdit = ({ id, name }) => {
        setIndustryOptionToEdit(id);
        setFormikFieldValue('field', name);
        scrollToRef(inputRef);
        inputRef.current.focus();
    };

    const inputRef = useRef(null);

    return (
        <Container className="mt-10-auto">
            <Row>
                <Col>
                    <h3 className="text-center mb-3">Отрасль - выпадающий
                        список</h3>
                    <Formik
                        initialValues={{
                            field: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            if (industryOptionToEdit) {
                                updateIndustryOption({ id: industryOptionToEdit, name: values.field });
                                setIndustryOptionToEdit(null);
                            } else {
                                addIndustryOption(values.field);
                            }
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
                                    <Popover
                                        show={!!industryOptionToEdit}
                                        placement="bottom"
                                        el={inputRef}
                                        body="Редактировать здесь"
                                    />
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="field"
                                            placeholder="Добавить опцию"
                                            value={values.field}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            ref={inputRef}
                                        />
                                        <InputGroup.Append>
                                            <Button
                                                disabled={addIndustryPending}
                                                type="submit"
                                                variant="outline-primary">Сохранить
                                            </Button>
                                        </InputGroup.Append>
                                        {touched.field && errors.field ? (
                                            <span
                                                className="mt-1 invalid-feedback-visible">{errors.field}</span>
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
                        {(industryOptions || []).map(({ id, name }) => {
                            return (
                                <tr key={id}>
                                    <td>{name}</td>
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <Trash className="cursor-pointer" color="red"/>
                                            <Edit
                                                onClick={() => handleEdit({ id, name })}
                                                className="cursor-pointer"
                                                color="blue"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <hr/>
        </Container>
    );
};


const mapStateToProps = state => ({
    addIndustryPending: addIndustryOptionPendingSelector(state),
    addIndustryResolved: addIndustryOptionResolvedSelector(state),
    addIndustryOptionFailed: addIndustryOptionFailedSelector(state),
    industryOptions: industryOptionsSelector(state),
    updateIndustryOptionResolved: updateIndustryOptionResoledSelector(state),
});

const mapDispatchToProps = {
    addIndustryOption,
    getIndustryOptions,
    updateIndustryOption,
};


DynamicFields.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(DynamicFields);
