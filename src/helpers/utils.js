import { API_REQUEST } from './constants/actionTypes';


export const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

/**
 * @param url string like https://sheltered-meadow-55057.herokuapp.com/api/v0/industries/94/
 * @return string representation of id ('94')
 */
export const extractIdFromUrl = (url) => {
    return url && url.split('/').slice(-2, -1).join('');
};


export const generateSelectOptions = (list, value, label) => {
    if (!list) return null;
    return list.reduce((acc, curr) => {
        let __label;
        if (typeof label === 'function') {
            __label = label(curr)
        } else {
            __label = curr[label];
        }
        acc.push({ value: curr[value], label: __label });
        return acc;
    }, [])
};

export const transformReactSelectFields = (fields, source) => {
    fields.map((field) => {
        if (Array.isArray(source[field]) && source[field].length) {
            source[field] = source[field].map(item => item ? item.value : null);
        } else if (typeof source[field] === 'object' && source[field]) {
            source[field] = source[field].value;
        }
        return null;
    });
    return source;
};

export const clearEmptyFields = (data) => {
    for (let key in data) {
        if (!data.hasOwnProperty(key)) continue;
        if (data[key] === undefined || data[key] === '') {
            delete data[key]
        } else if(Array.isArray(data[key]) && !data[key].length) {
            delete data[key];
        } else if (typeof data[key] === 'object' && data[key] && data[key].length === undefined) {
            clearEmptyFields(data[key]);
        }
    }
    return data;
};

export const createApiAction = (payload) => ({
    type: API_REQUEST,
    payload
});

export const generateUId = () => Math.random().toString(36).replace('0.', '');

export const copyObject = (object) => JSON.parse(JSON.stringify(object));

export const findConfigForFieldType = ({ field_configuration, field_type }) => {
    const mapping = {
        text: '',
        file: 'file_extensions',
        date: 'date_format',
        choice: 'choices'
    };

    if  (mapping[field_type] && field_configuration[mapping[field_type]]) {
        return { [mapping[field_type]]: field_configuration[mapping[field_type]]}

    }
    return {};
};

export const autoToggleAlert = (message, stateModifier) => {
    stateModifier(message);
    setTimeout(() => stateModifier(''), 2000);
};

export const countriesOptions = [
    { value: 'Россия', label: 'Россия'},
    { value: 'Армения', label: 'Армения'},
    { value: 'Беларусь', label: 'Беларусь'},
    { value: 'Украина', label: 'Украина'},
];

export const extendedOptions = [
    { value: 'Казахстан', label: 'Казахстан'},
    { value: 'Киргизия', label: 'Киргизия'},
    { value: 'Узбекистан', label: 'Узбекистан'},
    { value: 'Таджикистан', label: 'Таджикистан'},
    { value: 'Грузия', label: 'Грузия'},
    { value: 'другое', label: 'Другое'},
];

export const educationOptions = [
    { value: 'начальное', label: 'Начальное' },
    { value: 'среднее', label: 'Среднее' },
    { value: 'высшее', label: 'Высшее' },
];

export const languageOptions = [
    { value: 'Английский', label: 'Английский' },
    { value: 'Русский', label: 'Русский' },
];

export const genderOptions = [
    { value: 'мужской', label: 'Мужской' },
    { value: 'женский', label: 'Женский' },
];

export const dateFormatOptions = [
    { value: '%Y-%m-%d', label: 'yyyy-MM-dd', },
    { value: '%Y/%m/%d', label: 'yyyy/MM/dd', },
    { value: '%d-%m-%Y', label: 'dd-MM-yyyy', },
    { value: '%d/%m/%Y', label: 'dd/MM/yyyy', },
    { value: '%d-%m-%y', label: 'dd-MM-yy', },
    { value: '%d/%m/%y', label: 'dd/MM/yy', },
];

export
const formatDateOutput = (dateString, formatting, shouldNotFormat = false) => {

    const date = new Date(dateString);
    const year = date.getFullYear();
    const shortYear = date.getYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const outputs = [
        { label: '%Y-%m-%d', output: `${year}-${month}-${day}`},
        { label: '%Y/%m/%d', output: `${year}/${month}/${day}`},
        { label: '%d-%m-%Y', output: `${day}-${month}-${year}`},
        { label: '%d/%m/%Y', output: `${day}/${month}/${year}`},
        { label: '%d-%m-%y', output: `${day}-${month}-${shortYear}`},
        { label: '%d/%m/%y', output: `${day}/${month}/${shortYear}`},
    ];

    if (shouldNotFormat) {
        return `${year}-${month}-${day}`;
    }

    return (outputs.find(( { label }) => label === formatting.date_format) || {}).output;

};

export const validateFileFormat = (file, allowedExtensions) => {
    const fileExt = file ? file.name.split('.').pop() : '';
    return allowedExtensions.includes(fileExt);
};


export const range = (start = 0, end = 0) => {
    const range = [];
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
};

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const sliceFromLastSlash = (url) => {
    const i = url.lastIndexOf('/');
    return (url.slice(0, i));
}

export const capitalizeFirstLetter = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

