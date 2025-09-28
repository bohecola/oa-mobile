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
        queryType: 'my',
        statusList: ['1', '2', '3', '4'],
      }"
      :rules="computedRules.contractId"
      clearable
      @update:selected-list="onContractSelectedListChange"
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
    >
      <template #input>
        <div class="flex flex-col">
          <span>{{ formatCurrency(form.contractAmount) }}</span>
          <span class="text-red-400">{{ toCnMoney(form.contractAmount) }}</span>
        </div>
      </template>
    </van-field>

    <template v-if="!isNil(form.appliedReceivableAmount)">
      <van-field
        v-show-field="['appliedReceivableAmount', includeFields]"
        label="已申请应回款"
        name="appliedReceivableAmount"
        readonly
        @click="handleViewAppliedReceivableAmount(form.contractId)"
      >
        <template #input>
          <div class="flex flex-col">
            <span class="text-[--van-primary-color]">
              {{ formatCurrency(form.appliedReceivableAmount) }}
            </span>
            <span class="text-red-400">{{ toCnMoney(form.appliedReceivableAmount) }}</span>
          </div>
        </template>
      </van-field>

      <van-field
        v-show-field="['canApplyReceivableAmount', includeFields]"
        label="可申请应回款"
        name="canApplyReceivableAmount"
        readonly
      >
        <template #input>
          <div class="flex flex-col">
            <span>{{ formatCurrency(form.canApplyReceivableAmount) }}</span>
            <span class="text-red-400">{{ toCnMoney(form.canApplyReceivableAmount) }}</span>
          </div>
        </template>
      </van-field>
    </template>

    <van-field
      v-model="form.remark"
      v-show-field="['remark', includeFields]"
      label="备注"
      name="remark"
      type="textarea"
      placeholder="请输入"
      rows="1"
      autosize
    />

    <van-field
      v-if="props.includeFields.includes('itemList')"
      v-show-field="['itemList', includeFields]"
      label="执行阶段"
      required
    >
      <template #input>
        <CoolCardList accordion active-on-register>
          <CoolCard
            v-for="(item, index) in form.itemList"
            :key="index"
            :title="item.phaseName"
          >
            <template #footer>
              <div class="text-right">
                <van-button
                  v-if="form.itemList.length - 1 === index"
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
                  :disabled="form.itemList.length === 1"
                  @click="handleDelete(item, index)"
                />
              </div>
            </template>

            <van-field
              v-model.trim="item.phaseName"
              label="名称"
              placeholder="请输入"
              :name="`itemList.${index}.phaseName`"
              :rules="rules.phaseName"
              clearable
            />

            <van-field-number
              v-model.number="item.receivableAmount"
              label="应回款"
              :name="`itemList.${index}.receivableAmount`"
              :rules="rules.receivableAmount"
              clearable
            />

            <DateSelect
              v-model="item.startDate"
              label="开始时间"
              value-format="YYYY-MM-DD HH:mm:ss"
              :name="`itemList.${index}.startDate`"
              :rules="rules.startDate"
              clearable
            />

            <DateSelect
              v-model="item.endDate"
              label="截至时间"
              value-format="YYYY-MM-DD HH:mm:ss"
              :name="`itemList.${index}.endDate`"
              :rules="rules.endDate"
              clearable
            />

            <DateSelect
              v-model="item.planDate"
              label="计划回款时间"
              component="date-picker"
              :columns-type="['year', 'month']"
              :name="`itemList.${index}.planDate`"
              clearable
            />

            <van-field
              v-model="item.remark"
              :name="`itemList.${index}.remark`"
              type="textarea"
              label="备注"
              placeholder="请输入"
              rows="1"
              autosize
            />
          </CoolCard>
        </CoolCardList>
      </template>
    </van-field>

    <van-field
      v-show-field="['ossIdList', includeFields]"
      name="ossIdList"
      label="附件列表"
      placeholder="请选择"
      :rules="computedRules.ossIdList"
    >
      <template #input>
        <UploadFile v-model="form.ossIdList" value-type="array" />
      </template>
    </van-field>

    <AppliedReceivableAmountDialog ref="AppliedReceivableAmountDialogRef" />
  </van-form>
</template>

<script setup lang="ts">
import { cloneDeep, isNil } from 'lodash-es'
import Big from 'big.js'
import ContractSelect from '../components/ContractSelect.vue'
import AppliedReceivableAmountDialog from './components/AppliedReceivableAmountDialog.vue'
import { useForm } from './form'
import type { ContractPhaseCustomForm } from './form'
import type { ContractVO } from '@/api/oa/business/contract/types'
import type { ContractPhaseItemVO } from '@/api/oa/business/contractPhaseItem/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { useWorkflowHelper } from '@/hooks'
import { getReceivableAmountByContractId } from '@/api/oa/business/contractPhaseItem'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<ContractPhaseCustomForm>
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as KeysOfArray<ContractPhaseCustomForm>
    },
    showLoading: true,
  },
)

const AppliedReceivableAmountDialogRef = ref<InstanceType<typeof AppliedReceivableAmountDialog>>()

// 辅助
const { taskDefinitionKey } = useWorkflowHelper()

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 字典
const { oa_contract_category_in } = toRefs(proxy.useDict('oa_contract_category_in'))

// 表单
const { Form, form, rules, phaseItem, isLoading, updateLoading, setContractData, submit, reset, view, workflowSubmit, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<ContractPhaseCustomForm>()

// 校验
const computedRules = computed(() => {
  // 需求部门经理填报确认节点
  if (taskDefinitionKey.value === 'Activity_1p6s0tb') {
    rules.value.receivableAmount.forEach(e => (e.required = true))
    rules.value.startDate.forEach(e => (e.required = true))
    rules.value.endDate.forEach(e => (e.required = true))
  }

  const newRules: FormRules<ContractPhaseCustomForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }
  return newRules
})

// 重置金额
function resetAmount() {
  form.value.appliedReceivableAmount = undefined
  form.value.canApplyReceivableAmount = undefined
}

// 合同选择器 selectedList 更新
async function onContractSelectedListChange(selectedList: ContractVO[]) {
  const [contract] = selectedList
  // 设置合同数据
  setContractData(contract)

  if (isNil(contract)) {
    return resetAmount()
  }

  const { data } = await getReceivableAmountByContractId(contract.id)
  const receivableAmount = Number(data ?? 0)

  if (receivableAmount === 0) {
    return resetAmount()
  }

  form.value.appliedReceivableAmount = receivableAmount
  form.value.canApplyReceivableAmount = Big(contract.amount).minus(receivableAmount).toNumber()
}

// 查看已申请应回款
async function handleViewAppliedReceivableAmount(contractId: string) {
  AppliedReceivableAmountDialogRef.value?.open(contractId)
}

// 新增
async function handleAdd() {
  const newItem = cloneDeep(phaseItem)
  form.value.itemList.push(newItem)
}

// 删除
async function handleDelete(_: ContractPhaseItemVO, index: number) {
  const { confirm } = proxy.$modal

  confirm('是否删除这条数据？')
    .then(() => {
      form.value.itemList.splice(index, 1)
    })
    .catch(() => {})
}

defineExpose({
  updateLoading,
  submit,
  reset,
  view,
  workflowSubmit,
  workflowView,
})
</script>
