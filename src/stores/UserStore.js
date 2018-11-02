//import axios from 'axios'

const UserStore = {
  isInitialized: false,
  namespaced: true,
  createTestData(){

  },
  state: {
    users: [{
      email: "max@mustermail.de",
      familyName: "Mustermann",
      givenName: "Max",
      userName: "Peter"
    }],
    errorOccured: false,
    isLoading: false
  },
  mutations: {
    setUsers (state, users) {      
      state.users = users
    },
    addUser (state, user) {      
      state.users.push(user)
      console.log('user added')
      console.log(user)
    },
    setIsLoading (state, isLoading) {
      state.isLoading = isLoading
    },
    setErrorOccured (state, errorOccured) {
      state.isLoading = errorOccured
    }
  },
  actions: {
    initializeUserStore: function ({ commit }) {
      if (this.isInitialized || this.state.isLoading) {
        return
      }

      commit('setIsLoading', true)
      commit('setErrorOccured', false)

      // just for testing purpose
      commit('setUsers', this.createTestData())
      commit('setIsLoading', false)

      // -----------------------

      /* TODO: Add actual API call
      axios.get('')
        .then(response => {
          commit('setUsers', response.data)
          commit('setIsLoading', false)
        })
        .catch(e => {
          commit('setIsLoading', false)
          commit('setErrorOccured', true)

          console.log(e)
        })
        */
    },
    createUser: function({ commit }, user) {
      commit('addUser', user)
      /* TODO: Add actual API call */
    }
  }
}

export default UserStore