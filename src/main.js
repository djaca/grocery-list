import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'
import groceries from './database/groceries'

Vue.config.productionTip = false

store.dispatch('groceries/setItemsRef', groceries)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
