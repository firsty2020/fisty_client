import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button, Alert } from 'react-bootstrap';
import { loadQuestions, submitAnswers } from './questions';
import { loadQuestionsSucceed, submitAnswerPending, submitAnswerSuccess } from './dashboardReducer';
import Question from './Question';

const QuestionsModal = ({ loadQuestions, questions, thresholdPassed, submitAnswers, submitPending }) => {

    const [ showQuestions, setShowQuestions ] = useState(false);
    const [ userAnswers, setUserAnswers ] = useState([]);
    const [ showAlert, setShowAlert ] = useState('');

    useEffect(() => {
        loadQuestions();
    }, [ loadQuestions ]);

    useEffect(() => {
        if (questions && questions.length) {
            setShowQuestions(true);
        }
    }, [questions]);

    useEffect(() => {
        if (thresholdPassed === undefined) return;
        if (thresholdPassed) {
            setShowAlert('success');
        } else {
            setShowAlert('fail');
        }
        setShowQuestions(false);
    }, [ thresholdPassed ]);

    const handleSelectAnswer = (answer) => {
        const a = userAnswers.findIndex(i => i.question_id === answer.question_id);
        if (a >= 0) {
            const answers = userAnswers.slice();
            answers[a] = answer;
            return setUserAnswers(answers);
        }
        setUserAnswers([...userAnswers, answer]);
    };

    const handleSubmitAnswers = () => {
        if (userAnswers.length < questions.length) return;
        submitAnswers(userAnswers);
    };

    let alert;
    const failAlert = (
        <Alert variant="danger">
            <Alert.Heading>Oh snap! You failed!</Alert.Heading>
            <p>
                You did not pass minimal threshold.
                Our administrators will contact you for further details;
            </p>
        </Alert>
    );

    const successAlert = (
        <Alert variant="success">
            <Alert.Heading>Yeah! You did it!</Alert.Heading>
            <p>
                Your account is activate now!
            </p>
        </Alert>
    );

    if (showAlert === 'success') {
        alert = successAlert;
    } else if (showAlert === 'fail') {
        alert = failAlert;
    }

    return (
        <div>
            {showAlert ? alert : null }
            <Modal
                show={showQuestions}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <p>Welcome to Firsty!</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Answer these questions to activate your account.</p>
                    {questions && questions.length  ?
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
                        onClick={handleSubmitAnswers}
                    >Confirm</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsModal);
