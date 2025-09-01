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
      v-model="form.processName"
      v-show-field="['processName', includeFields]"
      label="流程名称"
      name="processName"
      type="textarea"
      rows="1"
      autosize
      :rules="computedRules.processName"
    />

    <DictSelect
      v-model="form.nature"
      v-show-field="['nature', includeFields]"
      label="采购性质"
      name="nature"
      :options="oa_purchase_nature"
      :rules="computedRules.nature"
      @change="onNatureChange"
    >
      <template #button>
        <van-icon name="info-o" @click.stop="onNatureDescClick" />
      </template>
    </DictSelect>

    <DictSelect
      v-model="form.type"
      v-show-field="['type', includeFields]"
      label="采购类型"
      name="type"
      dict-type="oa_purchase_type"
      :rules="computedRules.type"
      clearable
      @change="onTypeChange"
    />

    <DictSelect
      v-if="isContractPurchase"
      v-model="form.subjectType"
      v-show-field="['subjectType', includeFields]"
      label="预算类型"
      name="subjectType"
      dict-type="oa_project_subject_type"
      :rules="computedRules.subjectType"
      :disabled="upsertDisabled"
      @change="onSubjectTypeChange"
    />

    <template v-if="isVisaPurchase">
      <ContractSelect
        v-model="form.contractId"
        v-show-field="['contractId', includeFields]"
        label="合同名称"
        name="contractId"
        :params="{ type: 'in' }"
        :rules="computedRules.contractId"
        clearable
        @update:selected-list="onContractChange"
      />

      <van-field
        v-model="form.contractNo"
        v-show-field="['contractNo', includeFields]"
        label="合同编号"
        name="contractNo"
        readonly
      />
    </template>

    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      label="需求部门"
      name="deptId"
      :rules="computedRules.deptId"
      :disabled="upsertDisabled"
      @change="onDeptChange"
    />

    <template v-if="isContractPurchase">
      <ProjectSubjectSelect
        v-model="form.psId"
        v-model:contract-no="form.contractNo"
        v-show-field="['psId', includeFields]"
        label="预算"
        name="psId"
        :params="{
          type: form.subjectType,
          // 申请部门id：项目预算使用
          projectDeptId: isProject
            ? user.info.deptType === '2'
              ? form?.initiator?.deptId ?? form?.createDept ?? initiatorDeptId
              : undefined
            : form?.initiator?.deptId ?? form?.createDept ?? initiatorDeptId,
          // 需求部门id：部门预算使用
          deptDeptId: !isProject ? form.deptId : undefined,
          status: '5',
        }"
        clearable
        :disabled="upsertDisabled"
        :rules="computedRules.psId"
        @change="onPsIdChange"
        @update:items="onPsItemsChange"
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
      v-model="form.businessCategory"
      v-show-field="['businessCategory', includeFields]"
      label="业务类别"
      name="businessCategory"
      clearable
      :options="isProjectBusinessType ? oa_project_business_type : oa_purchase_business_type"
      :rules="computedRules.businessCategory"
      :disabled="isProjectBusinessType"
    />

    <DictSelect
      v-model="form.objectCategory"
      v-show-field="['objectCategory', includeFields]"
      label="物品类别"
      name="objectCategory"
      dict-type="oa_purchase_object_category"
      clearable
      :rules="computedRules.objectCategory"
      @change="onObjectCategoryChange"
    />

    <DictSelect
      v-model="form.serviceCategory"
      v-show-field="['serviceCategory', includeFields]"
      label="服务类别"
      name="serviceCategory"
      placeholder="请选择服务类别"
      clearable
      :options="serviceCategoryOptions"
      @change="onServiceCategoryChange"
    />

    <DictSelect
      v-if="form.serviceCategory === '3'"
      v-model="form.leaseType"
      v-show-field="['leaseType', includeFields]"
      label="租赁类型"
      name="leaseType"
      dict-type="oa_purchase_lease_type"
      clearable
      :rules="computedRules.leaseType"
      @change="onLeaseTypeChange"
    />

    <van-field
      v-if="form.serviceCategory === '3'"
      v-show-field="['isDeposit', includeFields]"
      label="是否有押金"
      name="isDeposit"
    >
      <template #input>
        <YesNoSwitch v-model="form.isDeposit" />
      </template>
    </van-field>

    <DictSelect
      v-model="form.purchaseMethod"
      v-show-field="['purchaseMethod', includeFields]"
      name="purchaseMethod"
      label="采购方式"
      dict-type="oa_purchase_method"
      clearable
      :rules="computedRules.purchaseMethod"
      :disabled="purchaseMethodDisabled"
    >
      <template #button>
        <van-icon name="info-o" @click.stop="onPurchaseMethodDescClick" />
      </template>
    </DictSelect>

    <van-field-number
      v-model.number="form.amount"
      v-show-field="['amount', includeFields]"
      label="含税总金额"
      name="amount"
      :rules="computedRules.amount"
    >
      <template #input>
        <div class="flex flex-col">
          <span>{{ formatCurrency(form.amount) }}</span>
          <span class="text-red-400">{{ toCnMoney(form.amount) }}</span>
        </div>
      </template>
    </van-field-number>

    <van-field-number
      v-if="showExtraData && !isNil(form.psId)"
      v-model.number="form.notTaxAmount"
      v-show-field="['notTaxAmount', includeFields]"
      label="不含税总金额"
      name="notTaxAmount"
      :rules="computedRules.notTaxAmount"
    >
      <template #input>
        <div class="flex flex-col">
          <span>{{ formatCurrency(form.notTaxAmount) }}</span>
          <span class="text-red-400">{{ toCnMoney(form.notTaxAmount) }}</span>
        </div>
      </template>
    </van-field-number>

    <van-field-number
      v-model.number="form.realAmount"
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
    </van-field-number>

    <van-field-number
      v-if="showExtraData"
      v-model.number="form.notTaxRealAmount"
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
    </van-field-number>

    <van-field
      v-model="form.description"
      v-show-field="['description', includeFields]"
      label="采购说明"
      placeholder="请输入"
      name="description"
      type="textarea"
      rows="1"
      autosize
      :rules="computedRules.description"
    />

    <van-field
      v-model="form.remark"
      v-show-field="['remark', includeFields]"
      label="备注"
      placeholder="请输入"
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

      <van-field label="签证收入金额/增值税率" required>
        <template #input>
          <CoolCardList accordion active-on-register>
            <CoolCard
              v-for="(item, index) in form.taxRateList"
              :key="index"
              :title="formatCurrency(item.amount)"
            >
              <template #footer>
                <div class="text-right">
                  <van-button
                    v-if="form.taxRateList.length - 1 === index"
                    type="primary"
                    icon="plus"
                    size="small"
                    @click="handleAddTaxRate"
                  />
                  <van-button
                    class="ml-2"
                    type="danger"
                    icon="delete"
                    size="small"
                    :disabled="form.taxRateList.length === 1"
                    @click="handleRemoveTaxRate(item, index)"
                  />
                </div>
              </template>

              <van-field-number
                v-model="item.amount"
                label="签证收入含税金额（元）"
                :name="`taxRateList.${index}.amount`"
                :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
                clearable
                @change="onTaxRateListAmountChange(item)"
              >
                <template #button>
                  <van-icon name="info-o" @click.stop="handleTipTaxRateListOfAmount" />
                </template>
              </van-field-number>

              <DictSelect
                v-model="item.taxRate"
                label="增值税率（%）"
                :name="`taxRateList.${index}.taxRate`"
                :rules="[{ required: true, message: '不能为空', trigger: 'onChange' }]"
                :options="oa_contract_tax_rate"
                clearable
                @change="onTaxRateListTaxRateChange(item)"
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
        :placeholder="qzIncomeDescription"
        :rules="computedRules.qzIncomeDescription"
      />
    </template>

    <van-field v-if="includeFields.includes('itemList')" label="采购清单" required>
      <template #input>
        <CoolCardList accordion active-on-register>
          <CoolCard
            v-for="(item, index) in form.itemList"
            :key="index"
            :title="item.name"
          >
            <template v-if="!disabledColumn" #footer>
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
                  @click="handleRemove(item, index)"
                />
              </div>
            </template>

            <template v-if="isContractPurchase">
              <PurchaseCategorySelect
                v-model="item.psiId"
                v-model:dept-id="item.subjectItemDeptId"
                v-model:amount="item.budgetAmount"
                v-model:applying-amount.v-model:amount="item.applyingAmount"
                v-model:finish-amount.v-model:amount="item.finishAmount"
                v-model:available-amount.v-model:amount="item.availableAmount"
                label="预算科目"
                :name="`itemList.${index}.subjectItemId`"
                :rules="[{ required: true, message: '预算科目不能为空', trigger: 'onChange' }]"
                :params="PurchaseCategorySelectParams"
                :disabled="disabledColumn"
                clearable
              />

              <van-field
                :model-value="formatCurrency(item.budgetAmount)"
                label="预算金额"
                readonly
              />

              <van-field
                :model-value="formatCurrency(item.applyingAmount)"
                label="申请中"
                readonly
              />

              <van-field
                :model-value="formatCurrency(item.finishAmount)"
                label="已申请"
                readonly
              />

              <van-field
                :model-value="formatCurrency(item.availableAmount) "
                label="剩余金额"
                readonly
              />
            </template>

            <van-field
              v-model.trim="item.name"
              label="物品名称"
              placeholder="请输入"
              :name="`itemList.${index}.name`"
              :maxlength="100"
              :disabled="disabledColumn"
              :rules="[{ required: true, message: '物品名称不能为空', trigger: 'onBlur' }]"
            />

            <van-field
              v-model.trim="item.brand"
              label="品牌"
              placeholder="请输入"
              :name="`itemList.${index}.brand`"
              :maxlength="100"
              :disabled="disabledColumn"
            />

            <van-field
              v-model.trim="item.specsModel"
              label="规格型号"
              placeholder="请输入"
              :name="`itemList.${index}.specsModel`"
              :maxlength="100"
              :disabled="disabledColumn"
            />

            <van-field
              v-model="item.unit"
              label="单位"
              placeholder="请输入"
              :name="`itemList.${index}.unit`"
              :maxlength="10"
              :disabled="disabledColumn"
              :rules="[{ required: true, message: '单位不能为空', trigger: 'onBlur' }]"
            />

            <van-field-number
              v-model.number="item.num"
              label="数量"
              type="digit"
              placeholder="请输入"
              :name="`itemList.${index}.num`"
              :disabled="disabledColumn"
              :rules="[{ required: true, message: '数量不能为空', trigger: 'onBlur' }]"
            />

            <DictSelect
              v-if="showExtraData"
              v-model="item.invoiceType"
              label="发票类型"
              :name="`itemList.${index}.invoiceType`"
              :options="oa_purchase_invoice_type"
              :rules="[{ required: true, message: '发票类型不能为空', trigger: 'onChange' }]"
              :disabled="disabledColumn"
              @change="
                (val) => {
                  if (val === '0') {
                    item.taxRate = '0';
                  }
                }
              "
            />

            <DictSelect
              v-if="showExtraData"
              v-model="item.taxRate"
              label="税率(%)"
              :name="`itemList.${index}.taxRate`"
              :options="oa_contract_tax_rate"
              :rules="[{ required: true, message: '税率不能为空', trigger: 'onChange' }]"
              :disabled="disabledColumn || item.invoiceType === '0'"
            />

            <van-field-number
              v-model.number="item.taxAmount"
              label="含税单价(元)"
              placeholder="请输入"
              :name="`itemList.${index}.taxAmount`"
              :disabled="disabledColumn"
              :rules="[{ required: true, message: '含税单价(元)不能为空', trigger: 'onBlur' }]"
            />

            <van-field-number
              v-if="showExtraData"
              label="不含税单价(元)"
              placeholder="自动计算"
              :model-value="item.amount"
              :name="`itemList.${index}.amount`"
              disabled
            />

            <van-field-number
              v-if="includeFields.includes('realAmount')"
              v-model.number="item.taxRealAmount"
              label="含税实际单价(元)"
              :name="`itemList.${index}.taxRealAmount`"
              :rules="[{ required: taxRealAmountRequired, message: '含税实际单价不能为空', trigger: 'onBlur' }]"
            />

            <van-field-number
              v-if="includeFields.includes('notTaxRealAmount') && showExtraData"
              :model-value="item.realAmount"
              :name="`itemList.${index}.realAmount`"
              label="不含税实际单价(元)"
              placeholder="自动计算"
              disabled
            />

            <van-field
              label="含税合计(元)"
              placeholder="自动求和"
              :model-value="item.taxTotalAmount"
              :name="`itemList.${index}.taxTotalAmount`"
              disabled
            />

            <van-field-number
              v-if="showExtraData"
              label="不含税合计(元)"
              placeholder="自动求和"
              :model-value="item.totalAmount"
              :name="`itemList.${index}.totalAmount`"
              disabled
            />

            <van-field-number
              v-if="includeFields.includes('realAmount')"
              label="含税实际合计(元)"
              placeholder="自动求和"
              :model-value="item.taxRealTotalAmount"
              :name="`itemList.${index}.taxRealTotalAmount`"
              disabled
            />

            <van-field-number
              v-if="includeFields.includes('notTaxRealAmount') && showExtraData"
              label="不含税实际合计(元)"
              placeholder="自动求和"
              :model-value="item.realTotalAmount"
              :name="`itemList.${index}.realTotalAmount`"
              disabled
            />

            <van-field
              v-model="item.inquiryWay"
              label="询价途径"
              type="textarea"
              rows="1"
              autosize
              placeholder="请输入"
              :name="`itemList.${index}.inquiryWay`"
              :maxlength="1000"
              :disabled="disabledColumn"
            />

            <van-field
              v-model="item.supplier"
              label="指定供应商"
              type="textarea"
              rows="1"
              autosize
              placeholder="请输入"
              :name="`itemList.${index}.supplier`"
              :maxlength="50"
              :disabled="disabledColumn"
            />

            <van-field
              v-model="item.remark"
              :name="`itemList.${index}.remark`"
              type="textarea"
              label="备注"
              placeholder="请输入"
              rows="1"
              autosize
              :maxlength="255"
              :disabled="disabledColumn"
            />
          </CoolCard>
        </CoolCardList>
      </template>
    </van-field>

    <van-field
      v-show-field="['checkFiles', includeFields]"
      label="验收附件"
      name="checkFiles"
      :rules="computedRules.checkFiles"
    >
      <template #input>
        <div class="flex flex-col">
          <UploadFile v-model="form.checkFiles" :exclude="excludeCheckFiles" />
          <div class="text-red-400">
            {{ checkFilesDescription }}
          </div>
        </div>
      </template>
    </van-field>

    <!-- 附件列表 -->
    <van-field
      v-show-field="['ossIdList', includeFields]"
      name="ossIdList"
      placeholder="请选择"
      :rules="computedRules.ossIdList"
    >
      <template #label>
        <span>附件列表</span>
        <span class="opacity-50">（请上传申购内容附件）</span>
      </template>
      <template #input>
        <UploadFile v-model="form.ossIdList" value-type="array" :exclude="excludeOssIdList" />
      </template>
    </van-field>

    <van-dialog v-model:show="showPurchaseMethodDesc" title="采购方式规则说明">
      <PurchaseMethodDesc :options="oa_project_business_type" />
    </van-dialog>
  </van-form>
</template>

<script setup lang="ts">
import Big from 'big.js'
import { cloneDeep, isEmpty, isNil } from 'lodash-es'
import type { FieldRule } from 'vant'
import ContractSelect from '../components/ContractSelect.vue'
import ProjectSubjectSelect from '../components/ProjectSubjectSelect.vue'
import PurchaseCategorySelect from '../components/PurchaseCategorySelect.vue'
import PurchaseMethodDesc from './components/PurchaseMethodDesc.vue'
import { useForm } from './form'
import { checkFilesDescription, isAllKeyNil, qzIncomeDescription, sumTotalMoney, vehiclePurchaseDescription } from './helper'
import type { PurchaseForm, PurchaseItemVO, TaxRateVO } from '@/api/oa/business/purchase/types'
import type { ProjectSubjectVO } from '@/api/oa/finance/projectSubject/types'
import type { ContractVO } from '@/api/oa/business/contract/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { getBusinessTypeByPsId } from '@/api/oa/business/project'
import { isNumeric } from '@/utils'
import { useStore } from '@/store'
import { useWorkflowHelper } from '@/hooks'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<PurchaseForm>
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as KeysOfArray<PurchaseForm>
    },
    showLoading: true,
  },
)

const { user } = useStore()

// 流程辅助
const { taskDefinitionKey, initiatorDeptId } = useWorkflowHelper()

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 模态框
const { confirm } = proxy.$modal

// 采购-业务类别、项目-业务类别、服务类别、发票类型、税率
const {
  oa_purchase_nature,
  oa_purchase_business_type,
  oa_project_business_type,
  oa_purchase_service_category,
  oa_purchase_invoice_type,
  oa_contract_tax_rate,
  oa_contract_category_in,
} = toRefs(
  proxy.useDict(
    'oa_purchase_nature',
    'oa_purchase_business_type',
    'oa_project_business_type',
    'oa_purchase_service_category',
    'oa_purchase_invoice_type',
    'oa_contract_tax_rate',
    'oa_contract_category_in',
  ),
)

// 表单
const {
  Form,
  form,
  rules,
  isLoading,
  updateLoading,
  taxRateItem,
  purchaseItem,
  excludeCheckFiles,
  excludeOssIdList,
  showPurchaseMethodDesc,
  isContractPurchase,
  isVisaPurchase,
  isProject,
  isDept,
  isYwl,
  isProjectBusinessType,
  showExtraData,
  taxRateListTotalAmount,
  taxRateListNotTaxTotalAmount,
  reset,
  resetFields,
  view,
  submit,
  workflowSubmit,
  workflowView,
} = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<PurchaseForm>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<PurchaseForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }

  // 业务中修改不校验验收附件
  if (isNil(taskDefinitionKey.value)) {
    (newRules.checkFiles as Array<FieldRule>).forEach((e: FieldRule) => (e.required = false))
  }

  return newRules
})

// 禁用列
const disabledColumn = computed(() => {
  if (!isNil(form.value.id) && isNil(taskDefinitionKey.value)) {
    return true
  }

  return ['Activity_0x4xddm', 'Activity_0qbyt2w'].includes(taskDefinitionKey.value)
})

// 服务类别选项
const serviceCategoryOptions = computed(() => {
  if (form.value.type === '1') {
    return oa_purchase_service_category.value
  }
  return oa_purchase_service_category.value.filter(e => e.value !== '3')
})

// 预算科目查询条件
const PurchaseCategorySelectParams = computed(() => {
  const psId = form.value.psId
  const applyDeptId = form.value?.initiator?.deptId ?? form.value?.createDept ?? initiatorDeptId.value

  return {
    psId,
    applyDeptId,
  }
})

// 含税实际金额是否必填
const taxRealAmountRequired = computed(() => {
  if (props.includeFields.includes('realAmount')) {
    if (taskDefinitionKey.value === 'Activity_0x4xddm') {
      return true
    }
    return false
  }
  else {
    return false
  }
})

// 业务编辑时禁用
const upsertDisabled = computed(() => !isNil(form.value.id) && isNil(taskDefinitionKey.value))

// 采购方式禁用
const purchaseMethodDisabled = computed(() => {
  // 生活用品、办公用品 禁用采购方式 =>（设置自行采购）
  if (['3', '4'].includes(form.value.objectCategory)) {
    return true
  }

  // 部门预算 => 禁用采购方式
  if (isDept.value) {
    // 生活用品、办公用品 =>（设置自行采购）
    // 其他 => 设置公司采购
    return true
  }

  // 项目预算
  if (isProject.value) {
    // 根据业务类型查询备注金额
    const item = oa_project_business_type.value.find(e => e.value === form.value.businessCategory)
    if (!isNil(item)) {
      // 含税总金额大于等于备注金额 => 禁用采购方式（设置公司采购）
      if (Big(form.value.amount).gt(item.remark)) {
        return true
      }
    }
  }

  return false
})

// 采购性质切换
function onNatureChange() {
  // 合同内采购
  if (isContractPurchase.value) {
    form.value.subjectType = 'project'
    form.value.deptId = user.info.deptId
    form.value.contractId = undefined
    form.value.contractNo = undefined
    form.value.businessCategory = undefined
    form.value.taxRateList = []
  }

  // 签证采购
  if (isVisaPurchase.value) {
    form.value.subjectType = undefined
    form.value.taxRateList = [cloneDeep(taxRateItem)]
    resetPS()
  }
}

// 合同切换
function onContractChange([contract]: ContractVO[]) {
  const contractCategory = oa_contract_category_in.value.find(e => e.value === contract?.category)

  form.value.contractId = contract?.id
  form.value.contractNo = contract?.no
  form.value.businessCategory = contractCategory?.remark1
  form.value.deptId = contract?.deptId
}

function resetPS() {
  resetFields(['psId', 'contractNo', 'businessCategory'])
  form.value.contractNo = undefined

  setItemList({
    psiId: undefined,
    subjectItemDeptId: undefined,
    budgetAmount: undefined,
    applyingAmount: undefined,
    finishAmount: undefined,
    availableAmount: undefined,
  })
}

// 自动设置采购方式
function autoSetPurchaseMethod() {
  // 生活用品、办公用品 =>（设置自行采购）
  if (['3', '4'].includes(form.value.objectCategory)) {
    form.value.purchaseMethod = '2'
    return
  }

  // 部门预算
  if (isDept.value) {
    // 其他 => 设置公司采购
    form.value.purchaseMethod = '1'
    return
  }

  // 项目预算
  if (isProject.value) {
    // 根据业务类型查询备注金额
    const item = oa_project_business_type.value.find(e => e.value === form.value.businessCategory)

    if (!isNil(item)) {
      // 含税总金额大于等于备注金额 => 设置公司采购
      if (Big(form.value.amount).gt(item.remark)) {
        form.value.purchaseMethod = '1'
      }
    }
  }
}

// 物品类别修改
function onObjectCategoryChange(_: string) {
  autoSetPurchaseMethod()
}

// 预算类型切换
function onSubjectTypeChange() {
  resetPS()
}

// 需求部门切换
function onDeptChange() {
  resetPS()
}

// 预算选择
async function onPsIdChange(val: string) {
  resetFields(['businessCategory', 'contractNo'])
  setItemList({ psiId: undefined })

  if (!isEmpty(val)) {
    // 项目预算
    if (isProject.value) {
      (rules.value.contractId as Array<FieldRule>).forEach(e => (e.required = true))
      // 根据预算查询项目的业务类型
      const { msg } = await getBusinessTypeByPsId(val)
      form.value.businessCategory = msg
    }
    else {
      // 部门预算
      resetFields(['serviceCategory', 'leaseType', 'isDeposit'])
    }
  }
}

// 预算 Item 选择
function onPsItemsChange([psItem]: ProjectSubjectVO[]) {
  form.value.deptId = psItem?.deptId
}

// 采购类型选择
function onTypeChange() {
  resetFields(['serviceCategory', 'leaseType', 'isDeposit'])
}

// 服务类别选择
function onServiceCategoryChange(val?: string) {
  // 不是租赁时，重置租赁类型、押金
  if (val !== '3') {
    resetFields(['leaseType', 'isDeposit'])
  }
}

// 租赁类型选择
function onLeaseTypeChange(val?: string) {
  // 车辆租赁时，采购说明赋值默认值
  if (val === '1') {
    form.value.description = vehiclePurchaseDescription
  }
}

// 新增签证收入金额/增值税率
function handleAddTaxRate() {
  form.value.taxRateList.push(cloneDeep(taxRateItem))
}

// 删除签证收入金额/增值税率
function handleRemoveTaxRate(_: any, index: number) {
  confirm('是否删除这条数据？')
    .then(() => {
      form.value.taxRateList.splice(index, 1)
    })
    .catch(() => {})
}

// 签证收入金额修改
function onTaxRateListAmountChange(item: TaxRateVO) {
  calcNotTaxAmount(item)
}

// 签证增值税率修改
function onTaxRateListTaxRateChange(item: TaxRateVO) {
  calcNotTaxAmount(item)
}

// 计算不含税金额
function calcNotTaxAmount(item: TaxRateVO) {
  if (!isNumeric(item.amount) || !isNumeric(item.taxRate)) {
    item.notTaxAmount = undefined
    return
  }

  item.notTaxAmount = Number(
    Big(item.amount)
      .div(Big(1).add(Big(item.taxRate).div(100)))
      .toFixed(2),
  )
}

// 新增采购清单
function handleAdd() {
  if (showExtraData.value) {
    form.value.itemList.push({ ...purchaseItem })
  }
  else {
    form.value.itemList.push({ ...purchaseItem, invoiceType: '0', taxRate: '0' })
  }
}

// 采购清单删除
function handleRemove(_: any, index: number) {
  confirm('是否删除这条数据？')
    .then(() => {
      form.value.itemList.splice(index, 1)
    })
    .catch(() => {})
}

// 更新采购清单数据
function setItemList(obj: Partial<PurchaseItemVO>) {
  form.value.itemList.forEach((item) => {
    for (const [key, value] of Object.entries(obj)) {
      item[key] = value
    }
  })
}

// 签证收入金额/增值税率提示
function handleTipTaxRateListOfAmount() {
  confirm(qzIncomeDescription, { messageAlign: 'left', showCancelButton: false })
}

// 采购性质描述点击
function onNatureDescClick() {
  const msg = oa_purchase_nature.value.map(e => `${e.label}：\n${e.remark}`).join('\n\n')

  confirm(msg, { messageAlign: 'left', showCancelButton: false })
}

// 采购方式描述点击
function onPurchaseMethodDescClick() {
  showPurchaseMethodDesc.value = true
}

// 含税总金额监听
watch(
  () => form.value.amount,
  () => {
    autoSetPurchaseMethod()
  },
)

// 采购清单监听
watch(
  () => form.value.itemList,
  (val) => {
    // 单项合计
    val.forEach((item) => {
      // 数量、含税单价为空
      if (!isNumeric(item.num) || !isNumeric(item.taxAmount)) {
        item.amount = undefined
        item.taxTotalAmount = undefined
        item.totalAmount = undefined
        return
      }
      // 含税合计
      item.taxTotalAmount = Big(item.taxAmount).times(item.num).toNumber()

      // 税率为空
      if (!isNumeric(item.taxRate)) {
        item.amount = undefined
        return
      }
      // 不含税单价
      item.amount = Number(
        Big(item.taxAmount)
          .div(Big(1).add(Big(item.taxRate).div(100)))
          .toFixed(2),
      )

      // 不含税单价为空
      if (!isNumeric(item.amount)) {
        return
      }
      // 不含税合计
      item.totalAmount = Number(
        Big(item.amount).times(item.num).toFixed(2),
      )

      // 含税实际单价为空
      if (!isNumeric(item.taxRealAmount)) {
        item.realAmount = undefined
        item.taxRealTotalAmount = undefined
        item.realTotalAmount = undefined
        return
      }
      // 不含税实际单价
      item.realAmount = Number(
        Big(item.taxRealAmount)
          .div(Big(1).add(Big(item.taxRate).div(100)))
          .toFixed(2),
      )

      // 含税实际合计
      item.taxRealTotalAmount = Number(
        Big(item.taxRealAmount).times(item.num).toFixed(2),
      )
      // 不含税实际合计
      item.realTotalAmount = Number(
        Big(item.realAmount).times(item.num).toFixed(2),
      )
    })

    // 含税总金额合计
    const amount = sumTotalMoney(val, 'taxTotalAmount')
    form.value.amount = amount

    // 不含税总金额合计
    const notTaxAmount = sumTotalMoney(val, 'totalAmount')
    form.value.notTaxAmount = notTaxAmount

    // 含税实际总金额
    const realAmount = isAllKeyNil(val, 'taxRealTotalAmount') ? undefined : sumTotalMoney(val, 'taxRealTotalAmount')
    form.value.realAmount = realAmount

    // 不含税实际总金额
    const notTaxRealAmount = isAllKeyNil(val, 'realTotalAmount') ? undefined : sumTotalMoney(val, 'realTotalAmount')
    form.value.notTaxRealAmount = notTaxRealAmount
  },
  {
    deep: true,
    immediate: true,
  },
)

watch([isYwl, isDept], ([isYwlVal, isDeptVal]) => {
  if (isYwlVal || isDeptVal) {
    setItemList({
      invoiceType: '0',
      taxRate: '0',
    })
  }
})

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
