import type { DirectiveBinding } from 'vue'
import { createApp } from 'vue'
import Loading from '@/components/Loading/index.vue'

const loadingDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    if (binding.value) {
      const loadingInstance = createApp(Loading)
      const loadingElement = loadingInstance.mount(document.createElement('div')).$el

      el.style.position = 'relative'
      loadingElement.style.position = 'absolute'
      loadingElement.style.top = '0'
      loadingElement.style.left = '50%'
      loadingElement.style.width = '100%'
      loadingElement.style.height = '100%'
      loadingElement.style.background = '#ffffffee'
      loadingElement.style.transform = 'translate(-50%, 0)'

      el.appendChild(loadingElement)
      el._loadingElement = loadingElement
    }
  },
  updated(el: any, binding: DirectiveBinding) {
    if (binding.value) {
      if (!el._loadingElement) {
        const loadingInstance = createApp(Loading)
        const loadingElement = loadingInstance.mount(document.createElement('div')).$el
        el.appendChild(loadingElement)
        el._loadingElement = loadingElement
      }
    }
    else {
      if (el._loadingElement) {
        el.removeChild(el._loadingElement)
        el._loadingElement = null
      }
    }
  },
  unmounted(el: any) {
    if (el._loadingElement) {
      el.removeChild(el._loadingElement)
      el._loadingElement = null
    }
  },
}

export default loadingDirective
