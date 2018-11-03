
const ApplicationState = {
    namespaced: true,
    state: {
        isLoggedIn: false
    },
    mutations: {
        setIsLoggedIn(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn
        },
    },
    actions: {
        logIn: function ({ commit }, loginData) {
            console.log("login")
            console.log(loginData)
            commit("setIsLoggedIn", true)
        },
        logOut: function ({ commit }) {
            console.log("logout")
            commit("setIsLoggedIn", false)
        },
    }
}

export default ApplicationState