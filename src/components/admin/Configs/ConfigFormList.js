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
import { connect } from 'react-redux';

import { Popover } from '../../ui';


let setFormikFieldValue;


const ConfigFormList = ({
                            heading,
                            itemToDelete,
                            validationSchema,
                            itemToEdit,
                            updateItem,
                            setItemToEdit,
                            addItem,
                            inputRef,
                            pending,
                            itemList,
                            setItemToDelete,
                            handleEditItem,
                            handleItemDelete,
}) => {
    return (
        <div>
            <Modal
                show={!!itemToDelete}
                centered>
                <Modal.Body>
                    <p className="text-center mt-1">Вы уверены что хотите удалить эту опцию?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setItemToDelete(null)}>Нет</Button>
                    <Button variant="danger" onClick={handleItemDelete}>Да</Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col>
                    <h3 className="text-center mb-3">{heading}</h3>
                    <Formik
                        initialValues={{
                            item: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            if (itemToEdit) {
                                console.log(itemToEdit, 'itemToEdit')
                                updateItem({ id: itemToEdit, name: values.item });
                                setItemToEdit(null);
                            } else {
                                addItem(values.item);
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
                                        show={!!itemToEdit}
                                        placement="bottom"
                                        el={inputRef}
                                        body="Редактировать здесь"
                                    />
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="item"
                                            placeholder="Добавить опцию"
                                            value={values.item}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            ref={inputRef}
                                        />
                                        <InputGroup.Append>
                                            <Button
                                                disabled={pending}
                                                type="submit"
                                                variant="outline-primary">Сохранить
                                            </Button>
                                        </InputGroup.Append>
                                        {touched.item && errors.item ? (
                                            <span
                                                className="mt-1 invalid-feedback-visible">{errors.item}</span>
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
                        {(itemList || []).map(({ id, name }) => (
                            <tr key={id}>
                                <td>{name}</td>
                                <td>
                                    <div className="d-flex justify-content-around">
                                        <Trash
                                            onClick={() => setItemToDelete(id)}
                                            className="cursor-pointer" color="red"/>
                                        <Edit
                                            onClick={() => handleEditItem({ id, name, setFieldValue: setFormikFieldValue })}
                                            className="cursor-pointer"
                                            color="blue"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <hr/>

        </div>
    );
};


const mapStateToProps = state => ({

});

const mapDispatchToProps = {
};


ConfigFormList.propTypes = {

};


export default ConfigFormList;
