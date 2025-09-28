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
    <van-notice-bar
      v-if="['Activity_1r6z0az', 'Activity_05nwy5m'].includes(taskDefinitionKey)"
      v-show-field="['nature', includeFields]"
      :scrollable="false"
      wrapable
    >
      <div v-html="`<div>注意事项</div>${businessDepartmentNotice}`" />
    </van-notice-bar>

    <DictSelect
      v-model="form.nature"
      v-show-field="['nature', includeFields]"
      label="采购性质"
      name="nature"
      dict-type="oa_purchase_nature"
    />

    <DictSelect
      v-model="form.type"
      v-show-field="['type', includeFields]"
      label="采购类型"
      name="type"
      dict-type="oa_purchase_type"
    />

    <DictSelect
      v-if="isContractPurchase"
      v-model="form.subjectType"
      v-show-field="['subjectType', includeFields]"
      label="预算类型"
      name="subjectType"
      dict-type="oa_project_subject_type"
    />

    <template v-if="isVisaPurchase">
      <ContractSelect
        v-model="form.contractId"
        v-show-field="['contractId', includeFields]"
        label="合同名称"
        name="contractId"
        :params="{ type: 'in' }"
      />

      <van-field
        v-model="form.contractNo"
        v-show-field="['contractNo', includeFields]"
        label="合同编号"
        name="contractNo"
      />
    </template>

    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      label="需求部门"
      name="deptId"
    />

    <template v-if="isContractPurchase">
      <ProjectSubjectSelect
        v-model="form.psId"
        v-model:contract-no="form.contractNo"
        v-show-field="['psId', includeFields]"
        label="预算"
        name="psId"
      />

      <van-field
        v-if="isProject && !isNil(form.psId)"
        v-model="form.contractNo"
        v-show-field="['contractNo', includeFields]"
        label="合同编号"
        name="contractNo"
        readonly
      />
    </template>

    <DictSelect
      v-if="isProject && !isNil(form.contractNo) && !isNil(form.contractExecute)"
      v-model="form.contractExecute"
      v-show-field="['contractExecute', includeFields]"
      label="合同执行情况"
      name="contractExecute"
      dict-type="oa_contract_execute_situation"
    />

    <DictSelect
      v-model="form.businessCategory"
      v-show-field="['businessCategory', includeFields]"
      label="业务类别"
      name="businessCategory"
      :options="isProjectBusinessType ? oa_project_business_type : oa_purchase_business_type"
    />

    <DictSelect
      v-model="form.objectCategory"
      v-show-field="['objectCategory', includeFields]"
      label="物品类别"
      name="objectCategory"
      dict-type="oa_purchase_object_category"
    />

    <DictSelect
      v-model="form.serviceCategory"
      v-show-field="['serviceCategory', includeFields]"
      label="服务类别"
      name="serviceCategory"
      dict-type="oa_purchase_service_category"
    />

    <DictSelect
      v-if="form.serviceCategory === '3'"
      v-model="form.leaseType"
      v-show-field="['leaseType', includeFields]"
      label="租赁类型"
      name="leaseType"
      dict-type="oa_purchase_lease_type"
    />

    <van-field
      v-if="form.serviceCategory === '3'"
      v-show-field="['isDeposit', includeFields]"
      label="是否有押金"
      name="isDeposit"
    >
      <template #input>
        <YesNoSwitch v-model="form.isDeposit" readonly />
      </template>
    </van-field>

    <DictSelect
      v-if="!isNil(form.purchaseMethod)"
      v-model="form.purchaseMethod"
      v-show-field="['purchaseMethod', includeFields]"
      label="采购方式"
      name="purchaseMethod"
      dict-type="oa_purchase_method"
    />

    <van-field
      v-show-field="['amount', includeFields]"
      label="含税总金额"
      name="amount"
    >
      <template #input>
        <div class="flex flex-col">
          <span>{{ formatCurrency(form.amount) }}</span>
          <span class="text-red-400">{{ toCnMoney(form.amount) }}</span>
        </div>
      </template>
    </van-field>

    <van-field
      v-if="showExtraData && !isNil(form.psId)"
      v-show-field="['notTaxAmount', includeFields]"
      label="不含税总金额"
      name="notTaxAmount"
    >
      <template #input>
        <div class="flex flex-col">
          <span>{{ formatCurrency(form.notTaxAmount) }}</span>
          <span class="text-red-400">{{ toCnMoney(form.notTaxAmount) }}</span>
        </div>
      </template>
    </van-field>

    <van-field
      v-show-field="['realAmount', includeFields]"
      label="含税实际总金额"
      name="realAmount"
    >
      <template #input>
        <div class="flex flex-col">
          <span>{{ formatCurrency(form.realAmount) }} </span>
          <span class="text-red-400">{{ toCnMoney(form.realAmount) }}</span>
        </div>
      </template>
    </van-field>

    <van-field
      v-if="showExtraData"
      v-show-field="['notTaxRealAmount', includeFields]"
      label="不含税实际总金额"
      name="notTaxRealAmount"
    >
      <template #input>
        <div class="flex flex-col">
          <span>{{ formatCurrency(form.notTaxRealAmount) }} </span>
          <span class="text-red-400">{{ toCnMoney(form.notTaxRealAmount) }}</span>
        </div>
      </template>
    </van-field>

    <van-field
      v-if="!isNil(form.purchaseChange)"
      v-show-field="['purchaseChange', includeFields]"
      label="采购变更"
    >
      <template #input>
        <span
          class="text-[--van-primary-color]"
          @click="handleViewPurchaseChange(form.purchaseChange)"
        >
          {{ form.purchaseChange.id }}
        </span>
      </template>
    </van-field>

    <van-field
      v-if="!isNil(form.isOwnerSettlement)"
      v-show-field="['isOwnerSettlement', includeFields]"
      label="是否业主单独结算"
      name="isOwnerSettlement"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.isOwnerSettlement"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-model="form.description"
      v-show-field="['description', includeFields]"
      label="采购说明"
      name="description"
      type="textarea"
      rows="1"
      autosize
    />

    <van-field
      v-model="form.remark"
      v-show-field="['remark', includeFields]"
      label="备注"
      name="remark"
      type="textarea"
      rows="1"
      autosize
    />

    <template v-if="isVisaPurchase && includeFields.includes('taxRateList')">
      <van-field label="签证收入含税总金额">
        <template #input>
          <div class="flex flex-col">
            <span>{{ formatCurrency(taxRateListTotalAmount) }}</span>
            <span class="text-red-400">{{ toCnMoney(taxRateListTotalAmount) }}</span>
          </div>
        </template>
      </van-field>

      <van-field label="签证收入不含税总金额">
        <template #input>
          <div class="flex flex-col">
            <span>{{ formatCurrency(taxRateListNotTaxTotalAmount) }}</span>
            <span class="text-red-400">{{ toCnMoney(taxRateListNotTaxTotalAmount) }}</span>
          </div>
        </template>
      </van-field>

      <van-field label="签证收入金额/增值税率">
        <template #input>
          <CoolCardList accordion active-on-register>
            <CoolCard
              v-for="(item, index) in form.taxRateList"
              :key="index"
              :title="formatCurrency(item.amount)"
            >
              <van-field-number
                v-model="item.amount"
                label="签证收入含税金额（元）"
                :name="`taxRateList.${index}.amount`"
              />

              <DictSelect
                v-model="item.taxRate"
                label="增值税率（%）"
                :name="`taxRateList.${index}.taxRate`"
                :options="oa_contract_tax_rate"
              />

              <van-field
                :model-value="item.notTaxAmount"
                label="签证收入不含税金额（元）"
                placeholder="自动计算"
                disabled
              />
            </CoolCard>
          </CoolCardList>
        </template>
      </van-field>

      <van-field
        v-if="taxRateListTotalAmount === 0"
        v-model="form.qzIncomeDescription"
        v-show-field="['qzIncomeDescription', includeFields]"
        label="签证收入情况说明"
        name="qzIncomeDescription"
        type="textarea"
        rows="1"
        autosize
      />
    </template>

    <van-field
      v-show-field="['itemList', includeFields]"
      label="采购清单"
    >
      <template #input>
        <CoolCardList accordion active-on-register>
          <CoolCard
            v-for="(item, index) in form.itemList"
            :key="item.id"
            :title="item.name"
          >
            <template v-if="isContractPurchase">
              <PurchaseCategorySelect
                v-if="itemListFields.includes('psiId')"
                v-model="item.psiId"
                v-model:amount="item.budgetAmount"
                v-model:applying-amount="item.applyingAmount"
                v-model:finish-amount="item.finishAmount"
                v-model:available-amount="item.availableAmount"
                label="预算科目"
                :name="`itemList.${index}.subjectItemId`"
                :params="PurchaseCategorySelectParams"
              />

              <van-field
                v-if="itemListFields.includes('budgetAmount')"
                label="预算金额"
                :model-value="formatCurrency(item.budgetAmount)"
                :name="`itemList.${index}.budgetAmount`"
              />

              <van-field
                v-if="itemListFields.includes('applyingAmount')"
                label="申请中"
                :model-value="formatCurrency(item.applyingAmount)"
                :name="`itemList.${index}.applyingAmount`"
              />

              <van-field
                v-if="itemListFields.includes('finishAmount')"
                label="已申请"
                :model-value="formatCurrency(item.finishAmount)"
                :name="`itemList.${index}.finishAmount`"
              />

              <van-field
                v-if="itemListFields.includes('availableAmount')"
                label="剩余金额"
                :model-value="formatCurrency(item.availableAmount)"
                :name="`itemList.${index}.availableAmount`"
              />
            </template>

            <van-field
              v-if="itemListFields.includes('name')"
              v-model="item.name"
              label="物品名称"
              :name="`itemList.${index}.name`"
            />

            <van-field
              v-if="itemListFields.includes('brand')"
              v-model="item.brand"
              label="品牌"
              :name="`itemList.${index}.brand`"
            />

            <van-field
              v-if="itemListFields.includes('specsModel')"
              v-model="item.specsModel"
              label="规格型号"
              :name="`itemList.${index}.specsModel`"
            />

            <van-field
              v-if="itemListFields.includes('unit')"
              v-model="item.unit"
              label="单位"
              :name="`itemList.${index}.unit`"
            />

            <van-field
              v-if="itemListFields.includes('num')"
              v-model.number="item.num"
              label="数量"
              :name="`itemList.${index}.num`"
            />

            <DictSelect
              v-if="itemListFields.includes('invoiceType') && showExtraData"
              v-model="item.invoiceType"
              label="发票类型"
              :name="`itemList.${index}.invoiceType`"
              :options="oa_purchase_invoice_type"
            />

            <DictSelect
              v-if="itemListFields.includes('taxRate') && showExtraData"
              v-model="item.taxRate"
              label="税率（%）"
              :name="`itemList.${index}.taxRate`"
              :options="oa_contract_tax_rate"
            />

            <van-field
              v-if="itemListFields.includes('taxAmount')"
              label="含税单价（元）"
              :model-value="formatCurrency(item.taxAmount)"
              :name="`itemList.${index}.taxAmount`"
            />

            <van-field
              v-if="itemListFields.includes('amount') && showExtraData"
              label="不含税单价（元）"
              :model-value="formatCurrency(item.amount)"
              :name="`itemList.${index}.amount`"
            />

            <van-field
              v-if="itemListFields.includes('taxRealAmount')"
              label="含税实际单价（元）"
              :model-value="formatCurrency(item.taxRealAmount)"
              :name="`itemList.${index}.taxRealAmount`"
            />

            <van-field
              v-if="itemListFields.includes('realAmount') && showExtraData"
              label="不含税实际单价（元）"
              :model-value="formatCurrency(item.realAmount)"
              :name="`itemList.${index}.realAmount`"
            />

            <van-field
              v-if="itemListFields.includes('taxTotalAmount')"
              label="含税合计（元）"
              :model-value="formatCurrency(item.taxTotalAmount)"
              :name="`itemList.${index}.taxTotalAmount`"
            />

            <van-field
              v-if="itemListFields.includes('totalAmount') && showExtraData"
              label="不含税合计（元）"
              :model-value="formatCurrency(item.totalAmount)"
              :name="`itemList.${index}.totalAmount`"
            />

            <van-field
              v-if="itemListFields.includes('taxRealTotalAmount')"
              label="含税实际合计（元）"
              :model-value="formatCurrency(item.taxRealTotalAmount)"
              :name="`itemList.${index}.taxRealTotalAmount`"
            />

            <van-field
              v-if="itemListFields.includes('realTotalAmount') && showExtraData"
              label="不含税实际合计（元）"
              :model-value="formatCurrency(item.realTotalAmount)"
              :name="`itemList.${index}.realTotalAmount`"
            />

            <van-field
              v-if="itemListFields.includes('inquiryWay')"
              v-model="item.inquiryWay"
              label="询价途径"
              type="textarea"
              rows="1"
              :name="`itemList.${index}.inquiryWay`"
              autosize
            />

            <van-field
              v-if="itemListFields.includes('supplier')"
              v-model="item.supplier"
              label="指定供应商"
              type="textarea"
              rows="1"
              :name="`itemList.${index}.supplier`"
              autosize
            />

            <van-field
              v-if="itemListFields.includes('remark')"
              v-model="item.remark"
              label="备注"
              type="textarea"
              rows="1"
              :name="`itemList.${index}.remark`"
              autosize
            />
          </CoolCard>
        </CoolCardList>
      </template>
    </van-field>

    <van-field
      v-show-field="['checkFiles', includeFields]"
      label="验收附件"
      name="checkFiles"
    >
      <template #input>
        <div class="flex flex-col">
          <UploadFile v-model="form.checkFiles" readonly />
          <div class="text-red-400">
            {{ checkFilesDescription }}
          </div>
        </div>
      </template>
    </van-field>

    <van-field
      v-show-field="['ossIdList', includeFields]"
      label="附件列表"
    >
      <template #input>
        <UploadFile v-model="form.ossIdList" readonly />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import ContractSelect from '../components/ContractSelect.vue'
import PurchaseCategorySelect from '../components/PurchaseCategorySelect.vue'
import ProjectSubjectSelect from '../components/ProjectSubjectSelect.vue'
import { businessDepartmentNotice, checkFilesDescription, purchaseItem } from './helper'
import { useForm } from './form'
import type { PurchaseForm, PurchaseItemVO } from '@/api/oa/business/purchase/types'
import type { PurchaseChangeVO } from '@/api/oa/business/purchaseChange/types'
import { getPurchase } from '@/api/oa/business/purchase'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { useWorkflowHelper, useWorkflowJump } from '@/hooks'
import { useStore } from '@/store'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<PurchaseForm>
    itemListFields?: KeysOfArray<PurchaseItemVO>
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as KeysOfArray<PurchaseForm>
    },
    itemListFields: () => {
      return Object.keys(purchaseItem) as KeysOfArray<PurchaseItemVO>
    },
    showLoading: true,
  },
)

const { user } = useStore()

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 采购 - 业务类型、项目 - 业务类型、发票类型、税率
const { oa_purchase_business_type, oa_project_business_type, oa_purchase_invoice_type, oa_contract_tax_rate } = toRefs(
  proxy.useDict('oa_purchase_business_type', 'oa_project_business_type', 'oa_purchase_invoice_type', 'oa_contract_tax_rate'),
)

// 流程辅助
const { taskDefinitionKey } = useWorkflowHelper()

// 表单
const {
  Form,
  form,
  isLoading,
  isProject,
  isContractPurchase,
  isVisaPurchase,
  isProjectBusinessType,
  taxRateListTotalAmount,
  taxRateListNotTaxTotalAmount,
  showExtraData,
  reset,
  view,
  viewByObject,
  workflowView,
} = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<PurchaseForm>(form)

// 预算科目查询条件
const PurchaseCategorySelectParams = computed(() => {
  const psId = form.value.psId
  const applyDeptId = (form.value as any)?.initiator?.deptId ?? user.info.deptId

  return {
    psId,
    applyDeptId,
  }
})

// 查看采购变更
async function handleViewPurchaseChange({ id }: PurchaseChangeVO) {
  await useWorkflowJump({ businessKey: id, proxy })
}

// 工作流回显时查询采购变更
async function handleWorkflowView(...args: Parameters<typeof workflowView>) {
  workflowView(...args)
  const [entity] = args
  const { data } = await getPurchase(entity.id)
  form.value.purchaseChange = data.purchaseChange
}

defineExpose({
  isLoading,
  form,
  reset,
  view,
  viewByObject,
  workflowView: handleWorkflowView,
})
</script>
