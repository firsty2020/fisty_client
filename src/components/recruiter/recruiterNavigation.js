const recruiterNavigation =  {
    top: [
        {
            name: 'Кабинет',
            url: '/recruiter',
            icon: 'Home',
        },
        { divider: true },
        {
            name: 'Проекты',
            icon: 'Briefcase',
            url: '/recruiter/projects',
            matcher: '/projects'
        },
        {
            name: 'Лиды',
            icon: 'UserCheck',
            url: '/recruiter/leads',
            matcher: '/leads',
        },

    ],
    bottom: [
        {
            name: 'Выйти',
            url: '/login',
            icon: 'LogOut',
        },
    ],
};


export default recruiterNavigation;
