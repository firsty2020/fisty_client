import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Form,
    Row,
    Col,
    Table,
    InputGroup,
    Modal
} from 'react-bootstrap';
import { Formik } from 'formik';
import { Trash, Edit } from 'react-feather';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import {
    addIndustryOption,
    getIndustryOptions,
    updateIndustryOption,
    removeIndustryOption,
} from '../configsApi';
import {
    addIndustryOptionFailedSelector,
    addIndustryOptionPendingSelector,
    addIndustryOptionResolvedSelector,
    industryOptionsSelector,
    removeIndustryOptionsResolvedSelector,
    updateIndustryOptionResoledSelector,
} from '../../adminReducer';
import { scrollToRef } from '../../../../utils';
import { Popover } from '../../../ui';


const industryValidationSchema = Yup.object().shape({
    industry: Yup.string()
        .required('Введите опцию'),
});

let setFormikFieldValue;


const Industries = ({
                        addIndustryOption,
                        addIndustryPending,
                        addIndustryResolved,
                        updateIndustryOptionResolved,
                        industryOptionRemoved,
                        industryOptions,
                        getIndustryOptions,
                        updateIndustryOption,
                        removeIndustryOption,
                    }) => {

    const [ industryOptionToEdit, setIndustryOptionToEdit ] = useState(null);
    const [ industryOptionToDelete, setIndustryOptionToDelete ] = useState(null);

    useEffect(() => {
        getIndustryOptions();
    }, [ getIndustryOptions ]);

    useEffect(() => {
        if (addIndustryResolved) {
            getIndustryOptions();
        }
    }, [ addIndustryResolved, getIndustryOptions ]);

    useEffect(() => {
        if (industryOptionRemoved) {
            getIndustryOptions();
        }
    }, [ industryOptionRemoved, getIndustryOptions ]);

    useEffect(() => {
        if (updateIndustryOptionResolved) {
            getIndustryOptions();
        }
    }, [ updateIndustryOptionResolved, getIndustryOptions ]);

    const handleEdit = ({ id, name }) => {
        setIndustryOptionToEdit(id);
        setFormikFieldValue('industry', name);
        scrollToRef(industryInputRef);
        industryInputRef.current.focus();
    };

    const handleIndustryOptionDelete = () => {
        removeIndustryOption(industryOptionToDelete);
        setIndustryOptionToDelete(null);
    };

    const industryInputRef = useRef(null);

    return (
        <div>
            <Modal
                show={!!industryOptionToDelete}
                centered>
                <Modal.Body>
                    <p className="text-center mt-1">Вы уверены что хотите удалить эту опцию?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIndustryOptionToDelete(null)}>Нет</Button>
                    <Button variant="danger" onClick={handleIndustryOptionDelete}>Да</Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col>
                    <h3 className="text-center mb-3">Отрасль - выпадающий
                        список</h3>
                    <Formik
                        initialValues={{
                            industry: '',
                        }}
                        validationSchema={industryValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            if (industryOptionToEdit) {
                                updateIndustryOption({ id: industryOptionToEdit, name: values.industry });
                                setIndustryOptionToEdit(null);
                            } else {
                                addIndustryOption(values.industry);
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
                                        el={industryInputRef}
                                        body="Редактировать здесь"
                                    />
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="industry"
                                            placeholder="Добавить опцию"
                                            value={values.industry}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            ref={industryInputRef}
                                        />
                                        <InputGroup.Append>
                                            <Button
                                                disabled={addIndustryPending}
                                                type="submit"
                                                variant="outline-primary">Сохранить
                                            </Button>
                                        </InputGroup.Append>
                                        {touched.industry && errors.industry ? (
                                            <span
                                                className="mt-1 invalid-feedback-visible">{errors.industry}</span>
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
                                            <Trash
                                                onClick={() => setIndustryOptionToDelete(id)}
                                                className="cursor-pointer" color="red"/>
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

        </div>
    );
};


const mapStateToProps = state => ({
    addIndustryPending: addIndustryOptionPendingSelector(state),
    addIndustryResolved: addIndustryOptionResolvedSelector(state),
    addIndustryOptionFailed: addIndustryOptionFailedSelector(state),
    industryOptions: industryOptionsSelector(state),
    updateIndustryOptionResolved: updateIndustryOptionResoledSelector(state),
    industryOptionRemoved: removeIndustryOptionsResolvedSelector(state),
});

const mapDispatchToProps = {
    addIndustryOption,
    getIndustryOptions,
    updateIndustryOption,
    removeIndustryOption,
};


Industries.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Industries);
