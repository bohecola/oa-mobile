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
  procinstName?: string
  processDefinitionKey?: string
  processDefinitionName?: string
}

export interface ParticipantVo {
  groupIds?: string[] | number[]
  candidate: string[] | number[]
  candidateName: string[]
  claim: boolean
}

export interface TaskVO extends BaseEntity {
  id?: string
  name?: string
  description?: string
  priority?: number
  owner?: string
  assignee?: string | number
  assigneeName?: string
  processInstanceId?: string
  procinstName?: string
  executionId?: string
  taskDefinitionId?: any
  processDefinitionId?: string
  endTime?: string
  startTime?: string
  taskDefinitionKey?: string
  dueDate?: string
  category?: any
  parentTaskId?: any
  tenantId?: string
  claimTime?: string
  businessStatus?: string
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
