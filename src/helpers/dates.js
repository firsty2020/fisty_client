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

export const transFormDatesArray = (array) => array.reduce((acc, curr) => {
    acc.push({
        label: curr,
        value: curr,
    });
    return acc;
}, []);

