import type { FormInstance } from 'vant'
import { addUserEmploymentHandle, updateUserEmploymentHandle } from '@/api/oa/personnel/pendingEmployment/index'
import type { UserPendingEmploymentForm } from '@/api/oa/personnel/pendingEmployment/types'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions<T = string > = Options<T>
export type ViewOptions = Options
export interface SuccessData {
  id: UserPendingEmploymentForm['id']
}
// 表单
export function useForm() {
  // 引用
  const Form = ref<FormInstance>()

  // 初始数据
  const initFormData: UserPendingEmploymentForm = {
    id: undefined,
    preEmploymentId: undefined,
    employmentId: undefined,
    nation: undefined,
    education: undefined,
    userAccount: undefined,
    hopeDate: undefined,
    realDate: undefined,
    wages: undefined,
    postWages: undefined,
    baseWages: undefined,
    performanceWages: undefined,
    probationWagesRate: undefined,
    description: undefined,
    remark: undefined,
    deptId: undefined,
    postId: undefined,
    level: undefined,
    sex: undefined,
    age: undefined,
    certificates: undefined,
    otherCertificates: undefined,
    interviewDate: undefined,
    isOwnerInterview: undefined,
    interviewWay: undefined,
    phonenumber: undefined,
    isProbation: 'N',
    probationCycle: undefined,
    isOutsource: 'N',
    internshipExplain: undefined,
    postCode: undefined,
    isRecommend: 'N',
    reference: undefined,
    isIntern: 'N',
    employmentEvaluate: undefined,
    ossIdList: undefined,
  }

  // 表单数据
  const data = reactive<Omit<PageData<UserPendingEmploymentForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      employmentId: [{ required: true, message: '员工不能为空', trigger: 'onBlur' }],
      name: [{ required: true, message: '员工不能为空', trigger: 'onBlur' }],
      deptId: [{ required: true, message: '部门名称不能为空', trigger: 'onBlur' }],
      postId: [{ required: true, message: '岗位名称不能为空', trigger: 'onBlur' }],
      sex: [{ required: true, message: '性别不能为空', trigger: 'onBlur' }],
      phonenumber: [{ required: true, message: '手机号不能为空', trigger: 'onBlur' }],
      isProbation: [{ required: true, message: '是否有试用期不能为空', trigger: 'onBlur' }],
      probationCycle: [{ required: true, message: '试用期时长不能为空', trigger: 'onBlur' }],
      internshipExplain: [{ required: true, message: '实习期时长说明不能为空', trigger: 'onBlur' }],
      isRecommend: [{ required: true, message: '是否推荐不能为空', trigger: 'onChange' }],
      reference: [{ required: true, message: '推荐来源不能为空', trigger: 'onChange' }],
      isIntern: [{ required: true, message: '是否实习生不能为空', trigger: 'onChange' }],
      employmentEvaluate: [{ required: true, message: '面试评价不能为空', trigger: 'onChange' }],
      nation: [{ required: true, message: '民族不能为空', trigger: 'onBlur' }],
      education: [{ required: true, message: '学历不能为空', trigger: 'onBlur' }],
      userAccount: [{ required: true, message: '系统账号不能为空', trigger: 'onBlur' }],
      hopeDate: [{ required: true, message: '预计到岗日期不能为空', trigger: 'onBlur' }],
      realDate: [{ required: true, message: '实际到岗日期不能为空', trigger: 'onChange' }],
      probationWagesRate: [{ required: true, message: '试用期薪资发放标准不能为空', trigger: 'onBlur' }],
      certificates: [{ required: true, message: '持证情况不能为空', trigger: 'onBlur' }],
      otherCertificates: [{ required: true, message: '其他证件不能为空', trigger: 'onBlur' }],
      interviewDate: [{ required: true, message: '面试日期不能为空', trigger: 'onBlur' }],
      // interviewEvaluation: [{ required: true, message: '面试评价不能为空', trigger: 'onBlur' }],
      isOwnerInterview: [{ required: true, message: '是否需要业主不能为空', trigger: 'onBlur' }],
      isOutsource: [{ required: true, message: '是否为外包人员不能为空', trigger: 'onBlur' }],
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
    isLoading.value = false
  }

  // 提交
  async function submit(options: SubmitOptions<SuccessData> = {}) {
    const { success, fail } = options
    await Form.value?.validate()
      .then(async () => {
        updateLoading.value = true

        if (form.value.id) {
          await updateUserEmploymentHandle(form.value).finally(() => (updateLoading.value = false))
        }
        else {
          const { data: id } = await addUserEmploymentHandle(form.value).finally(() => (updateLoading.value = false))
          form.value.id = id
        }
        success?.({ id: form.value.id })
      })
      .catch(fail)
      .finally(() => (updateLoading.value = false))
  }

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<UserPendingEmploymentForm> = {}) {
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
    updateLoading,
    reset,
    view,
    submit,
    workflowSubmit,
    workflowView,
  }
}
