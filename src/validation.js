import * as Yup from 'yup';
import ERROR_MESSAGES from './constants/messages'


const REGEX = {
    NUMERIC: /^\d+$/,
    NUMERIC_DECIMAL: /^\d*\.?\d*$/,
    ALPHABETIC: /^[A-Z]+$/i,
    ALPHABETIC_ALLOW_SPACE: /^[A-Z]+$/i,
    LATIN_ALPHABET_NUMBERS_SYMBOLS: /^[A-Za-z0-9@!#$%^&*{};':",<.>/|?`~=()[\]_\-+\\]+$/,
    PHONE_NUMBER: /^[+]?\d+$/,
};

export const userRegistrationSchema = Yup.object().shape({
    email: Yup.string()
        .email(ERROR_MESSAGES.EMAIL_INVALID)
        .required(ERROR_MESSAGES.EMAIL_REQUIRED),
    password: Yup.string()
        .matches(REGEX.LATIN_ALPHABET_NUMBERS_SYMBOLS, ERROR_MESSAGES.PASSWORD_INVALID_ALPHABET)
        .min(8, ERROR_MESSAGES.PASSWORD_INVALID_LENGTH)
        .required(ERROR_MESSAGES.PASSWORD_REQUIRED),
    repeat_password: Yup.string()
        .matches(REGEX.LATIN_ALPHABET_NUMBERS_SYMBOLS, ERROR_MESSAGES.PASSWORD_INVALID_ALPHABET)
        .min(8, ERROR_MESSAGES.PASSWORD_INVALID_LENGTH)
        .required(ERROR_MESSAGES.REPEAT_PASSWORD_REQUIRED),
});

export const completeRegistrationSchema = Yup.object().shape({
    first_name: Yup.string()
        .required(ERROR_MESSAGES.FIRST_NAME_REQUIRED),
    last_name: Yup.string()
        .required(ERROR_MESSAGES.LAST_NAME_REQUIRED),
    father_name: Yup.string(),
    phone_number: Yup.string()
        .matches(REGEX.NUMERIC, ERROR_MESSAGES.PHONE_INVALID)
        .required(ERROR_MESSAGES.PHONE_REQUIRED),
    city: Yup.string(),
    country: Yup.string(),
    citizenship: Yup.string().min(3, ERROR_MESSAGES.CITIZENSHIP_REQUIRED),
    year: Yup.number()
        .positive(ERROR_MESSAGES.DOB_YEAR_REQUIRED),
    month: Yup.number()
        .positive(ERROR_MESSAGES.DOB_MONTH_REQUIRED)
        .lessThan(13),
    day: Yup.number()
        .positive(ERROR_MESSAGES.DOB_DAY_REQUIRED),
    education: Yup.string().matches(REGEX.ALPHABETIC, ERROR_MESSAGES.EDUCATION_REQUIRED),
    languages: Yup.array(),
    gender: Yup.string().matches(REGEX.ALPHABETIC, ERROR_MESSAGES.EDUCATION_REQUIRED),
    accept: Yup.bool().oneOf([true], 'Вы должны принять условия'),
});

export const logInSchema = Yup.object().shape({
    email: Yup.string()
        .email(ERROR_MESSAGES.EMAIL_INVALID)
        .required(ERROR_MESSAGES.EMAIL_REQUIRED),
    password: Yup.string()
        .matches(REGEX.LATIN_ALPHABET_NUMBERS_SYMBOLS, ERROR_MESSAGES.PASSWORD_INVALID_ALPHABET)
        .min(8, ERROR_MESSAGES.PASSWORD_INVALID_LENGTH)
        .required(ERROR_MESSAGES.PASSWORD_REQUIRED),
});


export const validationQuestionsSchema = Yup.object().shape({
    hasExperience: Yup.bool().required(ERROR_MESSAGES.ANSWER_QUESTION),
    experience: Yup
        .string()
        .matches(REGEX.NUMERIC_DECIMAL, ERROR_MESSAGES.EXPERIENCE_INVALID)
        .when('hasExperience', {
            is: true,
            then: Yup.string().required(ERROR_MESSAGES.EXPERIENCE_REQUIRED)
        }),
    personnel: Yup.string()
        .when('hasExperience', {
        is: true,
        then: Yup.string().min(3, ERROR_MESSAGES.ANSWER_QUESTION)
    }),
    hasSite_access: Yup.bool()
        .required(ERROR_MESSAGES.ANSWER_QUESTION),
    site_access: Yup.array()
        .when('hasSite_access', {
            is: true,
            then: Yup.array().required(ERROR_MESSAGES.ANSWER_QUESTION)
        }),
    term: Yup.string().min(3, ERROR_MESSAGES.ANSWER_QUESTION)
});

export const companySchema = Yup.object().shape({
    name: Yup.string()
        .required(ERROR_MESSAGES.COMPANY_NAME_RUSSIAN_REQUIRED),
    english_name: Yup.string()
        .required(ERROR_MESSAGES.COMPANY_NAME_ENGLISH_REQUIRED),
    type: Yup.string()
        .min(3, ERROR_MESSAGES.COMPANY_TYPE),
    source: Yup.string()
        .min(3, ERROR_MESSAGES.SOURCE_REQUIRED),
    website: Yup.string()
        .url(ERROR_MESSAGES.URL_INVALID),
    social_link: Yup.string()
        .url(ERROR_MESSAGES.URL_INVALID),
    contact_number: Yup.string()
        .matches(REGEX.PHONE_NUMBER, ERROR_MESSAGES.PHONE_INVALID),
});

export const branchSchema = Yup.object().shape({
    name: Yup.string()
        .required(ERROR_MESSAGES.BRANCH_NAME_REQUIRED),
    address: Yup.string()
        .required(ERROR_MESSAGES.BRANCH_ADDRESS_REQUIRED),
});

export const contactPersonSchema = Yup.object().shape({
    first_name: Yup.string()
        .required(ERROR_MESSAGES.FIRST_NAME_REQUIRED),
    last_name: Yup.string()
        .required(ERROR_MESSAGES.LAST_NAME_REQUIRED),
    father_name: Yup.string(),
    position: Yup.string()
        .required(''),
    status: Yup.string()
        .min(3, ''),
    email: Yup.string()
        .email(ERROR_MESSAGES.EMAIL_INVALID)
        .required(ERROR_MESSAGES.EMAIL_REQUIRED),
    phone_number: Yup.string()
        .required(ERROR_MESSAGES.PHONE_REQUIRED)
        .matches(REGEX.PHONE_NUMBER, ERROR_MESSAGES.PHONE_INVALID)
});

