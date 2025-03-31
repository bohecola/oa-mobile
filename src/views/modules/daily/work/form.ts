import { cloneDeep, isNil } from 'lodash-es'
import type { FieldRule, FormInstance } from 'vant'
import { extraInitFormData, extraInitRules } from './extraForm'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { addDailyWork, getDailyWork, updateDailyWork } from '@/api/oa/daily/work/index'

export interface Options<T = any> {
  operation?: BaseEntity['operation']
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions<T = string> = Options<T>
export type ViewOptions = Options
export interface SuccessData { id: DailyWorkForm['id'] }

export function useForm() {
  // 引用
  const Form = ref<FormInstance>()

  // 表单初始值
  const initFormData: DailyWorkForm = {
    id: undefined,
    dailyWorkType: undefined,
    companyId: undefined,
    fileType: undefined,
    fileUseType: undefined,
    isSeal: 'N',
    isYwlProject: 'N',
    isPersonnelTransfer: 'N',
    sealType: undefined,
    isReturnSeal: undefined,
    sealFileCategory: undefined,
    sealUseType: undefined,
    administrationFileType: undefined,
    isUseSeal: 'N',
    isExistRegulations: undefined,
    recipient: undefined,
    reason: undefined,
    remark: undefined,
    wfRemark: undefined,
    no: undefined,
    needDepts: undefined,
    ossIdList: undefined,
    contentJson: undefined,
    // 额外的字段
    ...extraInitFormData,
  }

  const initRules: Record<string, FieldRule[]> = {
    dailyWorkType: [{ required: true, message: '日常事务申请类型不能为空', trigger: 'onChange' }],
    companyId: [{ required: true, message: '公司不能为空', trigger: 'onChange' }],
    fileUseType: [{ required: true, message: '使用方式不能为空', trigger: 'onChange' }],
    fileType: [{ required: true, message: '资料类型不能为空', trigger: 'onChange' }],
    isSeal: [{ required: true, message: '是否加盖公章不能为空', trigger: 'onChange' }],
    contractCategory: [{ required: true, message: '销售合同类别不能为空', trigger: 'onChange' }],
    isYwlProject: [{ required: true, message: '是否运维类项目不能为空', trigger: 'onChange' }],
    isPersonnelTransfer: [{ required: true, message: '是否涉及人员任命、调整不能为空', trigger: 'onChange' }],
    customizeApprover: [{ required: true, message: '审核人不能为空', trigger: 'onChange' }],
    customizeTransactor: [{ required: true, message: '办理人不能为空', trigger: 'onChange' }],
    sealType: [{ required: true, message: '申请类型不能为空', trigger: 'onChange' }],
    isReturnSeal: [{ required: true, message: '是否交回原印不能为空', trigger: 'onChange' }],
    sealFileCategory: [{ required: true, message: '文件类别不能为空', trigger: 'onChange' }],
    sealUseType: [{ required: true, message: '用印类型不能为空', trigger: 'onChange' }],
    administrationFileType: [{ required: true, message: '申请资料不能为空', trigger: 'onChange' }],
    isUseSeal: [{ required: true, message: '是否用印不能为空', trigger: 'onChange' }],
    needDepts: [{ required: true, message: '需求部门不能为空', trigger: 'onChange' }],
    isExistRegulations: [{ required: true, message: '是否存在违章不能为空', trigger: 'onChange' }],
    recipient: [{ required: true, message: '接收人不能为空', trigger: 'onChange' }],
    reason: [{ required: true, message: '申请事由不能为空', trigger: 'onBlur' }],
    ossIdList: [{ required: false, message: '附件列表不能为空', trigger: 'onChange' }],
    ...extraInitRules,
  }

  // 表单数据
  const data = reactive<Omit<PageData<DailyWorkForm, any>, 'queryParams'>>({
    form: cloneDeep(initFormData),
    rules: cloneDeep(initRules),
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 加载
  const isLoading = ref(false)

  // 更新加载
  const updateLoading = ref(false)

  // 表单重置
  function reset() {
    Form.value?.resetValidation()
    form.value = cloneDeep(initFormData)
    rules.value = cloneDeep(initRules)
  }

  // 表单字段重置
  function resetFields(names: KeysOfArray<DailyWorkForm>) {
    const Obj = cloneDeep(initFormData)

    Form.value?.resetValidation(names)
    for (const key of names as string[]) {
      form.value[key] = Obj[key]
    }
  }

  // 回显
  async function view(id: string) {
    isLoading.value = true
    reset()
    const { data } = await getDailyWork(id)

    nextTick(() => {
      Object.assign(form.value, data)
      isLoading.value = false
    })
  }

  // 提交
  async function submit(options: SubmitOptions<SuccessData> = {}) {
    const { operation = 'submit', success, fail } = options
    form.value.operation = operation

    await Form.value?.validate()
      .then(async () => {
        updateLoading.value = true

        // 以 A-Za-a_ 开头的所有字段自动构建为 contentJson
        const regex = /^[A-Z]{1,2}_/i
        const content = Object.fromEntries(Object.entries(form.value).filter(([key, val]) => regex.test(key) && !isNil(val)))
        form.value.contentJson = JSON.stringify(content)

        if (form.value.id) {
          await updateDailyWork(form.value)
        }
        else {
          const { data } = (await addDailyWork(form.value))
          form.value.id = data
        }

        success?.({ id: form.value.id })
      })
      .catch(fail)
      .finally(() => (updateLoading.value = false))
  }

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<DailyWorkForm> = {}) {
    const { success, fail } = options

    await Form.value?.validate()
      .then(() => success?.(form.value))
      .catch(fail)
  }

  // 工作流中回显
  function workflowView(entity: any, options: ViewOptions = {}) {
    const { success, fail } = options
    try {
      reset()
      Object.assign(form.value, entity)
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
    resetFields,
    submit,
    view,
    workflowSubmit,
    workflowView,
  }
}
