import {
    DASHBOARD_QUESTIONS_LOAD_RESOLVED,
    DASHBOARD_QUESTIONS_LOAD_FAILED,
    DASHBOARD_QUESTIONS_LOAD_PENDING,
    DASHBOARD_ANSWERS_SUBMIT_PENDING,
    DASHBOARD_ANSWERS_SUBMIT_RESOLVED,
    DASHBOARD_ANSWERS_SUBMIT_FAILED,
} from '../../constants/actionTypes';


export const loadQuestionsPending = () => ({
    type: DASHBOARD_QUESTIONS_LOAD_PENDING,
});

export const loadQuestionsResolved = (questions) => ({
    type: DASHBOARD_QUESTIONS_LOAD_RESOLVED,
    payload: questions,
});

export const loadQuestionsFailed = (error) => ({
    type: DASHBOARD_QUESTIONS_LOAD_FAILED,
    payload: error,
});

export const submitAnswersPending = () => ({
    type: DASHBOARD_ANSWERS_SUBMIT_PENDING,
});

export const submitAnswersResolved = (questions) => ({
    type: DASHBOARD_ANSWERS_SUBMIT_RESOLVED,
    payload: questions,
});

export const submitAnswersFailed = (error) => ({
    type: DASHBOARD_ANSWERS_SUBMIT_FAILED,
    payload: error,
});
