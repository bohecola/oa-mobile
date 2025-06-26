import type { AxiosPromise } from 'axios'
import type { Ref } from 'vue'

interface UseListOptions<T, U> {
  query: Ref<U> | U
  request: (query?: any) => AxiosPromise<T[]>
}

export function useList<T, U>(options: UseListOptions<T, U>) {
  const { query, request } = options

  const loading = ref(false)
  const finished = ref(false)
  const error = ref(false)
  const refreshing = ref(false)
  const finishedText = '没有更多了'
  const errorText = '请求失败，点击重新加载'

  const list = ref<T[]>([])

  function onRefresh() {
    finished.value = false
    loading.value = true
  }

  async function onLoad() {
    try {
      if (refreshing.value) {
        list.value = []
        refreshing.value = false
      }

      const { data } = await request(isRef(query) ? query.value : query)

      list.value = data

      finished.value = true
    }
    catch {
      finished.value = false
      loading.value = false
      error.value = true
    }
    finally {
      loading.value = false
    }
  }

  return {
    loading,
    finished,
    list,
    error,
    refreshing,
    finishedText,
    errorText,
    onRefresh,
    onLoad,
  }
}
