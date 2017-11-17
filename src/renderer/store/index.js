import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
const { Notification } = require('electron').remote

Vue.use(Vuex)

const actions = {
  notify ({ commit }, params) {
    new Notification(params).show()
  }
}

export default new Vuex.Store({
  modules,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
