export default {
  setModal ({ commit }, payload = false) {
    commit('setIsModal', payload)
  }
}