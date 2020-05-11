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
