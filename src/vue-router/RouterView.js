

import { h, defineComponent, inject, provide, Fragment, computed } from 'vue'

export const RouterView = defineComponent({
  name: 'RouterView',
  setup(props, { slots }) {

    const depth = inject('depth', 0)
    provide('depth', depth + 1)

    const currentRoute = inject('route')

    const computedRecord = computed(() => currentRoute.value.matched[depth])

    return () => {

      const record = computedRecord.value
      const Comp = record?.components.default

      if(Comp) {
        return h(Comp)
      }
      return h(Fragment, [])
     
    }
  }
})