

import { h, defineComponent } from 'vue'

export const RouterView = defineComponent({
  name: 'RouterView',
  setup(props, { slots }) {
    return () => {
      return h('div', {}, 111)
    }
  }
})