

import { h, defineComponent } from 'vue'

export const RouterLink = defineComponent({
  name: 'RouterLink',
  setup(props, { slots }) {
    return () => {
      const children = slots.default && slots.default()
      return h('a', {}, children)
    }
  }
})