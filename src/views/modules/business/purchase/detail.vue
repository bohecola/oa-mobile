<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="9em">
    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['projectId', includeFields]" label="项目：" name="projectId" input-align="right">
        <template #input>
          <dict-tag :options="projectOptions" :value="form.projectId" />
        </template>
      </van-field>
      <van-field v-show-field="['contractId', includeFields]" label="收入合同：" name="contractId" input-align="right">
        <template #input>
          <dict-tag :options="contractOptions" :value="form.contractId" />
        </template>
      </van-field>
      <van-field v-show-field="['contractExecute', includeFields]" label="合同执行情况：" name="contractExecute" input-align="right">
        <template #input>
          <dict-tag :options="oa_contract_execute_situation" :value="form.contractExecute" />
        </template>
      </van-field>
      <van-field v-show-field="['type', includeFields]" label="采购类型：" name="type" input-align="right">
        <template #input>
          <dict-tag :options="oa_purchase_type" :value="form.type" />
        </template>
      </van-field>
      <van-field v-show-field="['businessCategory', includeFields]" label="业务类别：" name="businessCategory" input-align="right">
        <!-- 如果选择了项目，则默认项目的业务类型，如果没有项目则可选：管理、销售、研发 -->
        <template #input>
          <dict-tag :options="form.projectId ? oa_project_business_type : oa_purchase_business_type" :value="form.businessCategory" />
        </template>
      </van-field>
      <van-field v-show-field="['objectCategory', includeFields]" label="物品类别：" name="objectCategory" input-align="right">
        <template #input>
          <dict-tag :options="oa_purchase_object_category" :value="form.objectCategory" />
        </template>
      </van-field>
      <!-- 项目为空时显示，可选值有：工程施工、劳务外包、技术支持、租赁、其他 -->
      <van-field v-if="!form.projectId" v-show-field="['serviceCategory', includeFields]" label="服务类别：" name="serviceCategory" input-align="right">
        <template #input>
          <dict-tag :options="oa_purchase_service_category" :value="form.serviceCategory" />
        </template>
      </van-field>
      <!-- 项目为空 并且 服务类别为租赁时显示，可选值有：房屋租赁、车辆租赁、其他 -->
      <van-field v-if="!form.projectId && form.serviceCategory === '3'" v-show-field="['leaseType', includeFields]" label="租赁类型：" name="leaseType" input-align="right">
        <template #input>
          <dict-tag :options="oa_purchase_lease_type" :value="form.leaseType" />
        </template>
      </van-field>
      <!-- 项目为空 并且 服务类别为租赁时显示，可选值：是、否 -->
      <van-field v-if="!form.projectId && form.serviceCategory === '3'" v-show-field="['isDeposit', includeFields]" label="是否有押金：" name="isDeposit" input-align="right">
        <template #input>
          <dict-tag :options="sys_yes_no" :value="form.isDeposit" />
        </template>
      </van-field>
      <van-field v-show-field="['amount', includeFields]" label="金额：" name="amount" input-align="right">
        <template #input>
          <span class="mr-3">{{ form.amount?.toFixed(2) }}</span>
          <span class="text-red">{{ nzh.cn.toMoney(Number(form.amount), { outSymbol: false }) }}</span>
        </template>
      </van-field>
      <van-field v-show-field="['isOwnerSettlement', includeFields]" label="是否业务单独结算：" name="isOwnerSettlement" input-align="right">
        <template #input>
          <dict-tag :options="sys_yes_no" :value="form.isOwnerSettlement" />
        </template>
      </van-field>
      <van-field v-show-field="['description', includeFields]" label="采购说明：" name="description" input-align="right">
        <template #input>
          <TextareaView :value="form.description" />
        </template>
      </van-field>
      <van-field v-show-field="['file', includeFields]" label="申购内容附件：" name="file" input-align="right">
        <template #input>
          <UploadFile v-model="form.file" readonly :card-size="60" />
        </template>
      </van-field>
      <van-field v-show-field="['remark', includeFields]" label="备注：" name="remark" input-align="right">
        <template #input>
          <TextareaView :value="form.remark" />
        </template>
      </van-field>
    </van-cell-group>

    <div class="px-6 py-2 text-sm text-gray-500">
      采购清单
    </div>

    <TableCard v-for="(item, index) in form.itemList" :key="item.id" v-show-field="['itemList', includeFields]" :title="item.name" class="mx-4 mb-2" :default-collapse="true">
      <!-- <template #header>
        <div class="flex">
          <PurchaseCategorySelect
            v-model="item.psiId"
            :project-id="form.projectId!"
            :dept-id="(form as any)?.initiator?.deptId ?? form?.createDept"
            readonly
          />
          <span>（采购清单）</span>
        </div>
      </template> -->
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
            :project-id="form.projectId!"
            :dept-id="(form as any)?.initiator?.deptId ?? form?.createDept"
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
        v-model="item.totalAmount"
        :name="`itemList.${index}.totalAmount`"
        label="含税合计(元)"
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

    <TableCard v-show-field="['ossIdList', includeFields]" title="附件列表" class="mx-4">
      <UploadFile v-if="form.ossIdList" v-model="form.ossIdList" readonly :card-size="60" />
      <van-empty v-else image-size="80" description="数据为空" />
    </TableCard>
  </van-form>
</template>

<script setup lang="ts">
import nzh from 'nzh'
import PurchaseCategorySelect from '../components/PurchaseCategorySelect.vue'
import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { PurchaseForm } from '@/api/oa/business/purchase/types'
import { useContractOptions, useProjectOptions } from '@/hooks'

const props = withDefaults(
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
// 采购类型
const { oa_purchase_type } = toRefs(proxy!.useDict('oa_purchase_type'))
// 采购 - 业务类型
const { oa_purchase_business_type } = toRefs(proxy!.useDict('oa_purchase_business_type'))
// 项目 - 业务类型
const { oa_project_business_type } = toRefs(proxy!.useDict('oa_project_business_type'))
// 采购物品类别
const { oa_purchase_object_category } = toRefs(proxy!.useDict('oa_purchase_object_category'))
// 采购服务类别
const { oa_purchase_service_category } = toRefs(proxy!.useDict('oa_purchase_service_category'))
// 采购租赁类型
const { oa_purchase_lease_type } = toRefs(proxy!.useDict('oa_purchase_lease_type'))
// 合同执行情况
const { oa_contract_execute_situation } = toRefs(proxy!.useDict('oa_contract_execute_situation'))
// 系统是否
const { sys_yes_no } = toRefs(proxy!.useDict('sys_yes_no'))

// 表单
const { Form, form, isLoading, purchaseItem, reset, view, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<PurchaseForm>()

// 项目列表
const { projectOptions } = useProjectOptions()

// 合同列表
const contractOptions = ref<DictDataOption[]>([])
watch(
  () => form.value.contractId,
  async (val) => {
    if (val) {
      const res = await useContractOptions({
        ids: [val],
      })
      contractOptions.value = res.contractOptions.value
    }
  },
)

defineExpose({
  isLoading,
  form,
  reset,
  view,
  workflowView,
})
</script>
