import type { ProjectSubjectVO } from '@/api/oa/finance/projectSubject/types'
import { listProjectSubject } from '@/api/oa/finance/projectSubject'
import { parseTime } from '@/utils/ruoyi'

export function useProjectSubjectOptions() {
  const psId = ref(undefined)
  const options = ref<(ProjectSubjectVO & { label: string, value: string })[]>([])
  const optionsLoading = ref(false)

  optionsLoading.value = true
  listProjectSubject({ status: '3', pageNum: undefined, pageSize: undefined })
    .then(({ rows }) => {
      options.value = rows.map((e) => {
        return {
          ...e,
          label: `${e.name}（${parseTime(e.startDate, '{y}-{m}-{d}')} ~ ${parseTime(e.endDate, '{y}-{m}-{d}')}）`,
          value: e.id,
        }
      })
    })
    .finally(() => (optionsLoading.value = false))

  return {
    psId,
    options,
    optionsLoading,
  }
}
