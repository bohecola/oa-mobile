export interface Initiator {
  userId: string | number
  nickName: string
  deptId: string | number
  deptName: string
  createTime: string
}

export interface TempSavePayload {
  done: () => void
  load: () => void
  initiator: Initiator
}

export interface SubmitPayload {
  done: () => void
  load: () => void
  open: (taskId: string) => void
  initiator: Initiator
}

export interface ApprovalPayload {
  open: (taskId: string) => void
}
