import Vuex from "vuex"
import ApplicationState from "./ApplicationState"
import {USER_MODULE, userModule} from "./user.module"
import Vue from "vue"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    applicationState: ApplicationState,
    userModule: userModule
  }
})

export default store
