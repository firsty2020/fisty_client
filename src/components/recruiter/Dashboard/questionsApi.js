import {
    loadQuestionsFailed,
    loadQuestionsResolved,
    loadQuestionsPending,
    submitAnswersPending,
    submitAnswersFailed,
    submitAnswersResolved,
} from './dashboardActions';
import api from '../../../axios';


export const loadQuestions = () => {
    return dispatch => {
        dispatch(loadQuestionsPending());
        api
            .get('questions/')
            .then((res) => {
                dispatch(loadQuestionsResolved(res.data))
            })
            .catch(error => dispatch(loadQuestionsFailed(error)));
    };
};

export const submitAnswers = (answers) => {
    return dispatch => {
        dispatch(submitAnswersPending());
        api
            .post('questions/handle-answers/', {answers})
            .then((res) => dispatch(submitAnswersResolved(res.data)))
            .catch(error => dispatch(submitAnswersFailed(error)));
    };
};
