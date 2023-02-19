export default {
  setToken(state, token) {
    state.token = token
  },
  setLogin (state, payload) {
    state.isLogin = payload
  }
}