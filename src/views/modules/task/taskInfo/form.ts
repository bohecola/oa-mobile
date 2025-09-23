import { cloneDeep } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { TaskInfoForm } from '@/api/oa/task/taskInfo/types'
import { addTaskInfo, getTaskAndRecordById, getTaskInfo, updateTaskInfo } from '@/api/oa/task/taskInfo'

export type ViewAndRecordType = 'view' | 'execute' | 'audit'

export interface ViewAndRecordOptions {
  id: string
  type: ViewAndRecordType
}

export function useForm() {
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const Form = ref<FormInstance>()

  const initFormData: TaskInfoForm = {
    id: undefined,
    title: undefined,
    content: undefined,
    startDate: undefined,
    endDate: undefined,
    status: undefined,
    authList: [],
    remark: undefined,
  }

  const form = ref(cloneDeep(initFormData))

  const rules = ref<FormRules<TaskInfoForm>>({
    title: [{ required: true, message: '标题不能为空', trigger: 'onBlur' }],
    content: [{ required: true, message: '内容不能为空', trigger: 'onBlur' }],
    startDate: [{ required: true, message: '开始日期不能为空', trigger: 'onBlur' }],
    endDate: [{ required: true, message: '结束日期不能为空', trigger: 'onBlur' }],
  })

  const isLoading = ref(false)
  const updateLoading = ref(false)

  // 查看和执行类型
  const viewAndRecordType = ref<ViewAndRecordType>(undefined)

  // 当前回复的ID
  const activedCommentId = ref(undefined)

  // 表单重置
  function reset(options: ResetOptions<TaskInfoForm> = {}) {
    const { success } = options

    Form.value?.resetValidation()
    form.value = cloneDeep(initFormData)
    activedCommentId.value = undefined

    success?.(form.value)
  }

  // 查看
  async function view(id: string) {
    isLoading.value = true
    reset()

    const { data } = await getTaskInfo(id)
    Object.assign(form.value, data)
    isLoading.value = false
  }

  // 查看（含执行记录）
  async function viewAndRecord(options: ViewAndRecordOptions) {
    const { id, type } = options

    activedCommentId.value = undefined

    viewAndRecordType.value = type

    isLoading.value = true
    const { data } = await getTaskAndRecordById(id)
    Object.assign(form.value, data)
    isLoading.value = false
  }

  // 设置草稿
  function setDraft() {
    form.value.status = '0'
  }

  // 设置发布
  function setPublish() {
    form.value.status = '1'
  }

  // 提交
  function submit(options: SubmitOptions<TaskInfoForm> = {}) {
    const { msgSuccess, loading } = proxy.$modal
    const { success, fail } = options

    Form.value?.validate()
      .then(async () => {
        loading()
        if (form.value.id) {
          const { msg } = await updateTaskInfo(form.value)
          msgSuccess(msg)
        }
        else {
          const { msg } = await addTaskInfo(form.value)
          msgSuccess(msg)
        }
        success?.(form.value)
        proxy.$router.back()
      })
      .catch(fail)
  }

  return {
    Form,
    form,
    rules,
    isLoading,
    updateLoading,
    viewAndRecordType,
    activedCommentId,
    reset,
    view,
    viewAndRecord,
    submit,
    setDraft,
    setPublish,
  }
}
