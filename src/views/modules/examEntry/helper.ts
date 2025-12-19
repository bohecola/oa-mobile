import type { PaperQuery, PaperVO } from '@/api/exam/paper/types'
import { listPaperNoPage } from '@/api/exam/paper'

interface UsePaperListOptions {
  query?: Partial<PaperQuery>
}

export function usePaperList(options: UsePaperListOptions = {}) {
  const { query = {} } = options

  const loading = ref(false)
  const finished = ref(false)
  const list = ref<PaperVO[]>([])
  const error = ref(false)
  const refreshing = ref(false)

  function onRefresh() {
    finished.value = false
    loading.value = true
    onLoad()
  }

  async function onLoad() {
    try {
      if (refreshing.value) {
        list.value = []
        refreshing.value = false
      }

      const { data } = await listPaperNoPage(Object.assign({ isValid: 'Y' }, query))

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
    onRefresh,
    onLoad,
  }
}
