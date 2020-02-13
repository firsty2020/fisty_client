import {
    DASHBOARD_QUESTIONS_LOAD_SUCCESS,
    DASHBOARD_QUESTIONS_LOAD_ERROR,
    DASHBOARD_QUESTIONS_LOAD_PENDING,
    DASHBOARD_ANSWERS_SUBMIT_PENDING,
    DASHBOARD_ANSWERS_SUBMIT_SUCCESS,
    DASHBOARD_ANSWERS_SUBMIT_ERROR,
} from '../../../constants/actionTypes';


export const loadQuestionsPending = () => ({
    type: DASHBOARD_QUESTIONS_LOAD_PENDING,
});

export const loadQuestionsSuccess = (questions) => ({
    type: DASHBOARD_QUESTIONS_LOAD_SUCCESS,
    payload: questions,
});

export const loadQuestionsError = (error) => ({
    type: DASHBOARD_QUESTIONS_LOAD_ERROR,
    payload: error,
});

export const submitAnswersPending = () => ({
    type: DASHBOARD_ANSWERS_SUBMIT_PENDING,
});

export const submitAnswersSuccess = (questions) => ({
    type: DASHBOARD_ANSWERS_SUBMIT_SUCCESS,
    payload: questions,
});

export const submitAnswersError = (error) => ({
    type: DASHBOARD_ANSWERS_SUBMIT_ERROR,
    payload: error,
});
