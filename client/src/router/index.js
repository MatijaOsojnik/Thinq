import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../components/Posts.vue'
import PostCreate from '../components/PostCreate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/new',
    name: 'PostCreate',
    component: PostCreate
  }

]

const router = new VueRouter({
  routes
})

export default router
