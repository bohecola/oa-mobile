<template>
  <van-field v-show-field="['k_deptId', includeFields]" name="k_deptId" label="项目部" input-align="right">
    <template #input>
      <DeptSelect v-model="form.k_deptId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['k_userType', includeFields]" name="k_userType" label="人员类别" input-align="right">
    <template #input>
      {{ form.k_userType }}
    </template>
  </van-field>

  <van-field v-show-field="['k_isUniform', includeFields]" name="k_isUniform" label="是否配备公司工作服" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.k_isUniform" readonly />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['k_deptId', 'k_userType', 'k_isUniform', 'reason', 'ossIdList'],
  },
)

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
