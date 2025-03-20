<template>
  <DeptSelect
    v-model="form.needDepts"
    v-show-field="['needDepts', includeFields]"
    name="needDepts"
    label="需求部门"
  />

  <van-field
    v-show-field="['recipient', includeFields]"
    name="recipient"
    label="接收人"
  >
    <template #input>
      <UserSelect v-model="form.recipient" readonly />
    </template>
  </van-field>

  <van-field
    v-show-field="['isExistRegulations', includeFields]"
    label="是否存在违章"
    name="isExistRegulations"
  >
    <template #input>
      <YesNoSwitch v-model="form.isExistRegulations" readonly />
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
    includeFields: () => ['needDepts', 'recipient', 'isExistRegulations', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
