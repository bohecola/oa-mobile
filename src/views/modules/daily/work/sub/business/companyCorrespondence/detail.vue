<template>
  <van-field v-show-field="['needDepts', includeFields]" name="needDepts" label="需求部门" input-align="right">
    <template #input>
      <DeptSelect v-model="form.needDepts" multiple readonly />
    </template>
  </van-field>

  <van-field v-show-field="['isYwlProject', includeFields]" label="是否运维类项目" name="isYwlProject" input-align="right" label-width="120">
    <template #input>
      <YesNoSwitch v-model="form.isYwlProject" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['isPersonnelTransfer', includeFields]" label-width="170" label="是否涉及人员任命、调整" name="isPersonnelTransfer" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.isPersonnelTransfer" readonly />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'

import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['isYwlProject', 'isPersonnelTransfer', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
