import Vuex from "vuex"
import {APPLICATION_STATE_MODULE, applicationStateModule} from "./applicationState.module"
import {USER_MODULE, userModule} from "./user.module"
import Vue from "vue"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    [APPLICATION_STATE_MODULE]: applicationStateModule,
    [USER_MODULE]: userModule
  }
})

export default store
