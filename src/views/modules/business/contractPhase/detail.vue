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
        phaseType: '1',
        queryType: 'my',
        statusList: ['1', '2', '3', '4'],
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

    <van-field v-show-field="['itemList', includeFields]" label="执行阶段">
      <template #input>
        <CoolCardList
          accordion
          active-on-register
        >
          <CoolCard
            v-for="(item, index) in form.itemList"
            :key="index"
            :title="item.phaseName"
          >
            <van-field
              v-model.trim="item.phaseName"
              label="名称"
              :name="`itemList.${index}.phaseName`"
            />

            <van-field-number
              v-model.number="item.receivableAmount"
              label="应回款"
              :name="`itemList.${index}.receivableAmount`"
            />

            <DateSelect
              v-model="item.startDate"
              label="开始时间"
              :name="`itemList.${index}.startDate`"
            />

            <DateSelect
              v-model="item.endDate"
              label="截至时间"
              :name="`itemList.${index}.endDate`"
            />

            <DateSelect
              v-model="item.planDate"
              label="计划回款时间"
              component="date-picker"
              :columns-type="['year', 'month']"
              :name="`itemList.${index}.planDate`"
            />

            <van-field
              v-model="item.remark"
              :name="`itemList.${index}.remark`"
              type="textarea"
              label="备注"
              rows="1"
              autosize
            />
          </CoolCard>
        </CoolCardList>
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import ContractSelect from '../components/ContractSelect.vue'
import type { ContractPhaseCustomForm } from './form'
import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
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

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 字典
const { oa_contract_category_in } = toRefs(proxy.useDict('oa_contract_category_in'))

// 表单
const { Form, form, isLoading, reset, view, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<ContractPhaseCustomForm>(form)

defineExpose({
  isLoading,
  form,
  reset,
  view,
  workflowView,
})
</script>
