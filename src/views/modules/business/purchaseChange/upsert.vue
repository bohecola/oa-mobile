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
    <PurchaseProcessSelect
      v-model="form.purchaseId"
      v-show-field="['purchaseId', includeFields]"
      label="采购申请"
      name="purchaseId"
      :params="{
        statusList: ['3'],
        queryType: 'dept',
        isPurchaseChange: 'Y',
      }"
      :rules="computedRules.purchaseId"
      is-link-item
      clearable
      @change="onPurchaseChange"
    />

    <DictSelect
      v-if="isBusinessForm"
      v-model="form.status"
      v-show-field="['status', includeFields]"
      dict-type="oa_purchase_change_status"
      label="状态"
      prop="status"
      clearable
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
        :model-value="formatCurrency(form.amount)"
        label="申请总金额"
        name="amount"
        readonly
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
        readonly
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
        readonly
      >
        <template #input>
          <div class="flex flex-col">
            <span>{{ formatCurrency(form.releaseAmount) }}</span>
            <span class="text-red-400">{{ toCnMoney(form.releaseAmount) }}</span>
          </div>
        </template>
      </van-field>

      <van-field v-if="includeFields.includes('changeItemList')" label="采购清单" required>
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
                readonly
              />

              <van-field
                :model-value="formatCurrency(item.budgetAmount)"
                :name="`itemList.${index}.budgetAmount`"
                label="预算金额"
                readonly
              />

              <van-field
                :model-value="formatCurrency(item.applyingAmount)"
                :name="`itemList.${index}.applyingAmount`"
                label="申请中"
                readonly
              />

              <van-field
                :model-value="formatCurrency(item.finishAmount)"
                :name="`itemList.${index}.finishAmount`"
                label="已申请"
                readonly
              />

              <van-field
                :model-value="formatCurrency(item.availableAmount)"
                :name="`itemList.${index}.availableAmount`"
                label="剩余金额"
                readonly
              />

              <van-field
                :model-value="item.name"
                :name="`itemList.${index}.name`"
                label="物品名称"
                readonly
              />

              <van-field
                :model-value="formatCurrency(item.totalAmount)"
                :name="`itemList.${index}.totalAmount`"
                label="申请金额"
                readonly
              />

              <van-field-number
                v-model="item.newTotalAmount"
                label="变更后金额"
                :name="`itemList.${index}.newTotalAmount`"
                :rules="[{
                  required: true,
                  message: '变更后金额不能为空',
                  trigger: 'onBlur',
                }]"
                :max="Number(item.totalAmount)"
                @change="(value: number) => onReleaseTotalAmountCalc(item, value)"
              />

              <van-field
                :model-value="formatCurrency(item.releaseTotalAmount)"
                label="释放金额"
                :name="`itemList.${index}.releaseTotalAmount`"
                placeholder="自动计算"
                allow-negative
                disabled
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
      :rules="computedRules.remark"
      autosize
    />

    <!-- 附件列表 -->
    <van-field
      v-show-field="['ossIdList', includeFields]"
      label="附件列表"
      name="ossIdList"
      :rules="computedRules.ossIdList"
    >
      <template #input>
        <UploadFile v-model="form.ossIdList" value-type="array" :exclude="excludeOssIdList" />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import Big from 'big.js'
import PurchaseProcessSelect from '../components/PurchaseProcessSelect.vue'
import PurchaseCategorySelect from '../components/PurchaseCategorySelect.vue'
import PurchaseDetail from '../purchase/detail.vue'
import { allFields } from '../purchase/helper'
import { useForm } from './form'
import type { PurchaseForm } from '@/api/oa/business/purchase/types'
import type { PurchaseChangeItemVO } from '@/api/oa/business/purchaseChangeItem/types'
import type { PurchaseChangeForm } from '@/api/oa/business/purchaseChange/types'
import { queryByPurchaseId } from '@/api/oa/business/purchaseChange'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { filterTruthyKeys, isNumeric } from '@/utils'
import { useWorkflowHelper } from '@/hooks'

const props = withDefaults(
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

const { Form, form, rules, isLoading, updateLoading, excludeOssIdList, reset, view, submit, workflowSubmit, workflowView } = useForm()

const { isBusinessForm } = useWorkflowHelper()

const vShowField = createFieldVisibilityDirective<PurchaseChangeForm>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<PurchaseForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }

  return newRules
})

// 预算科目查询条件
const PurchaseCategorySelectParams = computed(() => {
  const { psId, createDept: applyDeptId } = form.value.purchaseVo

  return {
    psId,
    applyDeptId,
  }
})

// 采购申请修改
async function onPurchaseChange(value: string) {
  if (isNil(value)) {
    return
  }

  isLoading.value = true

  const { data } = await queryByPurchaseId(value)
  form.value = data
  PurchaseDetailRef.value?.viewByObject(data.purchaseVo)

  if (isBusinessForm.value) {
    form.value.status = '4'
  }

  isLoading.value = false
}

// 释放金额计算
function onReleaseTotalAmountCalc(row: PurchaseChangeItemVO, newTotalAmount: number) {
  if (!isNumeric(newTotalAmount)) {
    row.releaseTotalAmount = undefined
    calcNewAmountAndReleaseAmount()
    return
  }

  row.releaseTotalAmount = Big(row.totalAmount).minus(newTotalAmount).toNumber()
  calcNewAmountAndReleaseAmount()
}

// 变更后总金额和释放总金额计算
function calcNewAmountAndReleaseAmount() {
  form.value.newAmount = form.value.changeItemList
    .reduce<Big>((prev, item) => {
      if (isNumeric(item.newTotalAmount)) {
        return prev.plus(item.newTotalAmount)
      }

      return prev
    }, Big(0))
    .toNumber()

  form.value.releaseAmount = form.value.changeItemList
    .reduce<Big>((prev, item) => {
      if (isNumeric(item.releaseTotalAmount)) {
        return prev.plus(item.releaseTotalAmount)
      }

      return prev
    }, Big(0))
    .toNumber()
}

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
