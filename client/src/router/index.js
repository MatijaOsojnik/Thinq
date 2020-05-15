import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '@/views/Landing'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Lectures from '@/views/Lectures'
import Lecture from '@/views/Lecture'
import LectureCreate from '@/views/Lecture/LectureCreate.vue'
import LectureEdit from '@/views/Lecture/LectureEdit.vue'

Vue.use(VueRouter)

const routes = [{
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
    path: '/lectures',
    name: 'lectures',
    component: Lectures
  },
  {
    path: '/lectures/:id',
    name: 'lecture',
    component: Lecture
  },
  {
    path: '/lectures/create/:id',
    name: 'lecture-create',
    component: LectureCreate
  },
  {
    path: '/lectures/:id/edit',
    name: 'lecture-edit',
    component: LectureEdit
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router