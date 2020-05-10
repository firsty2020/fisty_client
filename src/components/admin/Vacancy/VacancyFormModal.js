import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { DropDown } from '../../ui';
import { connect } from 'react-redux';
import {
    categoriesSelector,
    subcategoriesSelector
} from '../Config/configsReducer';
import { getCategories, getSubcategories } from '../Config/configsActions';
import {
    copyObject,
    generateSelectOptions,
    transformReactSelectFields
} from '../../../helpers/utils';
import * as Yup from 'yup';
import { isLoadingSelector } from '../../common/commonReducer';


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Введите наименование подкатегории'),
    category: Yup.string().required('Выберите категорию'),
    sub_category: Yup.string().required('Выберите подкатегорию'),
});

let formValues = {};

const initialValues = {
    name: '',
    category: '',
    sub_category: '',
};


const VacancyFormModal = ({
                              isLoading,
                              vacancy,
                              categories,
                              subcategories,
                              getCategories,
                              getSubcategories,
                              onSubmit,
                              onClose,
                          }) => {

    const [ filteredSubcategories, setFilteredSubcategories ] = useState((subcategories || {}).results || []);

    useEffect(() => {
        getCategories();
        getSubcategories();
    }, [ getCategories, getSubcategories ]);

    useEffect(() => {
        if (vacancy && subcategories) {
            const categoryUrl = findCategoryUrl(vacancy.sub_category);
            const filteredSubcategories = (subcategories || {}).results
                .filter((subcategory) => subcategory.category === categoryUrl);
            setFilteredSubcategories(filteredSubcategories);
        }
    },  [ vacancy, subcategories ]);


    const generateOptions = (list) => generateSelectOptions(list, 'url', 'name');

    const createFormValues = () => {
        const { name, sub_category } = vacancy;
        const _sub_category = generateOptions((subcategories || {}).results)
            .find((item) => item.value === sub_category);
        const _category = findCategoryUrl(_sub_category.value);
        const category = generateOptions((categories|| {}).results)
            .find((item) => item.value === _category);
        return { sub_category: _sub_category, name, category }
    };

    const findCategoryUrl = (subcategoryUrl) =>
        ((subcategories || {}).results.find((subcategory) => subcategory.url === subcategoryUrl) || {}).category;

    if (categories && subcategories && vacancy) {
        formValues = createFormValues();
    } else {
        formValues = initialValues;
    }

    const handleCategoryChange = (e, setFieldValue) => {
        updateSelectedValues(e, setFieldValue);
        updateSubcategoryOptions(e.value);
    };

    const updateSelectedValues = (e, setFieldValue) => {
        setFieldValue('category', e);
        setFieldValue('sub_category', '');
    };

    const updateSubcategoryOptions = (categoryUrl) => {
        const _filteredSubcategories = (subcategories || {}).results
            .filter((subcategory) => subcategory.category === categoryUrl);
        setFilteredSubcategories(_filteredSubcategories);
    };


    return (
        <Modal
            show
            onHide={() => null}
            centered
        >
            <Modal.Body>
                <p className="text-center mt-1">{vacancy ? 'Редактировать' : 'Создать'} вакансию</p>
                <Formik
                    enableReinitialize
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const data = copyObject(values);
                        const transformedData = transformReactSelectFields(['category', 'sub_category'], data);
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
                                    onChange={(e) => handleCategoryChange(e, setFieldValue, values.sub_category)}
                                    options={generateOptions((categories|| {}).results)}
                                    placeholder="Выберите категорию"
                                />
                                {touched.category && errors.category ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.category}</p>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <DropDown
                                    isDisabled={!values.category}
                                    name="sub_category"
                                    value={values.sub_category}
                                    onBlur={(e) => setFieldTouched('sub_category', e)}
                                    onChange={(e) => setFieldValue('sub_category', e)}
                                    options={generateOptions(filteredSubcategories)}
                                    placeholder="Выберите подкатегорию"
                                />
                                {touched.sub_category && errors.sub_category ? (
                                    <p className="mt-1 invalid-feedback-visible">{errors.sub_category}</p>
                                ) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Наименование вакансии"
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
                                    type="submit">{vacancy ? 'Сохранить' : 'Создать'}
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
    subcategories: subcategoriesSelector(state),
    isLoading: isLoadingSelector(state),
});

const mapDispatchToProps = {
    getCategories,
    getSubcategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(VacancyFormModal);
