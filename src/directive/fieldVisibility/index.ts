import { isNil } from 'lodash-es'
import type { Directive, Ref } from 'vue'

export function createFieldVisibilityDirective<V>(form?: Ref<any>): Directive<any, [keyof V, (keyof V)[]]> {
  return {
    mounted: (el, binding) => {
      const [field, fields] = binding.value
      if (fields.includes(field)) {
        el.style.display = ''
      }
      else {
        el.style.display = 'none'
      }

      if (!isNil(form)) {
        watch(
          form,
          (val) => {
            if (!isNil(val?.id)) {
              if (isNil(val[field]) || val[field] === '') {
                el.style.display = 'none'
              }
            }
          },
          {
            deep: true,
            immediate: true,
          },
        )
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

      if (!isNil(form) && !isNil(form.value?.id)) {
        if (isNil(form.value[field]) || form.value[field] === '') {
          el.style.display = 'none'
        }
      }
    },
  }
}
