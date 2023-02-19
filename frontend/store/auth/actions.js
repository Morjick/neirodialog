export default {
  async singin ({ commit, getters, dispatch }, payload) {
    try {
      const response = await this.$axios.post('users/sing-in', {
        email: payload.email,
        password: payload.password
      })

      if(response.data && response.data.message) {
        const errorMessage = response.data.message

        return errorMessage
      }

      if(response.message) {
        const errorMessage = response.message[0]

        return errorMessage
      }

      if(!response) {
        commit('setToken', null)

        return 'Неожиданная ошибка авторизации'
      }

      this.$cookies.set('neirodialog-token', response.data.token)
      commit('setLogin', true)
      commit('setToken', response.data.token)
    } catch(e) {
      console.log(e)
      return 'Ошибка сервера'
    }
  },
  async singup ({ commit, getters, dispatch }, payload) {
    try {
      const response = await this.$axios.post('users/sing-up', {
        email: payload.email,
        password: payload.password,
        name: payload.name
      })

      if(response.data && response.data.message) {
        const errorMessage = response.data.message

        return errorMessage
      } else if(response.message) {
        const errorMessage = response.message[0]

        return errorMessage
      }

      this.$cookies.set('neirodialog-token', response.data.token)
      commit('setLogin', true)
      commit('setToken', response.data.token)
    } catch(e) {
      if(e.response.data.message) {
        const errorMessage = e.response.data.message[0]

        return errorMessage
      }
      
      return 'Ошибка сервера'
    }
  },
  async setLoginToken ({ commit, getters, dispatch }, payload) {
    try {
      commit('setLogin', true)
      commit('setToken', payload)
    } catch(e) {
      return 'Ошибка сервера'
    }
  }
}