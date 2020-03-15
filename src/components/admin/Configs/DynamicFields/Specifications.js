import React, { useEffect, useRef, useState } from 'react';
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
    addSpecificationOption,
    getSpecificationOptions,
    updateSpecificationOption,
    removeSpecificationOption,
} from '../configsApi';
import {
    addSpecificationOptionResolvedSelector,
    specificationOptionsSelector,
    removeSpecificationOptionsResolvedSelector,
    updateSpecificationOptionResolvedSelector,
} from '../configsReducer';
import { scrollToRef } from '../../../../utils';
import { Popover } from '../../../ui';


const specificationValidationSchema = Yup.object().shape({
    specification: Yup.string()
        .required('Введите опцию'),
});

let setFormikFieldValue;


const Specifications = ({
                            addSpecificationOptionResolved,
                            specificationOptions,
                            specificationOptionUpdated,
                            specificationOptionRemoved,
                            addSpecificationOption,
                            getSpecificationOptions,
                            updateSpecificationOption,
                            removeSpecificationOption,
                        }) => {

    const [ specificationOptionToEdit, setSpecificationOptionToEdit ] = useState(null);
    const [ specificationOptionToDelete, setSpecificationOptionToDelete ] = useState(null);

    useEffect(() => {
        getSpecificationOptions();
    }, [ getSpecificationOptions ]);

    useEffect(() => {
        if (addSpecificationOptionResolved) {
            getSpecificationOptions();
        }
    }, [ addSpecificationOptionResolved, getSpecificationOptions ]);

    useEffect(() => {
        if (specificationOptionRemoved) {
            getSpecificationOptions();
        }
    }, [ specificationOptionRemoved, getSpecificationOptions ]);

    useEffect(() => {
        if (specificationOptionUpdated) {
            getSpecificationOptions();
        }
    }, [ specificationOptionUpdated, getSpecificationOptions ]);

    const handleEdit = ({ id, name }) => {
        setSpecificationOptionToEdit(id);
        setFormikFieldValue('specification', name);
        scrollToRef(specificationInputRef);
        specificationInputRef.current.focus();
    };

    const handleSpecificationOptionDelete = () => {
        removeSpecificationOption(specificationOptionToDelete);
        setSpecificationOptionToDelete(null);
    };

    const specificationInputRef = useRef(null);

    return (
        <div className="mt-5">
            <Modal
                show={!!specificationOptionToDelete}
                centered>
                <Modal.Body>
                    <p className="text-center mt-1">Вы уверены что хотите удалить эту опцию?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSpecificationOptionToDelete(null)}>Нет</Button>
                    <Button variant="danger" onClick={handleSpecificationOptionDelete}>Да</Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col>
                    <h3 className="text-center mb-3">Специфика - выпадающий
                        список</h3>
                    <Formik
                        initialValues={{
                            specification: '',
                        }}
                        validationSchema={specificationValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            if (specificationOptionToEdit) {
                                updateSpecificationOption({ id: specificationOptionToEdit, name: values.specification });
                                setSpecificationOptionToEdit(null);
                            } else {
                                addSpecificationOption(values.specification);
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
                                        show={!!specificationOptionToEdit}
                                        placement="bottom"
                                        el={specificationInputRef}
                                        body="Редактировать здесь"
                                    />
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="specification"
                                            placeholder="Добавить опцию"
                                            value={values.specification}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            ref={specificationInputRef}
                                        />
                                        <InputGroup.Append>
                                            <Button
                                                type="submit"
                                                variant="outline-primary">Сохранить
                                            </Button>
                                        </InputGroup.Append>
                                        {touched.specification && errors.specification ? (
                                            <span
                                                className="mt-1 invalid-feedback-visible">{errors.specification}</span>
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
                        {(specificationOptions || []).map(({ id, name }) => {
                            return (
                                <tr key={id}>
                                    <td>{name}</td>
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <Trash
                                                onClick={() => setSpecificationOptionToDelete(id)}
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
    addSpecificationOptionResolved: addSpecificationOptionResolvedSelector(state),
    specificationOptions: specificationOptionsSelector(state),
    specificationOptionUpdated: updateSpecificationOptionResolvedSelector(state),
    specificationOptionRemoved: removeSpecificationOptionsResolvedSelector(state),
});

const mapDispatchToProps = {
    addSpecificationOption,
    getSpecificationOptions,
    updateSpecificationOption,
    removeSpecificationOption,
};


Specifications.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Specifications);
