export default async function ({ $axios, $cookies, store, redirect, req, app }) {
  $axios.setHeader('authorization', 'Bearer ' + app.$cookies.get('admin-token'))

  $axios.onResponse(mess => {
    if(mess.config.url == 'users/sing-in') {
      store.dispatch('app/singin', mess.data)
    }
  })

  $axios.onError((error) => {
    if(error.response?.status === 401) {
      store.dispatch('app/singout')
      redirect('/auth')
      store.commit('app/createTost', {
        message: 'Не удалось подвердить авторизацию, возможно, время действия токена истекло',
        status: 401
      })
    }

    store.commit('app/createTost', {
      message: error.response?.data?.message || 'Неожиданная ошибка, попробуйте позже',
      status: error.response?.data?.status || 501
    })
  })
}