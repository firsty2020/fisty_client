import React, {useEffect} from 'react';
import { Formik } from 'formik';
import { dynamicFieldSchema } from '../../../helpers/schemas';
import { Button, Container, Form } from 'react-bootstrap';
import Select from 'react-select';
import { getLocations } from '../Configs/configsActions';
import { connect } from 'react-redux';
import { locationsSelector } from '../Configs/configsReducer';
import { generateSelectOptions } from '../../../helpers/utils';
import { getBranches } from '../Branches/branchActions';
import { branchesSelector } from '../Branches/branchReducer';
import { DropDown } from '../../ui';


const ProjectForm = ({ locations, branches, match, getBranches, getLocations }) => {

    useEffect(() => {
        const params = { show_all: true, company: match.params.companyId };
        getLocations(params.show_all);
        getBranches(params);
    }, [ getLocations, getBranches, match.params.companyId ]);

    return (
        <Container>
            <Formik
                enableReinitialize
                initialValues={{
                    name: '',
                    location: '',
                    branch: [],
                }}
                validationSchema={dynamicFieldSchema}
                onSubmit={(values) => {
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
                        <p className="form-control-label">Наименование *</p>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Введите наименование"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.name && errors.name ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.name}</span>
                            ) : null}
                        </Form.Group>
                       <p className="form-control-label">Местонахождение</p>
                        <Form.Group>
                            <DropDown
                                name="location"
                                value={values.location}
                                options={generateSelectOptions(locations, 'url', 'name')}
                                placeholder="Выберите из списка"
                                onBlur={(e) => setFieldTouched('location', e)}
                                onChange={(e) => setFieldValue('location', e)}
                            />
                            {touched.location && errors.location ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.location}</span>
                            ) : null}
                        </Form.Group>
                        <p className="form-control-label">Бранчи</p>
                        <Form.Group>
                            <DropDown
                                name="branch"
                                value={values.branch}
                                options={generateSelectOptions(branches, 'url', 'name')}
                                placeholder="Выберите из списка"
                                onBlur={(e) => setFieldTouched('branch', e)}
                                onChange={(e) => setFieldValue('branch', e)}
                            />
                            {touched.branch && errors.branch ? (
                                <span className="mt-1 invalid-feedback-visible">{errors.branch}</span>
                            ) : null}
                        </Form.Group>
                        <Button
                            className="mr-1"
                            variant="secondary" >Отменить</Button>
                        <Button
                            type="submit"
                            variant="warning"
                            disabled={false}>{false ? 'Сохранить' : 'Создать'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
};


const mapStateToProps = state => ({
    locations: locationsSelector(state),
    branches: branchesSelector(state),
});

const mapDispatchToProps = { getLocations, getBranches };


ProjectForm.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);

