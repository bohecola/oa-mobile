<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="9em">
    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['subjectType', includeFields]" label="预算类型" name="subjectType" input-align="right">
        <template #input>
          <DictSelect v-model="form.subjectType" dict-type="oa_project_subject_type" readonly />
        </template>
      </van-field>
      <van-field
        v-show-field="['psId', includeFields]"
        label="预算"
        name="psId"
        input-align="right"
      >
        <template #input>
          <ProjectSubjectSelect
            v-model="form.psId"
            :params="{
              type: form.subjectType,
              deptId: form.deptId,
              status: '5',
            }"
            readonly
          />
        </template>
      </van-field>
      <van-field v-show-field="['contractId', includeFields]" label="收入合同" name="contractId" input-align="right">
        <template #input>
          <ContractSelect v-model="form.contractId" readonly />
        </template>
      </van-field>
      <van-field v-show-field="['contractExecute', includeFields]" label="合同执行情况" name="contractExecute" input-align="right">
        <template #input>
          <dict-select v-model="form.contractExecute" dict-type="oa_contract_execute_situation" readonly />
        </template>
      </van-field>
      <van-field v-show-field="['type', includeFields]" label="采购类型" name="type" input-align="right">
        <template #input>
          <dict-select v-model="form.type" dict-type="oa_purchase_type" readonly />
        </template>
      </van-field>
      <van-field v-show-field="['businessCategory', includeFields]" label="业务类别" name="businessCategory" input-align="right">
        <!-- 如果选择了项目，则默认项目的业务类型，如果没有项目则可选：管理、销售、研发 -->
        <template #input>
          <dict-tag :options="isProject ? oa_project_business_type : oa_purchase_business_type" :value="form.businessCategory" />
        </template>
      </van-field>
      <van-field v-show-field="['objectCategory', includeFields]" label="物品类别" name="objectCategory" input-align="right">
        <template #input>
          <dict-select v-model="form.objectCategory" dict-type="oa_purchase_object_category" readonly />
        </template>
      </van-field>
      <!-- 项目为空时显示，可选值有：工程施工、劳务外包、技术支持、租赁、其他 -->
      <van-field v-if="!isProject" v-show-field="['serviceCategory', includeFields]" label="服务类别" name="serviceCategory" input-align="right">
        <template #input>
          <dict-select v-model="form.serviceCategory" dict-type="oa_purchase_service_category" readonly />
        </template>
      </van-field>
      <!-- 项目为空 并且 服务类别为租赁时显示，可选值有：房屋租赁、车辆租赁、其他 -->
      <van-field v-if="!isProject && form.serviceCategory === '3'" v-show-field="['leaseType', includeFields]" label="租赁类型" name="leaseType" input-align="right">
        <template #input>
          <dict-select v-model="form.leaseType" dict-type="oa_purchase_lease_type" readonly />
        </template>
      </van-field>
      <!-- 项目为空 并且 服务类别为租赁时显示，可选值：是、否 -->
      <van-field v-if="!isProject && form.serviceCategory === '3'" v-show-field="['isDeposit', includeFields]" label="是否有押金" name="isDeposit" input-align="right">
        <template #input>
          <dict-tag :options="sys_yes_no" :value="form.isDeposit" />
        </template>
      </van-field>
      <van-field v-show-field="['amount', includeFields]" label="金额" name="amount" input-align="right">
        <template #input>
          <div class="flex items-baseline">
            <span class="mr-3">{{ formatCurrency(form.amount) }}</span>
            <span v-if="isNumber(form.amount)" class="text-red">{{ toCnMoney(form.amount) }}</span>
          </div>
        </template>
      </van-field>
      <van-field v-show-field="['realAmount', includeFields]" label="实际金额" name="amount" input-align="right">
        <template #input>
          <div class="flex items-baseline">
            <span class="mr-3">{{ formatCurrency(form.realAmount) }} </span>
            <span v-if="isNumber(form.realAmount)" class="text-red">{{ toCnMoney(form.realAmount) }}</span>
          </div>
        </template>
      </van-field>
      <van-field v-show-field="['isOwnerSettlement', includeFields]" label="是否业主单独结算" name="isOwnerSettlement" input-align="right">
        <template #input>
          <dict-tag :options="sys_yes_no" :value="form.isOwnerSettlement" />
        </template>
      </van-field>
      <van-field v-show-field="['description', includeFields]" label="采购说明" name="description" input-align="right">
        <template #input>
          <TextareaView :value="form.description" />
        </template>
      </van-field>
      <van-field v-show-field="['file', includeFields]" label="申购内容附件" name="file" input-align="right">
        <template #input>
          <UploadFile v-model="form.file" readonly :card-size="60" />
        </template>
      </van-field>
      <van-field v-show-field="['remark', includeFields]" label="备注" name="remark" input-align="right">
        <template #input>
          <TextareaView :value="form.remark" />
        </template>
      </van-field>
    </van-cell-group>

    <div v-show-field="['itemList', includeFields]">
      <div class="px-6 py-2 text-sm text-gray-500 dark:text-gray-200">
        采购清单
      </div>

      <TableCard v-for="(item, index) in form.itemList" :key="item.id" :title="item.name" class="mx-4 mb-2" :default-collapse="true">
        <van-field
          v-model="item.psiId"
          :name="`itemList.${index}.psiId`"
          :rules="[
            {
              required: true,
              message: '预算类别不能为空',
              trigger: 'onBlur',
            },
          ]"
          label="预算类别"
          input-align="right"
        >
          <template #input>
            <PurchaseCategorySelect
              v-model="item.psiId"
              :params="PurchaseCategorySelectParams"
              readonly
            />
          </template>
        </van-field>
        <van-field
          v-model="item.name"
          :name="`itemList.${index}.name`"
          label="物品名称"
          input-align="right"
        />
        <van-field
          v-model="item.brand"
          :name="`itemList.${index}.brand`"
          label="品牌"
          input-align="right"
        />
        <van-field
          v-model="item.specsModel"
          :name="`itemList.${index}.specsModel`"
          label="规格型号"
          input-align="right"
        />
        <van-field
          v-model="item.unit"
          :name="`itemList.${index}.unit`"
          label="单位"
          input-align="right"
        />
        <van-field
          v-model="item.num"
          :name="`itemList.${index}.num`"
          label="数量"
          input-align="right"
        />
        <van-field
          v-model="item.amount"
          :name="`itemList.${index}.amount`"
          label="单价(元)"
          input-align="right"
        />
        <van-field
          v-model="item.realAmount"
          :name="`itemList.${index}.realAmount`"
          label="实际单价(元)"
          input-align="right"
        />
        <van-field
          v-model="item.totalAmount"
          :name="`itemList.${index}.totalAmount`"
          label="含税合计(元)"
          input-align="right"
        />
        <van-field
          v-model="item.realTotalAmount"
          :name="`itemList.${index}.realTotalAmount`"
          label="实际含税合计(元)"
          input-align="right"
        />
        <van-field
          v-model="item.inquiryWay"
          :name="`itemList.${index}.inquiryWay`"
          label="询价途径"
          input-align="right"
        />
        <van-field
          v-model="item.supplier"
          :name="`itemList.${index}.supplier`"
          label="指定供应商"
          input-align="right"
        />
        <van-field
          v-model="item.remark"
          :name="`itemList.${index}.remark`"
          label="备注"
          input-align="right"
        >
          <template #input>
            <TextareaView :value="item.remark" />
          </template>
        </van-field>
      </TableCard>
    </div>

    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['purchaseContractIds', includeFields]" label-width="6em" label="采购合同" class="!items-baseline" name="purchaseContractIds" input-align="right">
        <template #input>
          <ContractSelect v-model="form.purchaseContractIds" readonly multiple />
        </template>
      </van-field>

      <van-field v-show-field="['checkFiles', includeFields]" label="验收附件" name="checkFiles" input-align="right">
        <template #input>
          <UploadFile v-model="form.checkFiles" readonly :card-size="60" />
        </template>
      </van-field>
    </van-cell-group>

    <TableCard v-show-field="['ossIdList', includeFields]" :is-empty="isEmpty(form.ossIdList)" title="附件列表" class="mx-4">
      <UploadFile v-model="form.ossIdList" readonly :card-size="60" />
    </TableCard>
  </van-form>
</template>

<script setup lang="ts">
import { isEmpty, isNumber } from 'lodash-es'
import PurchaseCategorySelect from '../components/PurchaseCategorySelect.vue'
import ContractSelect from '../components/ContractSelect.vue'
import ProjectSubjectSelect from '../components/ProjectSubjectSelect.vue'
import { useForm } from './form'
import type { PurchaseForm } from '@/api/oa/business/purchase/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

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

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
// 采购 - 业务类型
const { oa_purchase_business_type } = toRefs(proxy!.useDict('oa_purchase_business_type'))
// 项目 - 业务类型
const { oa_project_business_type } = toRefs(proxy!.useDict('oa_project_business_type'))
// 系统是否
const { sys_yes_no } = toRefs(proxy!.useDict('sys_yes_no'))

// 表单
const { Form, form, isLoading, reset, view, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<PurchaseForm>()

// 是否是项目预算
const isProject = computed(() => form.value.subjectType === 'project')

// 预算类别查询条件
const PurchaseCategorySelectParams = computed(() => {
  const psId = form.value.psId
  const deptId = form.value.deptId ?? (form.value as any)?.initiator?.deptId ?? form.value?.createDept

  return {
    psId,
    deptId,
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
