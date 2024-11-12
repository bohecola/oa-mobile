<template>
  <van-field v-show-field="['subjectType', includeFields]" label="预算类型" prop="subjectType" input-align="right">
    <template #input>
      <DictSelect v-model="form.subjectType" dict-type="oa_project_subject_type" readonly />
    </template>
  </van-field>

  <van-field v-if="form.subjectType === 'project'" v-show-field="['projectId', includeFields]" label="项目" name="projectId" input-align="right">
    <template #input>
      <dict-tag :options="projectOptions" :value="form.projectId" />
    </template>
  </van-field>

  <van-field v-show-field="['subjectItemId', includeFields]" label="预算类别" name="subjectItemId" input-align="right">
    <template #input>
      <PurchaseCategorySelect
        v-model="form.subjectItemId"
        :params="PurchaseCategorySelectParams"
        readonly
      />
    </template>
  </van-field>

  <van-field v-show-field="['amount', includeFields]" label="金额" name="amount" input-align="right">
    <template #input>
      <span class="mr-3">{{ form.amount?.toFixed(2) }}</span>
      <span class="text-red">{{ nzh.cn.toMoney(Number(form.amount), { outSymbol: false }) }}</span>
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import nzh from 'nzh'
import BaseDetail from './BaseDetail.vue'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { useProjectOptions } from '@/hooks'
import PurchaseCategorySelect from '@/views/modules/business/components/PurchaseCategorySelect.vue'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'projectId', 'deptId', 'subjectItemId', 'amount', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyFeeForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()

// 项目列表
const { projectOptions } = useProjectOptions()

// 预算类别查询条件
const PurchaseCategorySelectParams = computed(() => {
  const type = form.value.subjectType
  const projectId = form.value.projectId
  const deptId = form.value.deptId ?? (form.value as any)?.initiator?.deptId ?? form.value?.createDept

  if (type === 'dept') {
    return {
      type,
      deptId,
    }
  }

  return {
    type,
    projectId,
    deptId,
  }
})
</script>
