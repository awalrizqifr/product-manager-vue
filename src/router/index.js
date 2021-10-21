import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/addProduct',
    name: 'AddProduct',
    component: () => import(/* webpackChunkName: "addProduct" */ '../views/AddProduct.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.isLoggedIn) {
        next({ path: '/login' })
      } else {
        next()
      }
    },
  },
  {
    path: '/editProduct/:id',
    name: 'EditProduct',
    component: () => import(/* webpackChunkName: "editProduct" */ '../views/EditProduct.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.isLoggedIn) {
        next({ path: '/login' })
      } else {
        next()
      }
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
