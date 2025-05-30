import type { AxiosPromise } from 'axios'
import type { LocationQuery } from 'vue-router'
import { isEmpty, isNil } from 'lodash-es'
import { getTaskVariables, getVariablesByProcessInstanceId } from '@/api/workflow/task'
import type { StartProcessBo } from '@/api/workflow/workflowCommon/types'

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

export function useWorkflow<T>() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const { nodeId, type, procdefName: _procdefName } = proxy.$route.query

  // 加载
  const loading = ref(false)

  // 流程节点 Key
  const taskDefinitionKey = ref(nodeId as string)

  // 流程表单
  const submitFormData = ref<StartProcessBo<T>>({
    businessKey: undefined,
    tableName: undefined,
    variables: {},
    processInstanceName: undefined,
  })

  // 是否查看
  const isView = ref(type === 'view')

  // 导航离开时的查询参数
  const oldRouteQuery = ref<LocationQuery>(undefined)

  // 流程定义名称
  const procdefName = ref(_procdefName as string)

  provide('taskDefinitionKey', taskDefinitionKey)
  provide('isView', isView)

  function resetSubmitFormData() {
    submitFormData.value = {
      businessKey: undefined,
      tableName: undefined,
      variables: {},
      processInstanceName: undefined,
    }
  }

  return {
    loading,
    taskDefinitionKey,
    submitFormData,
    isView,
    oldRouteQuery,
    procdefName,
    resetSubmitFormData,
  }
}

export function useWorkflowHelper() {
  // 流程节点 Key
  const taskDefinitionKey = inject<Ref<string>>('taskDefinitionKey', ref(undefined))

  // 是否是查看流程
  const isView = inject<Ref<boolean>>('isView', ref(undefined))

  // 是否是业务表单
  const isBusinessForm = computed(() => isNil(taskDefinitionKey.value))

  // 是否是流程表单
  const isWorkflowForm = computed(() => !isNil(taskDefinitionKey.value))

  return {
    taskDefinitionKey,
    isBusinessForm,
    isWorkflowForm,
    isView,
  }
}
