

import { h, defineComponent, inject } from 'vue'
import router from '../router'

export const RouterLink = defineComponent({
  name: 'RouterLink',
  props: {
    to:{}
  },
  setup(props, { slots }) {

    const router = inject('router')

    return () => {
      const children = slots.default && slots.default()
      const linkClick = () => {
        router.push(props.to)
      }
      return h('a', {onClick: linkClick}, children)
    }
  }
})