import type { DirectiveBinding } from 'vue'
import { createApp } from 'vue'
import Loading from '@/components/Loading/index.vue'

const loadingDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    el.style.position = 'relative'
    if (binding.value) {
      const loadingElement = createLoading()
      el.appendChild(loadingElement)
      el._loadingElement = loadingElement
    }
  },
  updated(el: any, binding: DirectiveBinding) {
    if (binding.value) {
      if (!el._loadingElement) {
        const loadingElement = createLoading()
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

function createLoading() {
  const loadingInstance = createApp(Loading)
  const container = document.createElement('div')

  // loadingInstance 在没有引用时会被自动垃圾回收
  // 这里访问的是 mount 方法执行后返回实例的属性
  const loadingElement = loadingInstance.mount(container).$el
  loadingElement.className = 'w-full h-full absolute min-h-10 top-0 left-[50%] text-center -translate-x-[50%] bg-[--bg-loading-color] z-10'
  return loadingElement
}

export default loadingDirective
