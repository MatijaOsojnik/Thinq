import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '@/views/Landing'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
