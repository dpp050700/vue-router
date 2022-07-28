
import RouterLink from './RouterLink'

export function createRouter(options) {

  return {
    install(app) {
      app.component('router-link', RouterLink)
    }
  }
}