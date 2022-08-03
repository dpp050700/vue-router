
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


// hash 值变化 不会重新加载页面 
// hash 就是前端的锚点，监控锚点的变化，渲染对应的组件，他不会响服务端发起请求，不能做 SEO 优化
// 通过 window.location.hash 跳转    通过 onhashchange 监听路由变化


// history 当刷新的时候会向服务端发起请求资源。
// 通过 window.history.pushState 跳转   通过 on('popstate') 监听浏览器前进后退


// 通过 historyAPI 可以实现 hash 模式， 都采用 history 的方式来使用