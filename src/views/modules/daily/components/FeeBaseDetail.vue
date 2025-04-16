<template>
  <DictSelect
    v-model="form.subjectType"
    v-show-field="['subjectType', includeFields]"
    label="预算类型"
    name="subjectType"
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
      <div class="w-full flex flex-col gap-2">
        <TableCard
          v-for="(item, index) in form.itemList"
          :key="item.id"
          :ref="(el) => (TableCardRefs[index] = (el as TableCardType))"
          :default-collapse="index !== 0"
          :title="formatCurrency(item.amount)"
          @click="TableCardRefs.filter(e => e !== TableCardRefs[index]).forEach(e => e.collapse())"
        >
          <PurchaseCategorySelect
            v-model="item.subjectItemId"
            v-model:amount="item.budgetAmount"
            v-model:applying-amount="item.applyingAmount"
            v-model:finish-amount="item.finishAmount"
            v-model:available-amount="item.availableAmount"
            label="预算科目"
            :name="`itemList.${index}.subjectItemId`"
            :params="PurchaseCategorySelectParams"
          />

          <van-field
            :model-value="formatCurrency(form.itemList[index].budgetAmount)"
            :name="`itemList.${index}.budgetAmount`"
            label="预算金额"
          />

          <van-field
            :model-value="formatCurrency(form.itemList[index].applyingAmount)"
            :name="`itemList.${index}.applyingAmount`"
            label="申请中"
          />

          <van-field
            :model-value="formatCurrency(form.itemList[index].finishAmount)"
            :name="`itemList.${index}.finishAmount`"
            label="已申请"
          />

          <van-field
            :model-value="formatCurrency(form.itemList[index].availableAmount)"
            :name="`itemList.${index}.availableAmount`"
            label="剩余金额"
          />

          <van-field-number
            :model-value="item.amount"
            :name="`itemList.${index}.amount`"
            label="申请金额（元）"
          />
        </TableCard>
      </div>
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import ProjectSubjectSelect from '../../business/components/ProjectSubjectSelect.vue'
import BaseDetail from './BaseDetail.vue'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { useStore } from '@/store'
import PurchaseCategorySelect from '@/views/modules/business/components/PurchaseCategorySelect.vue'
import TableCard from '@/components/TableCard/index.vue'

type TableCardType = InstanceType<typeof TableCard>

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'psId', 'deptId', 'contractNo', 'itemList', 'amount', 'reason', 'receiptInfo', 'ossIdList'],
  },
)

const { user } = useStore()

const form = inject<Ref<DailyFeeForm>>('form')

const TableCardRefs = ref<TableCardType[]>([])

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>(form)

// 预算科目查询条件
const PurchaseCategorySelectParams = computed(() => {
  const psId = form.value.psId
  const applyDeptId = (form.value as any)?.initiator?.deptId ?? user.info.deptId

  return {
    psId,
    applyDeptId,
  }
})

// 是否是项目预算
const isProject = computed(() => form.value.subjectType === 'project')
</script>
