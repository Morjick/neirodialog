export default () => ({
  allPermissions: [
    {
      id: 1,
      title: 'Пользователи',
      child: [
        {
          id: 1,
          title: 'Чтение',
          checked: false,
          field: 'readUsers'
        },
        {
          id: 2,
          title: 'Создание',
          checked: false,
          field: 'createUsers'
        },
        {
          id: 3,
          title: 'Удаление',
          checked: false,
          field: 'deleteUsers'
        }
        ,
        {
          id: 4,
          title: 'Изменение',
          checked: false,
          field: 'updateUsers'
        }
      ]
    },
    {
      id: 2,
      title: 'Допуски',
      child: [
        {
          id: 1,
          field: 'userPermissions',
          title: 'Допуск пользователя',
          checked: false,
        },
        {
          id: 2,
          field: 'adminPermissions',
          title: 'Допуск администратора',
          checked: false,
        }
      ]
    },
    {
      id: 3,
      title: 'Продукты',
      child: [
        {
          id: 1,
          field: 'readProducts',
          title: 'Просмотр продуктов в админ-панели',
          checked: false
        },
        {
          id: 2,
          field: 'createProducts',
          title: 'Создание продуктов',
          checked: false
        },
        {
          id: 3,
          field: 'updateProduct',
          title: 'Изменение продуктов',
          checked: false
        }
      ]
    },
    {
      id: 4,
      title: 'Посты',
      child: [
        {
          id: 1,
          title: 'Чтение постов в админ-панели',
          checked: false,
          field: 'readPosts'
        },
        {
          id: 2,
          title: 'Создание постов',
          checked: false,
          field: 'createPosts'
        },
        {
          id: 3,
          title: 'Изменение постов',
          checked: false,
          field: 'updatePosts'
        },
        {
          id: 4,
          title: 'Удаление постов',
          checked: false,
          field: 'deletePosts'
        }
      ]
    },
    {
      id: 5,
      title: 'Комментарии',
      child: [
        {
          id: 1,
          title: 'Чтение комментарий в админ-панели',
          checked: false,
          field: 'readComments'
        },
        {
          id: 2,
          title: 'Создание комментариев',
          checked: false,
          field: 'createComments'
        },
        {
          id: 3,
          title: 'Изменение комментариев',
          checked: false,
          field: 'updateComments'
        },
        {
          id: 4,
          title: 'Удаление комментариев',
          checked: false,
          field: 'deleteComments'
        },
        {
          id: 5,
          title: 'Управление комментариями',
          checked: false,
          field: 'managmentComment'
        }
      ]
    },
    {
      id: 6,
      title: 'Разрешения',
      child: [
        {
          id: 1,
          title: 'Установка разрешений',
          checked: false,
          field: 'setPermissions'
        },
        {
          id: 2,
          title: 'Чтение разрешений',
          checked: false,
          field: 'getPermissions'
        }
      ]
    },
    {
      id: 7,
      title: 'Задачи',
      child: [
        {
          id: 1,
          title: 'Чтение задач',
          checked: false,
          field: 'readTasks'
        },
        {
          id: 2,
          title: 'Создание задач',
          checked: false,
          field: 'createTasks'
        },
        {
          id: 3,
          title: 'Удаление задач',
          checked: false,
          field: 'deleteTasks'
        },
        {
          id: 4,
          title: 'Изменение задач',
          checked: false,
          field: 'updateTasks'
        }
      ]
    },
  ],
  permisisons: []
})