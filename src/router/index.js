import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
// import { createRouter, createWebHashHistory, createWebHistory } from '../vue-router/index'
import HomePage from '../pages/home.vue'
import AboutPage from '../pages/about.vue'



const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router