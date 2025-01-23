import type { FormInstance } from 'vant'
import type { UserDepartForm } from '@/api/oa/personnel/userDepart/types'
import { getUserDepart } from '@/api/oa/personnel/userDepart'
// import useUserStore from '@/store/user'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
type SubmitOptions = Options<string | number>
export type ViewOptions = Options

// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 引用
  const Form = ref<FormInstance>()

  // 获取当前登录的用户信息
  // const user = useUserStore()
  // 初始数据
  const initFormData: UserDepartForm = {
    id: undefined,
    userId: undefined,
    deptId: undefined,
    postId: undefined,
    userType: undefined,
    entryCompanyDate: undefined,
    departPreDate: undefined,
    specialCommercialInsurance: undefined,
    isLoginCompanyEmail: 'N',
    departDate: undefined,
    reason: undefined,
    handoverPerson: undefined,
    handoverContent: undefined,
    documentContent: undefined,
    ossIdList: undefined,
  }

  // 表单数据
  const data = reactive<Omit<PageData<UserDepartForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      userId: [{ required: true, message: '员工不能为空', trigger: 'onBlur' }],
      deptId: [{ required: true, message: '部门不能为空', trigger: 'onBlur' }],
      postId: [{ required: true, message: '岗位不能为空', trigger: 'onBlur' }],
      userType: [{ required: false, message: '人员类别不能为空', trigger: 'onChange' }],
      isLoginCompanyEmail: [{ required: true, message: '是否登录过项目部公司邮箱不能为空', trigger: 'onBlur' }],
      departDate: [{ required: true, message: '实际离职日期不能为空', trigger: 'onBlur' }],
      departPreDate: [{ required: true, message: '预计离职日期不能为空', trigger: 'onBlur' }],
      reason: [{ required: true, message: '离职原因不能为空', trigger: 'onBlur' }],
      handoverPerson: [{ required: true, message: '交接人不能为空', trigger: 'onBlur' }],
      handoverContent: [{ required: true, message: '交接内容不能为空', trigger: 'onBlur' }],
      documentContent: [{ required: true, message: '归档内容不能为空', trigger: 'onBlur' }],
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
    const res = await getUserDepart(id)
    Object.assign(form.value, res.data)
    isLoading.value = false
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
        form.value.userName = entity.initiator.nickName
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
    // user,
    reset,
    view,
    workflowView,
  }
}
