export default async function ({app, store, redirect, $axios}) {
  const token = app.$cookies.get('admin-token')

  if(token) {
    redirect('/')
  }
}