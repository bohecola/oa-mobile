import { isEmpty, isNil } from 'lodash-es'
import type { AxiosPromise } from 'axios'
import type { LocationQuery } from 'vue-router'
import type { ActHiProcinstVO } from '@/api/workflow/processInstance/types'
import type { RouterJumpVo, StartProcessBo } from '@/api/workflow/workflowCommon/types'
import { getTaskVariables, getVariablesByProcessInstanceId } from '@/api/workflow/task'
import { getActHiProcinstByBusinessKey } from '@/api/workflow/processInstance'
import workflowCommon from '@/api/workflow/workflowCommon'

interface GetWorkflowJumpVoOptions {
  data: ActHiProcinstVO
}

interface WorkflowJumpOptions {
  businessKey: string
  proxy: any
  openNewWindowTab?: boolean
}

interface WorkflowURLOptions {
  businessKey: string
  timestamp?: boolean
}

export async function useWorkflowViewData({ taskId, processInstanceId }: any): AxiosPromise {
  let res: any

  const needBMJL = ref([])

  provide('needBMJL', needBMJL)

  if (taskId) {
    res = await getTaskVariables(taskId as string)

    if (!isEmpty(res.data)) {
      const { data } = res

      needBMJL.value = data?.needBMJL ?? []

      return res
    }
  }
  if (processInstanceId) {
    res = await getVariablesByProcessInstanceId(processInstanceId as string)
  }

  const { data } = res

  needBMJL.value = data?.needBMJL ?? []

  return res
}

export function useWorkflow<T>() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 参数
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
  provide('workflowLoading', workflowLoading)
  provide('workflowCloseLoading', workflowCloseLoading)

  function workflowLoading() {
    loading.value = true
  }

  function workflowCloseLoading() {
    loading.value = false
  }

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
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 流程节点 Key
  const taskDefinitionKey = inject<Ref<string>>('taskDefinitionKey', ref(undefined))

  // 发起人部门ID
  const initiatorDeptId = inject<Ref<string | number>>('initiatorDeptId', ref(undefined))

  // 是否是查看流程
  const isView = inject<Ref<boolean>>('isView', ref(undefined))

  // 需求部门经理数组
  const needBMJL = inject<Ref<string[]>>('needBMJL', ref([]))

  // 是否是业务表单
  const isBusinessForm = computed(() => isNil(taskDefinitionKey.value))

  // 是否是流程表单
  const isWorkflowForm = computed(() => !isNil(taskDefinitionKey.value))

  // 是否草稿
  const isDraft = computed(() => proxy.$route.query.wfStatus === 'draft')

  // 是否新增
  const isAdd = computed(() => proxy.$route.query.type === 'add')

  // 是否审批
  const isApproval = computed(() => proxy.$route.query.type === 'approval')

  // 流程加载状态开启
  const workflowLoading = inject<() => void>('workflowLoading', () => {})

  // 流程加载状态关闭
  const workflowCloseLoading = inject<() => void>('workflowCloseLoading', () => {})

  return {
    taskDefinitionKey,
    initiatorDeptId,
    needBMJL,
    isBusinessForm,
    isWorkflowForm,
    isView,
    isDraft,
    isAdd,
    isApproval,
    workflowLoading,
    workflowCloseLoading,
  }
}

// 创建流程跳转对象
function createWorkflowJumpVo(options: GetWorkflowJumpVoOptions): RouterJumpVo {
  const { data } = options

  return {
    wfDefinitionConfigVo: data.wfDefinitionConfigVo,
    wfNodeConfigVo: data.wfNodeConfigVo,
    businessKey: data.businessKey,
    businessStatus: data.businessStatus,
    taskId: '',
    processInstanceId: data.id,
    type: 'view',
  }
}

export async function useWorkflowJump(options: WorkflowJumpOptions) {
  const { proxy, businessKey, openNewWindowTab } = options

  const { loading, closeLoading, msgError } = proxy.$modal

  if (openNewWindowTab) {
    return msgError('请在电脑端查看')
  }

  loading()

  const { data } = await getActHiProcinstByBusinessKey(businessKey).finally(() => {
    closeLoading()
  })

  const routerJumpVo = createWorkflowJumpVo({ data })

  workflowCommon.routerJump(routerJumpVo, proxy, false, openNewWindowTab)
}

// 获取流程 URL
export function useWorkflowURL() {
  const url = ref(undefined)
  const loading = ref(false)
  const isError = ref(false)
  const msg = ref(undefined)
  const queryParams = ref(undefined)

  async function fetchWorkflowURL(options: WorkflowURLOptions) {
    try {
      const { businessKey, timestamp = false } = options

      loading.value = true

      const { data } = await getActHiProcinstByBusinessKey(businessKey)
        .finally(() => loading.value = false)

      const routerJumpVo = createWorkflowJumpVo({ data })

      const path = `${routerJumpVo.wfNodeConfigVo.wfFormManageVo.router}`

      const query = {
        id: routerJumpVo.businessKey,
        wfStatus: routerJumpVo.businessStatus,
        type: routerJumpVo.type,
        taskId: routerJumpVo.taskId,
        processInstanceId: routerJumpVo.processInstanceId,
      }

      url.value = `${location.origin}${path}?${new URLSearchParams(query).toString()}${timestamp ? `&t=${Date.now()}` : ''}`
      msg.value = '操作成功'
      isError.value = false
      queryParams.value = query
    }
    catch (error) {
      console.error(error)
      url.value = undefined
      isError.value = true
      msg.value = '请输入有效的流程ID'
      queryParams.value = undefined
    }
  }

  return {
    url,
    loading,
    isError,
    msg,
    queryParams,
    fetchWorkflowURL,
  }
}
