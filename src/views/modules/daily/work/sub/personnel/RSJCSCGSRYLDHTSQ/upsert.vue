<template>
  <van-field v-show-field="['t_userId', includeFields]" label="被解除劳动合同员工" name="t_userId" input-align="left">
    <template #input>
      <UserSelect v-model="form.t_userId" />
    </template>
  </van-field>

  <van-field v-show-field="['t_deptId', includeFields]" label="所在部门/项目部" name="t_deptId" input-align="left">
    <template #input>
      <DeptSelect v-model="form.t_deptId" />
    </template>
  </van-field>

  <van-field v-show-field="['t_postIds', includeFields]" label="岗位" name="t_postIds" input-align="left">
    <template #input>
      <PostSelect v-model="form.t_postIds" :dept-id="form.t_deptId" multiple />
    </template>
  </van-field>

  <van-field v-show-field="['t_isFormal', includeFields]" label="是否已转正" name="t_isFormal" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.t_isFormal" />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import PostSelect from '@/views/modules/personnel/components/PostSelect.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['t_userId', 't_deptId', 't_isFormal', 't_postIds', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
