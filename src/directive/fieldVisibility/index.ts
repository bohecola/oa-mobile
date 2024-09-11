import type { Directive } from 'vue'

export function createFieldVisibilityDirective<V>(): Directive<any, [keyof V, (keyof V)[]]> {
  return {
    mounted: (el, binding) => {
      const [field, fields] = binding.value
      if (fields.includes(field)) {
        el.style.display = ''
      }
      else {
        el.style.display = 'none'
      }
    },

    updated: (el, binding) => {
      const [field, fields] = binding.value
      if (fields.includes(field)) {
        el.style.display = ''
      }
      else {
        el.style.display = 'none'
      }
    },
  }
}
