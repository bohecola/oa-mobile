import { cloneDeep } from 'lodash-es'
import type { TaskRecordVO } from '@/api/oa/task/taskRecord/types'

export function useRecordItem() {
  const recordItem: TaskRecordVO = {
    id: undefined,
    taskId: undefined,
    content: undefined,
    parentId: undefined,
    parentByName: undefined,
    createByName: undefined,
    createBy: undefined,
    createTime: undefined,
    replyToId: undefined,
    children: [],
    ossIdList: [],
  }

  const newRecordItem = ref(cloneDeep(recordItem))

  return {
    recordItem,
    newRecordItem,
  }
}
