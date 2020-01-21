import {
    loadQuestionsError,
    loadQuestionsSuccess,
    loadQuestionsPending,
    submitAnswersPending,
    submitAnswersError,
    submitAnswersSuccess,
} from './dashboardActions';
import api from '../../axios';


const loadQuestions = () => {
    return dispatch => {
        dispatch(loadQuestionsPending());
        api
            .get('questions/')
            .then((res) => {
                dispatch(loadQuestionsSuccess(res.data))
            })
            .catch(error => dispatch(loadQuestionsError(error)));
    };
};

const submitAnswers = (answers) => {
    return dispatch => {
        dispatch(submitAnswersPending());
        api
            .post('questions/handle-answers/', { answers })
            .then((res) => dispatch(submitAnswersSuccess(res.data)))
            .catch(error => dispatch(submitAnswersError(error)));
    };
};

export {
    loadQuestions,
    submitAnswers,
}
