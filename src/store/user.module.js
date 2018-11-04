import _ from "lodash"

/* Vuex makes heavily use of magic strings.
   We have to compensate this with string constants.
   Unfortunatly, that gets a bit messy if you use also namespaces.
   The following part will help to keep most of the mess in this file.
 */

// "private" member
const ADD_LOCAL_USER = "addLocalUser"
const REMOVE_LOCAL_USER = "removeLocalUser"
const UPDATE_LOCAL_USER = "updateLocalUser"
const SET_LOCAL_USERS = "setLocalUsers"
const SET_ISLOADING = "setIsLoading"
const INITIALIZE = "initializeUserStore"
const CREATE = "createUser"
const DELETE = "deleteUser"
const UPDATE = "updateUser"

// "public" member
export const USER_MODULE = "userModule"
export const INITIALIZE_USER_MODULE = USER_MODULE + "/" + INITIALIZE
export const CREATE_USER = USER_MODULE + "/" + CREATE
export const DELETE_USER = USER_MODULE + "/" + DELETE
export const UPDATE_USER = USER_MODULE + "/" + UPDATE

export const userModule = {
    isInitialized: false,
    idTreshold: 2,
    namespaced: true,
    state: {
        users: [],
        isLoading: false
    },
    mutations: {

        [SET_LOCAL_USERS](state, users) {
            state.users = users
        },
        [ADD_LOCAL_USER](state, user) {
            state.users.push(user)
        },
        [REMOVE_LOCAL_USER](state, user) {
            const index = state.users.indexOf(user)
            state.users.splice(index, 1)
        },
        [UPDATE_LOCAL_USER](state, user) {
            let existingUser = _.find(state.users, {id: user.id})

            existingUser.userName = user.userName
            existingUser.email = user.email
            existingUser.familyName = user.familyName
            existingUser.givenName = user.givenName
            existingUser.secondName = user.secondName
            existingUser.phone = user.phone
        },
        [SET_ISLOADING](state, isLoading) {
            state.isLoading = isLoading
        }
    },
    actions: {
        [INITIALIZE]: function ({commit}) {
            if (this.isInitialized || this.state.isLoading) {
                return
            }

            commit(SET_ISLOADING, true)

            // just for testing purpose
            commit(SET_LOCAL_USERS, [{
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
            commit(SET_ISLOADING, false)
            this.isInitialized = true
        },
        [CREATE]: function ({commit}, user) {
            this.idTreshold++
            user.id = this.idTreshold
            commit(ADD_LOCAL_USER, user)
            /* TODO: Add actual API call */
        },
        [DELETE]: function ({commit}, user) {
            commit(REMOVE_LOCAL_USER, user)
            /* TODO: Add actual API call */
        },
        [UPDATE]: function ({commit}, newData) {
            commit(UPDATE_LOCAL_USER, newData)
            /* TODO: Add actual API call */
        },
    }
}
