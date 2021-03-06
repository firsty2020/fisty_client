import React, {useEffect, useState} from 'react';
import { Formik } from 'formik';
import { Button, Col, Form } from 'react-bootstrap';
import { getFlows, getLocations } from '../Config/configsActions';
import { connect } from 'react-redux';
import { flowsSelector, locationsSelector } from '../Config/configsReducer';
import {
    clearEmptyFields,
    copyObject,
    generateSelectOptions,
    transformReactSelectFields
} from '../../../helpers/utils';
import { getBranches } from '../Branch/branchActions';
import { branchesSelector } from '../Branch/branchReducer';
import {ConfirmationModal, DropDown, RadioButton} from '../../ui';
import CountriesDropdown from '../../auth/Registration/CountriesDropdown';
import { Link } from 'react-router-dom';
import { projectSchema } from '../../../helpers/schemas';
import { isLoadingSelector, usersState } from '../../common/commonReducer';
import { When } from 'react-if';
import { countriesOptions, extendedOptions } from '../../../helpers/utils';
import { getUsers } from '../../common/commonActions';
import { generateUId } from '../../../helpers/utils';


let formValues = {};

const initialValues = {
    name: '',
    citizenship: '',
    age: { from: '', to: ''},
    responsibilities: '',
    target_action_count: '',
    target_action_amount: '',
    recruiter: [],
    location: '',
    branch: '',
    location_type: '',
    manager: '',
    flow: '',
};

const recruitersUid = generateUId();
const projectManagersUid = generateUId();

const ProjectForm = ({
                         locations,
                         branches,
                         recruiters,
                         managers,
                         project,
                         match,
                         flows,
                         backPath,
                         isLoading,
                         getBranches,
                         getLocations,
                         getUsers,
                         onSubmit,
                         getFlows,
                     }) => {

    const [flowModifier, setFlowModifier] = useState(null);

    useEffect(() => {
        const params = { show_all: true };
        getLocations(params);
        getBranches({ ...params,  company: match.params.companyId });
        getUsers({...params, role: 'recruiter'}, recruitersUid);
        getUsers({ ...params, role: 'project_manager' }, projectManagersUid);
        getFlows(params);
    }, [ getLocations, getBranches, match.params.companyId ]);

    const handleLocationTypeChange = (setFieldValue, fieldValue) => {
        setFieldValue('location_type', fieldValue);
        if (fieldValue === 'location') {
            setFieldValue('branch', []);
            if (project) {
                project.branch = [];
            }
        } else {
            setFieldValue('location', '');
            if (project) {
                project.location = null;
            }
        }
    };

    const generateOptions = (list) => {
        if (!list) return [];
        return generateSelectOptions(list.results, 'url', 'name')
    };

    const populateForm = () => {
        const values = {};
        const options = [ ...countriesOptions, ...extendedOptions ];
        const citizenships = project.citizenship
            .map(c => options.find(option => option.value.toLowerCase() === c.toLowerCase()));
        Object.keys(initialValues).map((key) => values[key] = project[key]);
        values.citizenship = citizenships;
        values.age = { from: project.age[0], to: project.age[1] };
        values.location = generateOptions(locations)
            .find((location) => location.value === project.location);
        values.recruiter = setSelectedRecruiters();
        values.manager = generateListOptions(managers.results || []).find(({ value }) => value === project.manager) || '';
        values.branch = (project.branch || [])
            .map((branchUrl) => generateOptions(branches)
                .find((branch) => branch.value === branchUrl));
        values.flow = generateSelectOptions(flows.results, 'url', 'name')
            .find(({value}) => value === project.flow)

        if (project.location) {
            values.location_type = 'location';
        } else {
            values.location_type = 'branch';
        }
        return values;
    };

    const setSelectedRecruiters = () => {
        const selectedRecruiters = [];
        project.recruiters.map((recruiterUrl) => (recruiters.results || []).map((recruiter) => {
            if (recruiterUrl === recruiter.url) {
                selectedRecruiters.push(recruiter);
            }
        }));
        return generateListOptions(selectedRecruiters);
    };

    const generateListOptions = (list) =>
        generateSelectOptions(list,
            'url',
            ({ first_name, last_name }) => `${first_name} ${last_name}`);


    if (project && locations && branches && recruiters && managers && flows) {
        formValues = populateForm();
    } else {
        formValues = initialValues;
    }

    const handleFlowChange = (modifier, value) => {
        if (project) {
            setFlowModifier({modifier, value})
        } else {
            modifier('flow', value || null)
        }
    }

    const changeFlow = () => {
        const { modifier, value } = flowModifier;
        modifier('flow', value);
        setFlowModifier(null);
    }

    return (
        <div>
            <ConfirmationModal
                question="Статус проекта изменится на начальный стаус выбранного процесса."
                onConfirm={changeFlow}
                onCancel={() => setFlowModifier(null)}
                decline="Отменить"
                confirm="Продолжить"
                show={!!flowModifier} />
            <Formik
                enableReinitialize
                initialValues={formValues}
                validationSchema={projectSchema}
                onSubmit={(values) => {
                    const data = copyObject(clearEmptyFields(values));
                    const transformedData = transformReactSelectFields(
                        ['citizenship', 'location', 'branch', 'recruiter', 'manager', 'flow'], data);
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
                            <p className="form-control-label">Рекрутеры</p>
                            <DropDown
                                isDisabled={!recruiters || !recruiters.results}
                                isMulti
                                name="recruiter"
                                placeholder="Выберите из списка"
                                value={values.recruiter}
                                options={generateListOptions((recruiters || []).results)}
                                onBlur={(e) => setFieldTouched('recruiter', e || [])}
                                onChange={(e) => setFieldValue('recruiter', e || [])}
                            />
                            {touched.recruiter && errors.recruiter ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.recruiter}</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <p className="form-control-label">Менеджер проекта</p>
                            <DropDown
                                isDisabled={!managers || !managers.results}
                                isClearable
                                name="manager"
                                placeholder="Выберите из списка"
                                value={values.manager}
                                options={generateListOptions((managers || []).results)}
                                onBlur={(e) => setFieldTouched('manager', e || '')}
                                onChange={(e) => setFieldValue('manager', e || null)}
                            />
                            {touched.manager && errors.manager ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.manager}</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <p className="form-control-label">Процесс</p>
                            <DropDown
                                isDisabled={!flows || !flows.results}
                                isClearable
                                name="flow"
                                placeholder="Выберите из списка"
                                value={values.flow}
                                options={generateSelectOptions((flows || []).results, 'url', 'name')}
                                onBlur={(e) => setFieldTouched('flow', e || '')}
                                onChange={(e) => handleFlowChange(setFieldValue, e)}
                            />
                            {touched.flow && errors.flow ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.flow}</span>
                            ) : null}
                        </Form.Group>
                        <Form.Group>
                            <p className="form-control-label">Местонахождение</p>
                            <RadioButton
                                custom
                                value={values.location_type}
                                checked={values.location_type === 'branch'}
                                name="location_type"
                                label="Бранч"
                                onChange={() =>  handleLocationTypeChange(setFieldValue, 'branch')}
                                onBlur={(e) => setFieldTouched('location_type', e)}
                            />
                            <RadioButton
                                custom
                                checked={values.location_type === 'location'}
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
                                    isDisabled={!locations}
                                    name="location"
                                    value={values.location}
                                    options={generateOptions(locations)}
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
                                    isDisabled={!branches}
                                    name="branch"
                                    value={values.branch}
                                    options={generateOptions(branches)}
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
                                type="submit">{project ? 'Сохранить' : 'Создать'}
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
    recruiters: usersState(recruitersUid)(state),
    managers: usersState(projectManagersUid)(state),
    flows: flowsSelector(state),
});

const mapDispatchToProps = { getLocations, getBranches, getUsers, getFlows };


export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);

