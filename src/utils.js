export const generateMonths = () => ([
    {
        title: 'January',
        value: 1,
    },
    {
        title: 'February',
        value: 2,
    },
    {
        title: 'March',
        value: 3,
    },
    {
        title: 'April',
        value: 4,
    },
    {
        title: 'May',
        value: 5,
    },
    {
        title: 'June',
        value: 6,
    },
    {
        title: 'July',
        value: 7,
    },
    {
        title: 'August',
        value: 8,
    },
    {
        title: 'September',
        value: 9,
    },
    {
        title: 'October',
        value: 10,
    },
    {
        title: 'November',
        value: 11,
    },
    {
        title: 'December',
        value: 12,
    }
]);


/**
 * Generate years [ ... 1990, 1991, 1992 ...]
 * for convention only 100 years are generated, but this could be
 * changed in the future so may be an additional parameter will be required
 * @returns {number[]}
 */
export const generateYears = () => {
    const yearsToGenerate = 60;
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
