import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  // state data
  // getters computed
  // mutations methods
  // actions 异步

  getters,
  modules: {
    user
  }
})