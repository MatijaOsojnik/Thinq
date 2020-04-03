import Vue from 'vue'
import VueRouter from 'vue-router'
import Posts from '../components/Posts.vue'
import PostCreate from '../components/PostCreate.vue'

Vue.use(VueRouter)

const routes = [
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
