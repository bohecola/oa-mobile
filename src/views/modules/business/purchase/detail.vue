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
    <DictSelect
      v-model="form.subjectType"
      v-show-field="['subjectType', includeFields]"
      name="subjectType"
      label="预算类型"
      dict-type="oa_project_subject_type"
    />

    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      label="需求部门"
      name="deptId"
    />

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
    />

    <DictSelect
      v-if="isProject && !isNil(form.contractNo)"
      v-model="form.contractExecute"
      v-show-field="['contractExecute', includeFields]"
      label="合同执行情况"
      name="contractExecute"
      dict-type="oa_contract_execute_situation"
    />

    <DictSelect
      v-model="form.type"
      v-show-field="['type', includeFields]"
      label="采购类型"
      name="type"
      dict-type="oa_purchase_type"
    />

    <DictSelect
      v-model="form.businessCategory"
      v-show-field="['businessCategory', includeFields]"
      label="业务类别"
      name="businessCategory"
      :options="isProject ? oa_project_business_type : oa_purchase_business_type"
    />

    <DictSelect
      v-model="form.objectCategory"
      v-show-field="['objectCategory', includeFields]"
      label="物品类别"
      name="objectCategory"
      dict-type="oa_purchase_object_category"
    />

    <DictSelect
      v-if="!isNil(form.purchaseMethod)"
      v-model="form.purchaseMethod"
      v-show-field="['purchaseMethod', includeFields]"
      label="采购方式"
      name="purchaseMethod"
      dict-type="oa_purchase_method"
    />

    <DictSelect
      v-model="form.serviceCategory"
      v-show-field="['serviceCategory', includeFields]"
      label="服务类别"
      name="serviceCategory"
      dict-type="oa_purchase_service_category"
    />

    <!-- 服务类别为租赁时显示 -->
    <DictSelect
      v-if="form.serviceCategory === '3'"
      v-model="form.leaseType"
      v-show-field="['leaseType', includeFields]"
      label="租赁类型"
      name="leaseType"
      dict-type="oa_purchase_lease_type"
    />

    <!-- 服务类别为租赁时显示 -->
    <van-field
      v-if="form.serviceCategory === '3'"
      v-show-field="['isDeposit', includeFields]"
      label="是否有押金"
      name="isDeposit"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.isDeposit"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-show-field="['amount', includeFields]"
      label="含税总金额"
      name="amount"
    >
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.amount) }}</span>
          <span class="text-red-400">{{ toCnMoney(form.amount) }}</span>
        </div>
      </template>
    </van-field>

    <van-field
      v-if="isProject && !isNil(form.psId) && !isYwl"
      v-show-field="['notTaxAmount', includeFields]"
      label="不含税总金额"
      name="notTaxAmount"
    >
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.notTaxAmount) }}</span>
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
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.realAmount) }} </span>
          <span class="text-red-400">{{ toCnMoney(form.realAmount) }}</span>
        </div>
      </template>
    </van-field>

    <van-field
      v-if="!isYwl && isProject"
      v-show-field="['notTaxRealAmount', includeFields]"
      label="不含税实际总金额"
      name="notTaxRealAmount"
    >
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.notTaxRealAmount) }} </span>
          <span class="text-red-400">{{ toCnMoney(form.notTaxRealAmount) }}</span>
        </div>
      </template>
    </van-field>

    <van-field
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
            <PurchaseCategorySelect
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
              :name="`itemList.${index}.budgetAmount`"
              label="预算金额"
            >
              <template #input>
                {{ formatCurrency(item.budgetAmount) }}
              </template>
            </van-field>
            <van-field
              :name="`itemList.${index}.applyingAmount`"
              label="申请中"
            >
              <template #input>
                {{ formatCurrency(item.applyingAmount) }}
              </template>
            </van-field>
            <van-field
              :name="`itemList.${index}.finishAmount`"
              label="已申请"
            >
              <template #input>
                {{ formatCurrency(item.finishAmount) }}
              </template>
            </van-field>
            <van-field
              :name="`itemList.${index}.availableAmount`"
              label="剩余金额"
            >
              <template #input>
                {{ formatCurrency(item.availableAmount) }}
              </template>
            </van-field>
            <van-field
              v-model="item.name"
              :name="`itemList.${index}.name`"
              label="物品名称"
            />
            <van-field
              v-model="item.brand"
              :name="`itemList.${index}.brand`"
              label="品牌"
            />
            <van-field
              v-model="item.specsModel"
              :name="`itemList.${index}.specsModel`"
              label="规格型号"
            />
            <van-field
              v-model="item.unit"
              :name="`itemList.${index}.unit`"
              label="单位"
            />
            <van-field
              v-model.number="item.num"
              :name="`itemList.${index}.num`"
              label="数量"
            />
            <DictSelect
              v-if="!isYwl && isProject"
              v-model="item.invoiceType"
              label="发票类型"
              :name="`itemList.${index}.invoiceType`"
              :options="oa_purchase_invoice_type"
            />
            <DictSelect
              v-if="!isYwl && isProject"
              v-model="item.taxRate"
              label="税率(%)"
              :name="`itemList.${index}.taxRate`"
              :options="oa_contract_tax_rate"
            />
            <van-field
              :name="`itemList.${index}.taxAmount`"
              label="含税单价(元)"
            >
              <template #input>
                {{ formatCurrency(item.taxAmount) }}
              </template>
            </van-field>
            <van-field
              v-if="!isYwl && isProject"
              :name="`itemList.${index}.amount`"
              label="不含税单价(元)"
            >
              <template #input>
                {{ formatCurrency(item.amount) }}
              </template>
            </van-field>
            <van-field
              v-if="includeFields.includes('realAmount')"
              :name="`itemList.${index}.taxRealAmount`"
              label="含税实际单价(元)"
            >
              <template #input>
                {{ formatCurrency(item.taxRealAmount) }}
              </template>
            </van-field>
            <van-field
              v-if="includeFields.includes('notTaxRealAmount') && !isYwl && isProject"
              :name="`itemList.${index}.realAmount`"
              label="不含税实际单价(元)"
            >
              <template #input>
                {{ formatCurrency(item.realAmount) }}
              </template>
            </van-field>
            <van-field
              :name="`itemList.${index}.taxTotalAmount`"
              label="含税合计(元)"
            >
              <template #input>
                {{ formatCurrency(item.taxTotalAmount) }}
              </template>
            </van-field>
            <van-field
              v-if="!isYwl && isProject"
              :name="`itemList.${index}.totalAmount`"
              label="不含税合计(元)"
            >
              <template #input>
                {{ formatCurrency(item.totalAmount) }}
              </template>
            </van-field>
            <van-field
              v-if="includeFields.includes('realAmount')"
              :name="`itemList.${index}.taxRealTotalAmount`"
              label="含税实际合计(元)"
            >
              <template #input>
                {{ formatCurrency(item.taxRealTotalAmount) }}
              </template>
            </van-field>
            <van-field
              v-if="includeFields.includes('notTaxRealAmount') && !isYwl && isProject"
              :name="`itemList.${index}.realTotalAmount`"
              label="不含税实际合计(元)"
            >
              <template #input>
                {{ formatCurrency(item.realTotalAmount) }}
              </template>
            </van-field>
            <van-field
              v-model="item.inquiryWay"
              :name="`itemList.${index}.inquiryWay`"
              label="询价途径"
              type="textarea"
              rows="1"
              autosize
            />
            <van-field
              v-model="item.supplier"
              :name="`itemList.${index}.supplier`"
              label="指定供应商"
              type="textarea"
              rows="1"
              autosize
            />
            <van-field
              v-model="item.remark"
              :name="`itemList.${index}.remark`"
              label="备注"
              type="textarea"
              rows="1"
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
          <UploadFile
            v-model="form.checkFiles"
            readonly
          />
          <div class="text-red-400">
            验收附件上传说明：1.通过采购部采购的需要上传收货确认单及全部物资照片 2.自行采购需要上传网络订单截图(线上)/店内销售清单(线下)及全部物资照片
            [注：照片必需带时间、地点(水印相机拍照)]
          </div>
        </div>
      </template>
    </van-field>

    <van-field
      v-show-field="['ossIdList', includeFields]"
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

<script setup lang="ts">
import { isNil } from 'lodash-es'
import PurchaseCategorySelect from '../components/PurchaseCategorySelect.vue'
import ProjectSubjectSelect from '../components/ProjectSubjectSelect.vue'
import { useForm } from './form'
import type { PurchaseForm } from '@/api/oa/business/purchase/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { useStore } from '@/store'

withDefaults(
  defineProps<{
    includeFields?: (keyof PurchaseForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof PurchaseForm)[]
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

// 表单
const { Form, form, isLoading, reset, view, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<PurchaseForm>()

// 是否是项目预算
const isProject = computed(() => form.value.subjectType === 'project')
// 是否是部门预算
// const isDept = computed(() => form.value.subjectType === 'dept')
// 业务类型为运维类
const isYwl = computed(() => isProject.value && ['0', '3'].includes(form.value.businessCategory))

// 预算科目查询条件
const PurchaseCategorySelectParams = computed(() => {
  const psId = form.value.psId
  const applyDeptId = (form.value as any)?.initiator?.deptId ?? user.info.deptId

  return {
    psId,
    applyDeptId,
  }
})

defineExpose({
  isLoading,
  form,
  reset,
  view,
  workflowView,
})
</script>
