import { firestoreAction } from 'vuexfire'

let lists = null
const maxNumberOfLists = 20

const state = {
  items: [],
  saved: false
}

const getters = {
  items: state => {
    return state.items.map(i => {
      return {
        id: i.id,
        date: i.date,
        items: i.items.reduce((r, a) => {
          r[a.category] = r[a.category] || []

          r[a.category].push(a)

          return r
        }, Object.create(null))
      }
    })
  },

  saved: state => state.saved
}

const mutations = {
  listSaved (state, val) {
    state.saved = val
  }
}

const actions = {
  setItemsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
    lists = ref

    bindFirestoreRef('items', ref.orderBy('created_at', 'desc'))
  }),

  save ({ state, commit, dispatch, rootGetters }) {
    if (state.items.length === maxNumberOfLists) {
      let lastItemId = rootGetters['lists/items'][maxNumberOfLists - 1].id

      dispatch('remove', lastItemId)
    }

    lists.add({
      date: new Date().toDateString(),
      items: rootGetters['groceries/selected'].map(s => ({ ...s, completed: false })),
      created_at: new Date()
    })

    commit('groceries/unselect', {}, { root: true })
  },

  remove (ctx, id) {
    lists.doc(id).delete()
  },

  toggleComplete ({ commit, state }, { listId, index }) {
    let items = JSON.parse(JSON.stringify(state.items.find(i => i.id === listId))).items

    items[index].completed = !items[index].completed

    lists.doc(listId).update({ items })
      .catch(error => {
        console.log(error)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
