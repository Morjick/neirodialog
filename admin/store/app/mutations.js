export default {
  setAdminData(state, payload) {
    state.name = payload.name
    state.token = payload.token
    
    if(payload.permissions && Array.isArray(payload.permissions)) {
      state.permissions = payload.permissions
    }
  },
  clearAdminData (state) {
    state.name = null
    state.token = null
    state.permissions = []
  },
  createTost (state, { message, status, overtime = 1500 }) {
    const tost = {
      message: Array.isArray(message) ? message[0] : message,
      status,
      overtime
    }

    if(Array.isArray(state.tosts)) {
      state.tosts = [...state.tosts, tost]
    } else {
      state.tosts = [tost]
    }
  },
  deleteTost (state, tost) {
    const deleteTostIndex = state.tosts.indexOf(tost)
    const tosts = state.tosts.filter((el, ind) => ind !== deleteTostIndex)

    state.tosts = tosts
  },
  setConfirm (state, confirm) {
    state.confirm = confirm
  },
  openMenuItem (state, item) {
    const menu = state.menu.map( el => {
      if(el.id == item.id && !item.path) {
        el.open = true
      }
      return el
    })

    state.menu = menu
  }
}