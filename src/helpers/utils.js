export const generateMonths = () => ([
    {
        label: 'Январь',
        value: '01',
    },
    {
        label: 'Февраль',
        value: '02',
    },
    {
        label: 'Март',
        value: '03',
    },
    {
        label: 'Апрель',
        value: '04',
    },
    {
        label: 'Май',
        value: '05',
    },
    {
        label: 'Июнь',
        value: '06',
    },
    {
        label: 'Июль',
        value: '07',
    },
    {
        label: 'Август',
        value: '08',
    },
    {
        label: 'Сентябрь',
        value: '09',
    },
    {
        label: 'Октябрь',
        value: '10',
    },
    {
        label: 'Ноябрь',
        value: '11',
    },
    {
        label: 'Декабрь',
        value: '12',
    }
]);


/**
 * Generate years [ ... 1990, 1991, 1992 ...]
 * yearsToGenerate: number
 * @returns {number[]}
 */
export const generateYears = (yearsToGenerate = 60) => {
    const currentYear = new Date().getFullYear();
    const years = new Array(yearsToGenerate);
    for (let i = 0; i <= yearsToGenerate; i++) {
        years.push(currentYear - i);
    }
    return years;
};


/**
 * a dummy function to return an array of numbers [0 - 31]
 * @returns {number[]}
 */
export const generateDays = () => {
    const daysToGenerate = 31;
    const days = new Array(daysToGenerate);
    for (let i = daysToGenerate - 1; i >= 0; i--) {
        days.push(daysToGenerate - i);
    }
    return days;
};


export const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);


/**
 * @param url string like https://sheltered-meadow-55057.herokuapp.com/api/v0/industries/94/
 * @return string representation of id ('94')
 */
export const extractIdFromUrl = (url) => {
    return url && url.split('/').slice(-2, -1).join('');
};


export const transFormDatesArray = (array) => array.reduce((acc, curr) => {
    acc.push({
        label: curr,
        value: curr,
    });
    return acc;
}, []);


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
        if (typeof source[field] === 'object' && source[field].length) {
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
        } else if(typeof data[key] === 'object' && data[key].length === '0') {
            delete data[key];
        }
    }
    return data;
};
