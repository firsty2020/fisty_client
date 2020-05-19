import * as Yup from 'yup';
import ERROR_MESSAGES from './constants/messages';
import { REGEX } from './regex-rules';

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
    middle_name: Yup.string(),
    phone_number: Yup.string()
        .matches(REGEX.NUMERIC, ERROR_MESSAGES.PHONE_INVALID)
        .required(ERROR_MESSAGES.PHONE_REQUIRED),
    city: Yup.string(),
    country: Yup.string(),
    citizenship: Yup.string().required(ERROR_MESSAGES.CITIZENSHIP_REQUIRED),
    date_of_birth: Yup.object().shape({
        year: Yup.string()
            .required(ERROR_MESSAGES.DOB_YEAR_REQUIRED),
        month: Yup.string()
            .required(ERROR_MESSAGES.DOB_MONTH_REQUIRED),
        day: Yup.string()
            .required(ERROR_MESSAGES.DOB_DAY_REQUIRED),
    }),
    education: Yup.string().required(ERROR_MESSAGES.EDUCATION_REQUIRED),
    languages: Yup.array(),
    gender: Yup.string().required(ERROR_MESSAGES.GENDER_REQUIRED),
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
        .required(ERROR_MESSAGES.COMPANY_TYPE),
    source: Yup.string()
        .required(ERROR_MESSAGES.SOURCE_REQUIRED),
    industry: Yup.string()
        .required(),
    specification: Yup.string()
        .required(),
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
    location: Yup.string()
        .required(ERROR_MESSAGES.LOCATION_REQUIRED),
    company: Yup.string()
        .required(),
    contact_person: Yup.array()
        .required(ERROR_MESSAGES.CONTACT_PERSON_REQUIRED),
});


export const contactPersonSchema = Yup.object().shape({
    first_name: Yup.string()
        .required(ERROR_MESSAGES.FIRST_NAME_REQUIRED),
    last_name: Yup.string()
        .required(ERROR_MESSAGES.LAST_NAME_REQUIRED),
    middle_name: Yup.string(),
    role: Yup.string().required('Укажите должность'),
    email: Yup.string()
        .email(ERROR_MESSAGES.EMAIL_INVALID)
        .required(ERROR_MESSAGES.EMAIL_REQUIRED),
    phone_number: Yup.string()
        .required(ERROR_MESSAGES.PHONE_REQUIRED)
        .matches(REGEX.PHONE_NUMBER, ERROR_MESSAGES.PHONE_INVALID),
    gender: Yup.string().required(ERROR_MESSAGES.GENDER_REQUIRED),
});


export const applicationSchema = Yup.object().shape({
    position: Yup.string().required(ERROR_MESSAGES.POSITION_REQUIRED),
    employees_count: Yup.string()
        .matches(REGEX.NUMERIC, ERROR_MESSAGES.EMPLOYEES_COUNT_INVALID)
        .required(ERROR_MESSAGES.EMPLOYEES_COUNT_REQUIRED),
    job_description: Yup.string(),
    bonus_enabled: Yup.bool(),
    salary: Yup.string().matches(REGEX.NUMERIC, ERROR_MESSAGES.SALARY_INVALID).required(ERROR_MESSAGES.SALARY_REQUIRED),
    citizenship: Yup.string().required(ERROR_MESSAGES.CITIZENSHIP_REQUIRED),
    age: Yup.object().shape({
        from: Yup.string()
            .required(ERROR_MESSAGES.AGE_REQUIRED)
            .matches(REGEX.NUMERIC, ERROR_MESSAGES.ONLY_NUMBERS),
        to: Yup.string()
            .required(ERROR_MESSAGES.AGE_REQUIRED)
            .matches(REGEX.NUMERIC, ERROR_MESSAGES.ONLY_NUMBERS),
    }),
    gender: Yup.array().required(ERROR_MESSAGES.GENDER_REQUIRED),
    education: Yup.array().required(ERROR_MESSAGES.EDUCATION_REQUIRED),
    russian_level: Yup.string().oneOf(['родной', 'с акцентом']).required(ERROR_MESSAGES.RUSSIAN_LEVEL_REQUIRED),
    city: Yup.string().required(ERROR_MESSAGES.CITY_REQUIRED),
    address: Yup.string().required(ERROR_MESSAGES.ADDRESS_REQUIRED),
    formalization_type: Yup.array().required(ERROR_MESSAGES.FORMALIZATION_TYPE_REQUIRED),
    responsibilities: Yup.string().required(ERROR_MESSAGES.RESPONSIBILITIES_REQUIRED),
    schedule: Yup.string().required(ERROR_MESSAGES.SCHEDULE_REQUIRED),
});


export const dynamicFieldSchema = Yup.object().shape({
    field_type: Yup.string().required(ERROR_MESSAGES.FIELD_TYPE_REQUIRED),
    name: Yup.string().required(ERROR_MESSAGES.FIELD_NAME_REQUIRED),
    display_name: Yup.string().required(ERROR_MESSAGES.FIELD_DISPLAY_NAME_REQUIRED),
    position: Yup.number().positive(ERROR_MESSAGES.FIELD_POSITION_INVALID).required(ERROR_MESSAGES.FIELD_POSITION_REQUIRED),
    placeholder: Yup.string().required(ERROR_MESSAGES.FIELD_PLACEHOLDER_REQUIRED),
    tooltip_value: Yup.string().required(ERROR_MESSAGES.FIELD_TOOLTIP_VALUE_REQUIRED),
    is_required: Yup.bool(),
    field_configuration: Yup.mixed()
        .when('field_type', (field_type, schema) => {
            switch (field_type) {
                case 'date':
                    return Yup.object().shape({
                        date_format: Yup.string().required(ERROR_MESSAGES.DATE_FORMAT_REQUIRED)
                    });
                case 'file':
                    return Yup.object().shape({
                        file_extensions: Yup.array()
                    });
                case 'choice':
                    return Yup.object().shape({
                        choices: Yup.array().required(ERROR_MESSAGES.CHOICES_REQUIRED)
                    });
                default: return schema;
            }
    })
});

export const projectSchema = Yup.object().shape({
    name: Yup.string().required('Укажите название'),
    citizenship: Yup.array().required(ERROR_MESSAGES.CITIZENSHIP_REQUIRED),
    age: Yup.object().shape({
        from: Yup.string()
            .required(ERROR_MESSAGES.AGE_REQUIRED)
            .matches(REGEX.NUMERIC, ERROR_MESSAGES.ONLY_NUMBERS),
        to: Yup.string()
            .required(ERROR_MESSAGES.AGE_REQUIRED)
            .matches(REGEX.NUMERIC, ERROR_MESSAGES.ONLY_NUMBERS),
    }),
    responsibilities: Yup.string().required('Опишите требования'),
    target_action_count: Yup.string().matches(REGEX.NUMERIC).required('Введите количество ЦД'),
    target_action_amount: Yup.string().matches(REGEX.NUMERIC).required('Введите Стоимость ЦД'),
    recruiter: Yup.array(),
    location: Yup.string().test('location', 'Укажите местоположение', function (value) {
        return !!(this.parent.branch || value);
    }),
    branch: Yup.string().test('branch', 'Укажите местоположение', function (value) {
        return !!(this.parent.location || value);
    }),
    location_type: Yup.string().required('Укажите местонахождение'),
});
