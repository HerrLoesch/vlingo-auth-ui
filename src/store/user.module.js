import _ from "lodash"
import {EventBus} from "../plugins/EventBus"

/* Vuex makes heavily use of magic strings.
   We have to compensate this with string constants.
   Unfortunatly, that gets a bit messy if you use also namespaces.
   The following part will help to keep most of the mess in this file.
 */

// "private" member
// TODO: follow naming structure as shown for modules
const ADD_LOCAL_USER = "addLocalUser"
const ADD_LOCAL_CREDENTIAL = "addCredentialToUser"
const UPDATE_LOCAL_CREDENTIAL = "updateCredentialOfUser"
const DELETE_LOCAL_CREDENTIAL = "deleteCredentialOfUser"
const REMOVE_LOCAL_USER = "removeLocalUser"
const UPDATE_LOCAL_USER = "updateLocalUser"
const SET_LOCAL_USERS = "setLocalUsers"
const SET_ISLOADING = "setIsLoading"
const INITIALIZE = "initializeUserStore"
const CREATE = "createUser"
const DELETE = "deleteUser"
const UPDATE = "updateUser"
const ADD_CREDENTIAL = "addCredential"
const UPDATE_CREDENTIAL = "updateCredential"
const DELETE_CREDENTIAL = "askForCredentialDeletion"
const ALL_USERS_GETTER = "getAllUsers"

// "public" member
export const USER_MODULE = "userModule"
export const INITIALIZE_USER_MODULE = USER_MODULE + "/" + INITIALIZE
export const CREATE_USER = USER_MODULE + "/" + CREATE
export const DELETE_USER = USER_MODULE + "/" + DELETE
export const UPDATE_USER = USER_MODULE + "/" + UPDATE
export const ADD_CREDENTIAL_TO_USER = USER_MODULE + "/" + ADD_CREDENTIAL
export const UPDATE_CREDENTIAL_OF_USER = USER_MODULE + "/" + UPDATE_CREDENTIAL
export const DELETE_CREDENTIAL_OF_USER = USER_MODULE + "/" + DELETE_CREDENTIAL
export const GET_ALL_USERS = USER_MODULE + "/" + ALL_USERS_GETTER

export const userModule = {
    isUserModuleInitialized: false,
    namespaced: true,
    state: {
        users: [],
        isLoading: false,
        idTreshold: 4
    },
    mutations: {
        [SET_LOCAL_USERS](state, users) {
            state.users = users
        },
        [ADD_LOCAL_USER](state, user) {

            state.idTreshold += 1
            user.id = state.idTreshold

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
        },
        [ADD_LOCAL_CREDENTIAL](state, data) {
            let existingUser = _.find(state.users, {id: data.user.id})

            if (existingUser === null) {
                // TODO: Replace by notification or something
                console.log("User was not found.")
                return
            }

            existingUser.credentials.push(data.credential)
        },
        [UPDATE_LOCAL_CREDENTIAL](state, updateData) {
            let existingUser = _.find(state.users, {id: updateData.user.id})

            if (existingUser === null) {
                // TODO: Replace by notification or something
                console.log("User was not found.")
                return
            }
            let existingCredential = _.find(existingUser.credentials, {id: updateData.credential.id})

            // It is currently not possible to change the id!
            existingCredential.authority = updateData.credential.authority
            existingCredential.secret = updateData.credential.secret
        },
        [DELETE_LOCAL_CREDENTIAL](state, updateData) {
            let existingUser = _.find(state.users, {id: updateData.user.id})

            if (existingUser === null) {
                // TODO: Replace by notification or something
                console.log("User was not found.")

                return
            }

            _.remove(existingUser.credentials, {id: updateData.credential.id})
        }
    },
    getters: {
        [ALL_USERS_GETTER]: (state) => {

            let resultUsers = []
            _.forEach(state.users, user => {
                // create a clone to avoid unmanaged changes to the state
                let clone = JSON.parse(JSON.stringify(user))
                resultUsers.push(clone)
            })

            return resultUsers
        }
    },
    actions: {
        [INITIALIZE]: function ({commit}) {
            if (this.isUserModuleInitialized || this.state.isLoading) {
                return
            }
            commit(SET_ISLOADING, true)

            // just for testing purpose
            commit(SET_LOCAL_USERS, [{
                email: "max@mustermail.de",
                familyName: "Mustermann",
                givenName: "Max",
                userName: "Peter",
                phone: "5351 7878916",
                id: 1,
                credentials: [
                    {
                        id: "test",
                        authority: "vlingo",
                        secret: ""
                    },
                    {
                        id: "another one",
                        authority: "vlingo",
                        secret: ""
                    },
                ]
            },
                {
                    email: "maria@mustermail.de",
                    familyName: "Mustermann",
                    givenName: "Maria",
                    userName: "maria@mustermail.de",
                    phone: "7351 7874916",
                    id: 2,
                    credentials: [
                        {
                            id: "one",
                            authority: "vlingo",
                            secret: ""
                        },
                        {
                            id: "two",
                            authority: "oAuth",
                            secret: ""
                        },
                    ]
                },
                {
                    email: "sabiene@Leutheusser-Schnarrenberger.de",
                    familyName: "Leutheusser-Schnarrenberger",
                    givenName: "Sabine",
                    secondName: "Marie",
                    userName: "sabineL@gmx.de",
                    phone: "7351 7876816",
                    id: 3,
                    credentials: [
                        {
                            id: "test",
                            authority: "vlingo",
                            secret: ""
                        },
                        {
                            id: "another one",
                            authority: "vlingo",
                            secret: ""
                        },
                    ]
                }

            ])
            commit(SET_ISLOADING, false)
            this.isUserModuleInitialized = true
        },
        [CREATE]: function ({commit}, user) {

            if (!this.isUserModuleInitialized) {
                this.dispatch(INITIALIZE_USER_MODULE)
            }

            /* TODO: Add actual API call */

            commit(ADD_LOCAL_USER, user)
            EventBus.$emit("notification", "Added new user.")
        },
        [DELETE]: function ({commit}, user) {
            /* TODO: Add actual API call */

            commit(REMOVE_LOCAL_USER, user)
            EventBus.$emit("notification", "User was deleted.")
        },
        [UPDATE]: function ({commit}, newData) {
            /* TODO: Add actual API call */

            commit(UPDATE_LOCAL_USER, newData)
            EventBus.$emit("notification", "User information changed.")
        },
        [ADD_CREDENTIAL]: function ({commit}, data) {
            /* TODO: Add actual API call */

            commit(ADD_LOCAL_CREDENTIAL, data)
            EventBus.$emit("notification", "Added new credential.")
        },
        [UPDATE_CREDENTIAL]: function ({commit}, updateData) {
            /* TODO: Add actual API call */

            commit(UPDATE_LOCAL_CREDENTIAL, updateData)
            EventBus.$emit("notification", "Credential data changed.")
        },
        [DELETE_CREDENTIAL]: function ({commit}, data) {
            /* TODO: Add actual API call */

            commit(DELETE_LOCAL_CREDENTIAL, data)
            EventBus.$emit("notification", "Credential was deleted.")
        }
    }
}
