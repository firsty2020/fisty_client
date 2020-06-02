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
            source[field] = source[field].map(item => item.value);
        } else if (typeof source[field] === 'object') {
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
        } else if (typeof data[key] === 'object' && data[key].length === undefined) {
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
    { value: 'россия', label: 'Россия'},
    { value: 'армения', label: 'Армения'},
    { value: 'беларусь', label: 'Беларусь'},
    { value: 'украина', label: 'Украина'},
];

export const extendedOptions = [
    { value: 'казахстан', label: 'Казахстан'},
    { value: 'киргизия', label: 'Киргизия'},
    { value: 'узбекистан', label: 'Узбекистан'},
    { value: 'таджикистан', label: 'Таджикистан'},
    { value: 'грузия', label: 'Грузия'},
    { value: 'другое', label: 'другое'},
];


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
