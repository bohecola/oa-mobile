<template>
  <van-field v-show-field="['subjectType', includeFields]" label="预算类型：" prop="subjectType" input-align="right">
    <template #input>
      <DictSelect v-model="form.subjectType" dict-type="oa_project_subject_type" readonly />
    </template>
  </van-field>

  <van-field v-if="form.subjectType === 'project'" v-show-field="['projectId', includeFields]" label="项目：" name="projectId" input-align="right">
    <template #input>
      <dict-tag :options="projectOptions" :value="form.projectId" />
    </template>
  </van-field>

  <!-- 选择项目日常费用中的培训费用显示证件类型 -->
  <van-field v-if="form.no === 'PXFY'" v-show-field="['certificateType', includeFields]" label="证件类型：" name="certificateType" input-align="right">
    <template #input>
      <DictSelect v-model="form.certificateType" dict-type="oa_project_daily_fee_certificate_type" multiple readonly />
    </template>
  </van-field>

  <!-- 选择安全类培训费用显示证件类型 -->
  <van-field v-if="form.componentNo === 'AQLPXFY'" v-show-field="['certificateType', includeFields]" label="证件类型：" name="certificateType" input-align="right">
    <template #input>
      <DictSelect v-model="form.certificateType" dict-type="oa_security_train_certificate_type" multiple readonly />
    </template>
  </van-field>

  <van-field v-show-field="['subjectItemId', includeFields]" label="预算类别：" name="subjectItemId" input-align="right">
    <template #input>
      <PurchaseCategorySelect
        v-model="form.subjectItemId"
        :params="PurchaseCategorySelectParams"
        readonly
      />
    </template>
  </van-field>

  <van-field v-model="form.amount" v-show-field="['amount', includeFields]" label="金额：" name="amount" input-align="right" />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
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
    includeFields: () => ['subjectType', 'projectId', 'deptId', 'subjectItemId', 'certificateType', 'amount', 'reason', 'ossIdList'],
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
