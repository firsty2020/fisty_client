export const generateMonths = () => ([
    {
        title: 'Январь',
        value: '01',
    },
    {
        title: 'Февраль',
        value: '02',
    },
    {
        title: 'Март',
        value: '03',
    },
    {
        title: 'Апрель',
        value: '04',
    },
    {
        title: 'Май',
        value: '05',
    },
    {
        title: 'Июнь',
        value: '06',
    },
    {
        title: 'Июль',
        value: '07',
    },
    {
        title: 'Август',
        value: '08',
    },
    {
        title: 'Сентябрь',
        value: '09',
    },
    {
        title: 'Октябрь',
        value: '10',
    },
    {
        title: 'Ноябрь',
        value: '11',
    },
    {
        title: 'Декабрь',
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
