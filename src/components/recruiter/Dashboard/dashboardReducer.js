import {
    DASHBOARD_QUESTIONS_LOAD_PENDING,
    DASHBOARD_QUESTIONS_LOAD_SUCCESS,
    DASHBOARD_QUESTIONS_LOAD_ERROR,
    DASHBOARD_ANSWERS_SUBMIT_PENDING,
    DASHBOARD_ANSWERS_SUBMIT_ERROR,
    DASHBOARD_ANSWERS_SUBMIT_SUCCESS
} from '../../../constants/actionTypes';

export const dashboard = (state = {questions: []}, action) => {
    switch (action.type) {
        case DASHBOARD_QUESTIONS_LOAD_PENDING:
            return ({pending: true, success: false, error: false});
        case DASHBOARD_QUESTIONS_LOAD_SUCCESS:
            return ({pending: false, questions: action.payload, error: false});
        case DASHBOARD_QUESTIONS_LOAD_ERROR:
            return ({error: action.payload, pending: false, success: false});
        case DASHBOARD_ANSWERS_SUBMIT_PENDING:
            return ({...state, answerSubmitPending: true});
        case DASHBOARD_ANSWERS_SUBMIT_SUCCESS:
            return ({
                ...state,
                answerSubmitPending: false,
                thresholdPassed: action.payload
            });
        case DASHBOARD_ANSWERS_SUBMIT_ERROR:
            return ({
                ...state,
                answerSubmitPending: false,
                error: action.payload
            });
        default:
            return state;
    }
};

export const loadQuestionsSucceed = state => state.dashboard.questions;
export const submitAnswerPending = state => state.dashboard.answerSubmitPending;
export const submitAnswerSuccess = state => state.dashboard.thresholdPassed;

