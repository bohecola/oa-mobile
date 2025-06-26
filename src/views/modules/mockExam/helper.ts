import type { Ref } from 'vue'
import type { ExamVO } from '@/api/exam/exam/types'
import type { PaperVO } from '@/api/exam/paper/types'
import { listPaperNoPage } from '@/api/exam/paper'
import { listExam } from '@/api/exam/exam'
import { useStore } from '@/store'

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

export function useMockExam(paperId: Ref<string>) {
  const { user } = useStore()

  const loading = ref(false)
  const finished = ref(false)
  const list = ref<ExamVO[]>([])
  const error = ref(false)

  function onRefresh() {
    finished.value = false
    loading.value = true
    onLoad()
  }

  async function onLoad() {
    try {
      const { rows } = await listExam({ userId: user.info.userId, paperId: paperId.value })

      list.value = rows

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
    onRefresh,
    onLoad,
  }
}
