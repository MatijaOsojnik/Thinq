import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Landing from '@/views/Landing'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Lectures from '@/views/Lectures'
import Lecture from '@/views/Lecture'
import LectureCreate from '@/views/Lecture/Create.vue'
import LectureEdit from '@/views/Lecture/Edit.vue'
import User from '@/views/Users/Show.vue'
import Admin from '@/views/Admin'
import UserLectures from '@/views/Users/Lectures.vue'
import EditUser from '@/views/Users/Edit.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'landing',
    component: Landing,
    meta: {
      onlyGuestUser: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      onlyGuestUser: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      onlyGuestUser: true
    }
  },
  {
    path: '/lectures',
    name: 'lectures',
    component: Lectures,
  },
  {
    path: '/lectures/:id',
    name: 'lecture',
    component: Lecture,
    props: true
  },
  {
    path: '/lectures/categories/:categoryId',
    name: 'lectures-categories',
    component: Lectures,
    props: true,
  },
  {
    path: '/lectures/create/:id',
    name: 'lecture-create',
    component: LectureCreate,
    meta: {
      onlyPrivilegedUser: true
    }
  },
  {
    path: '/lectures/:id/edit',
    name: 'lecture-edit',
    component: LectureEdit,
    meta: {
      onlyPrivilegedUser: true
    }
  },
  {
    path: '/users/:displayName/:id/profile',
    name: 'show-user',
    component: User,
  },
  {
    path: '/users/:displayName/:id/edit',
    name: 'edit-user',
    component: EditUser,
    meta: {
      onlyAuthUser: true,
      belongsToUser: true
    },
  }, {
    path: '/users/:displayName/:id/lectures',
    name: 'user-lectures',
    component: UserLectures,
    meta: {
      onlyPrivilegedUser: true,
      belongsToUser: true
    }
  },
  {
    path: '/admin',
    name: 'admin-main',
    component: Admin,
    meta: {
      onlyAdmin: true
    }

  },
  {
    path: '*',
    redirect: 'lectures'
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = store.state.isUserLoggedIn
  const userAuthorities = store.state.authorities
  let isAdmin = false;
  let isModerator = false;
  let isLecturer = false;

  if (userAuthorities) {
    for (let i = 0; i < userAuthorities.length; i++) {
      if (userAuthorities[i] === 'ROLE_LECTURER') {
        isLecturer = true
      } else if (userAuthorities[i] === 'ROLE_MODERATOR') {
        isModerator = true
      } else if (userAuthorities[i] === 'ROLE_ADMIN') {
        isAdmin = true
      }
    }
  }

  if (to.meta.onlyAuthUser) {
    if (isUserLoggedIn) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  } else if (to.meta.onlyGuestUser) {
    if (isUserLoggedIn) {
      next({
        name: 'lectures'
      })
    } else {
      next()
    }
  } else if (to.meta.onlyPrivilegedUser) {
    if (isUserLoggedIn) {
      if (isLecturer || isModerator || isAdmin) {
        next()
      } else {
        next({
          name: 'lectures'
        })
      }
      // if(isLecturer){
      //   next()
      // } else {
      //   next({
      //     name: 'lectures'
      //   })
      // }
    } else if (to.meta.belongsToUser) {
      if (isUserLoggedIn) {
        if (this.$route.params.id === this.$store.state.user.id) {
          next()
        } else {
          next({
            name: 'lectures'
          })
        }
      } else {
        next({
          name: 'lectures'
        })
      }
    } else if (to.meta.onlyAdmin) {
      if(isUserLoggedIn) {
        if(isAdmin) {
          next()
        } else {
          next({
            name: 'lectures'
          })
        }
      } else {
        next({
          name: 'lectures'
        })
      }
    }
    
    else {
      next({
        name: 'lectures'
      })
    }
  } else {
    next()
  }
})

export default router