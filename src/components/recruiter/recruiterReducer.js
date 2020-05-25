import {
    RECRUITER_QUESTIONS_LOAD_PENDING,
    RECRUITER_QUESTIONS_LOAD_RESOLVED,
    RECRUITER_QUESTIONS_LOAD_FAILED,
    RECRUITER_ANSWERS_SUBMIT_PENDING,
    RECRUITER_ANSWERS_SUBMIT_FAILED,
    RECRUITER_ANSWERS_SUBMIT_RESOLVED,
    RECRUITER_CANDIDATE_CREATE,
    API_REQUEST,
    API_REQUEST_END, RECRUITER_CANDIDATE_STATE_RESET,
    RECRUITER_CANDIDATE_GET
} from '../../helpers/constants/actionTypes';


export const dashboard = (state = { questions: []}, action) => {
    switch (action.type) {

        case API_REQUEST:
            return { ...state, isLoading: true };

        case API_REQUEST_END:
            return { ...state, isLoading: false };

        case RECRUITER_QUESTIONS_LOAD_PENDING:
            return ({ pending: true, success: false, error: null });

        case RECRUITER_QUESTIONS_LOAD_RESOLVED:
            return ({ pending: false, questions: action.payload, error: null });

        case RECRUITER_QUESTIONS_LOAD_FAILED:
            return ({ error: action.payload, pending: false, success: false });

        case RECRUITER_ANSWERS_SUBMIT_PENDING:
            return ({ ...state, answerSubmitPending: true });

        case RECRUITER_ANSWERS_SUBMIT_RESOLVED:
            return ({
                ...state,
                answerSubmitPending: false,
                thresholdPassed: action.payload
            });

        case RECRUITER_ANSWERS_SUBMIT_FAILED:
            return ({
                ...state,
                answerSubmitPending: false,
                error: action.payload
            });

        case RECRUITER_CANDIDATE_CREATE:
            return { ...state, candidateCreated: true };

        case RECRUITER_CANDIDATE_GET:
            return { ...state, candidates: action.payload };

        case RECRUITER_CANDIDATE_STATE_RESET:
            return { ...state, candidateCreated: false };

        default:
            return state;
    }
};

export const questionsSelector = state => state.dashboard.questions;
export const submitAnswerPendingSelector = state => state.dashboard.answerSubmitPending;
export const thresholdPassedSelector = state => state.dashboard.thresholdPassed;

export const candidateCreatedSelector = state => state.dashboard.candidateCreated;
export const candidatesSelector = state => state.dashboard.candidates;
