export * from './settings'
export * from './workflow'
export * from './theme'

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
