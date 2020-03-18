import React  from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { arrayOf, string, shape, bool, func } from 'prop-types';
import { Formik } from 'formik';
import { When } from 'react-if';
import { validationQuestionsSchema } from '../../helpers/schemas';
import Select from 'react-select';


const sitesOptions = [
    { value: 'hh.ru', label: 'hh.ru' },
    { value: 'avito.ru', label: 'avito.ru' },
    { value: 'rabota.ru', label: 'rabota.ru' },
];


const QuestionsModal = ({ thresholdPassed, submitPending }) => {

    return (
        <div>
            <Modal
                show={thresholdPassed === undefined}
                size="lg"
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        <p>Добро пожаловать!</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Ответьте на эти вопросы чтобы активировать ваш аккаунт:</p>
                    <Formik
                        initialValues={{
                            hasExperience: undefined,
                            experience: '',
                            personnel: -1,
                            hasSite_access: undefined,
                            site_access: '',
                            term: -1,
                        }}
                        validationSchema={validationQuestionsSchema}
                        onSubmit={(values) => {
                            // handleSubmitAnswers();
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              submitForm,
                              setFieldValue,
                              setFieldTouched,
                          }) => (
                                <Form onSubmit={handleSubmit}>
                                    <p>1. Есть ли у вас опыт подбора персонала?</p>
                                    <Form.Group>
                                        <Form.Check
                                            value={values.hasExperience}
                                            type="radio"
                                            custom
                                            label="да"
                                            name="hasExperience"
                                            id="recruiter-experience-yes"
                                            onChange={() => setFieldValue('hasExperience', true)}
                                            onBlur={(e) => setFieldTouched('hasExperience', e)}
                                        />
                                        <Form.Check
                                            value={values.hasExperience}
                                            onChange={() => setFieldValue('hasExperience', false)}
                                            onBlur={(e) => setFieldTouched('hasExperience', e)}
                                            type="radio"
                                            custom
                                            label="нет"
                                            name="hasExperience"
                                            id="recruiter-experience-no"
                                        />
                                        {touched.hasExperience && errors.hasExperience ? (
                                            <span className="mt-1 invalid-feedback-visible">{errors.hasExperience}</span>
                                        ) : null}
                                        <When condition={!!values.hasExperience}>
                                            <Form.Row className="pl-0">
                                                <Col>
                                                    <span>Сколько лет / месяцев?</span>
                                                    <Form.Control
                                                        value={values.experience}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        type="text"
                                                        placeholder="Опыт работы в годах"
                                                        name="experience"
                                                    />
                                                    {touched.experience && errors.experience ? (
                                                        <span className="mt-1 invalid-feedback-visible">{errors.experience}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <span>Укажите какой персонал вы искали</span>
                                                    <Form.Control
                                                        value={values.personnel}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        as="select"
                                                        type="text"
                                                        name="personnel"
                                                    >
                                                        <option value="Рабочий персонал">Рабочий персонал</option>
                                                        <option value="Линейный персонал (персонал в офис)">Линейный персонал (персонал в офис)</option>
                                                        <option value="Высший менеджмент">Высший менеджмент</option>
                                                        <option value="-1" disabled>Выберите из списка</option>
                                                    </Form.Control>
                                                    {touched.personnel && errors.personnel ? (
                                                        <span className="mt-1 invalid-feedback-visible">{errors.personnel}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                        </When>
                                    </Form.Group>
                                    <p>2. Есть ли у вас доступ к работным сайтам?</p>
                                    <Form.Group>
                                        <Form.Check
                                            value={values.hasSite_access}
                                            type="radio"
                                            custom
                                            label="да"
                                            name="hasSite_access"
                                            id="hasSite_access-yes"
                                            onChange={() => setFieldValue('hasSite_access', true)}
                                            onBlur={handleBlur}
                                        />
                                        <Form.Check
                                            value={values.hasSite_access}
                                            onChange={() => setFieldValue('hasSite_access', false)}
                                            onBlur={handleBlur}
                                            type="radio"
                                            custom
                                            label="нет"
                                            name="hasSite_access"
                                            id="hasSite_access-no"
                                        />
                                        {touched.hasSite_access && errors.hasSite_access ? (
                                            <span className="mt-1 invalid-feedback-visible">{errors.hasSite_access}</span>
                                        ) : null}
                                        <When condition={!!values.hasSite_access}>
                                            <Col className="pl-0">
                                                <span>К каким работным сайтам у вас есть доступ?</span>
                                                <Select
                                                    name="site_access"
                                                    value={values.site_access}
                                                    onBlur={(e) => setFieldTouched('site_access', e)}
                                                    onChange={(e) => setFieldValue('site_access', e)}
                                                    options={sitesOptions}
                                                    placeholder="Выберите сайты"
                                                    isMulti>
                                                </Select>
                                                {touched.site_access && errors.site_access ? (
                                                    <span className="mt-1 invalid-feedback-visible">{errors.site_access}</span>
                                                ) : null}
                                            </Col>
                                        </When>
                                    </Form.Group>
                                    <p>3. Как вы рассматриваете сотрудничество с нами?</p>
                                    <Form.Group>
                                        <Form.Check
                                            value={values.term}
                                            type="radio"
                                            custom
                                            label="Полная занятость"
                                            name="term"
                                            id="term-yes"
                                            onChange={() => setFieldValue('term', 'Полная занятость')}
                                            onBlur={(e) => setFieldTouched('term', e)}
                                        />
                                        <Form.Check
                                            value={values.hasExperience}
                                            onChange={() => setFieldValue('term', 'Частичная занятость')}
                                            onBlur={(e) => setFieldTouched('term', e)}
                                            type="radio"
                                            custom
                                            label="Частичная занятость"
                                            name="term"
                                            id="term-no"
                                        />
                                        {touched.term && errors.term ? (
                                            <span className="mt-1 invalid-feedback-visible">{errors.term}</span>
                                        ) : null}
                                    </Form.Group>
                                    <Button
                                        size="lg"
                                        type="submit"
                                        block
                                        disabled={submitPending}>Ввод
                                    </Button>
                                </Form>
                            )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    );
};


const mapStateToProps = state => ({

});

const mapDispatchToProps = {  };

QuestionsModal.propTypes = {
    questions: arrayOf(shape({
        url: string.isRequired,
        question: string.isRequired,
    })),
    thresholdPassed: bool,
    submitPending: bool,
    submitAnswers: func,
};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionsModal);
