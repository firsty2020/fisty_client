import * as Yup from 'yup';
import ERROR_MESSAGES from './constants/errorMessages'


const REGEX = {
    NUMERIC: /^\d+$/,
    NUMERIC_DECIMAL: /^\d*\.?\d*$/,
    ALPHABETIC: /^[A-Z]+$/i,
    ALPHABETIC_ALLOW_SPACE: /^[A-Z]+$/i,
    LATIN_ALPHABET_NUMBERS_SYMBOLS: /^[A-Za-z0-9@!#$%^&*{};':",<.>/|?`~=()[\]_\-+\\]+$/
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
    phone_number: Yup.string()
        .matches(REGEX.NUMERIC, ERROR_MESSAGES.PHONE_INVALID)
        .required(ERROR_MESSAGES.PHONE_REQUIRED),
    experience: Yup.string()
        .matches(REGEX.NUMERIC, ERROR_MESSAGES.EXPERIENCE_INVALID)
        .required(ERROR_MESSAGES.EXPERIENCE_REQUIRED),
    city: Yup.string()
        .required(ERROR_MESSAGES.CITY_REQUIRED),
    country: Yup.string()
        .matches(REGEX.ALPHABETIC, ERROR_MESSAGES.COUNTRY_REQUIRED),
    citizenship: Yup.string()
        .matches(REGEX.ALPHABETIC, ERROR_MESSAGES.CITIZENSHIP_REQUIRED),
    year: Yup.number()
        .positive(ERROR_MESSAGES.DOB_YEAR_REQUIRED),
    month: Yup.number()
        .positive(ERROR_MESSAGES.DOB_MONTH_REQUIRED)
        .lessThan(13),
    day: Yup.number()
        .positive(ERROR_MESSAGES.DOB_DAY_REQUIRED),
    education: Yup.string().matches(REGEX.ALPHABETIC, ERROR_MESSAGES.EDUCATION_REQUIRED),
    languages: Yup.array()
        .min(1, ERROR_MESSAGES.LANGUAGES_REQUIRED)
        .of(Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required(),
            })
        ),
    gender: Yup.string().matches(REGEX.ALPHABETIC, ERROR_MESSAGES.EDUCATION_REQUIRED),
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
        .required(ERROR_MESSAGES.COMPANY_NAME_REQUIRED),
    brand: Yup.string()
        .required(ERROR_MESSAGES.COMPANY_BRAND_REQUIRED),
    tin: Yup.string()
        .required(ERROR_MESSAGES.COMPANY_TIN_REQUIRED),
    contract_type: Yup.string()
        .min(3, ERROR_MESSAGES.COMPANY_CONTRACT_TYPE_REQUIRED),
    psrn: Yup.string()
        .required(ERROR_MESSAGES.COMPANY_PSRN_REQUIRED),
    legal_address: Yup.string()
        .required(ERROR_MESSAGES.COMPANY_LEGAL_ADDRESS_REQUIRED),
    aceo: Yup.string()
        .required(ERROR_MESSAGES.COMPANY_ACEO_REQUIRED),
    acea: Yup.string()
        .required(ERROR_MESSAGES.COMPANY_ACEA_REQUIRED),
    iec: Yup.string()
        .required(ERROR_MESSAGES.COMPANY_IEC_REQUIRED),
    bankDetails: Yup.object().shape({
        name: Yup.string()
            .required(ERROR_MESSAGES.COMPANY_BANK_REQUIRED),
        settlement_account: Yup.string()
            .required(ERROR_MESSAGES.COMPANY_SETTLEMENT_ACCOUNT_REQUIRED),
        correspondent_account: Yup.string()
            .required(ERROR_MESSAGES.COMPANY_CORRESPONDENT_ACCOUNT_REQUIRED),
        identification_code: Yup.string()
            .required(ERROR_MESSAGES.COMPANY_BANK_IDENTIFICATION_CODE_REQUIRED),

    }),
    subscriber_name: Yup.string()
        .required(ERROR_MESSAGES.COMPANY_SUBSCRIBER_NAME_REQUIRED),
    subscriber_position: Yup.string()
        .required(ERROR_MESSAGES.COMPANY_SUBSCRIBER_POSITION_REQUIRED),

});
