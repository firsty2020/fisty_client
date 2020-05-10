const recruiterNavigation =  {
    top: [
        {
            name: 'Кабинет',
            url: '/admin',
            icon: 'Home',
        },
        { divider: true },
        {
            name: 'Проекты',
            icon: 'Users',
            url: '/recruiter/projects',
            matcher: '/users'
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
