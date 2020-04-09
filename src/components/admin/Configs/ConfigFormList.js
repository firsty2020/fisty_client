import React  from 'react';
import {
    Button,
    Form,
    Row,
    Col,
    Table,
    InputGroup,
    Modal,
    Container,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { Trash, Edit } from 'react-feather';
import { Popover } from '../../ui';


let setFormikFieldValue;


const ConfigFormList = ({
                            itemName,
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
                        }) => (
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
        <Container>
            <Row>
                <Col>
                    <Formik
                        initialValues={{
                            [itemName]: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            if (itemToEdit) {
                                updateItem({ id: itemToEdit, name: values[itemName] });
                                setItemToEdit(null);
                            } else {
                                addItem(values[itemName]);
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
                                            name={itemName}
                                            placeholder="Добавить опцию"
                                            value={values[itemName]}
                                            onChange={handleChange}
                                            ref={inputRef}
                                            onBlur={handleBlur}
                                        />
                                        <InputGroup.Append>
                                            <Button
                                                disabled={pending}
                                                type="submit"
                                                variant="outline-warning">Сохранить
                                            </Button>
                                        </InputGroup.Append>
                                        {touched[itemName] && errors[itemName] ? (
                                            <span
                                                className="mt-1 invalid-feedback-visible">{errors[itemName]}</span>
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
                                        <div onClick={() => setItemToDelete(id)}>
                                            <Trash

                                                className="cursor-pointer"
                                                color="red"
                                            />
                                        </div>
                                        <div onClick={() => handleEditItem({ id, name, setFieldValue: setFormikFieldValue })}>
                                            <Edit

                                                className="cursor-pointer"
                                                color="blue"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <hr/>
        </Container>
    </div>
);


ConfigFormList.propTypes = {

};


export default ConfigFormList;
