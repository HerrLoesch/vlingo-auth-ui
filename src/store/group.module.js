import _ from "lodash"
import {EventBus} from "../plugins/EventBus"

/* Vuex makes heavily use of magic strings.
   We have to compensate this with string constants.
   Unfortunatly, that gets a bit messy if you use also namespaces.
   The following part will help to keep most of the mess in this file.
 */

// "private" member
const ADD_GROUP_MUTATION = "addGroupMutation"
const UPDATE_GROUP_MUTATION = "updateGroupMutation"
const DELETE_GROUP_MUTATION = "deleteGroupMutation"

const GROUP_BY_ID_GETTER = "getGroupById"
const GROUPS_BY_IDS_GETTER = "getGroupsByIds"

const ADD_GROUP_ACTION = "addGroupAction"
const UPDATE_GROUP_ACTION = "updateGroupAction"
const DELETE_GROUP_ACTION = "deleteGroupAction"
const INITIALIZE_GROUPS_ACTION = "initializeGroups"
const SET_ISLOADING = "setIsLoading"

// "public" member
export const GROUP_MODULE = "groupModule"
export const INITIALIZE_GROUPS = GROUP_MODULE + "/" + INITIALIZE_GROUPS_ACTION
export const ADD_GROUP = GROUP_MODULE + "/" + ADD_GROUP_ACTION
export const UPDATE_GROUP = GROUP_MODULE + "/" + UPDATE_GROUP_ACTION
export const DELETE_GROUP = GROUP_MODULE + "/" + DELETE_GROUP_ACTION
export const GET_GROUP_BY_ID = GROUP_MODULE + "/" + GROUP_BY_ID_GETTER
export const GET_GROUPS_BY_IDS = GROUP_MODULE + "/" + GROUPS_BY_IDS_GETTER


export const groupModule = {
    namespaced: true,
    isGroupModuleInitialized: false,
    state: {
        isLoading: false,
        groups: [],
        idTreshold: 0
    },
    mutations: {
        [ADD_GROUP_MUTATION](state, group) {
            state.idTreshold += 1
            group.id = state.idTreshold
            state.groups.push(group)
        },
        [UPDATE_GROUP_ACTION](state, group) {
            let existingGroup = _.find(state.groups, {id: group.id})
            existingGroup.description = group.description
        },
        [DELETE_GROUP_MUTATION](state, group) {
            let index = state.groups.indexOf(group)
            state.groups.splice(index, 1)
        },
        [SET_ISLOADING](state, isLoading) {
            state.isLoading = isLoading
        },
    },
    getters: {
        [GROUP_BY_ID_GETTER]: (state) => (id) => {
          return state.groups.find(group => group.id === id)
        },
        [GROUPS_BY_IDS_GETTER]: (state, getters) => (ids) => {

            let insideGroups = []
            _.forEach(ids, (id) => {
                let group = getters.getGroupById(id)
                insideGroups.push(group)
            })

            return insideGroups
        }
    },
    actions: {
        [INITIALIZE_GROUPS_ACTION]: function ({commit}) {
            if (this.isGroupModuleInitialized) {
                return
            }

            commit(SET_ISLOADING, true)

            let firstGroup = {name: "First Group", description: "First group of its kind...", insideGroups: [], groupMembers: []}
            commit(ADD_GROUP_MUTATION, firstGroup)
            commit(ADD_GROUP_MUTATION, {name: "Second Group", description: "First group of its kind...", insideGroups: [firstGroup.id], groupMembers: [1]})

            commit(SET_ISLOADING, false)
            this.isGroupModuleInitialized = true
        },
        [ADD_GROUP_ACTION]: function ({commit}, group) {
            commit(ADD_GROUP_MUTATION, group)

            // add actual API call
            EventBus.$emit("notification", "Added new group " + group.name)
        },
        [UPDATE_GROUP_ACTION]: function ({commit}, group) {
            commit(UPDATE_GROUP_MUTATION, group)

            // add actual API call
            EventBus.$emit("notification", "Updated group " + group.name)
        },
        [DELETE_GROUP_ACTION]: function ({commit}, group) {
            commit(DELETE_GROUP_MUTATION, group)

            // add actual API call
            EventBus.$emit("notification", "Deleted group " + group.name)
        }
    }
}
