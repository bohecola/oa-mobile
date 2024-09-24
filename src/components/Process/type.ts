export interface SubmitForm {
  taskId?: string
  message?: string
  variables?: {
    entity?: any
    [k: string]: any
  }
  messageType?: string[]
  wfCopyList?: any[]
}
