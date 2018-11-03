import Vuex from "vuex"
import ApplicationState from "./ApplicationState"
import UserStore from "./UserStore"
import Vue from "vue"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    applicationState: ApplicationState,
    userStore: UserStore
  }
})

export default store
