import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';


const roleSchema = Yup.object().shape({
    name: Yup.string()
        .required('Введите наименование роли'),
    create_user: Yup.bool(),
});

let initialValues;
const CreateOrUpdateRoleModal = ({ role, pending, onSubmit, onClose }) => {
    
    const inputRef = useRef(null);

    if (role) {
        initialValues = {
            name: role.name,
            create_user: role.create_user,
        }
    } else {
        initialValues = {
            name: '',
            create_user: false,
        }
    }

    setTimeout(() => inputRef.current && inputRef.current.focus());

    return (
        <Modal
            show
            onHide={() => null}
            centered
        >
            <Modal.Body>
                <p className="text-center mt-1">Роль для контактных лиц</p>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={roleSchema}
                    onSubmit={(values) => {
                        onSubmit(values);
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
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Введите наименование роли"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        ref={inputRef}
                                    />
                                    {touched.name && errors.name ? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.name}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                        name="create_user"
                                        checked={values.create_user}
                                        value={values.create_user}
                                        custom
                                        onChange={handleChange}
                                        type="switch"
                                        id="custom-switch"
                                        label="Ползователь"
                                    />
                                </Form.Group>
                                <div className="text-center">
                                    <Button
                                        type="reset"
                                        onClick={() => onClose(false)}
                                        className="mr-2"
                                        disabled={pending}
                                        variant="outline-danger">Закрыть
                                    </Button>
                                    <Button
                                        disabled={pending}
                                        type="submit">{ role ? 'Сохранить' : 'Создать'}
                                    </Button>
                                </div>
                            </Form>
                        )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

CreateOrUpdateRoleModal.propTypes = {};


export default CreateOrUpdateRoleModal;
