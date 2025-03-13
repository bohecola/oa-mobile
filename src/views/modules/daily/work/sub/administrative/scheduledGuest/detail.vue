<template>
  <van-field
    v-show-field="['nn_isReservationKey', includeFields]"
    label="预约会议室钥匙"
    name="nn_isReservationKey"
  >
    <template #input>
      <YesNoSwitch v-model="form.nn_isReservationKey" readonly />
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
    includeFields: () => ['nn_isReservationKey', 'reason', 'ossIdList'],
  },
)
const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
