<template>
  <van-field
    v-show-field="['needDepts', includeFields]"
    name="needDepts"
    label="需求部门"
    :rules="computedRules.needDepts"
  >
    <template #input>
      <DeptSelect v-model="form.needDepts" multiple />
    </template>
  </van-field>

  <van-field
    v-show-field="['recipient', includeFields]"
    name="recipient"
    label="接收人"
    :rules="computedRules.recipient"
  >
    <template #input>
      <UserSelect v-model="form.recipient" />
    </template>
  </van-field>

  <van-field
    v-show-field="['isExistRegulations', includeFields]"
    label="是否存在违章"
    name="isExistRegulations"
    :rules="computedRules.isExistRegulations"
  >
    <template #input>
      <YesNoSwitch v-model="form.isExistRegulations" />
    </template>
  </van-field>

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'

import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['needDepts', 'recipient', 'isExistRegulations', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('needDepts', false)
</script>
