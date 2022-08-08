// import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from '../vue-router/index'
import HomePage from '../pages/home.vue'
import AboutPage from '../pages/about.vue'
import { h } from 'vue'



const routes = [
  { 
    path: '/',
    component: HomePage,
    children: [
      {
        path: 'a',
        component: {
          render: () => h('h1', 'hello a')
        }
      },
      {
        path: 'b',
        component: {
          render: () => h('h1', 'hello b')
        }
      }
    ]
  },
  { path: '/about', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router