<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" class="reset-label" readonly label-width="auto" label-align="top" input-align="left">
    <van-field v-model="form.name" v-show-field="['name', includeFields]" name="name" label="名称" />
    <van-field v-model="form.no" v-show-field="['no', includeFields]" name="no" label="合同编号" />

    <van-field v-model="form.partyA" v-show-field="['partyA', includeFields]" name="partyA" label="甲方">
      <template #input>
        <SCSelect v-model="form.partyA" multiple readonly />
      </template>
    </van-field>
    <van-field v-model="form.partyB" v-show-field="['partyB', includeFields]" name="partyB" label="乙方">
      <template #input>
        <SCSelect v-model="form.partyB" multiple readonly />
      </template>
    </van-field>
    <template v-if="contractMode !== 'two'">
      <van-field v-if="contractMode === 'three' || contractMode === 'four'" v-model="form.partyC" v-show-field="['partyC', includeFields]" name="partyC" label="丙方">
        <template #input>
          <SCSelect v-model="form.partyC" multiple readonly />
        </template>
      </van-field>
      <van-field v-if="contractMode === 'four'" v-model="form.partyD" v-show-field="['partyD', includeFields]" name="partyD" label="丁方">
        <template #input>
          <SCSelect v-model="form.partyD" multiple readonly />
        </template>
      </van-field>
    </template>

    <van-field v-model="form.type" v-show-field="['type', includeFields]" name="type" label="合同类型">
      <template #input>
        <DictSelect v-model="form.type" dict-type="oa_contract_type" readonly />
      </template>
    </van-field>
    <van-field v-model="form.category" v-show-field="['category', includeFields]" name="category" label="合同类别">
      <template #input>
        <template v-if="form.type === 'in'">
          <dict-tag :options="oa_contract_category_in" :value="form.category" />
        </template>
        <template v-if="form.type === 'out'">
          <dict-tag :options="oa_contract_category_out" :value="form.category" />
        </template>
        <template v-if="form.type === 'agreement'">
          <dict-tag :options="oa_contract_category_agreement" :value="form.category" />
        </template>
      </template>
    </van-field>
    <van-field v-if="isPurchaseContract" v-model="form.reviewWay" v-show-field="['reviewWay', includeFields]" name="reviewWay" label="合同评审方式">
      <template #input>
        <DictSelect v-model="form.reviewWay" dict-type="oa_contract_review_way" readonly />
      </template>
    </van-field>

    <van-field v-if="['1', '3'].includes(form.reviewWay)" v-model="form.customizeApprover" v-show-field="['customizeApprover', includeFields]" name="customizeApprover" label="自定义审批人">
      <template #input>
        <UserSelect v-model="form.customizeApprover" multiple readonly />
      </template>
    </van-field>

    <van-field v-show-field="['deptId', includeFields]" name="deptId" label="需求部门">
      <template #input>
        <DeptSelect v-model="form.deptId" readonly />
      </template>
    </van-field>
    <van-field v-show-field="['projectId', includeFields]" name="projectId" label="项目">
      <template #input>
        <ProjectSelect v-model="form.projectId" readonly />
      </template>
    </van-field>

    <van-field v-model="form.amount" v-show-field="['amount', includeFields]" name="amount" label="合同金额">
      <template #input>
        <div class="flex flex-col">
          <span>{{ formatCurrency(form.amount) }}</span>
          <span v-if="!isNil(form.amount)" class="text-red-400">{{ toCnMoney(form.amount) }}</span>
        </div>
      </template>
    </van-field>
    <van-field v-model="form.invoiceType" v-show-field="['invoiceType', includeFields]" name="invoiceType" label="发票类型">
      <template #input>
        <DictSelect v-model="form.invoiceType" dict-type="oa_contract_invoice_type" readonly />
      </template>
    </van-field>

    <van-field v-model="form.isUseSeal" v-show-field="['isUseSeal', includeFields]" name="isUseSeal" label="是否用印">
      <template #input>
        <YesNoSwitch v-model="form.isUseSeal" readonly />
      </template>
    </van-field>

    <template v-if="form.isUseSeal === 'Y'">
      <van-field v-model="form.fileUseType" v-show-field="['fileUseType', includeFields]" name="fileUseType" label="用印方式">
        <template #input>
          <DictSelect v-model="form.fileUseType" dict-type="oa_file_use_type" readonly />
        </template>
      </van-field>

      <van-field v-model="form.sealUseType" v-show-field="['sealUseType', includeFields]" name="sealUseType" label="用印类型">
        <template #input>
          <DictSelect v-model="form.sealUseType" dict-type="oa_seal_use_type" multiple readonly />
        </template>
      </van-field>
    </template>

    <div v-show-field="['taxRate', includeFields]" class="mb-6">
      <van-cell-group title="金额/增值税率">
        <div class="py-2 px-4">
          <div v-for="(item, index) in form.taxRate" :key="index">
            <div class="text-sm flex gap-6 opacity-60">
              <span>金额(元)：{{ formatCurrency(item.amount) }}</span>
              <span>增值税率(%)：{{ item.taxRate }}</span>
            </div>
          </div>
        </div>
      </van-cell-group>
    </div>

    <van-field v-model="form.startDate" v-show-field="['startDate', includeFields]" name="startDate" label="开始日期">
      <template #input>
        {{ parseTime(form.startDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>
    <van-field v-model="form.endDate" v-show-field="['endDate', includeFields]" name="endDate" label="结束日期">
      <template #input>
        {{ parseTime(form.endDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>
    <van-field v-model="form.signDate" v-show-field="['signDate', includeFields]" name="signDate" label="签订日期">
      <template #input>
        {{ parseTime(form.signDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>
    <van-field v-model="form.paymentWay" v-show-field="['paymentWay', includeFields]" name="paymentWay" label="付款方式" />

    <van-field
      v-model="form.description"
      v-show-field="['description', includeFields]"
      type="textarea"
      name="description"
      label="合同描述"
      rows="2"
      autosize
    />

    <Teleport to="#AFC" defer>
      <div class="px-4 reset-label">
        <PurchaseProcessSelect
          v-if="isPurchaseContract"
          v-model="form.purchaseIds"
          v-show-field="['purchaseIds', includeFields]"
          multiple
          readonly
        />
      </div>
    </Teleport>

    <van-field v-if="$route.query?.queryType !== 'dept'" v-model="form.originalFile" v-show-field="['originalFile', includeFields]" name="originalFile" label="合同原件">
      <template #input>
        <UploadFile v-model="form.originalFile" readonly />
      </template>
    </van-field>

    <van-field v-model="form.noAmountFile" v-show-field="['noAmountFile', includeFields]" name="noAmountFile" label="无价合同">
      <template #input>
        <UploadFile v-model="form.noAmountFile" readonly />
      </template>
    </van-field>

    <!-- 附件列表 -->
    <Teleport to="#AFC" defer>
      <TableCard v-show-field="['ossIdList', includeFields]" title="附件列表" class="mx-4" :is-empty="isEmpty(form.ossIdList)">
        <UploadFile v-model="form.ossIdList" readonly />
      </TableCard>
    </Teleport>
  </van-form>
</template>

<script setup lang='ts'>
import { isEmpty, isNil } from 'lodash-es'
import ProjectSelect from '../components/ProjectSelect.vue'
import SCSelect from '../components/SCSelect.vue'
import PurchaseProcessSelect from '../components/PurchaseProcessSelect/index.vue'
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
} = toRefs(
  proxy.useDict(
    'oa_contract_category_in',
    'oa_contract_category_out',
    'oa_contract_category_agreement',
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
