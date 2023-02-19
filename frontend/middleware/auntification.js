export default async function ({app, store, redirect, $axios}) {
  const token = app.$cookies.get('neirodialog-token')

  if(token && token.length) {
    redirect('/')
  }
}