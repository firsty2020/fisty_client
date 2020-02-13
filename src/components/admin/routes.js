export default {
    top: [
        {
            name: 'Кабинет',
            url: '/admin',
            icon: 'Home',
        },
        { divider: true},
        {
            name: 'Пользователи',
            icon: 'Users',
            children: [
                {
                    name: 'Все',
                    url: '/admin/users/all',
                },
            ],
        },
    ],
    bottom: [
        {
            name: 'Account',
            url: '/dashboard',
            icon: 'User',
            badge: {
                variant: 'success',
                text: '3',
            },
        },
    ],
};
