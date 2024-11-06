import type { FormInstance } from 'vant'
import type { UserRegularizationForm } from '@/api/oa/personnel/userRegularization/types'
import { useWorkflowViewData } from '@/hooks'

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
    type: '0',
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
      type: [{ required: true, message: '提前转正不能为空', trigger: 'onBlur' }],
      description: [{ required: true, message: '描述不能为空', trigger: 'onBlur' }],
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
    reset,
    workflowView,
  }
}
