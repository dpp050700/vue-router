import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomePage from '../pages/home.vue'
import AboutPage from '../pages/about.vue'

// const HomePage = { template: '<div>Home</div>' }
// const AboutPage = { template: '<div>About</div>' }


const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router