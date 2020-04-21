import React, {useEffect} from 'react';
import { Formik } from 'formik';
import { Button, Col, Form } from 'react-bootstrap';
import { getLocations } from '../Config/configsActions';
import { connect } from 'react-redux';
import { locationsSelector } from '../Config/configsReducer';
import {
    clearEmptyFields,
    copyObject,
    generateSelectOptions,
    transformReactSelectFields
} from '../../../helpers/utils';
import { getBranches } from '../Branch/branchActions';
import { branchesSelector } from '../Branch/branchReducer';
import { DropDown, RadioButton } from '../../ui';
import CountriesDropdown from '../../auth/Registration/CountriesDropdown';
import { Link } from 'react-router-dom';
import { projectSchema } from '../../../helpers/schemas';
import { isLoadingSelector } from '../../common/commonReducer';
import { When } from 'react-if';


const ProjectForm = ({
                         locations,
                         branches,
                         match,
                         backPath,
                         isLoading,
                         getBranches,
                         getLocations,
                         onSubmit,
                     }) => {

    useEffect(() => {
        const params = { show_all: true };
        getLocations(params);
        getBranches({ ...params,  company: match.params.companyId });
    }, [ getLocations, getBranches, match.params.companyId ]);

    const handleLocationTypeChange = (setFieldValue, fieldValue) => {
        setFieldValue('location_type', fieldValue);
        if (fieldValue === 'location') {
            setFieldValue('branch', []);
        } else {
            setFieldValue('location', '');
        }
    };

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    name: '',
                    citizenship: '',
                    age: { from: '', to: ''},
                    responsibilities: '',
                    target_action_count: '',
                    target_action_amount: '',
                    recruiter: '',
                    location: '',
                    branch: '',
                    location_type: '',
                }}
                validationSchema={projectSchema}
                onSubmit={(values) => {
                    const data = copyObject(clearEmptyFields(values));
                    const transformedData = transformReactSelectFields(['citizenship', 'location', 'branch'], data);
                    transformedData.age = [ values.age.from, values.age.to ];
                    delete transformedData.location_type;
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
                            <p className="form-control-label">Название *</p>
                            <Form.Control
                                name="name"
                                placeholder="Введите название проекта"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.name && errors.name ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.name}</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <p className="form-control-label">Гражданство *</p>
                            <CountriesDropdown
                                extended
                                value={values.citizenship}
                                name="citizenship"
                                placeHolder="Выберите из списка"
                                onBlur={(e) => setFieldTouched('citizenship', e || [])}
                                onChange={(e) => setFieldValue('citizenship', e || [])}
                                className={touched.citizenship && errors.citizenship ? 'is-invalid' : ''}
                            />
                            {touched.citizenship && errors.citizenship ? (
                                <p className="mt-1 invalid-feedback-visible">{errors.citizenship}</p>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <p className="form-control-label">Возраст *</p>
                            <Form.Row className="d-flex">
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name="age.from"
                                        placeholder="от"
                                        value={values.age.from}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {touched.age && touched.age.from && errors.age && errors.age.from? (
                                        <p className="mt-1 invalid-feedback-visible">{errors.age.from}</p>
                                    ) : null}
                                </Col>
                                -
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name="age.to"
                                        placeholder="до"
                                        value={values.age.to}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <p className="form-control-label">Требования *</p>
                            <Form.Control
                                as="textarea"
                                name="responsibilities"
                                placeholder="Опишите требования"
                                value={values.responsibilities}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.responsibilities && errors.responsibilities ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.responsibilities}</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <p className="form-control-label">Общее количество ЦД *</p>
                            <Form.Control
                                type="number"
                                name="target_action_count"
                                placeholder="Введите количество"
                                value={values.target_action_count}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.target_action_count && errors.target_action_count ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.target_action_count}</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <p className="form-control-label">Стоимость ЦД *</p>
                            <Form.Control
                                type="number"
                                name="target_action_amount"
                                placeholder="Введите стоимость"
                                value={values.target_action_amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.target_action_amount && errors.target_action_amount ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.target_action_amount}</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <p className="form-control-label">Местонахождение</p>
                            <RadioButton
                                custom
                                value={values.location_type}
                                name="location_type"
                                label="Бранч"
                                onChange={() =>  handleLocationTypeChange(setFieldValue, 'branch')}
                                onBlur={(e) => setFieldTouched('location_type', e)}
                            />
                            <RadioButton
                                custom
                                value={values.location_type}
                                name="location_type"
                                label="Регион"
                                onChange={() => handleLocationTypeChange(setFieldValue, 'location')}
                                onBlur={(e) => setFieldTouched('location_type', e)}
                            />
                            {touched.location_type && errors.location_type ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.location_type}</span>
                            ) : null}
                        </Form.Group>
                        <When condition={values.location_type === 'location'}>
                            <Form.Group>
                                <DropDown
                                    name="location"
                                    value={values.location}
                                    options={generateSelectOptions(locations, 'url', 'name')}
                                    placeholder="Выберите из списка"
                                    onBlur={(e) => setFieldTouched('location', e || '')}
                                    onChange={(e) => setFieldValue('location', e || '')}
                                    isClearable
                                />
                                {touched.location && errors.location ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.location}</span>
                                ) : null}
                            </Form.Group>
                        </When>
                        <When condition={values.location_type === 'branch'}>
                            <Form.Group>
                                <DropDown
                                    name="branch"
                                    value={values.branch}
                                    options={generateSelectOptions(branches, 'url', 'name')}
                                    placeholder="Выберите из списка"
                                    onBlur={(e) => setFieldTouched('branch', e || [])}
                                    onChange={(e) => setFieldValue('branch', e || [])}
                                    isMulti
                                />
                                {touched.branch && errors.branch ? (
                                    <span className="mt-1 invalid-feedback-visible">{errors.branch}</span>
                                ) : null}
                            </Form.Group>
                        </When>
                        <Form.Group>
                            <p className="form-control-label">Рекрутеры</p>
                            <DropDown
                                name="recruiter"
                                placeholder="Выберите из списка"
                                value={values.recruiter}
                                options={[]}
                                onBlur={(e) => setFieldTouched('recruiter', e)}
                                onChange={(e) => setFieldValue('recruiter', e)}
                            />
                            {touched.recruiter && errors.recruiter ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.recruiter}</span>
                            ) : null}
                        </Form.Group>
                        <div className="text-center">
                            <Link to={backPath}>
                                <Button
                                    className="mr-2"
                                    variant="outline-danger">Отменить
                                </Button>
                            </Link>
                            <Button
                                disabled={isLoading}
                                variant="warning"
                                type="submit">{false ? 'Сохранить' : 'Создать'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
};


const mapStateToProps = state => ({
    locations: locationsSelector(state),
    branches: branchesSelector(state),
    isLoading: isLoadingSelector(state),
});

const mapDispatchToProps = { getLocations, getBranches };


ProjectForm.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);

