import type { NodeConfigVO } from '@/api/workflow/nodeConfig/types'
import type { DefinitionConfigVO } from '@/api/workflow/definitionConfig/types'

export interface TaskNum {
  startNum: number
  waitNum: number
  doneNum: number
  copyNum: number
}

export interface TaskQuery extends PageQuery {
  name?: string
  businessKey?: string
  procinstName?: string
  processDefinitionKey?: string
  processDefinitionName?: string
  contractNo?: string
}

export interface ParticipantVo {
  groupIds?: string[] | number[]
  candidate: string[] | number[]
  candidateName: string[]
  claim: boolean
}

export interface TaskVO extends BaseEntity {
  id: string
  name: string
  procinstName?: string
  description?: string
  priority: number
  startUserId?: string | number
  owner?: string
  assignee?: string | number
  assigneeName?: string
  processInstanceId: string
  executionId: string
  taskDefinitionId?: any
  processDefinitionId: string
  startTime?: string
  endTime?: string
  taskDefinitionKey: string
  dueDate?: string
  category?: any
  parentTaskId?: any
  tenantId: string
  claimTime?: string
  businessStatus?: string
  isRead?: string
  businessStatusName?: string
  processDefinitionName?: string
  processDefinitionKey?: string
  participantVo?: ParticipantVo
  multiInstance?: boolean
  businessKey?: string
  wfNodeConfigVo?: NodeConfigVO
  wfDefinitionConfigVo?: DefinitionConfigVO
}

export interface VariableVo {
  key: string
  value: string
}

export interface UseMapVO {
  id: string
  tableName: string
  definitionId: string
  processKey: string
  version: number
  categoryCode: string
  categoryName: string
  procdefName: string
  nodeId: string
  formName: string
  router: string
  sortNum: number
}
