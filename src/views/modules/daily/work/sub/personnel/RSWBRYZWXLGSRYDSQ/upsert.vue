<template>
  <van-field
    v-show-field="['aa_deptId', includeFields]"
    name="aa_deptId"
    label="项目部"
    :rules="computedRules.aa_deptId"
  >
    <template #input>
      <DeptSelect v-model="form.aa_deptId" />
    </template>
  </van-field>

  <van-field
    v-model="form.aa_userId"
    v-show-field="['aa_userId', includeFields]"
    name="aa_userId"
    label="申请人员名单"
    :rules="computedRules.aa_userId"
    is-link
    @click="UserSelectRef?.open"
  >
    <template #input>
      <UserSelect ref="UserSelectRef" v-model="form.aa_userId" :multiple="true" />
    </template>
  </van-field>

  <DatePicker
    v-model="form.aa_effectiveDate"
    v-show-field="['aa_effectiveDate', includeFields]"
    name="aa_effectiveDate"
    label="生效日期"
    :rules="computedRules.aa_effectiveDate"
  />

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
    includeFields: () => ['aa_deptId', 'aa_userId', 'aa_effectiveDate', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

const UserSelectRef = ref<InstanceType<typeof UserSelect> | null>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)
</script>
