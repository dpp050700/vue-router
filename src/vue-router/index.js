
import { computed, ref, shallowRef } from 'vue'
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

  function resolveMatcher(route) {
    let matched = []
    let matcher = matchers.find(m => m.path === route.path)
    while(matcher) {
      matched.unshift(matcher.record)
      matcher = matcher.parent
    }
    return {
      path: route.path,
      matched
    }
  }

  addRoutes(routes)

  // routes.forEach(route => addRoute(route))

  return {
    addRoute,
    addRoutes,
    resolveMatcher,
    matchers
  }
}

// 路由开始状态
const START_LOCATION_STATE = {
  path: '/',
  matched: [],
  query: {},
  params: {}
}

export function createRouter(options) {

  let ready = false

  const { routes, history } = options

  const {addRoute, addRoutes, resolveMatcher, matchers} = createRouterMatcher(routes)

  const currentRoute = shallowRef(START_LOCATION_STATE) // $route

  if(currentRoute.value === START_LOCATION_STATE) {
    push(history.location) // 根据用户当前的路径做一次匹配
  }

  let reactiveRoute = {}
  for(let key in START_LOCATION_STATE) {
    reactiveRoute[key] = computed(() => currentRoute.value[key])
  }

  function resolve(to){
    if(typeof to === 'string') {
      to = {path: to}
    }
    return resolveMatcher(to)
  }

  function markReady() {
    if(ready) return

    history.listen((to) => {
      // 监听用户前进后退事件
      const targetLocation = resolve(to)
      const from = currentRoute.value
      finalNavigation(targetLocation, from, true)
    })

    ready = true
  }

  function finalNavigation(to, from, replaced) {

    if(from === START_LOCATION_STATE || replaced) { // 第一次 replace ，后续都是 push
      history.replace(to.path)
    } else {
      history.push(to.path)
    }

    currentRoute.value = to

    markReady()
  }

  function push(to) {
    const targetLocation = resolve(to)
    const from = currentRoute.value

    finalNavigation(targetLocation, from)

  }

  //$router
  const router = {
    push,
    replace() {},
    install(app) {
      let router = this

      app.config.globalProperties.$router = router
      Object.defineProperty(app.config.globalProperties, '$route', {
        get: () => currentRoute.value
      })

      // vue3 注册到组件中 组件可以用 inject 实现注入
      app.provide('router', router)
      app.provide('route', currentRoute)

      app.component('router-link', RouterLink)
      app.component('router-view', RouterView)
    }
  }

  return router
}




// hash 值变化 不会重新加载页面 
// hash 就是前端的锚点，监控锚点的变化，渲染对应的组件，他不会响服务端发起请求，不能做 SEO 优化
// 通过 window.location.hash 跳转    通过 onhashchange 监听路由变化


// history 当刷新的时候会向服务端发起请求资源。
// 通过 window.history.pushState 跳转   通过 on('popstate') 监听浏览器前进后退


// 通过 historyAPI 可以实现 hash 模式， 都采用 history 的方式来使用


// 路由钩子

// beforeRouteLeave 组件的
// beforeEach 全局的
// beforeRouteUpdate 组件的


// beforeEnter 路由中配置的
// beforeRouterEnter 组件的

// beforeResolve 全局的
// afterEach 全局的
