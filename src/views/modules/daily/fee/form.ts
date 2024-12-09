import { cloneDeep, isNil } from 'lodash-es'
import type { FieldRule, FormInstance } from 'vant'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { getDailyFee } from '@/api/oa/daily/fee/index'
import { useStore } from '@/store'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}

export type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options

export function useForm() {
  const { user } = useStore()
  // 实例
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance) ?? {}

  // 引用
  const Form = ref<FormInstance>()

  // 表单初始值
  const initFormData: DailyFeeForm = {
    id: undefined,
    psId: undefined,
    feeType: undefined,
    subjectType: 'project',
    deptId: user.info.deptId,
    subjectItemId: undefined,
    availableAmount: 0,
    amount: 0,
    reason: undefined,
    isAdministration: undefined,
    certificateType: undefined,
    remark: undefined,
    wfRemark: undefined,
    no: undefined,
    rootNo: undefined,
    ossIdList: undefined,
  }

  const initRules: Record<string, FieldRule[]> = {
    subjectType: [{ required: true, message: '预算类型不能为空', trigger: 'onChange' }],
    deptId: [{ required: true, message: '预算部门不能为空', trigger: 'onChange' }],
    feeType: [{ required: true, message: '费用类别不能为空', trigger: 'onChange' }],
    psId: [{ required: true, message: '预算不能为空', trigger: 'onChange' }],
    subjectItemId: [{ required: true, message: '预算类别不能为空', trigger: 'onChange' }],
    isAdministration: [{ required: true, message: '行政协助不能为空', trigger: 'onChange' }],
    certificateType: [{ required: true, message: '证件类型不能为空', trigger: 'onChange' }],
    amount: [{ validator: checkAmount, trigger: 'onChange' }],
    reason: [{ required: true, message: '申请事由不能为空', trigger: 'onBlur' }],
  }

  // 表单数据
  const data = reactive<Omit<PageData<DailyFeeForm, any>, 'queryParams'>>({
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

  // 金额校验
  function checkAmount(value: any, rule: any) {
    if (isNil(value)) {
      return '请输入金额'
    }
    else if (value > form.value.availableAmount) {
      return '输入金额不能大于剩余金额'
    }
  }

  // 回显
  async function view(id: string | number) {
    isLoading.value = true
    reset()
    const { data } = await getDailyFee(id)

    nextTick(() => {
      Object.assign(form.value, data)
      isLoading.value = false
    })
  }

  interface SuccessData {
    id: DailyFeeForm['id']
  }

  // 工作流中回显
  function workflowView(entity: any, options?: ViewOptions) {
    const { success, fail } = options ?? {}
    try {
      reset()
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
    success?.(entity)
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
