<template>
  <DeptSelect
    v-model="form.r_deptId"
    v-model:value="form.needDepts"
    v-show-field="['r_deptId', includeFields]"
    name="r_deptId"
    label="部门/项目部"
    :rules="computedRules.r_deptId"
  />

  <van-field
    v-model="form.r_oldUserId"
    v-show-field="['r_oldUserId', includeFields]"
    name="r_oldUserId"
    is-link
    label="原主管权限人员"
    :rules="computedRules.r_oldUserId"
    @click="OldUserSelectRef?.open"
  >
    <template #input>
      <UserSelect ref="OldUserSelectRef" v-model="form.r_oldUserId" />
    </template>
  </van-field>

  <van-field
    v-model="form.r_newUserId"
    v-show-field="['r_newUserId', includeFields]"
    name="r_newUserId"
    is-link
    label="现主管权限人员"
    :rules="computedRules.r_newUserId"
    @click="NewUserSelectRef?.open"
  >
    <template #input>
      <UserSelect ref="NewUserSelectRef" v-model="form.r_newUserId" />
    </template>
  </van-field>

  <DateSelect
    v-model="form.r_effectiveDate"
    v-show-field="['r_effectiveDate', includeFields]"
    name="r_effectiveDate"
    label="生效日期"
    :rules="computedRules.r_effectiveDate"
    clearable
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
    includeFields: () => ['r_deptId', 'r_oldUserId', 'r_newUserId', 'r_effectiveDate', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const OldUserSelectRef = ref<InstanceType<typeof UserSelect> | null>()
const NewUserSelectRef = ref<InstanceType<typeof UserSelect> | null>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
