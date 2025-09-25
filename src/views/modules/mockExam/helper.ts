import type { PaperVO } from '@/api/exam/paper/types'
import { listPaperNoPage } from '@/api/exam/paper'

export function useMockPaper() {
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

      const { data } = await listPaperNoPage({ paperType: '1', isValid: 'Y' })

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
