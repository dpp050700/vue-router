
import {RouterLink} from './RouterLink'
import {RouterView} from './RouterView'

export function createRouter(options) {

  return {
    install(app) {
      app.component('router-link', RouterLink)
      app.component('router-view', RouterView)
    }
  }
}

export function createWebHistory() {}

export function createWebHashHistory() {}