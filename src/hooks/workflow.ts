import type { AxiosPromise } from 'axios'
import { isEmpty } from 'lodash-es'
import { getTaskVariables, getVariablesByProcessInstanceId } from '@/api/workflow/task'

export async function useWorkflowViewData({ taskId, processInstanceId }: any): AxiosPromise {
  let res: any

  if (taskId) {
    res = await getTaskVariables(taskId as string)

    if (!isEmpty(res.data)) {
      return res
    }
  }
  if (processInstanceId) {
    res = await getVariablesByProcessInstanceId(processInstanceId as string)
  }

  return res
}
