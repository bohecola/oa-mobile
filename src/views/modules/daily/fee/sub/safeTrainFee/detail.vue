<template>
  <!-- 选择安全类培训费用显示证件类型 -->
  <van-field v-show-field="['certificateType', includeFields]" label="证件类型：" name="certificateType" input-align="right">
    <template #input>
      <DictSelect v-model="form.certificateType" dict-type="oa_security_train_certificate_type" multiple readonly />
    </template>
  </van-field>

  <FeeBaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import FeeBaseDetail from '../../../components/FeeBaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => ['subjectType', 'projectId', 'deptId', 'subjectItemId', 'amount', 'certificateType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyFeeForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()
</script>
