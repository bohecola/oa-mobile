<template>
  <DeptSelect
    v-model="form.z_deptId"
    v-model:value="form.needDepts"
    v-show-field="['z_deptId', includeFields]"
    name="z_deptId"
    label="项目部"
    :rules="computedRules.z_deptId"
  />

  <van-field-number
    v-model.number="form.z_postNumber"
    v-show-field="['z_postNumber', includeFields]"
    label="新增岗位个数"
    type="digit"
    placeholder="请输入"
    name="z_postNumber"
    :rules="computedRules.z_postNumber"
  />

  <van-field
    v-model.trim="form.z_postNames"
    v-show-field="['z_postNames', includeFields]"
    label="本次所有新增岗位名称"
    placeholder="请输入"
    name="z_postNames"
    :rules="computedRules.z_postNames"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['z_deptId', 'z_postNumber', 'z_postNames', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
