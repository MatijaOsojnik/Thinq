import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '@/views/Landing'
import Register from '../views/Register.vue'
import Posts from '../components/Posts/Posts.vue'
import PostCreate from '../components/Posts/PostCreate.vue'

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
    path: '/posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '/posts/new',
    name: 'postCreate',
    component: PostCreate
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
