import { cloneDeep, isNil } from 'lodash-es'
import type { FormInstance } from 'vant'
import { purchaseItem, sumTotalMoney, taxRateItem } from './helper'
import type { PurchaseForm, PurchaseItemVO, PurchaseVO, TaxRateVO } from '@/api/oa/business/purchase/types'
import { addPurchase, getPurchase, updatePurchase, updatePurchaseByBussiness } from '@/api/oa/business/purchase'
import { useStore } from '@/store'
import { getGenerateCode } from '@/api/oa/common'
import { BusinessCodeEnum } from '@/enums/BusinessCodeEnum'

export interface SuccessData {
  id: PurchaseForm['id']
  no: PurchaseForm['no']
  itemList: PurchaseForm['itemList']
}

export function useForm() {
  const { user } = useStore()

  // 引用
  const Form = ref<FormInstance>()

  // 表单初始值
  const initFormData: PurchaseForm = {
    id: undefined,
    no: undefined,
    processName: `采购申请-${user.info.nickName}`,
    nature: undefined,
    taxRateList: [],
    subjectType: 'project',
    psId: undefined,
    deptId: user.info.deptId,
    type: undefined,
    purchaseMethod: undefined,
    businessCategory: undefined,
    objectCategory: undefined,
    serviceCategory: undefined,
    leaseType: undefined,
    isDeposit: 'N',
    contractId: undefined,
    contractNo: undefined,
    contractExecute: undefined,
    isOwnerSettlement: undefined,
    amount: undefined,
    notTaxAmount: undefined,
    realAmount: undefined,
    notTaxRealAmount: undefined,
    description: undefined,
    remark: undefined,
    itemList: [cloneDeep(purchaseItem)],
    hasPurchaseContract: 'Y',
    purchaseContractIds: undefined,
    purchaseFiles: undefined,
    checkFiles: undefined,
    ossIdList: undefined,
    purchaseChange: undefined,
    qzIncomeDescription: undefined,
  }

  // 表单
  const form = ref(cloneDeep(initFormData))

  // 校验
  const rules = ref<FormRules<PurchaseForm>>({
    processName: [{ required: true, message: '流程名称不能为空', trigger: 'onBlur' }],
    nature: [{ required: true, message: '采购性质不能为空', trigger: 'onChange' }],
    type: [{ required: true, message: '采购类型不能为空', trigger: 'onChange' }],
    subjectType: [{ required: true, message: '预算类型不能为空', trigger: 'onChange' }],
    deptId: [{ required: true, message: '需求部门不能为空', trigger: 'onChange' }],
    psId: [{ required: true, message: '预算不能为空', trigger: 'onChange' }],
    contractId: [{ required: true, message: '合同不能为空', trigger: 'onChange' }],
    contractExecute: [{ required: true, message: '合同执行情况不能为空', trigger: 'onChange' }],
    purchaseMethod: [{ required: true, message: '采购方式不能为空', trigger: 'onChange' }],
    businessCategory: [{ required: true, message: '业务类别不能为空', trigger: 'onChange' }],
    objectCategory: [{ required: true, message: '物品类别不能为空', trigger: 'onChange' }],
    serviceCategory: [{ required: false, message: '服务类别不能为空', trigger: 'onChange' }],
    leaseType: [{ required: false, message: '租赁类型不能为空', trigger: 'onChange' }],
    isDeposit: [{ required: false, message: '是否有押金不能为空', trigger: 'onChange' }],
    amount: [{ required: true, message: '含税总金额不能为空', trigger: 'onBlur' }],
    notTaxAmount: [{ required: true, message: '不含税总金额不能为空', trigger: 'onBlur' }],
    isOwnerSettlement: [{ required: false, message: '是否业主单独结算不能为空', trigger: 'onChange' }],
    description: [{ required: true, message: '采购说明不能为空', trigger: 'onBlur' }],
    remark: [{ required: false, message: '备注不能为空', trigger: 'onBlur' }],
    realAmount: [{ required: false, message: '含税实际采购总金额不能为空', trigger: 'onBlur' }],
    notTaxRealAmount: [{ required: false, message: '不含税实际采购总金额不能为空', trigger: 'onBlur' }],
    checkFiles: [{ required: true, message: '验收附件不能为空', trigger: 'onChange' }],
    purchaseContractIds: [{ required: true, message: '采购合同不能为空', trigger: 'onBlur' }],
    purchaseFiles: [{ required: true, message: '采购附件不能为空', trigger: 'onChange' }],
    taxRateList: [{ required: true, message: '签证收入金额/增值税率不能为空', trigger: 'onChange' }],
    itemList: [{ required: true, message: '采购明细不能为空', trigger: 'onChange' }],
    ossIdList: [{ required: true, message: '附件列表不能为空', trigger: 'onBlur' }],
    qzIncomeDescription: [{ required: true, message: '签证收入情况说明不能为空', trigger: 'onBlur' }],
  })

  // 加载
  const isLoading = ref(false)

  // 更新加载
  const updateLoading = ref(false)

  // 不能删除的文件主键数组
  const excludeCheckFiles = ref([])
  const excludeOssIdList = ref([])

  // 展示采购方式描述
  const showPurchaseMethodDesc = ref(false)

  // 预算内采购
  const isContractPurchase = computed(() => form.value.nature === '1')
  // 签证采购
  const isVisaPurchase = computed(() => form.value.nature === '2')
  // 项目预算
  const isProject = computed(() => form.value.subjectType === 'project')
  // 部门预算
  const isDept = computed(() => form.value.subjectType === 'dept')
  // 运维类
  const isYwl = computed(() => (isProject.value || isVisaPurchase.value) && ['0', '3'].includes(form.value.businessCategory))

  // 项目类型业务类别
  const isProjectBusinessType = computed(() => isProject.value || isVisaPurchase.value)

  // 是否展示更详尽的数据
  const showExtraData = computed(() => !isYwl.value && (isProject.value || isVisaPurchase.value))

  // 签证收入含税总金额
  const taxRateListTotalAmount = computed(() => sumTotalMoney<TaxRateVO>(form.value.taxRateList, 'amount'))

  // 签证收入不含税总金额
  const taxRateListNotTaxTotalAmount = computed(() => sumTotalMoney<TaxRateVO>(form.value.taxRateList, 'notTaxAmount'))

  // 表单重置
  function reset() {
    form.value = cloneDeep(initFormData)
    Form.value?.resetValidation()

    excludeCheckFiles.value = []
    excludeOssIdList.value = []
  }

  // 表单字段重置
  function resetFields(names: KeysOfArray<PurchaseForm>) {
    const obj = cloneDeep(initFormData)

    Form.value?.resetValidation(names)
    for (const key of names as string[]) {
      form.value[key] = obj[key]
    }
  }

  // 回显
  async function view(id: string) {
    isLoading.value = true
    reset()
    const { data } = await getPurchase(id)

    excludeCheckFiles.value = data.checkFiles?.split(',')
    excludeOssIdList.value = data.ossIdList

    // 旧采购数据设置采购性质 => 预算内采购
    if (isNil(data.nature)) {
      data.nature = '1'
    }

    Object.assign(form.value, data)
    isLoading.value = false
  }

  // 自定义回显
  async function viewByObject(data: PurchaseVO) {
    reset()
    excludeCheckFiles.value = data.checkFiles?.split(',')
    excludeOssIdList.value = data.ossIdList

    // 旧采购数据设置采购性质 => 预算内采购
    if (isNil(data.nature)) {
      data.nature = '1'
    }

    Object.assign(form.value, data)
  }

  // 提交表单
  async function submit(options: SubmitOptions<SuccessData> = {}) {
    const { operation = 'submit', calledFrom, success, fail } = options
    form.value.operation = operation

    await Form.value?.validate()
      .then(async () => {
        updateLoading.value = true

        if (form.value.id) {
          if (calledFrom === 'bussiness') {
            await updatePurchaseByBussiness(form.value)
          }
          else {
            const { data } = await updatePurchase(form.value)
            form.value.itemList = (data.itemList ?? []).map((item: PurchaseItemVO) => ({
              ...item,
              num: Number(item.num),
              amount: Number(item.amount),
              totalAmount: Number(item.totalAmount),
              taxRate: String(item.taxRate),
            }))
          }
        }
        else {
          // 生成编号
          const { msg } = await getGenerateCode(BusinessCodeEnum.CGCODE, 'oa_purchase')
          form.value.no = msg
          // 新增
          const { data } = await addPurchase(form.value)
          form.value.id = data.id
          form.value.itemList = (data.itemList || []).map((item: PurchaseItemVO) => ({
            ...item,
            num: Number(item.num),
            amount: Number(item.amount),
            totalAmount: Number(item.totalAmount),
            taxRate: String(item.taxRate),
          }))
        }
        success?.({
          id: form.value.id,
          no: form.value.no,
          itemList: form.value.itemList,
        })
      })
      .catch(fail)
      .finally(() => (updateLoading.value = false))
  }

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<PurchaseForm> = {}) {
    const { success, fail } = options
    await Form.value?.validate()
      .then(() => {
        success?.(form.value)
      }).catch(fail)
  }

  // 工作流中回显
  function workflowView(entity: any, options: ViewOptions = {}) {
    const { success, fail } = options
    try {
      reset()
      // 旧采购数据设置采购性质 => 预算内采购
      if (isNil(entity.nature)) {
        entity.nature = '1'
      }

      // 兼容旧采购流程
      const isOldPurchase = entity.itemList.every((item: any) => isNil(item.taxAmount))
      if (isOldPurchase) {
        entity.itemList = entity.itemList.map((item: any) => {
          // 普票-税率0（历史数据统一都需处理）
          item.invoiceType = '0'
          item.taxRate = '0'

          return {
            ...item,
            // 含税单价
            taxAmount: item.amount,
            // 含税合计
            taxTotalAmount: item.totalAmount,
            // 含税实际单价
            taxRealAmount: isNil(item.realAmount) ? undefined : item.realAmount,
            // 含税实际合计
            taxRealTotalAmount: isNil(item.realTotalAmount) ? undefined : item.realTotalAmount,
            // 不含税单价
            amount: undefined,
            // 不含税合计
            totalAmount: undefined,
            // 不含税实际单价
            realAmount: undefined,
            // 不含税实际合计
            realTotalAmount: undefined,
          }
        })
      }

      Object.assign(form.value, entity)
    }
    catch (err) {
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
    taxRateItem,
    purchaseItem,
    excludeCheckFiles,
    excludeOssIdList,
    showPurchaseMethodDesc,
    isContractPurchase,
    isVisaPurchase,
    isProject,
    isDept,
    isYwl,
    isProjectBusinessType,
    showExtraData,
    taxRateListTotalAmount,
    taxRateListNotTaxTotalAmount,
    reset,
    resetFields,
    submit,
    view,
    viewByObject,
    workflowSubmit,
    workflowView,
  }
}
