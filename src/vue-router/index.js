
import {RouterLink} from './RouterLink'
import {RouterView} from './RouterView'

export * from './history'

function normalizeRecord(record) {
  return {
    path: record.path,
    components: {
      default: record.component,
      ...(record.components ? record.components : {})
    },
    children: record.children || [],
    beforeEnter: record.beforeEnter,
    meta: record.meta
  }
}

function createRecord(record, parent) {
  const obj = {
    path: parent?.path ? parent.path + record.path: record.path,
    record,
    parent,
    children: []
  }
  if(parent) {
    parent.children.push(obj)
  }
  return obj
}

function createRouterMatcher(routes) {
  const matchers = []

  function addRoute(record, parent) {
    // 将用户写的 record 格式化

    const normalRecord = normalizeRecord(record)

    let newRecord = createRecord(normalRecord, parent)

    for(let i = 0; i < normalRecord.children.length; i++) {
      const child = normalRecord.children[i]
      addRoute(child, newRecord)
    }
    matchers.push(newRecord)
    
  }

  function addRoutes(routes) {
    routes.forEach(route => addRoute(route))
  }

  addRoutes(routes)

  // routes.forEach(route => addRoute(route))

  return {
    addRoute,
    addRoutes,
    matchers
  }
}

export function createRouter(options) {

  const { routes, history } = options

  const {addRoute, addRoutes, matchers} = createRouterMatcher(routes)

  return {
    install(app) {
      app.component('router-link', RouterLink)
      app.component('router-view', RouterView)
    }
  }
}




// hash 值变化 不会重新加载页面 
// hash 就是前端的锚点，监控锚点的变化，渲染对应的组件，他不会响服务端发起请求，不能做 SEO 优化
// 通过 window.location.hash 跳转    通过 onhashchange 监听路由变化


// history 当刷新的时候会向服务端发起请求资源。
// 通过 window.history.pushState 跳转   通过 on('popstate') 监听浏览器前进后退


// 通过 historyAPI 可以实现 hash 模式， 都采用 history 的方式来使用