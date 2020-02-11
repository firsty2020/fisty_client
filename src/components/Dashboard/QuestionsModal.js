import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button, Alert } from 'react-bootstrap';
import { arrayOf, string, shape, bool, func } from 'prop-types';
import { When } from 'react-if';
import  { loadQuestions, submitAnswers } from './questions';
import {
    loadQuestionsSucceed,
    submitAnswerPending,
    submitAnswerSuccess
} from './dashboardReducer';
import Question from './Question';


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
                    <p>Теперь ваш аккоунт активен!</p>
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
                    {questions && questions.length ?
                        questions.map((question, i) => <Question
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
                        block
                        disabled={submitPending}
                        onClick={handleSubmitAnswers}>Ввод
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => ({
    questions: loadQuestionsSucceed(state),
    thresholdPassed: submitAnswerSuccess(state),
    submitPending: submitAnswerPending(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
    { loadQuestions, submitAnswers }, dispatch);

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
