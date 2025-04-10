import type { FormInstance } from 'vant'
import type { UserRegularizationForm } from '@/api/oa/personnel/userRegularization/types'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options

// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 引用
  const Form = ref<FormInstance>()

  // 初始数据
  const initFormData: UserRegularizationForm = {
    id: undefined,
    userId: undefined,
    userName: undefined,
    deptId: undefined,
    deptName: undefined,
    postId: undefined,
    postName: undefined,
    entryCompanyDate: undefined,
    probationPeriod: undefined,
    formalType: '1',
    formalDate: undefined,
    level: undefined,
    deptType: undefined,
    files: undefined,
    description: undefined,
    ossIdList: undefined,
  }

  // 表单数据
  const data = reactive<Omit<PageData<UserRegularizationForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      userId: [{ required: true, message: '员工不能为空', trigger: 'onBlur' }],
      formalDate: [{ required: true, message: '转正时间不能为空', trigger: 'onChange' }],
      formalType: [{ required: true, message: '用人单位意见不能为空', trigger: 'onChange' }],
      description: [{ required: true, message: '原因说明不能为空', trigger: 'onChange' }],
      ossIdList: [{ required: true, message: '附件列表不能为空', trigger: 'onBlur' }],
    },
  })
  // 响应式解构
  const { form, rules } = toRefs(data)

  // 表单重置
  const reset = () => {
    form.value = { ...initFormData }
    Form.value?.resetValidation()
  }

  // 回显加载
  const isLoading = ref(false)

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<UserRegularizationForm> = {}) {
    const { success, fail } = options
    await Form.value?.validate()
      .then(() => {
        success?.({ ...form.value })
      }).catch(fail)
  }

  // 工作流中回显
  function workflowView(entity: any, options: ViewOptions = {}) {
    const { success, fail } = options
    try {
      reset()
      nextTick(() => {
        Object.assign(form.value, {
          ...entity,
        })
      })
      success?.(entity)
    }
    catch (err) {
      console.error(err)
      fail?.(err)
    }
  }

  return {
    Form,
    form,
    rules,
    isLoading,
    reset,
    workflowSubmit,
    workflowView,
  }
}
