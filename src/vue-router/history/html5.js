function createCurrentLocation(bases = '') {
  let {pathname, search, hash} = location
  if(bases.startsWith('#')) {
    return hash.slice(1) || '/'
  }
  return pathname + search + hash
}

function buildState(back, current, forward, replaced = false, computedScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    scroll: computedScroll ? {left: window.pageXOffset, top: window.pageYOffset} : null
  }
}

function useHistoryStateNavigation(bases) {
  const currentLocation = {
    value: createCurrentLocation(bases)
  }

  const currentState = {
    value: history.state //维护状态
  }

  function changeLocation(to, state, replaced) {
    history[replaced ? 'replaceState' : 'pushState'](state, '', bases + to)
    currentLocation.value = to
    currentState.value = state
  }

  if(!currentState.value) {
    // 发生跳转，存入状态
    changeLocation(currentLocation.value, buildState(null, currentLocation.value, null, true), true)
    // buildState(null, currentLocation.value, null, true)
  }


  function push(to, data) {
    // 做push 的时候要有两个状态， 跳转前 跳转后
    const state1 = {
      ...currentState.value,
      ...{
        forward: to,
        scroll: {left: window.pageXOffset, top: window.pageYOffset}
      }
    }
    changeLocation(currentLocation.value, state1, true)

    const state2 = {
      ...buildState(currentLocation.value, to, null),
      ...data
    }

    changeLocation(to, state2, false)
  }

  function replace(to, data) {
    let state = { // 构建一个全新的状态 替换当前路径 自定义数据添加进去
      ...buildState(
        currentState.value.back,
        to,
        currentState.value.forward,
        true
      ),
      ...data
    }

    changeLocation(to, state, true)
  }

  return {
    location:currentLocation,
    state: currentState,
    push,
    replace
  }

}

function useHistoryListener(currentLocation, currentState) {
  let listeners = []
  function listen(callback) {
    listeners.push(callback)
  }

  window.addEventListener('popstate', (state) => {
    const from = currentLocation.value
    currentLocation.value = createCurrentLocation()
    currentState.value = state

    listeners.forEach(listener => listener(currentLocation.value, from, state))
  })
  
  return {
    listen
  }
}

export function createWebHistory(base = '') {
  // 1 实现维护路径和状态
  const historyNavigation = useHistoryStateNavigation(base)
 

  const {location, state} = historyNavigation

  const historyListeners = useHistoryListener(location, state)

  const routerHistory = {
    ...historyNavigation,
    ...historyListeners
  }

  Object.defineProperty(routerHistory, 'location', {
    get: () => historyNavigation.location.value
  })

  Object.defineProperty(routerHistory, 'state', {
    get: () => historyNavigation.state.value
  })
  

  return routerHistory
}

