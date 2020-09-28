import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import LandingPage from '../views/Main/LandingPage.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Password from '../views/Auth/Password.vue'
import Main from '../views/Main/Index.vue'
import Chat from '../views/Main/Chat.vue'
import Profile from '../views/Main/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
    meta: { requiresVisitor: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresVisitor: true }
  },
  {
    path: '/password',
    name: 'Password',
    component: Password,
    meta: { requiresVisitor: true }
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/chat',
        name: 'Chat',
        component: Chat
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: '/chat'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
