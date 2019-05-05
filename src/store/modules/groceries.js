import { firestoreAction } from 'vuexfire'

const state = {
  items: []
}
const getters = {
  //
}

const mutations = {
  //
}

const actions = {
  setItemsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
    bindFirestoreRef('items', ref)
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
