import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import { groceries, lists } from './database'

Vue.config.productionTip = false

store.dispatch('groceries/setItemsRef', groceries)
store.dispatch('lists/setItemsRef', lists)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
