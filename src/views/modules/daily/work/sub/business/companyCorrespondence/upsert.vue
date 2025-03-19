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
    v-show-field="['isYwlProject', includeFields]"
    label="是否运维类项目"
    name="isYwlProject"
    label-width="120"
    :rules="computedRules.isYwlProject"
  >
    <template #input>
      <YesNoSwitch v-model="form.isYwlProject" />
    </template>
  </van-field>

  <van-field
    v-show-field="['isPersonnelTransfer', includeFields]"
    label-width="170"
    label="是否涉及人员任命、调整"
    name="isPersonnelTransfer"
    :rules="computedRules.isPersonnelTransfer"
  >
    <template #input>
      <YesNoSwitch v-model="form.isPersonnelTransfer" />
    </template>
  </van-field>

  <van-field
    v-model="form.ll_letterType"
    v-show-field="['ll_letterType', includeFields]"
    label="函件类型"
    placeholder="请输入公函、便函"
    name="ll_letterType"
    :rules="computedRules.ll_letterType"
  />

  <van-field
    v-model="form.ll_fileType"
    v-show-field="['ll_fileType', includeFields]"
    label="文件类型"
    placeholder="请输入纸质版、电子版"
    name="ll_fileType"
    :rules="computedRules.ll_fileType"
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
    includeFields: () => ['needDepts', 'isYwlProject', 'isPersonnelTransfer', 'll_letterType', 'll_fileType', 'reason', 'ossIdList'],
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
