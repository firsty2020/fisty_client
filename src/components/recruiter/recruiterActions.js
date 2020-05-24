import {
    RECRUITER_QUESTIONS_LOAD_RESOLVED,
    RECRUITER_QUESTIONS_LOAD_FAILED,
    RECRUITER_QUESTIONS_LOAD_PENDING,
    RECRUITER_ANSWERS_SUBMIT_PENDING,
    RECRUITER_ANSWERS_SUBMIT_RESOLVED,
    RECRUITER_ANSWERS_SUBMIT_FAILED,
    POST,
    RECRUITER_CANDIDATE_CREATE, RECRUITER_CANDIDATE_STATE_RESET,
} from '../../helpers/constants/actionTypes';
import {createApiAction} from '../../helpers/utils';


export const loadQuestionsPending = () => ({
    type: RECRUITER_QUESTIONS_LOAD_PENDING,
});

export const loadQuestionsResolved = (questions) => ({
    type: RECRUITER_QUESTIONS_LOAD_RESOLVED,
    payload: questions,
});

export const loadQuestionsFailed = (error) => ({
    type: RECRUITER_QUESTIONS_LOAD_FAILED,
    payload: error,
});

export const submitAnswersPending = () => ({
    type: RECRUITER_ANSWERS_SUBMIT_PENDING,
});

export const submitAnswersResolved = (questions) => ({
    type: RECRUITER_ANSWERS_SUBMIT_RESOLVED,
    payload: questions,
});

export const submitAnswersFailed = (error) => ({
    type: RECRUITER_ANSWERS_SUBMIT_FAILED,
    payload: error,
});

export const createCandidate = (data) => createApiAction({
    url: 'projects/candidates/',
    method: POST,
    data,
    label: RECRUITER_CANDIDATE_CREATE,
});

export const resetCandidateState = () => ({
    type: RECRUITER_CANDIDATE_STATE_RESET,
});
