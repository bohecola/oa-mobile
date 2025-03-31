import type { FormInstance } from 'vant'
import { addUserPreEmployment, getUserPreEmployment, updateUserPreEmployment } from '@/api/oa/personnel/userPreEmployment'
import type { UserPreEmploymentEvaluateBo, UserPreEmploymentForm } from '@/api/oa/personnel/userPreEmployment/types'

export interface Options<T = any> {
  operation?: BaseEntity['operation']
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options
export interface SuccessData {
  id: UserPreEmploymentForm['id']
}
// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 引用
  const Form = ref<FormInstance>()

  // 初始数据
  const initFormData: UserPreEmploymentForm = {
    id: undefined,
    recruitPostId: undefined,
    deptId: undefined,
    postId: undefined,
    name: undefined,
    sex: undefined,
    age: undefined,
    phonenumber: undefined,
    certificates: undefined,
    otherCertificates: undefined,
    transactorOpinion: undefined,
    interviewWay: undefined,
    interviewDate: undefined,
    isOwnerInterview: undefined,
    isProbation: undefined,
    probationCycle: undefined,
    internshipExplain: undefined,
    postCode: undefined,
    isRecommend: 'N',
    reference: undefined,
    isIntern: 'N',
    status: undefined,
    userPreEmploymentEvaluateBoList: [] as UserPreEmploymentEvaluateBo[],
    userPreEmploymentEvaluateVoList: [] as UserPreEmploymentEvaluateBo[],
    ossIdList: undefined,
  }

  // 表单数据
  const data = reactive<Omit<PageData<UserPreEmploymentForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      deptId: [{ required: true, message: '部门不能为空', trigger: 'onBlur' }],
      recruitNo: [{ required: true, message: '招聘申请不能为空', trigger: 'onBlur' }],
      postId: [{ required: true, message: '岗位不能为空', trigger: 'onBlur' }],
      name: [{ required: true, message: '姓名不能为空', trigger: 'onBlur' }],
      sex: [{ required: true, message: '用户性别不能为空', trigger: 'onChange' }],
      age: [{ required: true, message: '年龄不能为空', trigger: 'onChange' }],
      phonenumber: [{ required: true, pattern: /^1[3-9|]\d{9}$/, message: '请输入正确的手机号码', trigger: 'onBlur' }],
      interviewWay: [{ required: true, message: '面试形式不能为空', trigger: 'onChange' }],
      interviewDate: [{ required: true, message: '面试日期不能为空', trigger: 'onBlur' }],
      isOwnerInterview: [{ required: true, message: '是否需要业主面试不能为空', trigger: 'onBlur' }],
      isProbation: [{ required: true, message: '是否有试用期不能为空', trigger: 'onBlur' }],
      probationCycle: [{ required: true, message: '试用期时长(月)不能为空', trigger: 'onBlur' }],
      internshipExplain: [{ required: true, message: '实习期时长说明不能为空', trigger: 'onBlur' }],
      isRecommend: [{ required: true, message: '是否推荐不能为空', trigger: 'onChange' }],
      certificates: [{ required: true, message: '持证情况不能为空', trigger: 'onChange' }],
      otherCertificates: [{ required: true, message: '其他证书不能为空', trigger: 'onBlur' }],
      reference: [{ required: true, message: '推荐来源不能为空', trigger: 'onBlur' }],
      transactorOpinion: [{ required: true, message: '办理人意见不能为空', trigger: 'onBlur' }],
      isIntern: [{ required: true, message: '是否实习生不能为空', trigger: 'onChange' }],
      status: [{ required: true, message: '状态不能为空', trigger: 'onChange' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 表单重置
  const reset = () => {
    form.value = { ...initFormData }
    form.value.isOwnerInterview = 'N'
    form.value.isProbation = 'Y'
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
    const res = await getUserPreEmployment(id)
    Object.assign(form.value, res.data)
    // 回显返回的Vo给Bo
    form.value.userPreEmploymentEvaluateBoList = form.value.userPreEmploymentEvaluateVoList
    isLoading.value = false
  }

  const checkstatus = ref<boolean>(false)
  const childTableCheck = (list: any[]) => {
    // some方法找到这个空的就会直接跳出循环
    checkstatus.value = false
    list.some((item: any) => {
      for (const key in item) {
        if (key === 'result') {
          if (item[key] === null || item[key] === '' || item[key] === undefined) {
            proxy?.$modal.alertWarning('评价结果不能为空')
            checkstatus.value = true
            return true
          }
        }
      }
      return false
    })
    return !checkstatus.value
  }

  // 提交
  async function submit(options: SubmitOptions<SuccessData> = {}) {
    const { operation = 'submit', success, fail } = options
    form.value.operation = operation

    if (!childTableCheck(form.value.userPreEmploymentEvaluateBoList)) {
      return false
    }

    await Form.value?.validate()
      .then(async () => {
        updateLoading.value = true

        if (form.value.id) {
          await updateUserPreEmployment(form.value)
        }
        else {
          const { data: id } = await addUserPreEmployment(form.value)
          form.value.id = id
        }
        success?.({ id: form.value.id })
      })
      .catch(fail)
      .finally(() => (updateLoading.value = false))
  }

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<UserPreEmploymentForm> = {}) {
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
