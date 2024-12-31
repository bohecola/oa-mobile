import type { FormInstance } from 'vant'
import { getUserTransfer } from '@/api/oa/personnel/userTransfer'
import type { UserTransferForm } from '@/api/oa/personnel/userTransfer/types'

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
  const initFormData: UserTransferForm = {
    id: undefined,
    userId: undefined,
    type: undefined,
    oldCompanyId: '',
    oldDeptId: undefined,
    oldPostId: undefined,
    newCompanyId: undefined,
    newDeptId: undefined,
    newPostId: undefined,
    iscommander: 'N',
    commanderPowerHandover: undefined,
    newSpecialCommercialInsurance: undefined,
    oldSpecialCommercialInsurance: undefined,
    newDeptType: undefined,
    oldDeptType: undefined,
    startDate: undefined,
    endDate: undefined,
    reason: undefined,
    remark: undefined,
    status: undefined,
    ossIdList: [],
  }

  // 表单数据
  const data = reactive<Omit<PageData<UserTransferForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      userId: [{ required: true, message: '员工不能为空', trigger: 'onBlur' }],
      type: [{ required: true, message: '类型不能为空', trigger: 'onChange' }],
      oldCompanyId: [{ required: true, message: '原公司不能为空', trigger: 'onBlur' }],
      oldDeptId: [{ required: true, message: '原部门不能为空', trigger: 'onBlur' }],
      oldPostId: [{ required: true, message: '原岗位不能为空', trigger: 'onBlur' }],
      newCompanyId: [{ required: true, message: '新公司不能为空', trigger: 'onBlur' }],
      newDeptId: [{ required: true, message: '新部门不能为空', trigger: 'onBlur' }],
      newPostId: [{ required: true, message: '新岗位不能为空', trigger: 'onBlur' }],
      startDate: [{ required: true, message: '生效日期不能为空', trigger: 'onBlur' }],
      newSalary: [{ required: true, message: '薪资情况不能为空', trigger: 'onBlur' }],
      commanderPowerHandover: [{ required: true, message: '主管交接人不能为空', trigger: 'onBlur' }],
      reason: [{ required: true, message: '调用原因不能为空', trigger: 'onBlur' }],
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

  // 更新加载
  const updateLoading = ref(false)

  // 回显
  const view = async (id: string | number) => {
    isLoading.value = true
    reset()
    const res = await getUserTransfer(id)
    Object.assign(form.value, res.data)
    isLoading.value = false
  }

  // 工作流中回显
  function workflowView(entity: any, options?: ViewOptions) {
    const { success, fail } = options ?? {}
    try {
      reset()
      nextTick(async () => {
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
    // submit,
    // workflowSubmit,
    workflowView,
  }
}
