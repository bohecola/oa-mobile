<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="auto">
    <van-field v-show-field="['subjectType', includeFields]" label="预算类型" name="subjectType" input-align="right">
      <template #input>
        <DictSelect v-model="form.subjectType" dict-type="oa_project_subject_type" readonly />
      </template>
    </van-field>
    <van-field v-show-field="['deptId', includeFields]" label="需求部门" name="deptId" input-align="right">
      <template #input>
        <DeptSelect v-model="form.deptId" readonly />
      </template>
    </van-field>
    <van-field
      v-show-field="['psId', includeFields]"
      label="预算"
      name="psId"
      input-align="right"
    >
      <template #input>
        <ProjectSubjectSelect v-model="form.psId" readonly />
      </template>
    </van-field>
    <van-field v-if="isProject && !isNil(form.psId)" v-show-field="['contractNo', includeFields]" label="合同编号" name="contractNo" input-align="right">
      <template #input>
        {{ form.contractNo }}
        <!-- <ContractSelect v-model="form.contractId" preview-field="no" readonly /> -->
      </template>
    </van-field>
    <van-field v-if="isProject && !isNil(form.contractNo)" v-show-field="['contractExecute', includeFields]" label="合同执行情况" name="contractExecute" input-align="right">
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
    <van-field v-show-field="['serviceCategory', includeFields]" label="服务类别" name="serviceCategory" input-align="right">
      <template #input>
        <dict-select v-model="form.serviceCategory" dict-type="oa_purchase_service_category" readonly />
      </template>
    </van-field>
    <!-- 服务类别为租赁时显示 -->
    <van-field v-if="form.serviceCategory === '3'" v-show-field="['leaseType', includeFields]" label="租赁类型" name="leaseType" input-align="right">
      <template #input>
        <dict-select v-model="form.leaseType" dict-type="oa_purchase_lease_type" readonly />
      </template>
    </van-field>
    <!-- 服务类别为租赁时显示 -->
    <van-field v-if="form.serviceCategory === '3'" v-show-field="['isDeposit', includeFields]" label="是否有押金" name="isDeposit" input-align="right">
      <template #input>
        <dict-tag :options="sys_yes_no" :value="form.isDeposit" />
      </template>
    </van-field>
    <van-field v-show-field="['amount', includeFields]" label="含税总金额" name="amount" input-align="right">
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.amount) }}</span>
          <span v-if="!isNil(form.amount)" class="text-red-400">{{ toCnMoney(form.amount) }}</span>
        </div>
      </template>
    </van-field>
    <van-field v-if="isProject && !isNil(form.psId) && form.businessCategory !== '0'" v-show-field="['notTaxAmount', includeFields]" label="不含税总金额" name="notTaxAmount" input-align="right">
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.notTaxAmount) }}</span>
          <span v-if="!isNil(form.notTaxAmount)" class="text-red-400">{{ toCnMoney(form.notTaxAmount) }}</span>
        </div>
      </template>
    </van-field>
    <van-field v-show-field="['realAmount', includeFields]" label="实际金额" name="amount" input-align="right">
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.realAmount) }} </span>
          <span v-if="!isNil(form.realAmount)" class="text-red-400">{{ toCnMoney(form.realAmount) }}</span>
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
    <van-field v-show-field="['remark', includeFields]" label="备注" name="remark" input-align="right">
      <template #input>
        <TextareaView :value="form.remark" />
      </template>
    </van-field>

    <Teleport to="#AFC" defer>
      <div v-show-field="['itemList', includeFields]">
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
            input-align="right"
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
            input-align="right"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].budgetAmount) }}
            </template>
          </van-field>
          <van-field
            :name="`itemList.${index}.applyingAmount`"
            label="申请中"
            input-align="right"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].applyingAmount) }}
            </template>
          </van-field>
          <van-field
            :name="`itemList.${index}.finishAmount`"
            label="已申请"
            input-align="right"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].finishAmount) }}
            </template>
          </van-field>
          <van-field
            :name="`itemList.${index}.availableAmount`"
            label="剩余金额"
            input-align="right"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].availableAmount) }}
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
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].amount) }}
            </template>
          </van-field>
          <van-field
            :name="`itemList.${index}.realAmount`"
            label="实际单价(元)"
            input-align="right"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].realAmount) }}
            </template>
          </van-field>
          <van-field
            v-model="item.totalAmount"
            :name="`itemList.${index}.totalAmount`"
            label="含税合计(元)"
            input-align="right"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].totalAmount) }}
            </template>
          </van-field>
          <van-field
            v-model="item.realTotalAmount"
            :name="`itemList.${index}.realTotalAmount`"
            label="实际含税合计(元)"
            input-align="right"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].realTotalAmount) }}
            </template>
          </van-field>
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
    </Teleport>

    <!-- <van-field v-show-field="['hasPurchaseContract', includeFields]" label="是否存在采购合同" name="hasPurchaseContract" input-align="right">
        <template #input>
          <DictSelect v-model="form.hasPurchaseContract" dict-type="sys_yes_no" readonly />
        </template>
      </van-field> -->

    <!-- <van-field v-if="form.hasPurchaseContract === 'Y'" v-show-field="['purchaseContractIds', includeFields]" label="采购合同" class="!items-baseline" name="purchaseContractIds" input-align="right">
        <template #input>
          <ContractSelect v-model="form.purchaseContractIds" multiple readonly />
        </template>
      </van-field> -->

    <!-- <van-field v-else v-show-field="['purchaseFiles', includeFields]" label="采购附件" name="purchaseFiles" input-align="right">
        <template #input>
          <UploadFile v-model="form.purchaseFiles" readonly :card-size="60" />
        </template>
      </van-field> -->

    <van-field v-show-field="['checkFiles', includeFields]" label="验收附件" name="checkFiles" input-align="right">
      <template #input>
        <div class="flex flex-col">
          <UploadFile v-model="form.checkFiles" readonly :card-size="60" />
          <div class="text-red-400">
            验收附件上传说明：
            1.通过采购部采购的需要上传收货确认单
            2.自行线上采购需要上传网络订单截图
            3.全部采购物资的照片
            [注：照片必需带时间、地点(水印相机拍照) ]
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
