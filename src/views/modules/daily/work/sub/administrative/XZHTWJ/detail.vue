<template>
  <van-field
    v-show-field="['isPersonnelTransfer', includeFields]"
    label="是否涉及人员任命、调整"
    name="isPersonnelTransfer"
    label-width="170"
  >
    <template #input>
      <YesNoSwitch v-model="form.isPersonnelTransfer" readonly />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['isPersonnelTransfer', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
