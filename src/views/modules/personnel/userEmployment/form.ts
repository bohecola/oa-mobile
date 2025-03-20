import type { FormInstance } from 'vant'
import { getUserPreEmployment } from '@/api/oa/personnel/userPreEmployment'
import { addAndUpdateUserPreEmploymentAndEmployment, addUserEmployment, listUserEmployment, updateUserEmployment } from '@/api/oa/personnel/userEmployment/index'

import type { UserEmploymentForm } from '@/api/oa/personnel/userEmployment/types'

export interface Options<T = any> {
  operation?: BaseEntity['operation']
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options

interface SuccessData {
  id?: UserEmploymentForm['id']
  employmentId?: UserEmploymentForm['employmentId']
  preEmploymentId?: UserEmploymentForm['preEmploymentId']
}
// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 引用
  const Form = ref<FormInstance>()

  // 初始数据
  const initFormData: UserEmploymentForm = {
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
    status: undefined,
    checked: true,
    ossIdList: undefined,
  }

  // 表单数据
  const data = reactive<Omit<PageData<UserEmploymentForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      preEmploymentId: [{ required: true, message: '员工不能为空', trigger: 'onBlur' }],
      name: [{ required: true, message: '员工不能为空', trigger: 'onBlur' }],
      deptId: [{ required: true, message: '部门名称不能为空', trigger: 'onBlur' }],
      postId: [{ required: true, message: '岗位名称不能为空', trigger: 'onBlur' }],
      sex: [{ required: true, message: '性别不能为空', trigger: 'onBlur' }],
      phonenumber: [{ required: true, message: '手机号不能为空', trigger: 'onBlur' }],
      age: [{ required: true, message: '年龄不能为空', trigger: 'onBlur' }],
      isProbation: [{ required: true, message: '是否有试用期不能为空', trigger: 'onBlur' }],
      probationCycle: [{ required: true, message: '试用期时长不能为空', trigger: 'onBlur' }],
      isRecommend: [{ required: true, message: '是否推荐不能为空', trigger: 'onChange' }],
      reference: [{ required: true, message: '推荐来源不能为空', trigger: 'onChange' }],
      isIntern: [{ required: true, message: '是否实习生不能为空', trigger: 'onChange' }],
      isOutsource: [{ required: true, message: '是否为外包人员不能为空', trigger: 'onChange' }],
      internshipExplain: [{ required: true, message: '实习期时长说明不能为空', trigger: 'onChange' }],
      employmentEvaluate: [{ required: true, message: '面试评价不能为空', trigger: 'onChange' }],
      nation: [{ required: true, message: '民族不能为空', trigger: 'onBlur' }],
      education: [{ required: true, message: '学历不能为空', trigger: 'onBlur' }],
      userAccount: [{ required: true, message: '系统账号不能为空', trigger: 'onBlur' }],
      hopeDate: [{ required: true, message: '预计到岗日期不能为空', trigger: 'onBlur' }],
      realDate: [{ required: true, message: '实际到岗日期不能为空', trigger: 'onChange' }],
      wages: [{ required: true, message: '工资不能为空', trigger: 'onBlur' }],
      baseWages: [{ required: true, message: '基本工资不能为空', trigger: 'onBlur' }],
      postWages: [{ required: true, message: '岗位工资不能为空', trigger: 'onBlur' }],
      performanceWages: [{ required: true, message: '绩效工资不能为空', trigger: 'onBlur' }],
      probationWagesRate: [{ required: true, message: '试用期薪资发放标准不能为空', trigger: 'onBlur' }],
      certificates: [{ required: true, message: '持证情况不能为空', trigger: 'onBlur' }],
      otherCertificates: [{ required: true, message: '其他证件不能为空', trigger: 'onBlur' }],
      interviewDate: [{ required: true, message: '面试日期不能为空', trigger: 'onBlur' }],
      // interviewEvaluation: [{ required: true, message: '面试评价不能为空', trigger: 'onBlur' }],
      isOwnerInterview: [{ required: true, message: '是否需要业主不能为空', trigger: 'onBlur' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 表单重置
  const reset = () => {
    form.value = { ...initFormData }
    Form.value?.resetValidation()
  }
  // 是否通过面试入职的初始状态
  nextTick(() => {
    form.value.checked = true
  })
  // 回显加载
  const isLoading = ref(false)

  // 更新加载
  const updateLoading = ref(false)

  // 回显
  const view = async (id: string | number) => {
    isLoading.value = true
    reset()
    form.value.preEmploymentId = id as string
    const res = await listUserEmployment({ preEmploymentId: id, pageNum: 1, pageSize: 10 })
    Object.assign(form.value, res.rows[0])
    // 业务列表点击名字查看，部门岗位电话是否试用期显示
    const { data: preUser } = await getUserPreEmployment(id)
    form.value.deptId = preUser.deptId
    form.value.postId = preUser.postId
    form.value.sex = preUser.sex
    form.value.phonenumber = preUser.phonenumber
    form.value.isProbation = preUser.isProbation
    form.value.probationCycle = Number(preUser.probationCycle)
    isLoading.value = false
  }

  // 提交
  async function submit(options?: SubmitOptions<SuccessData>) {
    const { operation = 'submit', success, fail } = options ?? {}
    form.value.operation = operation

    await Form.value?.validate()
      .then(async () => {
        updateLoading.value = true

        if (form.value.level >= 38) {
          // 主值班员岗位级别以下的录用情况状态默认是录用
          form.value.status = '3'
          const { data } = await addAndUpdateUserPreEmploymentAndEmployment(form.value).finally(() => (updateLoading.value = false))
          form.value.preEmploymentId = data.userPreEmploymentId
          form.value.employmentId = data.userEmploymentId
          success?.({
            id: form.value.employmentId,
            preEmploymentId: form.value.preEmploymentId,
            employmentId: form.value.employmentId,
          })
        }
        else {
          if (form.value.id) {
            await updateUserEmployment(form.value).finally(() => (updateLoading.value = false))
          }
          else {
            const { data } = await addUserEmployment(form.value).finally(() => (updateLoading.value = false))
            form.value.id = data
          }
          success?.({
            id: form.value.id,
            preEmploymentId: form.value.preEmploymentId,
            employmentId: form.value.employmentId,
          })
        }
      })
      .catch(fail)
      .finally(() => (updateLoading.value = false))
  }

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<UserEmploymentForm> = {}) {
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
