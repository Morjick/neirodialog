export default () => ({
  menu: [
    {
      id: 1,
      title: 'Главная',
      href: '/'
    },
    {
      id: 2,
      title: 'О нас',
      href: '/about'
    },
    {
      id: 3,
      title: 'Оучение',
      href: '/learn',
      submenu: [
        {
          id: 2,
          title: 'Курсы',
          href: '/courses'
        },
        {
          id: 3,
          title: 'Статьи',
          href: '/state'
        },
        {
          id: 4,
          title: 'Как пользоваться товарами',
          href: '/how-to-use'
        },
      ]
    },
    {
      id: 4,
      title: 'Магазин',
      href: '/shop',
      submenu: [
        {
          id: 1,
          title: 'Акционные товары',
          href: '/shop/discount'
        },
        {
          id: 2,
          title: 'Продукты для детей',
          href: '/shop/children'
        },
        {
          id: 3,
          title: 'Продукты для родителей',
          href: '/shop/parent'
        },
        {
          id: 4,
          title: 'Продукты для специалистов',
          href: '/shop/parent'
        },
      ]
    },
    {
      id: 5,
      title: 'Услуги',
      href: '/service',
      submenu: [
        {
          id: 1,
          title: 'Услуги для детей',
          href: '/service/children'
        },
        {
          id: 2,
          title: 'Услуги для родителей',
          href: '/service/parent'
        },
        {
          id: 3,
          title: 'Услуги для специалистов',
          href: '/service/parent'
        },
      ]
    }
  ],
  isModal: false
})