import Big from 'big.js'
import { cloneDeep } from 'lodash-es'
import type { FormInstance } from 'vant'
import { isNumeric } from '@/utils'
import type { ContractPhaseForm } from '@/api/oa/business/contractPhase/types'
import type { ContractPhaseItemVO } from '@/api/oa/business/contractPhaseItem/types'
import type { ContractVO } from '@/api/oa/business/contract/types'
import { addContractPhase, updateContractPhase } from '@/api/oa/business/contractPhase'
import { useWorkflowHelper } from '@/hooks'

// 成功回调数据
export interface SuccessData {
  id: string
  itemList: ContractPhaseItemVO[]
}

export interface ContractPhaseCustomForm extends ContractPhaseForm {
  contractId: string
  contractNo: string
  contractType: string
  contractCategory: string
  contractDeptId: string | number
  contractStartDate: string
  contractEndDate: string
  contractAmount: number
}

export function useForm() {
  const { taskDefinitionKey, isBusinessForm } = useWorkflowHelper()

  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const Form = ref<FormInstance>()

  // 子表数据
  const phaseItem: ContractPhaseItemVO = {
    id: undefined,
    contractId: undefined,
    phaseId: undefined,
    phaseName: undefined,
    receivableAmount: undefined,
    startDate: undefined,
    endDate: undefined,
    planDate: undefined,
    remark: undefined,
  }

  // 表单数据
  const initFormData: ContractPhaseCustomForm = {
    id: undefined,
    status: undefined,
    contractId: undefined,
    contractNo: undefined,
    contractType: undefined,
    contractCategory: undefined,
    contractDeptId: undefined,
    contractStartDate: undefined,
    contractEndDate: undefined,
    contractAmount: undefined,
    itemList: [cloneDeep(phaseItem)],
  }

  const form = ref<ContractPhaseCustomForm>(cloneDeep(initFormData))

  const rules = ref<FormRules<ContractPhaseCustomForm>>({
    contractId: [{ required: true, message: '合同不能为空', trigger: 'onChange' }],
    contractDeptId: [{ required: true, message: '需求部门不能为空', trigger: 'onChange' }],
    phaseName: [{ required: true, message: '不能为空', trigger: 'onBlur' }],
    receivableAmount: [{ required: false, message: '不能为空', trigger: 'onBlur' }],
    startDate: [{ required: false, message: '不能为空', trigger: 'onChange' }],
    endDate: [{ required: false, message: '不能为空', trigger: 'onChange' }],
  })

  const isLoading = ref(false)
  const updateLoading = ref(false)

  // 应回款金额总和
  const totalReturnAmount = computed(() => {
    const total = form.value.itemList.reduce<Big>((prev, curr) => {
      if (isNumeric(curr.receivableAmount)) {
        return prev.add(curr.receivableAmount)
      }
      return prev
    }, Big(0))

    return total.toNumber()
  })

  // 设置合同数据
  function setContractData(data: ContractVO) {
    form.value.contractNo = data?.no
    form.value.contractType = data?.type
    form.value.contractCategory = data?.category
    form.value.contractDeptId = data?.deptId
    form.value.contractStartDate = data?.startDate
    form.value.contractEndDate = data?.endDate
    form.value.contractAmount = data?.amount
  }

  // 重置
  function reset() {
    form.value = cloneDeep(initFormData)
    Form.value?.resetValidation()
  }

  // 表单字段重置
  function resetFields(names: KeysOfArray<ContractPhaseCustomForm>) {
    const obj = cloneDeep(initFormData)

    Form.value?.resetValidation(names)
    for (const key of names as string[]) {
      form.value[key] = obj[key]
    }
  }

  // 回显
  async function view(_: string) {
    // isLoading.value = true
    // reset()
    // const { data } = await getContractPhase(id)
    // Object.assign(form.value, data)

    // // 获取合同数据
    // const { data: contract } = await getContract(form.value.contractId)

    // // 设置合同数据
    // setContractData(contract)

    // // 回款总金额不等与合同金额
    // isLoading.value = false
  }

  // 提交
  async function submit(options: SubmitOptions<SuccessData> = {}) {
    const { success, fail } = options

    const valid = await Form.value?.validate()
      .then(async () => {
        // 同步合同 id
        form.value.itemList.forEach(e => (e.contractId = form.value.contractId))

        if (isBusinessForm.value) {
          // 回款总金额不等与合同金额
          if (!Big(form.value.contractAmount).eq(totalReturnAmount.value)) {
            return proxy.$modal.msgWarning('应回款总和与合同金额不相等')
          }
        }

        // 加载中
        updateLoading.value = true

        // 编辑
        if (form.value.id) {
          const { data } = await updateContractPhase(form.value)
          form.value.itemList = data.itemList
        }
        else {
          // 新增
          const { data } = await addContractPhase(form.value)
          form.value.id = data.id
          form.value.itemList = data.itemList
        }

        // 成功回调
        success?.({
          id: form.value.id,
          itemList: form.value.itemList,
        })
      }).catch(fail)
      .finally(() => updateLoading.value = false)

    return valid
  }

  async function workflowSubmit(options: SubmitOptions<ContractPhaseCustomForm> = {}) {
    const { success, fail } = options

    const isNotEqual = !Big(form.value.contractAmount ?? 0).eq(totalReturnAmount.value)
    const isManager = taskDefinitionKey.value === 'Activity_1p6s0tb'

    await Form.value?.validate()
      .then(() => {
        // 同步合同 id
        form.value.itemList.forEach(e => (e.contractId = form.value.contractId))

        // 回款总金额不等与合同金额（需求部门经理填报确认节点）
        if (isNotEqual && isManager)
          return proxy.$modal.msgWarning('应回款总和与合同金额不相等')

        success?.(form.value)
      }).catch(fail)
  }

  function workflowView(entity: any, options: ViewOptions = {}) {
    const { success, fail } = options
    try {
      reset()
      nextTick(async () => {
        // 设置表单数据
        Object.assign(form.value, entity)

        // 成功回调
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
    phaseItem,
    isLoading,
    updateLoading,
    setContractData,
    submit,
    view,
    reset,
    resetFields,
    workflowSubmit,
    workflowView,
  }
}
