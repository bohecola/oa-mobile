<template>
  <van-form
    ref="Form"
    v-loading="isLoading && showLoading"
    class="reset-label"
    label-width="auto"
    label-align="top"
    input-align="left"
    readonly
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
    />

    <van-field
      v-show-field="['contractNo', includeFields]"
      :model-value="form.contractNo"
      name="contractNo"
      label="合同编号"
    />

    <DictSelect
      v-model="form.contractCategory"
      v-show-field="['contractCategory', includeFields]"
      name="contractCategory"
      label="合同类别"
      :options="oa_contract_category_in"
    />

    <DeptSelect
      v-model="form.contractDeptId"
      v-show-field="['contractDeptId', includeFields]"
      name="contractDeptId"
      label="需求部门"
      placeholder=""
    />

    <van-field
      v-show-field="['contractStartDate', includeFields]"
      :model-value="parseTime(form.contractStartDate, '{y}-{m}-{d}')"
      name="contractStartDate"
      label="开始日期"
    />

    <van-field
      v-show-field="['contractEndDate', includeFields]"
      :model-value="parseTime(form.contractEndDate, '{y}-{m}-{d}')"
      name="contractEndDate"
      label="结束日期"
    />

    <van-field
      v-show-field="['contractAmount', includeFields]"
      :model-value="formatCurrency(form.contractAmount)"
      name="contractAmount"
      label="合同金额"
    />

    <van-field
      v-show-field="['isSeal', includeFields]"
      label="是否加盖公章"
      name="isSeal"
    >
      <template #input>
        <YesNoSwitch v-model="form.isSeal" readonly />
      </template>
    </van-field>

    <DictSelect
      v-model="form.settlements"
      v-show-field="['settlements', includeFields]"
      label="结算资料"
      name="settlements"
      multiple
      :options="file_dict"
    />

    <van-field
      v-show-field="['remark', includeFields]"
      :model-value="form.remark"
      name="remark"
      label="备注"
      type="textarea"
      rows="2"
      autosize
    />

    <van-field
      v-show-field="['isAssign', includeFields]"
      label="委托他人提交资料"
      name="isAssign"
    >
      <template #input>
        <YesNoSwitch v-model="form.isAssign" readonly />
      </template>
    </van-field>

    <van-field
      v-if="form.isAssign === 'Y'"
      v-model="form.assignUser"
      v-show-field="['assignUser', includeFields]"
      name="assignUser"
      label="指派人"
    >
      <template #input>
        <UserSelect ref="UserSelectRef" v-model="form.assignUser" readonly />
      </template>
    </van-field>

    <van-field
      v-if="props.includeFields.includes('collectionList')"
      v-show-field="['collectionList', includeFields]"
      label="实际回款明细"
    >
      <template #input>
        <CoolCardList accordion active-on-register>
          <CoolCard
            v-for="(item, index) in form.collectionList"
            :key="index"
            :title="item.phaseName"
          >
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
            />

            <van-field
              label="应回款（元）"
              :model-value="formatCurrency(item.phaseReceivableAmount)"
            />

            <van-field
              label="开始时间"
              :model-value="parseTime(item.phaseStartDate, '{y}-{m}-{d}')"
            />

            <van-field
              label="截至时间"
              :model-value="parseTime(item.phaseEndDate, '{y}-{m}-{d}')"
            />

            <van-field
              label="计划回款时间"
              :model-value="item.phasePlanDate"
              readonly
            />

            <template v-if="showColumn">
              <van-field
                :name="`collectionList.${index}.rewardAssessmentAmount`"
                label="考核金额"
              >
                <template #input>
                  <NumberView
                    :value="item.rewardAssessmentAmount"
                    :currency-options="{ signForPositive: true }"
                    currency-format
                    negative-highlight
                  />
                </template>
              </van-field>

              <van-field
                :name="`collectionList.${index}.changeAmount`"
                label="变更金额"
              >
                <template #input>
                  <NumberView
                    :value="item.changeAmount"
                    :currency-options="{ signForPositive: true }"
                    currency-format
                    negative-highlight
                  />
                </template>
              </van-field>

              <van-field label="实际回款金额">
                <template #input>
                  {{
                    formatCurrency(
                      Big(item.phaseReceivableAmount ?? 0)
                        .add(item.rewardAssessmentAmount ?? 0)
                        .add(item.changeAmount ?? 0)
                        .toNumber(),
                    )
                  }}
                </template>
              </van-field>
            </template>
          </CoolCard>
        </CoolCardList>
      </template>
    </van-field>

    <template v-if="showColumn">
      <ContractInvoiceList :contract-no="form.contractNo" />
      <ContractrReceiptList :contract-no="form.contractNo" />
    </template>

    <van-field v-show-field="['fileMap', includeFields]" label="附件列表">
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
              <UploadFile v-model="item.ossIdList" value-type="array" readonly />
            </template>
          </van-field>
        </div>
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import Big from 'big.js'
import ContractSelect from '../components/ContractSelect.vue'
import ContractPhaseSelect from '../components/ContractPhaseSelect.vue'
import { useForm } from './form'
import ContractInvoiceList from './components/ContractInvoiceList.vue'
import ContractrReceiptList from './components/ContractrReceiptList.vue'
import type { ContractSettlementForm } from '@/api/oa/business/contractSettlement/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
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

const UserSelectRef = ref<InstanceType<typeof UserSelect>>()

// 辅助
const { isView, isBusinessForm } = useWorkflowHelper()

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 字典
const { oa_contract_category_in } = toRefs(proxy.useDict('oa_contract_category_in'))

// 表单
const {
  Form,
  form,
  isLoading,
  updateLoading,
  fileDictLoading,
  file_dict,
  fileList,
  reset,
  submit,
  view,
  workflowSubmit,
  workflowView,
} = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<ContractSettlementForm>(form)

// 展示列
const showColumn = computed(() => {
  if (isView.value) {
    return true
  }

  if (isBusinessForm.value) {
    return true
  }

  return false
})

defineExpose({
  updateLoading,
  reset,
  submit,
  view,
  workflowSubmit,
  workflowView,
})
</script>
