import _ from "lodash"
import {EventBus} from "../plugins/EventBus"

/* Vuex makes heavily use of magic strings.
   We have to compensate this with string constants.
   Unfortunatly, that gets a bit messy if you use also namespaces.
   The following part will help to keep most of the mess in this file.
 */

// "private" member
const ADD_PERMISSION_MUTATION = "addPermissionMutation"
const UPDATE_PERMISSION_MUTATION = "updatePermissionMutation"
const DELETE_PERMISSION_MUTATION = "deletePermissionMutation"

const ADD_CONSTRAINT_MUTATION = "addConstraintMutation"

const ALL_PERMISSIONS_GETTER = "getAllPermissions"

const ADD_PERMISSION_ACTION = "addPermissionAction"
const UPDATE_PERMISSION_ACTION = "updatePermissionAction"
const DELETE_PERMISSION_ACTION = "deletePermissionAction"

const ADD_CONSTRAINT_ACTION = "addConstraintAction"

const INITIALIZE_PERMISSIONS_ACTION = "initializePermissions"
const SET_ISLOADING = "setIsLoading"

// "public" member
export const PERMISSION_MODULE = "permissionModule"
export const INITIALIZE_PERMISSIONS = PERMISSION_MODULE + "/" + INITIALIZE_PERMISSIONS_ACTION
export const ADD_PERMISSION = PERMISSION_MODULE + "/" + ADD_PERMISSION_ACTION
export const DELETE_PERMISSION = PERMISSION_MODULE + "/" + DELETE_PERMISSION_ACTION
export const UPDATE_PERMISSION = PERMISSION_MODULE + "/" + UPDATE_PERMISSION_ACTION
export const ADD_CONSTRAINT = PERMISSION_MODULE + "/" + ADD_CONSTRAINT_ACTION

export const GET_ALL_PERMISSIONS = PERMISSION_MODULE + "/" + ALL_PERMISSIONS_GETTER

export const permissionModule = {
    namespaced: true,
    isPermissionModuleInitialized: false,
    state: {
        isLoading: false,
        permissions: [],
        idTreshold: 0
    },
    mutations: {
        [ADD_PERMISSION_MUTATION](state, permission) {
            state.idTreshold += 1
            permission.id = state.idTreshold
            state.permissions.push(permission)
            console.log(permission)
        },
        [UPDATE_PERMISSION_MUTATION](state, permission) {
            let existingPermission = _.find(state.permissions, {id: permission.id})
            existingPermission.description = permission.description
        },
        [DELETE_PERMISSION_MUTATION](state, permission) {
            let index = state.permissions.indexOf(permission)
            state.permissions.splice(index, 1)
        },
        [SET_ISLOADING](state, isLoading) {
            state.isLoading = isLoading
        },
        [ADD_CONSTRAINT_MUTATION](state, data) {
            let existingPermission = _.find(state.permissions, {id: data.permission.id})

            if (existingPermission === null) {
                // TODO: Replace by notification or something
                console.log("Permission was not found.")
                return
            }

            existingPermission.constraints.push(data.constraint)
        }
    },
    getters: {
        [ALL_PERMISSIONS_GETTER]: (state) => {

            let resultPermissions = []
            _.forEach(state.permissions, permission => {
                // create a clone to avoid unmanaged changes to the state
                let clone = JSON.parse(JSON.stringify(permission))
                resultPermissions.push(clone)
            })

            return resultPermissions
        }
    },
    actions: {
        [INITIALIZE_PERMISSIONS_ACTION]: function ({commit}) {
            if (this.isPermissionModuleInitialized) {
                return
            }

            commit(SET_ISLOADING, true)

            let mockData = [
                {
                    name: "Permission 1",
                    description: "First permission",
                    id: 1,
                    constraints: [
                        {
                            name: "Constraint 1",
                            description: "First constraint",
                            type: "string",
                            value: "1"
                        },
                        {
                            name: "Constraint 2",
                            description: "Second constraint",
                            type: "string",
                            value: "2"
                        }
                    ]
                },
                {
                    name: "Permission 2",
                    description: "Second permission",
                    id: 2,
                    constraints: [
                        {
                            name: "Constraint 3",
                            description: "Third constraint",
                            type: "string",
                            value: "3"
                        },
                        {
                            name: "Constraint 4",
                            description: "Fourth constraint",
                            type: "string",
                            value: "4"
                        }
                    ]
                }]

            commit(ADD_PERMISSION_MUTATION, mockData[0])
            commit(ADD_PERMISSION_MUTATION, mockData[1])

            commit(SET_ISLOADING, false)
            this.isPermissionModuleInitialized = true
        },
        [ADD_PERMISSION_ACTION]: function ({commit}, permission) {
            commit(ADD_PERMISSION_MUTATION, permission)

            // add actual API call
            EventBus.$emit("notification", "Added new permission " + permission.name)
        },
        [UPDATE_PERMISSION_ACTION]: function ({commit}, permission) {
            commit(UPDATE_PERMISSION_MUTATION, permission)

            // add actual API call
            EventBus.$emit("notification", "Updated permission " + permission.name)
        },
        [DELETE_PERMISSION_ACTION]: function ({commit}, permission) {
            commit(DELETE_PERMISSION_MUTATION, permission)

            // add actual API call
            EventBus.$emit("notification", "Deleted permission " + permission.name)
        },
        [ADD_CONSTRAINT_ACTION]: function ({commit}, data) {
            /* TODO: Add actual API call */

            commit(ADD_CONSTRAINT_MUTATION, data)
            EventBus.$emit("notification", "Added new constraint " + data.constraint)
        },
    }
}
