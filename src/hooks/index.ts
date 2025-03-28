import { isEmpty, isNil, isNumber } from 'lodash-es'

export * from './settings'
export * from './workflow'
export * from './theme'
export * from './select'

export function useParentForm() {
  const d = getCurrentInstance()

  let parent: ComponentInternalInstance

  if (d) {
    parent = d.proxy?.$.parent

    if (parent) {
      while (parent && parent.type?.name !== 'van-form') {
        parent = parent?.parent
      }
    }
  }

  return parent
}

export function usePopup() {
  const visible = ref(false)

  function openPopup() {
    visible.value = true
  }

  function closePopup() {
    visible.value = false
  }

  return {
    visible,
    openPopup,
    closePopup,
  }
}

export function useSerializer(options: { multiple: boolean }) {
  const { multiple } = options

  function serialize(value: string | number | (string | number)[]) {
    if (!isEmpty(value) || isNumber(value)) {
      if (multiple) {
        return (value as (string | number)[]).join(',')
      }
      else {
        return value as string | number
      }
    }
    else {
      return undefined
    }
  }

  function deserialize(value: string) {
    if (!isNil(value)) {
      if (multiple) {
        return (value as string)
          .split(',')
          // 兼容 id 为 100、101 这种 number 类型的情况
          .map(e => (e.length < 19 ? Number(e) : e))
      }
      else {
        return value
      }
    }
    else {
      return undefined
    }
  }

  return {
    serialize,
    deserialize,
  }
}
