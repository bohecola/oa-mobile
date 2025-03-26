import type { FormInstance } from 'vant'
import { addUserTransfer, getUserTransfer, updateUserTransfer } from '@/api/oa/personnel/userTransfer'
import type { UserTransferForm } from '@/api/oa/personnel/userTransfer/types'
import { useUserStore } from '@/store/user'
import { getCompany } from '@/api/oa/personnel/userContract'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options

export interface SuccessData {
  id: UserTransferForm['id']
}
// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 引用
  const Form = ref<FormInstance>()

  // 获取当前登录的用户信息
  const userInfo = useUserStore()

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
      oldDeptId: [{ required: true, message: '原部门/项目部不能为空', trigger: 'onBlur' }],
      oldPostId: [{ required: true, message: '原岗位不能为空', trigger: 'onBlur' }],
      newCompanyId: [{ required: true, message: '新公司不能为空', trigger: 'onBlur' }],
      newDeptId: [{ required: true, message: '新部门/项目部不能为空', trigger: 'onBlur' }],
      newPostId: [{ required: true, message: '新岗位不能为空', trigger: 'onBlur' }],
      startDate: [{ required: true, message: '生效日期不能为空', trigger: 'onBlur' }],
      // newSalary: [{ required: true, message: '薪资情况不能为空', trigger: 'onBlur' }],
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

  // 提交表单
  async function submit(options: SubmitOptions<SuccessData> = {}) {
    const { success, fail } = options
    await Form.value?.validate()
      .then(async () => {
        updateLoading.value = true

        if (form.value.id) {
          await updateUserTransfer(form.value)
        }
        else {
          const { data: id } = await addUserTransfer(form.value)
          form.value.id = id
        }
        success?.({ id: form.value.id })
      })
      .catch(fail)
      .finally(() => (updateLoading.value = false))
  }

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<UserTransferForm> = {}) {
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

  const companyData = ref([])
  async function getCompanyData() {
    const { data } = await getCompany('0')
    companyData.value = data.filter(e => e.status === '0').map((e) => {
      return {
        label: e.deptName,
        value: e.deptId,
      }
    })
    return companyData.value
  }

  onMounted(() => {
    getCompanyData()
  })

  return {
    Form,
    form,
    rules,
    isLoading,
    updateLoading,
    userInfo,
    companyData,
    reset,
    view,
    submit,
    workflowSubmit,
    workflowView,
  }
}
