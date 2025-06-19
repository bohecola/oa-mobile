import { cloneDeep, isEmpty } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { ContractVO } from '@/api/oa/business/contract/types'
import type { ContractSettlementForm, ContractSettlementItem } from '@/api/oa/business/contractSettlement/types'
import { addContractSettlement, getContractSettlement, getSettlementFileType, updateContractSettlement } from '@/api/oa/business/contractSettlement'
import { getDicts } from '@/api/system/dict/data'
import { useWorkflowHelper } from '@/hooks'

export interface FileItem {
  dictValue: string
  ossIdList: string[]
}

// 成功回调数据类型
export interface SuccessData {
  id: ContractSettlementForm['id']
  collectionList: ContractSettlementForm['collectionList']
}

export function useForm() {
  const { taskDefinitionKey } = useWorkflowHelper()

  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 表单实例
  const Form = ref<FormInstance>()

  // 实际回款明细
  const collectionItem: ContractSettlementItem = {
    phaseItemId: undefined,
    phaseName: undefined,
    phaseReceivableAmount: undefined,
    phaseCollectedAmount: undefined,
    phaseAssessedAmount: undefined,
    phaseRewardedAmount: undefined,
    phaseStartDate: undefined,
    phaseEndDate: undefined,
    phasePlanDate: undefined,

    rewardAssessmentAmount: 0,
    changeAmount: 0,
  }

  // 表单数据
  const initFormData: ContractSettlementForm = {
    id: undefined,
    contractId: undefined,
    contractNo: undefined,
    contractType: undefined,
    contractCategory: undefined,
    contractDeptId: undefined,
    contractStartDate: undefined,
    contractEndDate: undefined,
    contractAmount: undefined,
    collectionList: [cloneDeep(collectionItem)],
    fileMap: {},
    isSeal: 'N',
    isAssign: 'N',
    assignUser: undefined,
  }

  // 文件列表
  const fileList = ref<FileItem[]>([])

  // 表单数据
  const form = ref(cloneDeep(initFormData))

  const rules = ref<FormRules<ContractSettlementForm>>({
    contractId: [{ required: true, message: '合同不能为空', trigger: 'onBlur' }],
    contractDeptId: [{ required: true, message: '需求部门不能为空', trigger: 'onBlur' }],
    phaseItemId: [{ required: true, message: '执行阶段不能为空', trigger: 'onChange' }],
    assignUser: [{ required: true, message: '指派人不能为空', trigger: 'onBlur' }],
  })

  const isLoading = ref(false)
  const updateLoading = ref(false)
  const fileDictLoading = ref(false)

  // 文件类型字典
  const file_dict = ref<DictDataOption[]>([])

  // 设置文件类型字典
  async function setFileDict(contractId: string) {
    try {
      fileDictLoading.value = true
      const { msg } = await getSettlementFileType(contractId)
      const { data } = await getDicts(msg)
      file_dict.value = data.map(e => ({
        label: e.dictLabel,
        value: e.dictValue,
        elTagType: e.listClass,
        elTagClass: e.cssClass,
        remark: e.remark,
      }))
    }
    finally {
      fileDictLoading.value = false
    }
  }

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

  // 文件 Map => 文件 List
  function transformFileMapToList(fileMap: Record<string, string[]>) {
    return Object.entries(fileMap).map(([dictValue, ossIdList]) => ({ dictValue, ossIdList }))
  }

  // 文件 List => 文件 Map
  function transformFileListToMap(fileList: FileItem[]) {
    return fileList.reduce(
      (acc, item) => {
        acc[item.dictValue] = item.ossIdList
        return acc
      },
      {} as Record<string, string[]>,
    )
  }

  // 回显文件列表
  async function viewFileList(contractId: string) {
    // 设置文件类型字典
    await setFileDict(contractId)

    const map = {}
    // 设置文件 Map
    for (const { value } of file_dict.value) {
      map[value] = []
    }
    Object.assign(map, form.value.fileMap)

    // 设置文件列表
    fileList.value = transformFileMapToList(map)
  }

  // 重置
  function reset() {
    Form.value?.resetValidation()
    form.value = cloneDeep(initFormData)
    fileList.value = []
  }

  // 表单字段重置
  function resetFields(names: KeysOfArray<ContractSettlementForm>) {
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
    // 获取合同结算数据
    const { data } = await getContractSettlement(id)

    // 设置表单数据
    Object.assign(form.value, data)

    // 设置合同数据
    const { contract } = data
    setContractData(contract)

    // 回显文件列表
    await viewFileList(contract.id)

    isLoading.value = false
  }

  // 提交
  async function submit(options: SubmitOptions<SuccessData> = {}) {
    const { operation = 'submit', success, fail } = options
    form.value.operation = operation

    await Form.value?.validate()
      .then(async () => {
        updateLoading.value = true

        // 转换文件列表
        form.value.fileMap = transformFileListToMap(fileList.value)

        // 编辑
        if (form.value.id) {
          const { data } = await updateContractSettlement(form.value)
          form.value.collectionList = data.collectionList
        }
        else {
          // 新增
          const { data } = await addContractSettlement(form.value)
          form.value.id = data.id
          form.value.collectionList = data.collectionList
        }

        // 成功回调
        success?.({
          id: form.value.id,
          collectionList: form.value.collectionList,
        })
      })
      .catch(fail)
      .finally(() => (updateLoading.value = false))
  }

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<ContractSettlementForm> = {}) {
    const { success, fail } = options

    // 是否未上传结算资料
    const notUploadFile = fileList.value.every(e => isEmpty(e.ossIdList))
    // 未指派其他人提交结算资料
    const isNotAssign = form.value.isAssign === 'N'

    // 需求部门经理审核
    const isNeedManageNode = taskDefinitionKey.value === 'Activity_12wbile'
    // 需求部门经理审核，且未指派，且未上传结算资料
    const isNeedManageFail = isNeedManageNode && isNotAssign && notUploadFile

    // 指派人提交结算资料
    const isAssginNode = taskDefinitionKey.value === 'Activity_0bclr8t'
    // 指派人提交结算资料，且未上传结算资料
    const isAssignFail = isAssginNode && notUploadFile

    // 自定义校验失败
    const isCustomFailed = isNeedManageFail || isAssignFail

    await Form.value?.validate()
      .then(async () => {
        // 转换文件列表
        form.value.fileMap = transformFileListToMap(fileList.value)

        // 自定义校验失败
        if (isCustomFailed)
          return proxy?.$modal.msgWarning('请上传结算资料')

        success?.(form.value)
      })
      .catch(fail)
  }

  // 工作流中回显
  function workflowView(entity: any, options: ViewOptions = {}) {
    const { success, fail } = options
    try {
      reset()
      nextTick(async () => {
        // 设置表单数据
        Object.assign(form.value, entity)

        // 回显文件列表
        await viewFileList(entity.contractId)

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
    isLoading,
    updateLoading,
    fileDictLoading,
    collectionItem,
    file_dict,
    fileList,
    setContractData,
    setFileDict,
    transformFileMapToList,
    transformFileListToMap,
    reset,
    resetFields,
    submit,
    view,
    workflowView,
    workflowSubmit,
  }
}
