import * as Yup from 'yup';
import ERROR_MESSAGES from './constants/errorMessages'

const REGEX = {
    NUMERIC: /^\d+$/,
    ALPHABETIC: /^[A-Z]+$/i,
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

export const setPasswordSchema = Yup.object().shape({

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

