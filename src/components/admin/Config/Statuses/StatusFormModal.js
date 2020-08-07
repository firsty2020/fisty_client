import React, { useEffect, useRef } from 'react';
import { Button, Form, Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import { Formik } from 'formik';
import { DropDown, PrimaryButton } from '../../../ui';
import * as Yup from 'yup';
import { isLoadingSelector } from '../../../common/commonReducer';
import { connect } from 'react-redux';
import { copyObject, generateUId } from '../../../../helpers/utils';
import { getStatuses } from '../configsActions';
import { statusesState } from '../configsReducer';
import { Info } from 'react-feather'


let formValues = {};

const initialValues = {
    name: '',
    status_type: ''
};

const validationSchema =  Yup.object().shape({
    name: Yup.string()
        .required('Введите наименование статуса'),
    status_type: Yup.string().required('Выберите значение статуса'),
});

const uid = generateUId();


const StatusFormModal = ({
                             defaultStatuses,
                             status,
                             isLoading,
                             getStatuses,
                             onSubmit,
                             onToggleModal,
                         }) => {

    useEffect(() => {
        getStatuses({ is_default: true }, uid)
    }, [ getStatuses ]);

    let statusOptions = [
        { value: 'is_default', label: 'По умолчанию'},
        { value: 'closed', label: 'Закрыт'},
        { value: 'approved', label: 'Одобрен'},
        { value: '', label: 'Без значения'},
    ];

    const inputRef = useRef(null);
    let defaultExists = (defaultStatuses && defaultStatuses.count);

    if (status && status.is_default) {
        defaultExists = false;
    }

    if (defaultExists) {
        statusOptions = statusOptions.filter(({ value }) => value !== 'is_default');
    }

    const detectStatusType = () => {
        let statusType = '';
        Object.keys(status).map((key) => {
            if (status[key]) {
                statusType = statusOptions.find(({ value }) => value === key);
            }
        });
        return statusType;
    };

    if (status) {
        formValues = {
            name: status.name,
            status_type: detectStatusType(),
        };
    } else {
        formValues = initialValues;
    }

    setTimeout(() => inputRef.current && inputRef.current.focus());

    return (
        <Modal
            show
            onHide={() => null}
            centered
        >
            <Modal.Body>
                <p className="text-center mt-1 mb-2">{status ? 'Редактировать' :'Создать'} статус
                    { defaultExists ? (
                        <OverlayTrigger
                            trigger={['hover', 'focus']}
                            placement="right"
                            overlay={
                                <Popover>
                                    <Popover.Content>
                                        Можно создать только один статус со значением "По умолчанию".<br/>
                                        Можете его изменить или <br/>
                                        удалить и создать новый
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <Info
                                className="ml-2"
                                color="orange"/>
                        </OverlayTrigger>
                    ) : null}
                </p>
                <Formik
                    enableReinitialize
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const data = copyObject(values);
                        if (status) {
                            statusOptions.map(({ value }) => {
                                if (value) {
                                    data[value] = false;
                                }
                            })
                        }
                        if (data.status_type && data.status_type.value) {
                            data[data.status_type.value] = true;
                        }
                        delete data.status_type;
                        onSubmit(data);
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          setFieldValue,
                          setFieldTouched,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Введите наименование статуса"
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
                                <DropDown
                                    placeholder="Выберите значение статуса"
                                    options={statusOptions}
                                    value={values.status_type}
                                    onBlur={(e) => setFieldTouched('status_type', e || '')}
                                    onChange={(e) => setFieldValue('status_type', e || '')}
                                />
                            </Form.Group>
                            {touched.status_type && errors.status_type ? (
                                <p className="mt-1 invalid-feedback-visible">{errors.status_type}</p>
                            ) : null}
                            <div className="text-center">
                                <Button
                                    onClick={() => onToggleModal(false)}
                                    className="mr-2"
                                    variant="outline-danger">Закрыть
                                </Button>
                                <PrimaryButton
                                    disabled={isLoading}
                                    text={ status ? 'Сохранить' : 'Создать'}
                                    type="submit">
                                </PrimaryButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};


const mapDispatchToProps = {
    getStatuses,
};


const mapStateToProps = () => {
    const statusesSelector = statusesState(uid);

    return (state) =>({
        isLoading: isLoadingSelector(state),
        defaultStatuses: statusesSelector(state),
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusFormModal);
