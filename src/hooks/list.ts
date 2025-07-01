export function useList<T>() {
  const loading = ref(false)
  const finished = ref(false)
  const refreshing = ref(false)

  const error = ref(false)

  const finishedText = '没有更多了'
  const errorText = '请求失败，点击重新加载'

  const list = ref<T[]>([])

  return {
    loading,
    finished,
    list,
    refreshing,

    error,

    finishedText,
    errorText,

  }
}
