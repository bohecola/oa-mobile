<template>
  <van-field v-show-field="['needDepts', includeFields]" name="needDepts" label="需求部门" input-align="right">
    <template #input>
      <DeptSelect v-model="form.needDepts" multiple readonly />
    </template>
  </van-field>

  <van-field v-show-field="['recipient', includeFields]" name="recipient" label="接收人" input-align="right">
    <template #input>
      <UserSelect v-model="form.recipient" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['isExistRegulations', includeFields]" label="是否存在违章" name="isExistRegulations" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.isExistRegulations" readonly />
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
    includeFields: () => ['needDepts', 'recipient', 'isExistRegulations', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
