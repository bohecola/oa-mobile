import { getTaskVariables, getVariablesByProcessInstanceId } from '@/api/workflow/task'
import { isEmpty } from 'lodash-es'

export async function useWorkflowViewData({ taskId, processInstanceId }: any) {
  let res: any

  // 实例
  // const { proxy } = (getCurrentInstance() as ComponentInternalInstance) ?? {};
  // const { taskId, processInstanceId } = proxy.$route.query;

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
