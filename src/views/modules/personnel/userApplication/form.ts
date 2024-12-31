import type { FormInstance } from 'vant'
import { getUserPreEmployment } from '@/api/oa/personnel/userPreEmployment'
import { listUserEmployment } from '@/api/oa/personnel/userApplication/index'

import type { UserEmploymentForm } from '@/api/oa/personnel/userApplication/types'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions = Options<string | number>
export type ViewOptions = Options

// 覆盖表单类型
// type _UserPreEmploymentForm = Override<UserEmploymentForm, { certificates: string[] }>;

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
    level: undefined, // 岗位级别
    sex: undefined,
    phonenumber: undefined,
    isProbation: 'N',
    probationCycle: undefined,
    isRecommend: 'N',
    reference: undefined,
    isIntern: 'N',
    employmentEvaluate: undefined,
    checked: undefined,
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
      isProbation: [{ required: true, message: '是否有试用期不能为空', trigger: 'onBlur' }],
      probationCycle: [{ required: true, message: '试用期时长不能为空', trigger: 'onBlur' }],
      isRecommend: [{ required: true, message: '是否推荐不能为空', trigger: 'onChange' }],
      reference: [{ required: true, message: '推荐人不能为空', trigger: 'onChange' }],
      isIntern: [{ required: true, message: '是否实习生不能为空', trigger: 'onChange' }],
      nation: [{ required: true, message: '民族不能为空', trigger: 'onBlur' }],
      education: [{ required: true, message: '学历不能为空', trigger: 'onBlur' }],
      userAccount: [{ required: true, message: '系统账号不能为空', trigger: 'onBlur' }],
      hopeDate: [{ required: true, message: '预计到岗日期不能为空', trigger: 'onBlur' }],
      realDate: [{ required: true, message: '实际到岗日期不能为空', trigger: 'onBlur' }],
      wages: [{ required: true, message: '工资不能为空', trigger: 'onBlur' }],
      baseWages: [{ required: true, message: '基本工资不能为空', trigger: 'onBlur' }],
      postWages: [{ required: true, message: '岗位工资不能为空', trigger: 'onBlur' }],
      performanceWages: [{ required: true, message: '绩效工资不能为空', trigger: 'onBlur' }],
      probationWagesRate: [{ required: true, message: '试用期薪资发放标准不能为空', trigger: 'onBlur' }],
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
