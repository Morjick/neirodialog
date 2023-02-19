export default () => ({
  menu: [
    {
      id: 0,
      name: 'main',
      title: 'Главная',
      permission: 'adminPermissions',
      path: '/',
      icon: require('~/assets/icons/home.png')
    },
    // {
    //   id: 1,
    //   name: 'eCommerce',
    //   title: 'Статистика',
    //   permission: 'readECommerce',
    //   path: '/e-commerce',
    //   icon: require('~/assets/icons/ecommerce.png')
    // },
    // {
    //   id: 2,
    //   name: 'community',
    //   title: 'Пользователи',
    //   permission: 'readUsers',
    //   path: 'users',
    //   icon: require('~/assets/icons/community.png'),
    //   open: false,
    //   menu: [
    //     {
    //       id: 1,
    //       name: 'users',
    //       permission: 'readUsers',
    //       title: 'Пользователи',
    //       path: '/community/users'
    //     },
    //     {
    //       id: 2,
    //       name: 'admin',
    //       permission: 'readAdmin',
    //       title: 'Администраторы',
    //       path: '/community/admins'
    //     },
    //     {
    //       id: 3,
    //       name: 'guest',
    //       permission: 'readGuests',
    //       title: 'Гости',
    //       path: '/community/guests'
    //     },
    //     {
    //       id: 4,
    //       name: 'sistemAdmin',
    //       permission: 'readSistemAdmin',
    //       title: 'Системные администраторы',
    //       path: '/community/sistem-admins'
    //     },
    //     {
    //       id: 5,
    //       name: 'manager',
    //       permission: 'readManagers',
    //       title: 'Управляющие',
    //       path: '/community/managers'
    //     },
    //     {
    //       id: 6,
    //       name: 'moderator',
    //       permission: 'readModerators',
    //       title: 'Модераторы',
    //       path: '/community/moderators'
    //     }
    //   ]
    // },
    // {
    //   id: 3,
    //   name: 'tasks',
    //   title: 'Задачи',
    //   permission: 'readTasks',
    //   path: '/tasks',
    //   icon: require('~/assets/icons/tasks.png')
    // },
    // {
    //   id: 4,
    //   name: 'calendar',
    //   title: 'Календарь событий',
    //   permission: 'readCalendar',
    //   path: '/calendar',
    //   icon: require('~/assets/icons/calendar.png')
    // },
    {
      id: 5,
      name: 'products',
      title: 'Продукты',
      permission: 'readProducts',
      path: '/products',
      icon: require('~/assets/icons/products.png')
    },
    {
      id: 6,
      name: 'learning',
      title: 'Курсы',
      permission: 'readLearning',
      path: '/learning',
      icon: require('~/assets/icons/learning.png')
    },
    {
      id: 7,
      name: 'settings',
      title: 'Настройки',
      path: '/settings',
      icon: require('~/assets/icons/settings.png'),
      menu: [
        {
          id: 1,
          name: 'profile',
          title: 'Профиль',
          path: '/settings/profile'
        },
        {
          id: 2,
          name: 'view',
          title: 'Внешний вид',
          path: '/settings/view'
        }
      ]
    }
  ],
  name: null,
  token: null,
  permissions: [],
  tosts: [],
  confirm: {
    visible: false,
    message: 'Пожалуйста, подтвердите действие на странице',
    okText: 'Подтверждаю',
    cancelText: 'Отмена',
    okFunction: () => {},
    params: {}
  }
})