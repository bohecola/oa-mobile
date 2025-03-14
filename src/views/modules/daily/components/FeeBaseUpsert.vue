<template>
  <van-field v-show-field="['subjectType', includeFields]" label="预算类型" name="subjectType">
    <template #input>
      <DictSelect v-model="form.subjectType" dict-type="oa_project_subject_type" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['deptId', includeFields]" label="需求部门" name="deptId">
    <template #input>
      <DeptSelect v-model="form.deptId" readonly />
    </template>
  </van-field>

  <van-field
    v-show-field="['psId', includeFields]"
    label="预算"
    name="psId"
  >
    <template #input>
      <ProjectSubjectSelect v-model="form.psId" readonly />
    </template>
  </van-field>

  <van-field
    v-if="isProject && !isNil(form.psId)"
    v-model="form.contractNo" v-show-field="['contractNo', includeFields]"
    label="合同编号"
    name="contractNo"
  />

  <van-field v-show-field="['amount', includeFields]" label="申请总金额" name="amount">
    <template #input>
      <div class="flex items-baseline">
        <span class="mr-3">{{ formatCurrency(form.amount) }}</span>
        <span class="text-red-400">{{ toCnMoney(form.amount) }}</span>
      </div>
    </template>
  </van-field>

  <van-field
    v-show-field="['itemList', includeFields]"
    label="费用明细"
  >
    <template #input>
      <TableCard v-for="(item, index) in form.itemList" :key="item.id" :default-collapse="true">
        <template #header>
          <van-field
            v-model="item.subjectItemId"
            :name="`itemList.${index}.subjectItemId`"
            :border="false"
            label="预算科目"
            class="!items-baseline"
          >
            <template #input>
              <PurchaseCategorySelect
                v-model="item.subjectItemId"
                v-model:amount="item.budgetAmount"
                v-model:applying-amount="item.applyingAmount"
                v-model:finish-amount="item.finishAmount"
                v-model:available-amount="item.availableAmount"
                :params="PurchaseCategorySelectParams"
                readonly
              />
            </template>
          </van-field>
        </template>

        <van-field
          :name="`itemList.${index}.budgetAmount`"
          label="预算金额"
        >
          <template #input>
            {{ formatCurrency(form.itemList[index].budgetAmount) }}
          </template>
        </van-field>

        <van-field
          :name="`itemList.${index}.applyingAmount`"
          label="申请中"
        >
          <template #input>
            {{ formatCurrency(form.itemList[index].applyingAmount) }}
          </template>
        </van-field>

        <van-field
          :name="`itemList.${index}.finishAmount`"
          label="已申请"
        >
          <template #input>
            {{ formatCurrency(form.itemList[index].finishAmount) }}
          </template>
        </van-field>

        <van-field
          :name="`itemList.${index}.availableAmount`"
          label="剩余金额"
        >
          <template #input>
            {{ formatCurrency(form.itemList[index].availableAmount) }}
          </template>
        </van-field>

        <van-field-number
          v-model="item.amount"
          label="申请金额（元）"
          :name="`itemList.${index}.amount`"
          :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
          clearable
        />
      </TableCard>
    </template>
  </van-field>

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
import { isNil, isNumber } from 'lodash-es'
import Big from 'big.js'
import ProjectSubjectSelect from '../../business/components/ProjectSubjectSelect.vue'
import BaseUpsert from './BaseUpsert.vue'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { useStore } from '@/store'
import PurchaseCategorySelect from '@/views/modules/business/components/PurchaseCategorySelect.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => defaultFields,
  },
)

const { user } = useStore()

const Form = inject<Ref<FormInstance>>('Form')
const form = inject<Ref<DailyFeeForm>>('form')
const initiatorDeptId = inject<Ref<any>>('initiatorDeptId')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyFeeForm>>('trackFields')
trackFields(props.includeFields.filter(field => defaultFields.includes(field)))

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()

const PurchaseCategorySelectParams = computed(() => {
  const psId = form.value.psId
  const applyDeptId = (form.value as any)?.initiator?.deptId ?? form.value?.createDept ?? initiatorDeptId.value

  return {
    psId,
    applyDeptId,
  }
})

// 是否是项目预算
const isProject = computed(() => form.value.subjectType === 'project')

// 销售合同查询条件
const contractQuery = computed(() => {
  return { type: 'in', psId: form.value.psId }
})

function resetSubjectItemId() {
  form.value.itemList.forEach((e) => {
    e.subjectItemId = undefined
    e.subjectItemDeptId = undefined
    e.budgetAmount = undefined
    e.applyingAmount = undefined
    e.finishAmount = undefined
    e.availableAmount = undefined
  })
}

// 预算类型修改
function onSubjectTypeChange() {
  Form.value.resetValidation(['deptId', 'psId', 'contractId', 'contractNo'])
  resetSubjectItemId()
}

// 部门修改
function onDeptSelectChange() {
  Form.value.resetValidation(['psId', 'contractId', 'contractNo'])
  resetSubjectItemId()
}

// 预算修改
function onProjectSubjectChange() {
  Form.value.resetValidation(['contractId', 'contractNo'])
  resetSubjectItemId()
}

// 金额计算
watch(
  () => form.value.itemList,
  (val) => {
    const amount = val
      ?.reduce<Big.Big>((acc, curr) => {
        if (isNumber(curr.amount)) {
          return acc.add(curr.amount)
        }

        return acc.add(0)
      }, Big(0))
      .toNumber()

    form.value.amount = amount
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<script lang="ts">
const defaultFields = [
  'subjectType',
  'deptId',
  'psId',
  'contractNo',
  'itemList',
  'amount',
  'reason',
  'receiptInfo',
  'ossIdList',
] as KeysOfArray<DailyFeeForm>
</script>
