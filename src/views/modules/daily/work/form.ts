import { cloneDeep } from 'lodash-es'
import type { FieldRule, FormInstance } from 'vant'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { getDailyWork } from '@/api/oa/daily/work/index'
import { useWorkflowViewData } from '@/hooks'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}

export type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options

export function useForm() {
  // 实例
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance) ?? {}

  // 引用
  const Form = ref<FormInstance>()

  // 表单初始值
  const initFormData: DailyWorkForm = {
    id: undefined,
    dailyWorkType: undefined,
    fileType: undefined,
    fileUseType: undefined,
    isSeal: undefined,
    isYwlProject: undefined,
    isPersonnelTransfer: undefined,
    sealType: undefined,
    isReturnSeal: undefined,
    sealFileCategory: undefined,
    sealUseType: undefined,
    administrationFileType: undefined,
    isUseSeal: undefined,
    isExistRegulations: undefined,
    recipient: undefined,
    reason: undefined,
    remark: undefined,
    no: undefined,
    wfRemark: undefined,
    ossIdList: undefined,
  }

  const initRules: Record<string, FieldRule[]> = {
    dailyWorkType: [{ required: true, message: '日常事务申请类型不能为空', trigger: 'onChange' }],
    fileType: [{ required: true, message: '资料类型不能为空', trigger: 'onChange' }],
    fileUseType: [{ required: true, message: '使用方式不能为空', trigger: 'onChange' }],
    isYwlProject: [{ required: true, message: '是否运维类项目不能为空', trigger: 'onChange' }],
    isPersonnelTransfer: [{ required: true, message: '是否涉及人员任命、调整不能为空', trigger: 'onChange' }],
    customizeApprover: [{ required: true, message: '自定义审批人不能为空', trigger: 'onChange' }],
    customizeTransactor: [{ required: true, message: '自定义办理人不能为空', trigger: 'onChange' }],
    sealType: [{ required: true, message: '申请类型不能为空', trigger: 'onChange' }],
    isReturnSeal: [{ required: true, message: '是否交回原印不能为空', trigger: 'onChange' }],
    sealFileCategory: [{ required: true, message: '文件类别不能为空', trigger: 'onChange' }],
    sealUseType: [{ required: true, message: '用印类型不能为空', trigger: 'onChange' }],
    administrationFileType: [{ required: true, message: '申请资料不能为空', trigger: 'onChange' }],
    isUseSeal: [{ required: true, message: '是否用印不能为空', trigger: 'onChange' }],
    needDepts: [{ required: true, message: '需求部门不能为空', trigger: 'onChange' }],
    isExistRegulations: [{ required: true, message: '是否存在违章不能为空', trigger: 'onChange' }],
    recipient: [{ required: true, message: '接收人不能为空', trigger: 'onChange' }],
    isSeal: [{ required: true, message: '是否加盖公章不能为空', trigger: 'onChange' }],
    reason: [{ required: true, message: '申请事由不能为空', trigger: 'onBlur' }],
  }

  // 表单数据
  const data = reactive<Omit<PageData<DailyWorkForm, any>, 'queryParams'>>({
    form: cloneDeep(initFormData),
    rules: cloneDeep(initRules),
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 加载
  const isLoading = ref(false)

  // 更新加载
  const updateLoading = ref(false)

  // 表单重置
  const reset = () => {
    form.value = cloneDeep(initFormData)
    Form.value?.resetValidation()
    // 重置规则
    rules.value = cloneDeep(initRules)
  }

  // 回显
  async function view(id: string | number) {
    isLoading.value = true
    reset()
    const { data } = await getDailyWork(id)

    nextTick(() => {
      Object.assign(form.value, data)
      isLoading.value = false
    })
  }

  interface SuccessData {
    id: DailyWorkForm['id']
  }

  // 工作流中回显
  async function workflowView({ taskId, processInstanceId }: any, options?: ViewOptions) {
    const { success, fail } = options ?? {}
    let res: any

    try {
      reset()
      isLoading.value = true
      res = await useWorkflowViewData({ taskId, processInstanceId })
      const { entity } = res.data

      nextTick(() => {
        Object.assign(form.value, {
          ...entity,
        })
      })
    }
    catch (err) {
      console.error(err)
      fail?.(err)
    }
    finally {
      isLoading.value = false
    }
    success?.(res.data)
  }

  return {
    Form,
    form,
    rules,
    isLoading,
    updateLoading,
    reset,
    view,
    workflowView,
  }
}
