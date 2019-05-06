import { HTTP } from "./httpconfig"
import {EventBus, CONNECTIONERROR} from "../plugins/EventBus";
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
        tenantId: null,
        statusText: null
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
        [LOGIN_USER]: async function ({commit}, loginData) {
            
            return new Promise((resolve, reject) => {
                HTTP.defaults.baseURL ="http://localhost:8888/tenants/" + loginData.tenantId  + "/"

                HTTP.get("users/authentic").then(response => {
                    if(response.data === true) {
                        commit(SET_TENANTID, loginData.tenantId)
                        commit(SET_ISLOGEDIN, true)
                        
                        resolve()
                    } else {
                        reject("User could not be logged in. Please check username and password.")
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        [LOGOUT_USER]: function ({commit}) {
            commit(SET_ISLOGEDIN, false)
        },
    }
}
