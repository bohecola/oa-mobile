<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="8em">
    <van-field v-model="form.name" v-show-field="['name', includeFields]" name="name" label="名称：" />
    <van-field v-model="form.no" v-show-field="['no', includeFields]" name="no" label="合同编号：" />

    <van-field v-model="form.partyA" v-show-field="['partyA', includeFields]" name="partyA" label="甲方：">
      <template #input>
        <dict-tag :options="scOptions" :value="form.partyA" />
      </template>
    </van-field>
    <van-field v-model="form.partyB" v-show-field="['partyB', includeFields]" name="partyB" label="乙方：">
      <template #input>
        <dict-tag :options="scOptions" :value="form.partyB" />
      </template>
    </van-field>

    <template v-if="contractMode !== 'two'">
      <van-field v-if="contractMode === 'three' || contractMode === 'four'" v-model="form.partyC" v-show-field="['partyC', includeFields]" name="partyC" label="丙方：">
        <template #input>
          <dict-tag :options="scOptions" :value="form.partyC" />
        </template>
      </van-field>
      <van-field v-if="contractMode === 'four'" v-model="form.partyD" v-show-field="['partyD', includeFields]" name="partyD" label="丁方：">
        <template #input>
          <dict-tag :options="scOptions" :value="form.partyD" />
        </template>
      </van-field>
    </template>

    <van-field v-model="form.deptId" v-show-field="['deptId', includeFields]" name="deptId" label="需求部门：">
      <template #input>
        <DeptSelect v-model="form.deptId" readonly />
      </template>
    </van-field>
    <van-field v-model="form.projectName" v-show-field="['projectName', includeFields]" name="projectName" label="项目：">
      <template #input>
        <dict-tag :options="projectOptions" :value="form.projectName" />
      </template>
    </van-field>
    <van-field v-model="form.type" v-show-field="['type', includeFields]" name="type" label="合同类型：">
      <template #input>
        <dict-tag :options="oa_contract_type" :value="form.type" />
      </template>
    </van-field>
    <van-field v-model="form.category" v-show-field="['category', includeFields]" name="category" label="合同类别：">
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
    <van-field v-model="form.reviewWay" v-show-field="['reviewWay', includeFields]" name="reviewWay" label="合同评审方式：">
      <template #input>
        <dict-tag :options="oa_contract_review_way" :value="form.reviewWay" />
      </template>
    </van-field>

    <van-field v-model="form.amount" v-show-field="['amount', includeFields]" name="amount" label="合同金额：" />
    <van-field v-model="form.invoiceType" v-show-field="['invoiceType', includeFields]" name="invoiceType" label="发票类型：">
      <template #input>
        <dict-tag :options="oa_contract_invoice_type" :value="form.invoiceType" />
      </template>
    </van-field>
    <van-field v-model="form.paymentWay" v-show-field="['paymentWay', includeFields]" name="paymentWay" label="付款方式：" />

    <div v-show-field="['taxRate', includeFields]" class="mb-6">
      <van-cell-group title="金额/增值税率">
        <div class="py-2 px-4">
          <div v-for="(item, index) in form.taxRate" :key="index">
            <div class="text-sm flex gap-6 opacity-60">
              <span>金额(元)：{{ item.amount }}</span>
              <span>增值税率(%)：{{ item.taxRate }}</span>
            </div>
          </div>
        </div>
      </van-cell-group>
    </div>

    <van-field v-model="form.startDate" v-show-field="['startDate', includeFields]" name="startDate" label="开始日期：">
      <template #input>
        {{ parseTime(form.startDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>
    <van-field v-model="form.endDate" v-show-field="['endDate', includeFields]" name="endDate" label="开始日期：">
      <template #input>
        {{ parseTime(form.endDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>
    <van-field v-model="form.signDate" v-show-field="['signDate', includeFields]" name="signDate" label="开始日期：">
      <template #input>
        {{ parseTime(form.signDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>
    <van-field v-model="form.description" v-show-field="['description', includeFields]" name="description" label="合同描述：">
      <template #input>
        <TextareaView :value="form.description" />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang='ts'>
import { useForm } from './form'
import type { ContractForm } from '@/api/oa/business/contract/types'
import { listProject } from '@/api/oa/business/project'
import { listSupplierCustomer } from '@/api/oa/business/supplierCustomer'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: (keyof ContractForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof ContractForm)[]
    },
    showLoading: true,
  },
)

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_contract_type } = toRefs(proxy!.useDict('oa_contract_type'))
const { oa_contract_category_in } = toRefs(proxy!.useDict('oa_contract_category_in'))
const { oa_contract_category_out } = toRefs(proxy!.useDict('oa_contract_category_out'))
const { oa_contract_category_agreement } = toRefs(proxy!.useDict('oa_contract_category_agreement'))
const { oa_contract_review_way } = toRefs(proxy!.useDict('oa_contract_review_way'))
const { oa_contract_invoice_type } = toRefs(proxy!.useDict('oa_contract_invoice_type'))

const { Form, form, contractMode, isLoading, reset, view, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<ContractForm>()

// 供应商/客户选项数据
const scOptions = ref<DictDataOption[]>([])
async function getSCOptions() {
  const res = await listSupplierCustomer()
  scOptions.value = res.rows.map(item => ({ label: item.name, value: item.id }))
}

// 项目列表
const projectOptions = ref<DictDataOption[]>([])
async function getProjectOptions() {
  const res = await listProject()
  projectOptions.value = res.rows.map(item => ({ label: item.name, value: item.id as string }))
}

// 挂载
onMounted(async () => {
  await getSCOptions()
  await getProjectOptions()
})

// 输出
defineExpose({
  isLoading,
  form,
  reset,
  view,
  workflowView,
})
</script>
