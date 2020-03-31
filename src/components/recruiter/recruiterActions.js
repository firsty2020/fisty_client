import {
    RECRUITER_QUESTIONS_LOAD_RESOLVED,
    RECRUITER_QUESTIONS_LOAD_FAILED,
    RECRUITER_QUESTIONS_LOAD_PENDING,
    RECRUITER_ANSWERS_SUBMIT_PENDING,
    RECRUITER_ANSWERS_SUBMIT_RESOLVED,
    RECRUITER_ANSWERS_SUBMIT_FAILED,
} from '../../helpers/constants/actionTypes';


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
