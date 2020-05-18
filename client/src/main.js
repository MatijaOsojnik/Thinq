import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/tiptap-vuetify'
// import UserHeader from './components/Header/User-Header.vue'

Vue.config.productionTip = false

// Vue.component('UserHeader', UserHeader)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
