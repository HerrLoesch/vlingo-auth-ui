/* Vuex makes heavily use of magic strings.
   We have to compensate this with string constants.
   Unfortunatly, that gets a bit messy if you use also namespaces.
   The following part will help to keep most of the mess in this file.
 */

// "private" member
const SET_ISLOGEDIN = "setIsLoggedIn"
const SET_TENANTID = "setTenantId"
const LOGIN_USER = "logIn"
const LOGOUT_USER = "logOut"

// "public" member
export const APPLICATION_STATE_MODULE = "applicationStateModule"
export const LOGIN = APPLICATION_STATE_MODULE + "/" + LOGIN_USER
export const LOGOUT = APPLICATION_STATE_MODULE + "/" + LOGOUT_USER


export const applicationStateModule = {
    namespaced: true,
    state: {
        isLoggedIn: false,
        tenantId: null
    },
    mutations: {
        [SET_ISLOGEDIN](state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn
        },
        [SET_TENANTID](state, tenantId) {
            state.tenantId = tenantId
        }
    },
    actions: {
        [LOGIN_USER]: function ({commit}, loginData) {
            
            // TODO: Add API call, we fake it because it is currently not working.           
            commit(loginData.tenantId)            
            commit(SET_ISLOGEDIN, true)
        },
        [LOGOUT_USER]: function ({commit}) {
            console.log("logout")
            commit(SET_ISLOGEDIN, false)
        },
    }
}
