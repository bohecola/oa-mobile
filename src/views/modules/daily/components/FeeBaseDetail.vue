<template>
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

  <van-field
    v-if="isProject && !isNil(form.psId)" v-show-field="['contractNo', includeFields]"
    label="合同编号"
    name="contractNo"
    input-align="right"
  >
    <template #input>
      {{ form.contractNo }}
    </template>
  </van-field>

  <van-field v-show-field="['amount', includeFields]" label="申请总金额" name="amount" input-align="right">
    <template #input>
      <div class="flex items-baseline">
        <span class="mr-3">{{ formatCurrency(form.amount) }}</span>
        <span v-if="!isNil(form.amount)" class="text-red-400">{{ toCnMoney(form.amount) }}</span>
      </div>
    </template>
  </van-field>

  <Teleport to="#AFC" defer>
    <div v-show-field="['itemList', includeFields]">
      <div class="px-4 py-2 text-sm text-[--van-cell-group-title-color]">
        费用明细
      </div>

      <TableCard v-for="(item, index) in form.itemList" :key="item.id" class="mx-4 mb-2" :default-collapse="true">
        <template #header>
          <van-field
            v-model="item.subjectItemId"
            :name="`itemList.${index}.subjectItemId`"
            :rules="[
              {
                required: true,
                message: '预算科目不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="预算科目"
            input-align="right"
            class="!items-baseline"
            :border="false"
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
          :name="`itemList.${index}.amount`"
          label="申请金额（元）"
          input-align="right"
        >
          <template #input>
            {{ formatCurrency(form.itemList[index].amount) }}
          </template>
        </van-field>
      </TableCard>
    </div>
  </Teleport>

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
// import ContractSelect from '@/views/modules/business/components/ContractSelect/index.vue'

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

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()

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
