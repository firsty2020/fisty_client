import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {Modal, Button, Alert, Form } from 'react-bootstrap';
import { arrayOf, string, shape, bool, func } from 'prop-types';
import { When } from 'react-if';
import { Formik } from 'formik';
import  { loadQuestions, submitAnswers } from './questionsApi';
import { validationQuestionsSchema } from '../../../validation';
import {
    questionsSelector,
    submitAnswerPendingSelector,
    thresholdPassedSelector
} from './dashboardReducer';
import Question from './Question';


let submitFormik;


const QuestionsModal = ({
                            questions,
                            thresholdPassed,
                            submitPending,
                            loadQuestions,
                            submitAnswers,
                        }) => {

    const [ userAnswers, setUserAnswers ] = useState([]);

    useEffect(() => {
        loadQuestions();
    }, [ loadQuestions ]);

    const handleSelectAnswer = (answer) => {
        const a = userAnswers.findIndex(i => i.question_id === answer.question_id);
        if (a >= 0) {
            const answers = userAnswers.slice();
            answers[a] = answer;
            return setUserAnswers(answers);
        }
        setUserAnswers([ ...userAnswers, answer ]);
    };

    const handleSubmitAnswers = () => {
        if (userAnswers.length < questions.length) return;
        submitAnswers(userAnswers);
    };

    return (
        <div>
            <When condition={!!thresholdPassed}>
                <Alert variant="success">
                    <Alert.Heading>Отлично!</Alert.Heading>
                    <p>Теперь ваш аккaунт активен!</p>
                </Alert>
            </When>
            <When condition={thresholdPassed === false}>
                <Alert variant="danger">
                    <Alert.Heading>О нет!</Alert.Heading>
                    <p>Вы не дали нужное количество правильных ответов.</p>
                </Alert>
            </When>
            <Modal
                show={questions && thresholdPassed === undefined}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <p>Добро пожаловать!</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Ответьте на эти вопросы чтобы активировать ваш аккаунт.</p>
                    <Formik
                        initialValues={{
                            year: -1,
                            month: -1,
                            day: -1,
                            education: -1,
                            languages: [],
                            gender: -1
                        }}
                        validationSchema={validationQuestionsSchema}
                        onSubmit={(values) => {
                            console.log(values, 'values')
                            handleSubmitAnswers();
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
                              setFieldTouched,
                              setFieldValue,
                          }) => {
                            submitFormik = submitForm;
                            return (
                                <Form onSubmit={handleSubmit}>

                                </Form>
                            )}}
                    </Formik>
                    <hr/>
                    {questions && questions.length ?
                        questions.map((question, i) =>
                            <Question
                                key={question.url}
                                question={question}
                                onAnswer={handleSelectAnswer}
                                index={i}
                            />)
                        : null
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        size="lg"
                        type="submit"
                        block
                        disabled={submitPending}
                        onClick={() => submitFormik()}>Ввод
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


const mapStateToProps = state => ({
    questions: questionsSelector(state),
    thresholdPassed: thresholdPassedSelector(state),
    submitPending: submitAnswerPendingSelector(state),
});

const mapDispatchToProps = { loadQuestions, submitAnswers };

QuestionsModal.propTypes = {
    questions: arrayOf(shape({
        url: string.isRequired,
        question: string.isRequired,
    })),
    thresholdPassed: bool,
    submitPending: bool,
    loadQuestions: func.isRequired,
    submitAnswers: func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionsModal);
