import {
    DASHBOARD_QUESTIONS_LOAD_PENDING,
    DASHBOARD_QUESTIONS_LOAD_RESOLVED,
    DASHBOARD_QUESTIONS_LOAD_FAILED,
    DASHBOARD_ANSWERS_SUBMIT_PENDING,
    DASHBOARD_ANSWERS_SUBMIT_FAILED,
    DASHBOARD_ANSWERS_SUBMIT_RESOLVED
} from '../../constants/actionTypes';

export const dashboard = (state = { questions: []}, action) => {
    switch (action.type) {
        case DASHBOARD_QUESTIONS_LOAD_PENDING:
            return ({ pending: true, success: false, error: null });
        case DASHBOARD_QUESTIONS_LOAD_RESOLVED:
            return ({ pending: false, questions: action.payload, error: null });
        case DASHBOARD_QUESTIONS_LOAD_FAILED:
            return ({ error: action.payload, pending: false, success: false });
        case DASHBOARD_ANSWERS_SUBMIT_PENDING:
            return ({ ...state, answerSubmitPending: true });
        case DASHBOARD_ANSWERS_SUBMIT_RESOLVED:
            return ({
                ...state,
                answerSubmitPending: false,
                thresholdPassed: action.payload
            });
        case DASHBOARD_ANSWERS_SUBMIT_FAILED:
            return ({
                ...state,
                answerSubmitPending: false,
                error: action.payload
            });
        default:
            return state;
    }
};

export const questionsSelector = state => state.dashboard.questions;
export const submitAnswerPendingSelector = state => state.dashboard.answerSubmitPending;
export const thresholdPassedSelector = state => state.dashboard.thresholdPassed;

