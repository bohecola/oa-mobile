import type { AxiosResponse } from 'axios'
import type { FormInstance } from 'vant'
import type { InternshipEmploymentForm } from '@/api/oa/personnel/internshipEmployment/types'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options

// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 引用
  const Form = ref<FormInstance>()

  // 初始数据
  const initFormData: InternshipEmploymentForm = {
    id: undefined,
    userId: undefined,
    userInfoId: undefined,
    newDeptId: undefined,
    deptType: undefined,
    newPostId: undefined,
    oldDeptId: undefined,
    oldPostId: undefined,
    sex: undefined,
    age: undefined,
    nation: undefined,
    education: undefined,
    isProbation: undefined,
    probationPeriod: undefined,
    startDate: undefined,
    endDate: undefined,
    wages: undefined,
    baseWages: undefined,
    postWages: undefined,
    performanceWages: undefined,
    probationWagesRate: undefined,
    certificates: undefined,
    otherCertificates: undefined,
    status: undefined,
    specialCommercialInsurance: undefined,
    formalDate: undefined,
    humanResourcesOpinion: '已电话告知其岗位、薪资、保险、试用期等上述信息、且本人已同意',
    remark: undefined,
    ossIdList: undefined,
  }

  // 表单数据
  const data = reactive<Omit<PageData<InternshipEmploymentForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      userInfoId: [{ required: true, message: '员工不能为空', trigger: 'onChange' }],
      newDeptId: [{ required: true, message: '新部门不能为空', trigger: 'onChange' }],
      newPostId: [{ required: true, message: '新岗位不能为空', trigger: 'onChange' }],
      startDate: [{ required: true, message: '开始时间不能为空', trigger: 'onChange' }],
      endDate: [{ required: true, message: '结束时间不能为空', trigger: 'onChange' }],
      status: [{ required: true, message: '状态不能为空', trigger: 'onBlur' }],
      probationPeriod: [{ required: true, message: '试用期时长不能为空', trigger: 'onBlur' }],
      probationWagesRate: [{ required: true, message: '试用期薪资发放标准不能为空', trigger: 'onBlur' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 表单重置
  const reset = (cb?: () => void) => {
    form.value = { ...initFormData }
    Form.value?.resetValidation()
    cb?.()
  }

  // 回显加载
  const isLoading = ref(false)

  // 更新加载
  const updateLoading = ref(false)

  // 回显
  const view = async (id: string | number) => {
    isLoading.value = true
    reset()
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
    reset,
    view,
    // submit,
    // workflowSubmit,
    workflowView,
  }
}
