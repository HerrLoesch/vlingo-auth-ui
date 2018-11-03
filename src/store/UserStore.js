//import axios from 'axios'
import _ from "lodash"

const UserStore = {
  isInitialized: false,
  idTreshold: 2,
  namespaced: true,
  state: {
    users: [],
    errorOccured: false,
    isLoading: false
  },
  mutations: {

    setUsers(state, users) {
      state.users = users
    },
    addUser(state, user) {
      state.users.push(user)
    },
    removeUser(state, user) {
      const index = state.users.indexOf(user)
      state.users.splice(index, 1)
    },
    refreshUserData(state, user) {
      let existingUser = _.find(state.users, {id: user.id})

      existingUser.userName = user.userName
      existingUser.email = user.email
      existingUser.familyName = user.familyName
      existingUser.givenName = user.givenName
      existingUser.secondName = user.secondName
      existingUser.phone = user.phone
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setErrorOccured(state, errorOccured) {
      state.isLoading = errorOccured
    }
  },
  actions: {
    initializeUserStore: function ({
      commit
    }) {
      if (this.isInitialized || this.state.isLoading) {
        return
      }

      commit("setIsLoading", true)
      commit("setErrorOccured", false)

      // just for testing purpose

        commit("setUsers", [{
            email: "max@mustermail.de",
            familyName: "Mustermann",
            givenName: "Max",
            userName: "Peter",
            id: 1
          },
          {
            email: "maria@mustermail.de",
            familyName: "Mustermann",
            givenName: "Maria",
            userName: "maria@mustermail.de",
            id: 2
          }
        ])
        commit("setIsLoading", false)
        this.isInitialized = true

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
    createUser: function ({ commit }, user) {
      this.idTreshold++
      user.id = this.idTreshold
      commit("addUser", user)
      /* TODO: Add actual API call */
    },
    deleteUser: function ({ commit }, user) {
      commit("removeUser", user)
      /* TODO: Add actual API call */
    },
    updateUser: function ({ commit }, newData) {
      commit("refreshUserData", newData)
      /* TODO: Add actual API call */
    },
  }
}

export default UserStore