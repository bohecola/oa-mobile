import type { NodeConfigVO } from '../nodeConfig/types'
import type { DefinitionConfigVO } from '../definitionConfig/types'
import type { TaskVO } from '@/api/workflow/task/types'

export interface ProcessInstanceQuery extends PageQuery {
  categoryCode?: string
  name?: string
  key?: string
  startUserId?: string
  businessKey?: string
  processDefinitionKey?: string
  contractNo?: string
}

export interface ProcessInstanceVO extends BaseEntity {
  id: string
  name: string
  processDefinitionId: string
  processDefinitionName: string
  processDefinitionKey: string
  processDefinitionVersion: string
  deploymentId: string
  businessKey: string
  isSuspended?: any
  tenantId: string
  startTime: string
  endTime?: string
  startUserId: string
  businessStatus: string
  businessStatusName: string
  taskVoList: TaskVO[]
  tableName: string
}

export interface ActHiProcinstVO {
  id: string
  rev: number
  procInstId: string
  businessKey: string
  procDefId: string
  startTime: string
  endTime: string
  duration: string
  startUserId: string
  startActId: string
  endActId: string
  superProcessInstanceId: string
  deleteReason: string
  tenantId: string
  name: string
  callbackId: string
  callbackType: string
  referenceId: string
  referenceType: string
  propagatedStageInstId: string
  businessStatus: string
  /**
   * 节点配置视图对象
   */
  wfNodeConfigVo: NodeConfigVO
  wfDefinitionConfigVo: DefinitionConfigVO
}
