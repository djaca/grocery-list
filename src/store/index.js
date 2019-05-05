import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import { vuexfireMutations } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  mutations: vuexfireMutations,
  strict: process.env.NODE_ENV !== 'production'
})
