export default function ({ $axios, store, redirect, app, next, route }) {
  // $axios.setHeader('Access-Control-Allow-Origin', '*')

  // $axios.onRequest((config) => {
  //   try {

  //   } catch(e) {
  //     console.error('Ошибка при запросе: ', e)
  //   }
  // })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)

    if (code === 401) {
      redirect('/')
    }
  })
}