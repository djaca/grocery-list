import { firestoreAction } from 'vuexfire'

let groceries = null

const state = {
  items: [],
  selected: []
}
const getters = {
  items: state => state.items,

  selected: state => state.selected,

  hasSelected: state => state.selected.length > 0,

  isSelected: state => name => state.selected.some(s => s.name === name)
}

const mutations = {
  toggleSelect (state, name) {
    !state.selected.some(s => s.name === name)
      ? state.selected.push({ ...state.items.find(i => i.name === name), qty: '' })
      : state.selected.splice(state.selected.findIndex(s => s.name === name), 1)
  },

  setQuantity (state, payload) {
    let item = state.items.find(i => i.name === payload.name)

    if (item) {
      state.selected[state.selected.findIndex(s => s.name === payload.name)].qty = payload.qty
    }
  },

  unselect (state) {
    state.selected = []
  }
}

const actions = {
  setItemsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
    groceries = ref

    bindFirestoreRef('items', ref)
  }),

  add ({ commit }, payload) {
    groceries.add(payload)
  },

  update ({ commit }, { id, ...data }) {
    groceries.doc(id).update(data)
  },

  delete ({ commit }, id) {
    groceries.doc(id).delete()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
