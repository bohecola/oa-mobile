import { cloneDeep } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { PurchaseForm, PurchaseItemVO } from '@/api/oa/business/purchase/types'
import { getPurchase } from '@/api/oa/business/purchase'
import { useStore } from '@/store'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options

export function useForm() {
  const { user } = useStore()
  // 实例
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance) ?? {}

  // 引用
  const Form = ref<FormInstance>()

  // 采购明细
  const purchaseItem: PurchaseItemVO = {
    psiId: undefined,
    name: undefined,
    brand: undefined,
    specsModel: undefined,
    unit: undefined,
    num: undefined,
    amount: undefined,
    realAmount: undefined,
    totalAmount: undefined,
    realTotalAmount: undefined,
    inquiryWay: undefined,
    supplier: undefined,
    remark: undefined,
  }

  // 表单初始值
  const initFormData: PurchaseForm = {
    id: undefined,
    no: undefined,
    subjectType: 'project',
    projectId: undefined,
    projectName: undefined,
    // TODO 后期根据需要调整
    deptId: user.info.deptId,
    type: undefined,
    businessCategory: undefined,
    objectCategory: undefined,
    serviceCategory: undefined,
    leaseType: undefined,
    isDeposit: 'N',
    contractId: undefined,
    contractName: undefined,
    contractExecute: undefined,
    isOwnerSettlement: 'N',
    amount: undefined,
    realAmount: undefined,
    description: undefined,
    file: undefined,
    remark: undefined,
    itemList: [{ ...purchaseItem }],
    checkFiles: undefined,
    purchaseContractIds: undefined,
    ossIdList: undefined,
  }

  // 表单数据
  const data = reactive<Omit<PageData<PurchaseForm, any>, 'queryParams'>>({
    form: { ...cloneDeep(initFormData) },
    rules: {
      // id: [{ required: true, message: 'ID不能为空', trigger: 'onBlur' }],
      // no: [{ required: true, message: '编号不能为空', trigger: 'onBlur' }],
      subjectType: [{ required: true, message: '预算类型不能为空', trigger: 'onChange' }],
      projectId: [{ required: true, message: '项目id不能为空', trigger: 'onBlur' }],
      contractId: [{ required: false, message: '关联收入合同不能为空', trigger: 'onBlur' }],
      contractExecute: [{ required: false, message: '合同执行情况不能为空', trigger: 'onBlur' }],
      type: [{ required: true, message: '采购类型不能为空', trigger: 'onChange' }],
      businessCategory: [{ required: true, message: '业务类别不能为空', trigger: 'onBlur' }],
      objectCategory: [{ required: true, message: '物品类别不能为空', trigger: 'onBlur' }],
      serviceCategory: [{ required: false, message: '服务类别不能为空', trigger: 'onBlur' }],
      leaseType: [{ required: false, message: '租赁类型不能为空', trigger: 'onChange' }],
      isDeposit: [{ required: false, message: '是否有押金不能为空', trigger: 'onBlur' }],
      amount: [{ required: true, message: '金额不能为空', trigger: 'onBlur' }],
      isOwnerSettlement: [{ required: false, message: '是否业主单独结算不能为空', trigger: 'onBlur' }],
      description: [{ required: true, message: '采购说明不能为空', trigger: 'onBlur' }],
      file: [{ required: true, message: '申购附件不能为空', trigger: 'onBlur' }],
      remark: [{ required: false, message: '备注不能为空', trigger: 'onBlur' }],
      realAmount: [{ required: true, message: '实际采购金额不能为空', trigger: 'onBlur' }],
      checkFiles: [{ required: true, message: '验收附件不能为空', trigger: 'onBlur' }],
      purchaseContractIds: [{ required: true, message: '采购合同不能为空', trigger: 'onBlur' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 加载
  const isLoading = ref(false)

  // 更新加载
  const updateLoading = ref(false)

  // 表单重置
  const reset = () => {
    form.value = { ...cloneDeep(initFormData) }
    Form.value?.resetValidation()
  }

  // 回显
  async function view(id: string | number) {
    isLoading.value = true
    reset()
    const { data } = await getPurchase(id)
    const itemList = (data.itemList || []).map((item: PurchaseItemVO) => ({
      ...item,
      num: Number(item.num),
      amount: Number(item.amount),
      realAmount: Number(item.realAmount),
      totalAmount: Number(item.totalAmount),
      realTotalAmount: Number(item.realTotalAmount),
    }))
    nextTick(() => {
      Object.assign(form.value, { ...data, amount: Number(data.amount), realAmount: Number(data.realAmount), itemList })
      isLoading.value = false
    })
  }

  interface SuccessData {
    id: PurchaseForm['id']
    no: PurchaseForm['no']
    itemList: PurchaseForm['itemList']
  }

  // // 提交
  // async function submit(options?: SubmitOptions<SuccessData>) {
  //   const { success, fail } = options ?? {}

  //   const valid = await Form.value?.validate(async (valid: boolean) => {
  //     try {
  //       if (valid) {
  //         updateLoading.value = true

  //         if (form.value.id) {
  //           await updatePurchase(form.value).finally(() => (updateLoading.value = false))
  //         }
  //         else {
  //           // 生成编号
  //           const { msg } = (await getGenerateCode(BusinessCodeEnum.CGCODE, 'oa_purchase')) ?? {}
  //           form.value.no = msg
  //           // 新增
  //           const { data } = (await addPurchase(form.value).finally(() => (updateLoading.value = false))) ?? {}
  //           form.value.id = data.id
  //           form.value.itemList = data.itemList
  //         }

  //         success?.({
  //           id: form.value.id,
  //           no: form.value.no,
  //           itemList: form.value.itemList,
  //         })
  //       }
  //     }
  //     catch (err) {
  //       console.error(err)
  //       fail?.(err)
  //     }
  //   })

  //   return valid
  // }

  // // 工作流中提交表单
  // async function workflowSubmit(options?: SubmitOptions) {
  //   const { success } = options ?? {}

  //   let data: PurchaseForm = {}

  //   const valid = await Form.value?.validate(async (valid: boolean) => {
  //     data = {
  //       ...form.value,
  //     }
  //     if (valid) {
  //       success?.()
  //     }
  //   })

  //   return {
  //     valid,
  //     data,
  //   }
  // }

  // 工作流中回显
  async function workflowView(entity: any, options?: ViewOptions) {
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
    purchaseItem,
    reset,
    view,
    // submit,
    // workflowSubmit,
    workflowView,
  }
}
