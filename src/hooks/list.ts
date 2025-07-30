import type { AxiosPromise } from 'axios'
import { cloneDeep } from 'lodash-es'
import type { Ref } from 'vue'

interface UseListOptions<T, Q> {
  initQueryParams: Q
  request: (params: Q) => AxiosPromise<T[]>
}

export function useList<T, Q>(options: UseListOptions<T, Q>) {
  const { initQueryParams, request } = options

  const list = ref<T[]>([])

  const loading = ref(false)
  const finished = ref(false)
  const refreshing = ref(false)

  const error = ref(false)

  const finishedText = '没有更多了'
  const errorText = '请求失败，点击重新加载'

  const queryParams = ref(cloneDeep(initQueryParams))

  // 加载
  async function onLoad() {
    try {
      if (refreshing.value) {
        list.value = []
        refreshing.value = false
      }

      const { rows, total } = await request(queryParams.value)

      list.value = list.value.concat(rows as any)

      if (list.value.length >= total) {
        finished.value = true
      }
      else {
        queryParams.value.pageNum++
      }
    }
    catch {
      error.value = true
    }
    finally {
      loading.value = false
    }
  }

  // 刷新
  function onRefresh() {
    list.value = []
    queryParams.value.pageNum = 1
    finished.value = false
    loading.value = true
    onLoad()
  }

  return {
    list,
    loading,
    finished,
    refreshing,
    error,
    finishedText,
    errorText,
    queryParams: queryParams as Ref<Q>,
    onLoad,
    onRefresh,
  }
}
