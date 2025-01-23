import type { FormInstance } from 'vant'
import type { UserRecruitForm, UserRecruitPostBo } from '@/api/oa/personnel/userRecruit/types'
import { getUserRecruit } from '@/api/oa/personnel/userRecruit'

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

  const initRecruitPostForm: UserRecruitPostBo = {
    id: undefined,
    postId: undefined,
    postName: undefined,
    userNum: 0,
    ageRequire: undefined,
    speciality: undefined,
    responsibility: undefined,
    demand: undefined,
    educationalRequire: undefined,
    suggestSalary: 0,
    workExperience: undefined,
    otherRequire: undefined,
  }

  // 初始数据
  const initFormData: UserRecruitForm = {
    id: undefined,
    no: undefined,
    deptId: undefined,
    address: undefined,
    hopeArriveDate: undefined,
    applyReason: undefined,
    recruitStartDate: undefined,
    recruitEndDate: undefined,
    remark: undefined,
    status: undefined,
    userRecruitPostBoList: [{ ...initRecruitPostForm }],
    ossIdList: undefined,
  }

  // 数据
  const data = reactive<Omit<PageData<UserRecruitForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      no: [{ required: true, message: '招聘编号不能为空', trigger: 'onChange' }],
      deptId: [{ required: true, message: '部门不能为空', trigger: 'onBlur' }],
      hopeArriveDate: [{ required: true, message: '期望到岗日期不能为空', trigger: 'onBlur' }],
      recruitStartDate: [{ required: true, message: '招聘开始日期不能为空', trigger: 'onBlur' }],
      recruitEndDate: [{ required: true, message: '招聘完成日期不能为空', trigger: 'onBlur' }],
      status: [{ required: true, message: '状态不能为空', trigger: 'onChange' }],
      applyReason: [{ required: true, message: '申请原因不能为空', trigger: 'onBlur' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 表单重置
  const reset = () => {
    form.value = { ...initFormData }
    form.value.userRecruitPostBoList = []
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
    const res = await getUserRecruit(id)
    Object.assign(form.value, res.data)
    form.value.userRecruitPostBoList = res.data.userRecruitPostVoList
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
    initRecruitPostForm,
    reset,
    view,
    // submit,
    // workflowSubmit,
    workflowView,
  }
}
