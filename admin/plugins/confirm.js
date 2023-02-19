export default async function confirm ({ app, $axios, store }, inject) {
  inject('createConfirm', async (confirm) => {
    store.commit('app/setConfirm', confirm)
  })

  inject('confirm', async (confirm) => {
    const response = await store.dispatch('app/confirm')

    await store.commit('app/setConfirm', {
      visible: false,
      message: 'Пожалуйста, подтвердите действие на странице',
      okText: 'Подтверждаю',
      cancelText: 'Отмена',
      okFunction: () => {},
      params: {}
    })

    return response
  })

  inject('cancelConfir', async (confirm) => {
    await store.commit('app/setConfirm', {
      visible: false,
      message: 'Пожалуйста, подтвердите действие на странице',
      okText: 'Подтверждаю',
      cancelText: 'Отмена',
      okFunction: () => {},
      params: {}
    })
  })
}