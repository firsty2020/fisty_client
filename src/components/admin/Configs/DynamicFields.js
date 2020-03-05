import React, {useEffect} from 'react';
import { Button, Container, Form, Row, Col, Table, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import { Trash, Edit } from 'react-feather';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { addIndustryOption, getIndustryOptions } from './configsApi';
import {
    addIndustryOptionFailedSelector,
    addIndustryOptionPendingSelector,
    addIndustryOptionResolvedSelector, industryOptionsSelector
} from '../adminReducer';


export const validationSchema = Yup.object().shape({
    field: Yup.string()
        .required('Введите опцию'),
});


const DynamicFields = ({
                           addIndustryPending,
                           addIndustryResolved,
                           industryOptions,
                           addIndustryOption,
                           getIndustryOptions,
}) => {

    useEffect(() => {
        if (addIndustryResolved === false) return;
        getIndustryOptions();
    }, [ getIndustryOptions, addIndustryResolved ]);
    
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
                            addIndustryOption(values.field);
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
                          }) => (
                            <Form onSubmit={handleSubmit}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="field"
                                        placeholder="Добавить опцию"
                                        value={values.field}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
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
                        )}
                    </Formik>
                    <Table>
                        <thead>
                        <tr>
                            <th>Наименование</th>
                            <th width="5%">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(industryOptions || []).map(({ id, name}) => {
                            return (
                                <tr key={id}>
                                    <td>{name}</td>
                                    <td><Trash/><Edit/></td>
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
});

const mapDispatchToProps = { addIndustryOption, getIndustryOptions };


DynamicFields.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(DynamicFields);
