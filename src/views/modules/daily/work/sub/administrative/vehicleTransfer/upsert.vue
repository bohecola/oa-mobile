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
    v-model="form.recipient"
    v-show-field="['recipient', includeFields]"
    name="recipient"
    label="接收人"
    :rules="computedRules.recipient"
    is-link
    @click="UserSelectRef?.open"
  >
    <template #input>
      <UserSelect ref="UserSelectRef" v-model="form.recipient" />
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
import UserSelect from '@/components/UserSelect/index.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

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

const UserSelectRef = ref<InstanceType<typeof UserSelect> | null>()
</script>
