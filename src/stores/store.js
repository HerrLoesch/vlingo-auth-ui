import Vuex from "vuex"
import UserStore from "./UserStore"
import Vue from "vue"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userStore: UserStore
  }
})

export default store
