export default async function ({app, store, redirect, $axios, $cookies}) {
  const token = app.$cookies.get('admin-token')
  store.commit('app/setAdminData', {
    name: $cookies.get('name'),
    token: $cookies.get('admin-token'),
    permissions: $cookies.get('admin-permissons')
  })

  const {data} = await $axios.post('users/check-token', {
    token: `Bearer ${token}`
  })
  const isTokenValid = true

  if(!token || !isTokenValid || data.status === 401) {
    await store.dispatch('app/singout')
    redirect('/auth')
  }
}