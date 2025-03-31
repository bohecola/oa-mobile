import type { FieldRule, FormInstance } from 'vant'
import { cloneDeep, isNil } from 'lodash-es'
import { extraInitFormData, extraInitRules } from './extraForm'
import type { DailyFeeForm, DailyFeeItemVO } from '@/api/oa/daily/fee/types'
import { addDailyFee, getDailyFee, updateDailyFee } from '@/api/oa/daily/fee/index'
import { useStore } from '@/store'

export interface Options<T = any> {
  operation?: BaseEntity['operation']
  success?: (data?: T) => void
  fail?: (err?: any) => void
}

export type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options

interface SuccessData {
  id: DailyFeeForm['id']
  itemList: DailyFeeForm['itemList']
}

// 费用明细项
export const dailyFeeItem: DailyFeeItemVO = {
  id: undefined,
  dailyFeeId: undefined,
  subjectItemId: undefined,
  subjectItemDeptId: undefined,
  budgetAmount: undefined,
  applyingAmount: undefined,
  finishAmount: undefined,
  availableAmount: undefined,
  amount: undefined,
  remark: undefined,
}

export function useForm() {
  const { user } = useStore()

  // 引用
  const Form = ref<FormInstance>()

  // 表单初始值
  const initFormData: DailyFeeForm = {
    id: undefined,
    psId: undefined,
    contractId: undefined,
    contractNo: undefined,
    feeType: undefined,
    subjectType: 'project',
    deptId: user.info.deptId,
    itemList: [{ ...dailyFeeItem }],
    amount: undefined,
    reason: undefined,
    isAdministration: undefined,
    certificateType: undefined,
    remark: undefined,
    wfRemark: undefined,
    no: undefined,
    rootNo: undefined,
    ossIdList: undefined,
    receiptInfo: {
      entityName: undefined,
      invoiceType: undefined,
      taxRate: undefined,
      paymentWay: undefined,
      accountName: undefined,
      corporateAccount: undefined,
      openingBank: undefined,
    },
    contentJson: undefined,
    // 额外的字段
    ...extraInitFormData,
  }

  const initRules: Record<string, FieldRule[]> = {
    feeType: [{ required: true, message: '费用类别不能为空', trigger: 'onChange' }],
    deptId: [{ required: true, message: '需求部门不能为空', trigger: 'onChange' }],
    subjectType: [{ required: true, message: '预算类型不能为空', trigger: 'onChange' }],
    psId: [{ required: true, message: '预算不能为空', trigger: 'onChange' }],
    contractId: [{ required: true, message: '合同编号不能为空', trigger: 'onChange' }],
    subjectItemId: [{ required: true, message: '预算科目不能为空', trigger: 'onChange' }],
    isAdministration: [{ required: true, message: '行政协助不能为空', trigger: 'onChange' }],
    certificateType: [{ required: true, message: '证件类型不能为空', trigger: 'onChange' }],
    amount: [{ required: true, message: '申请总金额不能为空', trigger: 'onBlur' }],
    reason: [{ required: true, message: '申请事由不能为空', trigger: 'onBlur' }],
    receiptInfo: {
      entityName: [{ required: false, message: '单位或个人名称不能为空', trigger: 'onBlur' }],
      invoiceType: [{ required: false, message: '发票类型不能为空', trigger: 'onChange' }],
      taxRate: [{ required: false, message: '税率不能为空', trigger: 'onChange' }],
      paymentWay: [{ required: false, message: '付款方式不能为空', trigger: 'onBlur' }],
      accountName: [{ required: false, message: '账户名称不能为空', trigger: 'onBlur' }],
      corporateAccount: [{ required: false, message: '对公账号不能为空', trigger: 'onBlur' }],
      openingBank: [{ required: false, message: '开户行名称不能为空', trigger: 'onBlur' }],
    } as any,
    ...extraInitRules,
  }

  // 表单数据
  const data = reactive<Omit<PageData<DailyFeeForm, any>, 'queryParams'>>({
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
  function resetFields(names: KeysOfArray<DailyFeeForm>) {
    const obj = cloneDeep(initFormData)

    Form.value?.resetValidation(names)
    for (const key of names as string[]) {
      form.value[key] = obj[key]
    }
  }

  // 回显
  async function view(id: string | number) {
    isLoading.value = true
    reset()
    const { data } = await getDailyFee(id)
    data.receiptInfo = JSON.parse(data.receiptInfo as string)

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

        // 拷贝 form
        const data = cloneDeep(form.value)

        // 将 receiptInfo 转换为字符串
        data.receiptInfo = JSON.stringify(data.receiptInfo)

        // 以 A-Za-a_ 开头的所有字段自动构建为 contentJson
        const regex = /^[A-Z]{1,2}_/i
        const content = Object.fromEntries(Object.entries(data).filter(([key, val]) => regex.test(key) && !isNil(val)))
        data.contentJson = JSON.stringify(content)

        if (data.id) {
          // 更新
          const res = await updateDailyFee(data)
          data.itemList = res.data.itemList
        }
        else {
          // 新增
          const res = await addDailyFee(data)
          data.id = res.data.id
          data.itemList = res.data.itemList
        }

        success?.({
          id: data.id,
          itemList: data.itemList,
        })
      })
      .catch(fail)
      .finally(() => (updateLoading.value = false))
  }

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<DailyFeeForm> = {}) {
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
      nextTick(() => {
        // 兼容旧费用流程（非明细表）
        if (!isNil(entity?.subjectItemId) && !entity?.subjectItemId.includes(',')) {
          const item: DailyFeeItemVO = {
            subjectItemId: entity.subjectItemId,
            availableAmount: entity.availableAmount,
            amount: entity.amount,
          }
          form.value.itemList = [item]
        }

        Object.assign(form.value, entity)

        success?.(entity)
      })
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
