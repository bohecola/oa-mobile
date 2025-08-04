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
    <PurchaseProcessSelect
      v-model="form.purchaseId"
      v-show-field="['purchaseId', includeFields]"
      label="采购申请"
      name="purchaseId"
      :params="{
        statusList: ['3'],
        queryType: 'dept',
      }"
      is-link-item
    />

    <DictSelect
      v-if="isBusinessForm"
      v-model="form.status"
      v-show-field="['status', includeFields]"
      dict-type="oa_purchase_change_status"
      label="状态"
      prop="status"
    />

    <div v-show="!isNil(form.purchaseId)">
      <!-- 采购详情 -->
      <PurchaseDetail
        ref="PurchaseDetailRef"
        v-show-field="['purchaseVo', includeFields]"
        :include-fields="purchaseDetailShowFields"
      />

      <van-field
        v-show-field="['amount', includeFields]"
        label="申请总金额"
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
        v-show-field="['newAmount', includeFields]"
        label="变更后总金额"
        name="newAmount"
      >
        <template #input>
          <div class="flex flex-col">
            <span>{{ formatCurrency(form.newAmount) }}</span>
            <span class="text-red-400">{{ toCnMoney(form.newAmount) }}</span>
          </div>
        </template>
      </van-field>

      <van-field
        v-show-field="['releaseAmount', includeFields]"
        label="释放总金额"
        name="releaseAmount"
      >
        <template #input>
          <div class="flex flex-col">
            <span>{{ formatCurrency(form.releaseAmount) }}</span>
            <span class="text-red-400">{{ toCnMoney(form.releaseAmount) }}</span>
          </div>
        </template>
      </van-field>

      <van-field v-if="includeFields.includes('changeItemList')" label="采购清单">
        <template #input>
          <CoolCardList accordion active-on-register>
            <CoolCard
              v-for="(item, index) in form.changeItemList"
              :key="index"
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
                :model-value="formatCurrency(item.budgetAmount)"
                :name="`itemList.${index}.budgetAmount`"
                label="预算金额"
              />

              <van-field
                :model-value="formatCurrency(item.applyingAmount)"
                :name="`itemList.${index}.applyingAmount`"
                label="申请中"
              />

              <van-field
                :model-value="formatCurrency(item.finishAmount)"
                :name="`itemList.${index}.finishAmount`"
                label="已申请"
              />

              <van-field
                :model-value="formatCurrency(item.availableAmount)"
                :name="`itemList.${index}.availableAmount`"
                label="剩余金额"
              />

              <van-field
                :model-value="item.name"
                :name="`itemList.${index}.name`"
                label="物品名称"
              />

              <van-field
                :model-value="formatCurrency(item.totalAmount)"
                :name="`itemList.${index}.totalAmount`"
                label="申请金额"
              />

              <van-field-number
                v-model="item.newTotalAmount"
                label="变更后金额"
                :name="`itemList.${index}.newTotalAmount`"
              />

              <van-field
                :model-value="formatCurrency(item.releaseTotalAmount)"
                :name="`itemList.${index}.releaseTotalAmount`"
                label="释放金额"
              />
            </CoolCard>
          </CoolCardList>
        </template>
      </van-field>
    </div>

    <van-field
      v-model="form.remark"
      v-show-field="['remark', includeFields]"
      label="申请事由"
      name="remark"
      type="textarea"
      placeholder="请输入"
      rows="1"
      autosize
    />

    <!-- 附件列表 -->
    <van-field
      v-show-field="['ossIdList', includeFields]"
      label="附件列表"
      name="ossIdList"
    >
      <template #input>
        <UploadFile v-model="form.ossIdList" value-type="array" readonly />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import PurchaseProcessSelect from '../components/PurchaseProcessSelect.vue'
import PurchaseCategorySelect from '../components/PurchaseCategorySelect.vue'
import PurchaseDetail from '../purchase/detail.vue'
import { allFields } from '../purchase/helper'
import { useForm } from './form'
import type { PurchaseForm } from '@/api/oa/business/purchase/types'
import type { PurchaseChangeForm } from '@/api/oa/business/purchaseChange/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { filterTruthyKeys } from '@/utils'
import { useWorkflowHelper } from '@/hooks'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<PurchaseChangeForm>
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as KeysOfArray<PurchaseChangeForm>
    },
    showLoading: true,
  },
)

const PurchaseDetailRef = ref<InstanceType<typeof PurchaseDetail>>()

const purchaseDetailShowFields = ref(
  filterTruthyKeys<PurchaseForm>({
    ...allFields,
    serviceCategory: false,
    leaseType: false,
    isDeposit: false,
    amount: false,
    notTaxAmount: false,
    realAmount: false,
    notTaxRealAmount: false,
    description: false,
    remark: false,
    itemList: false,
    ossIdList: false,
    hasPurchaseContract: false,
    purchaseContractIds: false,
    purchaseFiles: false,
    checkFiles: false,
    purchaseMethod: false,
  }),
)

const { Form, form, isLoading, updateLoading, reset, view, submit, workflowSubmit, workflowView } = useForm()

const { isBusinessForm } = useWorkflowHelper()

const vShowField = createFieldVisibilityDirective<PurchaseChangeForm>()

// 预算科目查询条件
const PurchaseCategorySelectParams = computed(() => {
  const { psId, createDept: applyDeptId } = form.value.purchaseVo

  return {
    psId,
    applyDeptId,
  }
})

// 查看
async function handleView(id: string) {
  await view(id)

  PurchaseDetailRef.value?.viewByObject(form.value.purchaseVo)
}

// 工作流中回显
function handleWorkflowView(...args: Parameters<typeof workflowView>) {
  workflowView(...args)

  PurchaseDetailRef.value?.viewByObject(form.value.purchaseVo)
}

defineExpose({
  updateLoading,
  reset,
  view: handleView,
  submit,
  workflowSubmit,
  workflowView: handleWorkflowView,
})
</script>
