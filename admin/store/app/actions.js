export default {
  setAdminData({ commit, cookiz }) {
    console.log(cookiz)
  },
  async singin ({ commit, cookiz }, payload) {
    console.log(payload)
    await commit('setAdminData', payload)
  },
  async singout ({ commit}) {
    try {
      this.$cookies.remove('admin-token')
      await commit('clearAdminData')
    } catch (e) {
      console.warn(e)
    }
  },
  async confirm ({ state }) {
    const response = await state.confirm.okFunction(state.confirm.params)

    return response
  },
  async getPermission ({ state }, permission) {
    const isPermission = state.permissions.find( el => el == permission)

    return !!isPermission
  }
}