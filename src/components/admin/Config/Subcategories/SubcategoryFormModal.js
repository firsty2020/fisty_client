import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { DropDown } from '../../../ui';
import { connect } from 'react-redux';
import { categoriesSelector } from '../configsReducer';
import { getCategories } from '../configsActions';
import {
    copyObject,
    generateSelectOptions,
    transformReactSelectFields
} from '../../../../helpers/utils';
import * as Yup from 'yup';
import {isLoadingSelector} from '../../../common/commonReducer';


const validationSchema = Yup.object().shape({
    category: Yup.string().required('Выберите категорию'),
    name: Yup.string().required('Введите наименование подкатегории')
});

let formValues = {};

const initialValues = {
    category: '',
    name: '',
};


const SubcategoryFormModal = ({
                                  isLoading,
                                  subcategory,
                                  categories,
                                  getCategories,
                                  onSubmit,
                                  onClose,
                              }) => {

    useEffect(() => {
        getCategories();
    }, [ getCategories ]);

    const generateOptions = () => generateSelectOptions(((categories || {}).results || []), 'url', 'name');

    if (categories && subcategory) {
        formValues = {
            name: subcategory.name,
            category: generateOptions().find((item) => item.value === subcategory.category)
        };
    } else {
        formValues = initialValues;
    }

    return (
        <Modal
            show
            onHide={() => null}
            centered
        >
            <Modal.Body>
                <p className="text-center mt-1">{subcategory ? 'Редактировать' : 'Создать'} подкатегорию</p>
                <Formik
                    enableReinitialize
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const data = copyObject(values);
                        const transformedData = transformReactSelectFields(['category'], data);
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
                          setFieldValue,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <DropDown
                                    isDisabled={!categories || !categories.results.length}
                                    name="category"
                                    value={values.category}
                                    onBlur={(e) => setFieldTouched('category', e)}
                                    onChange={(e) => setFieldValue('category', e)}
                                    options={generateOptions()}
                                    placeholder="Выберите категорию"
                                />
                                {touched.category && errors.category ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.category}</p>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Наименование подкатегории"
                                />
                                {touched.name && errors.name ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.name}</p>
                                ) : null}
                            </Form.Group>
                            <div className="text-center">
                                <Button
                                    onClick={(() => onClose())}
                                    className="mr-2"
                                    variant="outline-danger">Закрыть
                                </Button>
                                <Button
                                    disabled={isLoading}
                                    variant="warning"
                                    type="submit">{subcategory ? 'Сохранить' : 'Создать'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};


const mapStateToProps = state => ({
    categories: categoriesSelector(state),
    isLoading: isLoadingSelector(state),
});

const mapDispatchToProps = {
    getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubcategoryFormModal);
