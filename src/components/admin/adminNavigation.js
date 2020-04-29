const adminNavigation =  {
    top: [
        {
            name: 'Кабинет',
            url: '/admin',
            icon: 'Home',
        },
        { divider: true },
        {
            name: 'Пользователи',
            icon: 'Users',
            url: '/admin/users/all',
            matcher: '/users'
        },
        {
            name: 'Компании',
            icon: 'Briefcase',
            url: '/admin/companies',
            matcher: '/compan',
        },
        {
            name: 'Заявки',
            icon: 'FileText',
            url: '/admin/applications',
            matcher: '/applications',
            excludePath: 'companies'
        },
        {
            name: 'Лиды',
            icon: 'UserCheck',
            url: '/admin/leads',
            matcher: '/leads',
        },
        {
            name: 'Настройки',
            icon: 'Settings',
            children: [
                {
                    name: 'Отрасль',
                    icon: 'GitBranch',
                    url: '/admin/configs/industries',
                    matcher: '/industries',
                },
                {
                    name: 'Специфика',
                    icon: 'Aperture',
                    url: '/admin/configs/specifications',
                    matcher: '/specifications',
                },
                {
                    name: 'Местонахождения',
                    icon: 'MapPin',
                    url: '/admin/configs/locations',
                    matcher: '/locations',
                },
                {
                    name: 'Роли',
                    icon: 'Users',
                    url: '/admin/configs/roles',
                    matcher: '/roles',
                },
                {
                    name: 'Динамичные поля',
                    icon: 'Sliders',
                    url: '/admin/configs/dynamic-fields',
                    matcher: '/dynamic-fields',
                },
                {
                    name: 'Категории',
                    icon: 'Tag',
                    url: '/admin/configs/categories',
                    matcher: '/categories',
                },
                {
                    name: 'Подкатегории',
                    icon: 'fa fa-tags',
                    url: '/admin/configs/subcategories',
                    matcher: '/subcategories',
                },
                {
                    name: 'Статусы',
                    icon: 'AlertOctagon',
                    url: '/admin/configs/statuses',
                    matcher: '/statuses',
                },
            ]
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


export default adminNavigation;
