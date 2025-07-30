import { isEmpty, isFunction, isNil, isNumber } from 'lodash-es'

export * from './settings'
export * from './workflow'
export * from './theme'
export * from './select'
export * from './list'
export * from './form'
export * from './options'
export * from './dictConfig'

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

  function togglePopup() {
    visible.value = !visible.value
  }

  return {
    visible,
    openPopup,
    closePopup,
    togglePopup,
  }
}

export function useSerializer(options: { multiple: boolean | (() => boolean), separator?: string }) {
  const { multiple, separator = ',' } = options

  function getMultiple() {
    if (isFunction(multiple)) {
      return multiple()
    }

    return multiple
  }

  function serialize(value?: string | string[]) {
    if (!isEmpty(value)) {
      if (getMultiple()) {
        return (value as string[]).join(separator)
      }
      else {
        return value as string
      }
    }
    else {
      return undefined
    }
  }

  function deserialize(value?: string) {
    if (value) {
      if (getMultiple()) {
        return value.split(separator)
      }
      else {
        return value
      }
    }
    else {
      return undefined
    }
  }

  function serializeLegacy(value: string | number | (string | number)[]) {
    if (!isEmpty(value) || isNumber(value)) {
      if (getMultiple()) {
        return (value as (string | number)[]).join(separator)
      }
      else {
        return value as string | number
      }
    }
    else {
      return undefined
    }
  }

  function deserializeLegacy(value: string) {
    if (!isNil(value)) {
      if (getMultiple()) {
        return (value as string)
          .split(separator)
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
    serializeLegacy,
    deserializeLegacy,
  }
}
