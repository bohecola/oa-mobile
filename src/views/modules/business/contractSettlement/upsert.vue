<template>
  <van-form
    ref="Form"
    v-loading="isLoading && showLoading"
    label-width="auto"
    label-align="top"
    input-align="left"
    required="auto"
    scroll-to-error
  >
    <ContractSelect
      v-model="form.contractId"
      v-show-field="['contractId', includeFields]"
      name="contractId"
      label="合同"
      :params="{
        type: 'in',
        phaseType: '2',
        queryType: 'my',
      }"
      :rules="computedRules.contractId"
      clearable
      @update:selected-list="onContractSelectedListChange"
      @change="onContractChange"
    />

    <van-field
      v-show-field="['contractNo', includeFields]"
      :model-value="form.contractNo"
      name="contractNo"
      label="合同编号"
      readonly
    />

    <DictSelect
      v-model="form.contractCategory"
      v-show-field="['contractCategory', includeFields]"
      name="contractCategory"
      label="合同类别"
      :options="oa_contract_category_in"
      readonly
    />

    <DeptSelect
      v-model="form.contractDeptId"
      v-show-field="['contractDeptId', includeFields]"
      name="contractDeptId"
      label="需求部门"
      placeholder=""
      :rules="computedRules.contractDeptId"
      readonly
    />

    <van-field
      v-show-field="['contractStartDate', includeFields]"
      :model-value="parseTime(form.contractStartDate, '{y}-{m}-{d}')"
      name="contractStartDate"
      label="开始日期"
      readonly
    />

    <van-field
      v-show-field="['contractEndDate', includeFields]"
      :model-value="parseTime(form.contractEndDate, '{y}-{m}-{d}')"
      name="contractEndDate"
      label="结束日期"
      readonly
    />

    <van-field
      v-show-field="['contractAmount', includeFields]"
      :model-value="formatCurrency(form.contractAmount)"
      name="contractAmount"
      label="合同金额"
      readonly
    />

    <van-field
      v-show-field="['isSeal', includeFields]"
      label="是否加盖公章"
      name="isSeal"
    >
      <template #input>
        <YesNoSwitch v-model="form.isSeal" />
      </template>
    </van-field>

    <van-field
      v-show-field="['isAssign', includeFields]"
      label="委托他人提交资料"
      name="isAssign"
    >
      <template #input>
        <YesNoSwitch v-model="form.isAssign" />
      </template>
    </van-field>

    <van-field
      v-if="form.isAssign === 'Y'"
      v-model="form.assignUser"
      v-show-field="['assignUser', includeFields]"
      name="assignUser"
      label="指派人"
      placeholder="请选择"
      :rules="computedRules.assignUser"
      is-link
      @click="UserSelectRef?.open"
    >
      <template #input>
        <UserSelect ref="UserSelectRef" v-model="form.assignUser" />
      </template>
    </van-field>

    <van-field
      v-if="props.includeFields.includes('collectionList')"
      v-show-field="['collectionList', includeFields]"
      label="实际回款明细"
      required
    >
      <template #input>
        <CoolCardList accordion active-on-register>
          <CoolCard
            v-for="(item, index) in form.collectionList"
            :key="index"
            :title="item.phaseName"
          >
            <template #footer>
              <div class="text-right">
                <van-button
                  v-if="form.collectionList.length - 1 === index"
                  type="primary"
                  icon="plus"
                  size="small"
                  @click="handleAdd"
                />
                <van-button
                  class="ml-2"
                  type="danger"
                  icon="delete"
                  size="small"
                  :disabled="form.collectionList.length === 1"
                  @click="handleDelete(item, index)"
                />
              </div>
            </template>

            <ContractPhaseSelect
              v-model="item.phaseItemId"
              v-model:phase-name="item.phaseName"
              v-model:receivable-amount="item.phaseReceivableAmount"
              v-model:start-date="item.phaseStartDate"
              v-model:end-date="item.phaseEndDate"
              v-model:plan-date="item.phasePlanDate"
              v-model:settlement-id-list="item.settlementIdList"
              label="执行阶段"
              :name="`collectionList.${index}.phaseItemId`"
              :contract-id="form.contractId"
              :exclude="excludePhaseIds"
              :disabled="disabledColumn"
              :rules="rules.phaseItemId"
              clearable
            />

            <van-field
              label="应回款（元）"
              :model-value="formatCurrency(item.phaseReceivableAmount)"
              readonly
            />

            <van-field
              label="开始时间"
              :model-value="parseTime(item.phaseStartDate, '{y}-{m}-{d}')"
              readonly
            />

            <van-field
              label="截至时间"
              :model-value="parseTime(item.phaseEndDate, '{y}-{m}-{d}')"
              readonly
            />

            <van-field
              label="计划回款时间"
              :model-value="item.phasePlanDate"
              readonly
            />

            <!-- 回款节点填写 -->
            <template v-if="isPaymentCollectionStage || isBusinessForm">
              <van-field-number
                v-model="item.rewardAssessmentAmount"
                type="text"
                label="考核金额"
                :name="`collectionList.${index}.rewardAssessmentAmount`"
                allow-negative
                clearable
              />

              <van-field-number
                v-model="item.changeAmount"
                type="text"
                label="变更金额"
                :name="`collectionList.${index}.changeAmount`"
                allow-negative
                clearable
              />
            </template>
          </CoolCard>
        </CoolCardList>
      </template>
    </van-field>

    <template v-if="isPaymentCollectionStage || isBusinessForm">
      <ContractInvoiceList :contract-no="form.contractNo" />
      <ContractrReceiptList :contract-no="form.contractNo" />
    </template>

    <van-field v-show-field="['fileMap', includeFields]" label="附件列表" :required="showFileListRequired">
      <template #input>
        <div v-loading="fileDictLoading" class="w-full">
          <van-field
            v-for="item in fileList"
            :key="item.dictValue"
          >
            <template #label>
              <DictTag :value="item.dictValue" :options="file_dict" />
            </template>
            <template #input>
              <UploadFile v-model="item.ossIdList" value-type="array" />
            </template>
          </van-field>
        </div>
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import type { FieldRule } from 'vant'
import ContractSelect from '../components/ContractSelect.vue'
import ContractPhaseSelect from '../components/ContractPhaseSelect.vue'
import { useForm } from './form'
import ContractInvoiceList from './components/ContractInvoiceList.vue'
import ContractrReceiptList from './components/ContractrReceiptList.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { ContractSettlementForm, ContractSettlementItem } from '@/api/oa/business/contractSettlement/types'
import type { ContractVO } from '@/api/oa/business/contract/types'
import { useWorkflowHelper } from '@/hooks'
import UserSelect from '@/components/UserSelect/index.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<ContractSettlementForm>
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as KeysOfArray<ContractSettlementForm>
    },
    showLoading: true,
  },
)

// 辅助
const { taskDefinitionKey, isBusinessForm, isWorkflowForm } = useWorkflowHelper()

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 字典
const { oa_contract_category_in } = toRefs(proxy.useDict('oa_contract_category_in'))

// 指令
const vShowField = createFieldVisibilityDirective<ContractSettlementForm>()

// 用户选择器
const UserSelectRef = ref<InstanceType<typeof UserSelect>>()

// 是否是回款节点
const isPaymentCollectionStage = computed(() => taskDefinitionKey.value === 'Activity_1gp1gat')

// 表单
const {
  Form,
  form,
  rules,
  isLoading,
  updateLoading,
  fileDictLoading,
  collectionItem,
  file_dict,
  fileList,
  setFileDict,
  setContractData,
  transformFileMapToList,
  reset,
  submit,
  view,
  workflowSubmit,
  workflowView,
} = useForm()

// 附件列表是否必填
const showFileListRequired = computed(() => {
  if (taskDefinitionKey.value === 'Activity_0bclr8t') {
    return true
  }

  if (taskDefinitionKey.value === 'Activity_12wbile' && form.value.isAssign === 'N') {
    return true
  }

  return false
})

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<ContractSettlementForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }

  if (form.value.isAssign === 'Y') {
    (newRules.assignUser as Array<FieldRule>)?.forEach(e => (e.required = true))
  }

  return newRules
})

// 排除阶段
const excludePhaseIds = computed(() => form.value.collectionList.map(e => e.phaseItemId).filter(Boolean))

// 禁用列
const disabledColumn = computed(() => {
  if (isWorkflowForm.value && isPaymentCollectionStage.value) {
    return true
  }

  return false
})

// 合同选择
async function onContractChange(contractId: string) {
  form.value.collectionList.forEach((e) => {
    e.phaseItemId = undefined
    e.phaseReceivableAmount = undefined
    e.phaseStartDate = undefined
    e.phaseEndDate = undefined
  })

  if (contractId) {
    // 设置文件类型字典
    await setFileDict(contractId)

    // 设置文件 Map
    for (const { value } of file_dict.value) {
      form.value.fileMap[value] = []
    }

    // 设置文件 List
    fileList.value = transformFileMapToList(form.value.fileMap)
  }
  else {
    form.value.fileMap = {}
    fileList.value = []
  }
}

// 合同选择器 selectedList 更新
function onContractSelectedListChange(selectedList: ContractVO[]) {
  const [data] = selectedList
  setContractData(data)
}

// 新增
function handleAdd() {
  const newItem = cloneDeep(collectionItem)
  form.value.collectionList.push(newItem)
}

// 删除
function handleDelete(_: ContractSettlementItem, index: number) {
  const { confirm } = proxy.$modal
  confirm('是否删除这条数据？')
    .then(() => {
      form.value.collectionList.splice(index, 1)
    })
    .catch(() => {})
}

defineExpose({
  updateLoading,
  reset,
  submit,
  view,
  workflowSubmit,
  workflowView,
})
</script>
