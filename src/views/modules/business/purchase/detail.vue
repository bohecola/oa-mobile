<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" class="reset-label" readonly label-width="auto" label-align="top">
    <van-field v-show-field="['subjectType', includeFields]" label="预算类型" name="subjectType" input-align="left">
      <template #input>
        <DictSelect v-model="form.subjectType" dict-type="oa_project_subject_type" readonly />
      </template>
    </van-field>
    <van-field v-show-field="['deptId', includeFields]" label="需求部门" name="deptId" input-align="left">
      <template #input>
        <DeptSelect v-model="form.deptId" readonly />
      </template>
    </van-field>
    <van-field
      v-show-field="['psId', includeFields]"
      label="预算"
      name="psId"
      input-align="left"
    >
      <template #input>
        <ProjectSubjectSelect v-model="form.psId" readonly />
      </template>
    </van-field>
    <van-field v-if="isProject && !isNil(form.psId)" v-show-field="['contractNo', includeFields]" label="合同编号" name="contractNo" input-align="left">
      <template #input>
        {{ form.contractNo }}
        <!-- <ContractSelect v-model="form.contractId" preview-field="no" readonly /> -->
      </template>
    </van-field>
    <van-field v-if="isProject && !isNil(form.contractNo)" v-show-field="['contractExecute', includeFields]" label="合同执行情况" name="contractExecute" input-align="left">
      <template #input>
        <dict-select v-model="form.contractExecute" dict-type="oa_contract_execute_situation" readonly />
      </template>
    </van-field>
    <van-field v-show-field="['type', includeFields]" label="采购类型" name="type" input-align="left">
      <template #input>
        <dict-select v-model="form.type" dict-type="oa_purchase_type" readonly />
      </template>
    </van-field>
    <van-field v-show-field="['businessCategory', includeFields]" label="业务类别" name="businessCategory" input-align="left">
      <!-- 如果选择了项目，则默认项目的业务类型，如果没有项目则可选：管理、销售、研发 -->
      <template #input>
        <dict-tag :options="isProject ? oa_project_business_type : oa_purchase_business_type" :value="form.businessCategory" />
      </template>
    </van-field>
    <van-field v-show-field="['objectCategory', includeFields]" label="物品类别" name="objectCategory" input-align="left">
      <template #input>
        <dict-select v-model="form.objectCategory" dict-type="oa_purchase_object_category" readonly />
      </template>
    </van-field>
    <van-field v-show-field="['serviceCategory', includeFields]" label="服务类别" name="serviceCategory" input-align="left">
      <template #input>
        <dict-select v-model="form.serviceCategory" dict-type="oa_purchase_service_category" readonly />
      </template>
    </van-field>
    <!-- 服务类别为租赁时显示 -->
    <van-field v-if="form.serviceCategory === '3'" v-show-field="['leaseType', includeFields]" label="租赁类型" name="leaseType" input-align="left">
      <template #input>
        <dict-select v-model="form.leaseType" dict-type="oa_purchase_lease_type" readonly />
      </template>
    </van-field>
    <!-- 服务类别为租赁时显示 -->
    <van-field v-if="form.serviceCategory === '3'" v-show-field="['isDeposit', includeFields]" label="是否有押金" name="isDeposit" input-align="left">
      <template #input>
        <YesNoSwitch v-model="form.isDeposit" readonly />
      </template>
    </van-field>

    <van-field v-show-field="['amount', includeFields]" label="含税总金额" name="amount" input-align="left">
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.amount) }}</span>
          <span class="text-red-400">{{ toCnMoney(form.amount) }}</span>
        </div>
      </template>
    </van-field>
    <van-field v-if="isProject && !isNil(form.psId) && !isYwl" v-show-field="['notTaxAmount', includeFields]" label="不含税总金额" name="notTaxAmount" input-align="left">
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.notTaxAmount) }}</span>
          <span class="text-red-400">{{ toCnMoney(form.notTaxAmount) }}</span>
        </div>
      </template>
    </van-field>

    <van-field v-show-field="['realAmount', includeFields]" label="含税实际总金额" name="realAmount" input-align="left">
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.realAmount) }} </span>
          <span class="text-red-400">{{ toCnMoney(form.realAmount) }}</span>
        </div>
      </template>
    </van-field>
    <van-field v-if="!isYwl && isProject" v-show-field="['notTaxRealAmount', includeFields]" label="不含税实际总金额" name="notTaxRealAmount" input-align="left">
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.notTaxRealAmount) }} </span>
          <span class="text-red-400">{{ toCnMoney(form.notTaxRealAmount) }}</span>
        </div>
      </template>
    </van-field>

    <van-field v-show-field="['isOwnerSettlement', includeFields]" label="是否业主单独结算" name="isOwnerSettlement" input-align="left">
      <template #input>
        <YesNoSwitch v-model="form.isOwnerSettlement" readonly />
      </template>
    </van-field>
    <van-field v-show-field="['description', includeFields]" label="采购说明" name="description" input-align="left">
      <template #input>
        <TextareaView :value="form.description" />
      </template>
    </van-field>
    <van-field v-show-field="['remark', includeFields]" label="备注" name="remark" input-align="left">
      <template #input>
        <TextareaView :value="form.remark" />
      </template>
    </van-field>

    <Teleport to="#AFC" defer>
      <div v-show-field="['itemList', includeFields]" class="reset-label">
        <div class="px-4 py-2 text-sm text-[--van-cell-group-title-color]">
          采购清单
        </div>

        <TableCard v-for="(item, index) in form.itemList" :key="item.id" :title="item.name" class="mx-4 mb-2" :default-collapse="true">
          <van-field
            v-model="item.psiId"
            :name="`itemList.${index}.psiId`"
            :rules="[
              {
                required: true,
                message: '预算科目不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="预算科目"
            input-align="left"
          >
            <template #input>
              <PurchaseCategorySelect
                v-model="item.psiId"
                v-model:amount="item.budgetAmount"
                v-model:applying-amount="item.applyingAmount"
                v-model:finish-amount="item.finishAmount"
                v-model:available-amount="item.availableAmount"
                :params="PurchaseCategorySelectParams"
                readonly
              />
            </template>
          </van-field>
          <van-field
            :name="`itemList.${index}.budgetAmount`"
            label="预算金额"
            input-align="left"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].budgetAmount) }}
            </template>
          </van-field>
          <van-field
            :name="`itemList.${index}.applyingAmount`"
            label="申请中"
            input-align="left"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].applyingAmount) }}
            </template>
          </van-field>
          <van-field
            :name="`itemList.${index}.finishAmount`"
            label="已申请"
            input-align="left"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].finishAmount) }}
            </template>
          </van-field>
          <van-field
            :name="`itemList.${index}.availableAmount`"
            label="剩余金额"
            input-align="left"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].availableAmount) }}
            </template>
          </van-field>
          <van-field
            v-model="item.name"
            :name="`itemList.${index}.name`"
            label="物品名称"
            input-align="left"
          />
          <van-field
            v-model="item.brand"
            :name="`itemList.${index}.brand`"
            label="品牌"
            input-align="left"
          />
          <van-field
            v-model="item.specsModel"
            :name="`itemList.${index}.specsModel`"
            label="规格型号"
            input-align="left"
          />
          <van-field
            v-model="item.unit"
            :name="`itemList.${index}.unit`"
            label="单位"
            input-align="left"
          />
          <van-field
            :name="`itemList.${index}.num`"
            label="数量"
            input-align="left"
          >
            <template #input>
              {{ item.num }}
            </template>
          </van-field>
          <van-field
            v-if="!isYwl && isProject"
            :name="`itemList.${index}.invoiceType`"
            label="发票类型"
            input-align="left"
          >
            <template #input>
              <dict-select v-model="item.invoiceType" :options="oa_purchase_invoice_type" readonly />
            </template>
          </van-field>
          <van-field
            v-if="!isYwl && isProject"
            :name="`itemList.${index}.taxRate`"
            label="税率(%)"
            input-align="left"
          >
            <template #input>
              <dict-select v-model="item.taxRate" :options="oa_contract_tax_rate" readonly />
            </template>
          </van-field>
          <van-field
            :name="`itemList.${index}.taxAmount`"
            label="含税单价(元)"
            input-align="left"
          >
            <template #input>
              {{ formatCurrency(item.taxAmount) }}
            </template>
          </van-field>
          <van-field
            v-if="!isYwl && isProject"
            :name="`itemList.${index}.amount`"
            label="不含税单价(元)"
            input-align="left"
          >
            <template #input>
              {{ formatCurrency(item.amount) }}
            </template>
          </van-field>
          <van-field
            v-if="includeFields.includes('realAmount')"
            :name="`itemList.${index}.taxRealAmount`"
            label="含税实际单价(元)"
            input-align="left"
          >
            <template #input>
              {{ formatCurrency(item.taxRealAmount) }}
            </template>
          </van-field>
          <van-field
            v-if="includeFields.includes('notTaxRealAmount') && !isYwl && isProject"
            :name="`itemList.${index}.realAmount`"
            label="不含税实际单价(元)"
            input-align="left"
          >
            <template #input>
              {{ formatCurrency(item.realAmount) }}
            </template>
          </van-field>
          <van-field
            :name="`itemList.${index}.taxTotalAmount`"
            label="含税合计(元)"
            input-align="left"
          >
            <template #input>
              {{ formatCurrency(item.taxTotalAmount) }}
            </template>
          </van-field>
          <van-field
            v-if="!isYwl && isProject"
            :name="`itemList.${index}.totalAmount`"
            label="不含税合计(元)"
            input-align="left"
          >
            <template #input>
              {{ formatCurrency(item.totalAmount) }}
            </template>
          </van-field>
          <van-field
            v-if="includeFields.includes('realAmount')"
            :name="`itemList.${index}.taxRealTotalAmount`"
            label="含税实际合计(元)"
            input-align="left"
          >
            <template #input>
              {{ formatCurrency(item.taxRealTotalAmount) }}
            </template>
          </van-field>
          <van-field
            v-if="includeFields.includes('notTaxRealAmount') && !isYwl && isProject"
            :name="`itemList.${index}.realTotalAmount`"
            label="不含税实际合计(元)"
            input-align="left"
          >
            <template #input>
              {{ formatCurrency(item.realTotalAmount) }}
            </template>
          </van-field>
          <van-field
            v-model="item.inquiryWay"
            :name="`itemList.${index}.inquiryWay`"
            label="询价途径"
            input-align="left"
          />
          <van-field
            v-model="item.supplier"
            :name="`itemList.${index}.supplier`"
            label="指定供应商"
            input-align="left"
          />
          <van-field
            v-model="item.remark"
            :name="`itemList.${index}.remark`"
            label="备注"
            input-align="left"
          >
            <template #input>
              <TextareaView :value="item.remark" />
            </template>
          </van-field>
        </TableCard>
      </div>
    </Teleport>

    <van-field v-show-field="['checkFiles', includeFields]" label="验收附件" name="checkFiles" input-align="left">
      <template #input>
        <div class="flex flex-col">
          <UploadFile v-model="form.checkFiles" readonly :card-size="60" />
          <div class="text-red-400">
            验收附件上传说明：1.通过采购部采购的需要上传收货确认单及全部物资照片 2.自行采购需要上传网络订单截图(线上)/店内销售清单(线下)及全部物资照片
            [注：照片必需带时间、地点(水印相机拍照)]
          </div>
        </div>
      </template>
    </van-field>

    <!-- 附件列表 -->
    <Teleport to="#AFC" defer>
      <TableCard v-show-field="['ossIdList', includeFields]" :is-empty="isEmpty(form.ossIdList)" title="附件列表" class="mx-4">
        <UploadFile v-model="form.ossIdList" readonly :card-size="60" />
      </TableCard>
    </Teleport>
  </van-form>
</template>

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash-es'
import PurchaseCategorySelect from '../components/PurchaseCategorySelect.vue'
// import ContractSelect from '../components/ContractSelect/index.vue'
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
const isDept = computed(() => form.value.subjectType === 'dept')
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
