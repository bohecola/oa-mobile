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
    <van-field
      v-model="form.name"
      v-show-field="['name', includeFields]"
      name="name"
      label="名称"
    />
    <van-field
      v-model="form.no"
      v-show-field="['no', includeFields]"
      name="no"
      label="合同编号"
    />

    <SCSelect
      v-model="form.partyA"
      v-show-field="['partyA', includeFields]"
      name="partyA"
      label="甲方"
      multiple
      readonly
    />

    <SCSelect
      v-model="form.partyB"
      v-show-field="['partyB', includeFields]"
      name="partyB"
      label="乙方"
      multiple
      readonly
    />

    <template v-if="contractMode !== 'two'">
      <SCSelect
        v-if="contractMode === 'three' || contractMode === 'four'"
        v-model="form.partyC"
        v-show-field="['partyC', includeFields]"
        name="partyC"
        label="丙方"
        multiple
        readonly
      />

      <SCSelect
        v-if="contractMode === 'four'"
        v-model="form.partyD"
        v-show-field="['partyD', includeFields]"
        name="partyD"
        label="丁方"
        multiple
        readonly
      />
    </template>

    <DictSelect
      v-model="form.type"
      v-show-field="['type', includeFields]"
      name="type"
      label="合同类型"
      dict-type="oa_contract_type"
    />

    <DictSelect
      v-model="form.category"
      v-show-field="['category', includeFields]"
      name="category"
      label="合同类别"
      :options="form.type === 'in'
        ? oa_contract_category_in
        : form.type === 'out'
          ? oa_contract_category_out
          : oa_contract_category_agreement"
    />

    <DictSelect
      v-if="isPurchaseContract"
      v-model="form.reviewWay"
      v-show-field="['reviewWay', includeFields]"
      name="reviewWay"
      label="合同评审方式"
      dict-type="oa_contract_review_way"
    />

    <van-field
      v-if="['1', '3'].includes(form.reviewWay)"
      v-show-field="['customizeApprover', includeFields]"
      name="customizeApprover"
      label="自定义审批人"
    >
      <template #input>
        <UserSelect
          v-model="form.customizeApprover"
          multiple
          readonly
        />
      </template>
    </van-field>

    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      name="deptId"
      label="需求部门"
    />

    <ProjectSelect
      v-model="form.projectId"
      v-show-field="['projectId', includeFields]"
      name="projectId"
      label="项目"
    />

    <van-field
      v-model="form.amount"
      v-show-field="['amount', includeFields]"
      name="amount"
      label="合同金额"
    >
      <template #input>
        <div class="flex flex-col">
          <span>{{ formatCurrency(form.amount) }}</span>
          <span v-if="!isNil(form.amount)" class="text-red-400">{{ toCnMoney(form.amount) }}</span>
        </div>
      </template>
    </van-field>

    <DictSelect
      v-model="form.invoiceType"
      v-show-field="['invoiceType', includeFields]"
      name="invoiceType"
      label="发票类型"
      dict-type="oa_contract_invoice_type"
    />

    <van-field
      v-model="form.isUseSeal"
      v-show-field="['isUseSeal', includeFields]"
      name="isUseSeal"
      label="是否用印"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.isUseSeal"
          readonly
        />
      </template>
    </van-field>

    <template v-if="form.isUseSeal === 'Y'">
      <DictSelect
        v-model="form.fileUseType"
        v-show-field="['fileUseType', includeFields]"
        name="fileUseType"
        label="用印方式"
        dict-type="oa_file_use_type"
      />

      <DictSelect
        v-model="form.sealUseType"
        v-show-field="['sealUseType', includeFields]"
        name="sealUseType"
        label="用印类型"
        dict-type="oa_seal_use_type"
        multiple
      />
    </template>

    <van-field v-show-field="['taxRate', includeFields]" label="金额/增值税率">
      <template #input>
        <div class="w-full flex flex-col gap-2">
          <TableCard v-for="(item, index) in form.taxRate" :key="index" :title="`# ${index + 1}`">
            <van-field
              :model-value="formatCurrency(item.amount)"
              :name="`taxRate.${index}.amount`"
              label="金额（元）"
            />

            <DictSelect
              v-model="item.taxRate"
              label="税率（%）"
              :name="`taxRate.${index}.taxRate`"
              :options="oa_contract_tax_rate"
            />
          </TableCard>
        </div>
      </template>
    </van-field>

    <DateSelect
      v-show-field="['startDate', includeFields]"
      :model-value="form.startDate"
      name="startDate"
      label="开始日期"
    />

    <DateSelect
      v-show-field="['endDate', includeFields]"
      :model-value="form.endDate"
      name="endDate"
      label="结束日期"
    />

    <DateSelect
      v-show-field="['signDate', includeFields]"
      :model-value="form.signDate"
      name="signDate"
      label="签订日期"
    />

    <van-field
      v-model="form.paymentWay"
      v-show-field="['paymentWay', includeFields]"
      name="paymentWay"
      label="付款方式"
    />

    <van-field
      v-model="form.description"
      v-show-field="['description', includeFields]"
      type="textarea"
      name="description"
      label="合同描述"
      rows="1"
      autosize
    />

    <PurchaseProcessSelect
      v-if="isPurchaseContract"
      v-model="form.purchaseIds"
      v-show-field="['purchaseIds', includeFields]"
      name="purchaseIds"
      label="关联采购申请"
      multiple
    />

    <van-field
      v-if="$route.query?.queryType !== 'dept'"
      v-model="form.originalFile"
      v-show-field="['originalFile', includeFields]"
      name="originalFile"
      label="合同原件"
    >
      <template #input>
        <UploadFile
          v-model="form.originalFile"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-model="form.noAmountFile"
      v-show-field="['noAmountFile', includeFields]"
      name="noAmountFile"
      label="无价合同"
    >
      <template #input>
        <UploadFile
          v-model="form.noAmountFile"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-show-field="['ossIdList', includeFields]"
      name="ossIdList"
      label="附件列表"
    >
      <template #input>
        <UploadFile
          v-model="form.ossIdList"
          readonly
        />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang='ts'>
import { isNil } from 'lodash-es'
import ProjectSelect from '../components/ProjectSelect.vue'
import SCSelect from '../components/SCSelect.vue'
import PurchaseProcessSelect from '../components/PurchaseProcessSelect.vue'
import { useForm } from './form'
import type { ContractForm } from '@/api/oa/business/contract/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<ContractForm>
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as KeysOfArray<ContractForm>
    },
    showLoading: true,
  },
)

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const {
  oa_contract_category_in,
  oa_contract_category_out,
  oa_contract_category_agreement,
  oa_contract_tax_rate,
} = toRefs(
  proxy.useDict(
    'oa_contract_category_in',
    'oa_contract_category_out',
    'oa_contract_category_agreement',
    'oa_contract_tax_rate',
  ),
)

const { Form, form, contractMode, isLoading, reset, view, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<ContractForm>()

// 是否是采购合同
const isPurchaseContract = computed(() => form.value.category === 'out0')

// 输出
defineExpose({
  isLoading,
  form,
  reset,
  view,
  workflowView,
})
</script>
