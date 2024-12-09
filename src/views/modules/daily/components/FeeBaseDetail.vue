<template>
  <van-field v-show-field="['deptId', includeFields]" label="预算部门" name="deptId" input-align="right">
    <template #input>
      <DeptSelect v-model="form.deptId" readonly />
    </template>
  </van-field>

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

  <van-field v-show-field="['subjectItemId', includeFields]" label="预算类别" name="subjectItemId" input-align="right">
    <template #input>
      <PurchaseCategorySelect
        v-model="form.subjectItemId"
        :params="PurchaseCategorySelectParams"
        multiple
        readonly
      />
    </template>
  </van-field>

  <van-field v-show-field="['availableAmount', includeFields]" label="剩余金额" name="availableAmount" input-align="right">
    <template #input>
      <div class="flex items-baseline">
        <span class="mr-3 text-red">{{ form.availableAmount?.toFixed(2) }}</span>
      </div>
    </template>
  </van-field>

  <van-field v-show-field="['amount', includeFields]" label="金额" name="amount" input-align="right">
    <template #input>
      <div class="flex items-baseline">
        <span class="mr-3">{{ form.amount?.toFixed(2) }}</span>
        <span v-if="isNumber(form.amount)" class="text-red">{{ nzh.cn.toMoney(Number(form.amount), { outSymbol: false }) }}</span>
      </div>
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import nzh from 'nzh'
import { isNumber } from 'lodash-es'
import ProjectSubjectSelect from '../../business/components/ProjectSubjectSelect.vue'
import BaseDetail from './BaseDetail.vue'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import PurchaseCategorySelect from '@/views/modules/business/components/PurchaseCategorySelect.vue'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'psId', 'deptId', 'subjectItemId', 'availableAmount', 'amount', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyFeeForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()

// 预算类别查询条件
const PurchaseCategorySelectParams = computed(() => {
  const psId = form.value.psId
  const deptId = form.value.deptId

  return {
    psId,
    deptId,
  }
})
</script>
