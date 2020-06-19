export default {
    top: [
        {
            name: 'Кабинет',
            url: '/project-manager',
            icon: 'Home',
        },
        { divider: true },
        {
            name: 'Проекты',
            url: '/project-manager/projects',
            icon: 'Briefcase',
            matcher: 'projects'
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
