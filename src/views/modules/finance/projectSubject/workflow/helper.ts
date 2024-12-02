import type { ProjectSubjectVO } from '@/api/oa/finance/projectSubject/types'
import { listProjectSubject } from '@/api/oa/finance/projectSubject'

export function useProjectSubjectOptions() {
  const psId = ref(undefined)
  const options = ref<ProjectSubjectVO[]>([])
  const optionsLoading = ref(false)

  optionsLoading.value = true
  listProjectSubject({ status: '3', pageNum: undefined, pageSize: undefined })
    .then(({ rows }) => {
      options.value = rows
    })
    .finally(() => (optionsLoading.value = false))

  return {
    psId,
    options,
    optionsLoading,
  }
}
