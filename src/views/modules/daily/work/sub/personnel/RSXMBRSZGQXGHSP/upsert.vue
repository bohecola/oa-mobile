<template>
  <van-field v-show-field="['r_deptId', includeFields]" name="z_deptId" label="部门/项目部所属部门" input-align="left">
    <template #input>
      <!-- TODO 筛选部门 -->
      <DeptSelect v-model="form.r_deptId" />
    </template>
  </van-field>

  <van-field v-show-field="['r_oldUserId', includeFields]" name="r_oldUserId" label="原主管权限人员" input-align="left">
    <template #input>
      <UserSelect v-model="form.r_oldUserId" />
    </template>
  </van-field>

  <van-field v-show-field="['r_newUserId', includeFields]" name="r_newUserId" label="现主管权限人员" input-align="left">
    <template #input>
      <UserSelect v-model="form.r_newUserId" />
    </template>
  </van-field>

  <DatePicker v-model="form.r_effectiveDate" v-show-field="['r_effectiveDate', includeFields]" name="r_effectiveDate" label="生效日期" />

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
    includeFields: () => ['r_deptId', 'r_oldUserId', 'r_newUserId', 'r_effectiveDate', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
