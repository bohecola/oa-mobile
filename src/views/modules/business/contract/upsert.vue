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
    <van-field
      v-model.trim="form.name"
      v-show-field="['name', includeFields]"
      name="name"
      label="名称"
      placeholder="请输入"
      :rules="computedRules.name"
    />

    <van-field
      v-model.trim="form.no"
      v-show-field="['no', includeFields]"
      name="no"
      label="合同编号"
      placeholder="请输入"
      :rules="computedRules.no"
    />

    <van-field label="合同模式">
      <template #input>
        <van-radio-group v-model="contractMode" direction="horizontal" @change="onRadioGroupChange">
          <van-radio
            v-for="item in [
              { value: 'two', label: '双方' },
              { value: 'three', label: '三方' },
              { value: 'four', label: '多方' },
            ]"
            :key="item.value"
            :name="item.value"
          >
            {{ item.label }}
          </van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <SCSelect
      v-model="form.partyA"
      v-show-field="['partyA', includeFields]"
      name="partyA"
      label="甲方"
      :exclude="exclude"
      :rules="computedRules.partyA"
      multiple
      clearable
    />

    <SCSelect
      v-model="form.partyB"
      v-show-field="['partyB', includeFields]"
      name="partyB"
      label="乙方"
      :exclude="exclude"
      :rules="computedRules.partyB"
      multiple
      clearable
    />

    <template v-if="contractMode === 'three' || contractMode === 'four'">
      <SCSelect
        v-if="contractMode === 'three' || contractMode === 'four'"
        v-model="form.partyC"
        v-show-field="['partyC', includeFields]"
        name="partyC"
        label="丙方"
        :exclude="exclude"
        :rules="computedRules.partyC"
        multiple
        clearable
      />

      <SCSelect
        v-if="contractMode === 'four'"
        v-model="form.partyD"
        v-show-field="['partyD', includeFields]"
        name="partyD"
        label="丁方"
        :exclude="exclude"
        :rules="computedRules.partyD"
        multiple
        clearable
      />
    </template>

    <DictSelect
      v-model="form.type"
      v-show-field="['type', includeFields]"
      name="type"
      label="合同类型"
      dict-type="oa_contract_type"
      :rules="computedRules.type"
      @change="onContractTypeSelectChange"
    />

    <DictSelect
      v-model="form.category"
      v-show-field="['category', includeFields]"
      name="category"
      label="合同类别"
      :rules="computedRules.category"
      :options="form.type === 'in'
        ? oa_contract_category_in
        : form.type === 'out'
          ? oa_contract_category_out
          : oa_contract_category_agreement"
      @change="onContractCategorySelectChange"
    />

    <DictSelect
      v-if="isPurchaseContract"
      v-model="form.reviewWay"
      v-show-field="['reviewWay', includeFields]"
      name="reviewWay"
      label="合同评审方式"
      dict-type="oa_contract_review_way"
      :rules="computedRules.reviewWay"
      @change="onReviewWayChange"
    />

    <van-field
      v-if="['1', '3'].includes(form.reviewWay)"
      v-model="form.customizeApprover"
      v-show-field="['customizeApprover', includeFields]"
      name="customizeApprover"
      label="自定义审批人"
      placeholder="请选择"
      :rules="computedRules.customizeApprover"
      is-link
    >
      <template #input>
        <UserSelect v-model="form.customizeApprover" multiple />
      </template>
    </van-field>

    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      name="deptId"
      label="需求部门"
      :rules="computedRules.deptId"
      clearable
    />

    <ProjectSelect
      v-model="form.projectId"
      v-show-field="['projectId', includeFields]"
      name="projectId"
      label="项目"
      :rules="computedRules.projectId"
      clearable
    />

    <van-field
      v-model.number="form.amount"
      v-show-field="['amount', includeFields]"
      name="amount"
      label="合同金额"
      placeholder="自动计算"
      :rules="computedRules.amount"
    >
      <template #input>
        <div class="flex flex-col">
          <span>{{ formatCurrency(form.amount) }}</span>
          <span class="text-red-400">{{ toCnMoney(form.amount) }}</span>
        </div>
      </template>
    </van-field>

    <DictSelect
      v-model="form.invoiceType"
      v-show-field="['invoiceType', includeFields]"
      name="invoiceType"
      label="发票类型"
      dict-type="oa_contract_invoice_type"
      :rules="computedRules.invoiceType"
    />

    <van-field
      v-show-field="['isUseSeal', includeFields]"
      name="isUseSeal"
      label="是否用印"
      :rules="computedRules.isUseSeal"
    >
      <template #input>
        <YesNoSwitch v-model="form.isUseSeal" @change="onIsUseSealChange" />
      </template>
    </van-field>

    <template v-if="form.isUseSeal === 'Y'">
      <DictSelect
        v-model="form.fileUseType"
        v-show-field="['fileUseType', includeFields]"
        name="fileUseType"
        label="用印方式"
        dict-type="oa_file_use_type"
        :rules="computedRules.fileUseType"
      />

      <DictSelect
        v-model="form.sealUseType"
        v-show-field="['sealUseType', includeFields]"
        name="sealUseType"
        label="用印类型"
        dict-type="oa_seal_use_type"
        :rules="computedRules.sealUseType"
        multiple
      />
    </template>

    <van-field v-show-field="['taxRate', includeFields]">
      <template #label>
        <div class="flex justify-between w-full">
          <span>金额/增值税率</span>
          <van-button type="primary" icon="plus" size="small" @click="handleAdd" />
        </div>
      </template>

      <template #input>
        <div class="w-full flex flex-col gap-2">
          <TableCard v-for="(item, index) in form.taxRate" :key="index" :title="`# ${index + 1}`">
            <van-field-number
              v-model.number="item.amount"
              label="金额（元）"
              :name="`taxRate.${index}.amount`"
              :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
              clearable
            />

            <DictSelect
              v-model="item.taxRate"
              label="税率（%）"
              :name="`taxRate.${index}.taxRate`"
              :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
              dict-type="oa_contract_tax_rate"
            />
            <template #footer>
              <div class="text-right">
                <van-button
                  type="danger"
                  icon="delete"
                  size="small"
                  :disabled="form.taxRate.length === 1"
                  @click="handleRemove(item, index)"
                />
              </div>
            </template>
          </TableCard>
        </div>
      </template>
    </van-field>

    <DateSelect
      v-model="form.startDate"
      v-show-field="['startDate', includeFields]"
      name="startDate"
      label="开始日期"
      clearable
    />

    <DateSelect
      v-model="form.endDate"
      v-show-field="['endDate', includeFields]"
      name="endDate"
      label="结束日期"
      clearable
    />

    <DateSelect
      v-model="form.signDate"
      v-show-field="['signDate', includeFields]"
      name="signDate"
      label="签订日期"
      clearable
    />

    <van-field
      v-model.trim="form.paymentWay"
      v-show-field="['paymentWay', includeFields]"
      name="paymentWay"
      label="付款方式"
      placeholder="请输入"
      :rules="computedRules.paymentWay"
    />

    <van-field
      v-model.trim="form.description"
      v-show-field="['description', includeFields]"
      type="textarea"
      name="description"
      label="合同描述"
      placeholder="请输入"
      rows="1"
      autosize
    />

    <van-field
      v-if="isPurchaseContract"
      v-show-field="['purchaseIds', includeFields]"
      name="purchaseIds"
      label="关联采购申请"
      placeholder="请选择"
      :rules="computedRules.purchaseIds"
      is-link
    >
      <template #input>
        <PurchaseProcessSelect
          v-model="form.purchaseIds"
          v-show-field="['purchaseIds', includeFields]"
          multiple
        />
      </template>
    </van-field>

    <van-field
      v-model="form.originalFile"
      v-show-field="['originalFile', includeFields]"
      name="originalFile"
      label="合同原件"
      placeholder="请选择"
      :rules="computedRules.originalFile"
    >
      <template #input>
        <UploadFile v-model="form.originalFile" :limit="1" />
      </template>
    </van-field>

    <van-field
      v-model="form.noAmountFile"
      v-show-field="['noAmountFile', includeFields]"
      name="noAmountFile"
      label="无价合同"
      placeholder="请选择"
      :rules="computedRules.noAmountFile"
    >
      <template #input>
        <UploadFile v-model="form.noAmountFile" :limit="1" />
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
  </van-form>
</template>

<script setup lang='ts'>
import Big from 'big.js'
import { isNil, isNumber } from 'lodash-es'
import ProjectSelect from '../components/ProjectSelect.vue'
import SCSelect from '../components/SCSelect.vue'
import PurchaseProcessSelect from '../components/PurchaseProcessSelect/index.vue'
import { useForm } from './form'
import type { ContractForm } from '@/api/oa/business/contract/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
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

const { Form, form, rules, isLoading, updateLoading, contractMode, reset, view, submit, workflowSubmit, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<ContractForm>()

const taskDefinitionKey = inject<Ref<string>>('taskDefinitionKey', ref(undefined))

// 是否是采购合同
const isPurchaseContract = computed(() => form.value.category === 'out0')

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<ContractForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }

  if (newRules.deptId) {
    const isRequired = form.value.type === 'in' || isPurchaseContract.value;
    (newRules.deptId).forEach(e => (e.required = isRequired))
  }

  // 业务中新增修改不校验合同原件和无价合同
  if (isNil(taskDefinitionKey.value)) {
    (newRules.originalFile).forEach(e => (e.required = false));
    (newRules.noAmountFile).forEach(e => (e.required = false))
  }

  return newRules
})

// 已选择的供应商/客户
const exclude = computed(() => {
  return (['partyA', 'partyB', 'partyC', 'partyD'] as const).flatMap((key) => {
    if (form.value[key]) {
      return form.value[key].split(',')
    }
    return []
  })
})

// TODO 重置表单值
// 合同类型选择
function onContractTypeSelectChange(value?: string) {
  Form.value.resetValidation(['category', 'reviewWay', 'purchaseIds', 'customizeApprover'])
}

// TODO 重置表单值
// 合同类别选择
function onContractCategorySelectChange() {
  Form.value.resetValidation(['reviewWay', 'purchaseIds', 'customizeApprover'])
}

// TODO 重置表单值
// 合同评审方式选择
function onReviewWayChange() {
  Form.value.resetValidation(['customizeApprover'])
}

// TODO 重置表单值
// 是否用印选择
function onIsUseSealChange(value?: string) {
  Form.value.resetValidation(['fileUseType', 'sealUseType'])
}

// 合同模式选择变化
function onRadioGroupChange(val: string) {
  if (val === 'three') {
    Form.value?.resetValidation(['partyD'])
    form.value.partyD = undefined
  }
  else if (val === 'two') {
    Form.value?.resetValidation(['partyC', 'partyD'])
    form.value.partyC = undefined
    form.value.partyD = undefined
  }
}

// 金额/税率新增
function handleAdd() {
  form.value.taxRate.push({ amount: undefined, taxRate: undefined })
}

// 金额/税率删除
function handleRemove(_: any, index: number) {
  proxy.$modal.confirm('是否删除这条数据？')
    .then(() => {
      form.value.taxRate.splice(index, 1)
    })
    .catch(() => {})
}

// 合同金额计算
watch(
  () => form.value.taxRate,
  (val) => {
    const amount = val.reduce<Big.Big>((prev, curr) => {
      if (isNumber(curr.amount)) {
        return prev.add(Big(curr.amount))
      }
      return prev.add(0)
    }, Big(0))

    form.value.amount = amount.toNumber()
  },
  {
    deep: true,
    immediate: true,
  },
)

// 输出
defineExpose({
  updateLoading,
  isLoading,
  form,
  reset,
  view,
  submit,
  workflowSubmit,
  workflowView,
})
</script>
