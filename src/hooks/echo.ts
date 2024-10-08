import { listContract } from '@/api/oa/business/contract'
import type { ContractQuery } from '@/api/oa/business/contract/types'
import { listProject } from '@/api/oa/business/project'

// 项目列表
export function useProjectOptions() {
  const projectOptions = ref<DictDataOption[]>([])
  listProject().then((res) => {
    projectOptions.value = res.rows.map(item => ({ label: item.name, value: item.id as string }))
  })

  return {
    projectOptions,
  }
}

// 合同列表
export async function useContractOptions(query: Partial<ContractQuery>) {
  const contractOptions = ref<DictDataOption[]>([])
  const res = await listContract(query)
  contractOptions.value = res.rows.map(item => ({ label: item.name, value: item.id as string }))
  return {
    contractOptions,
  }
}
