<template>
  <van-field v-show-field="['t_userId', includeFields]" label="被解除劳动合同员工" name="t_userId">
    <template #input>
      <UserSelect v-model="form.t_userId" readonly />
    </template>
  </van-field>

  <DeptSelect
    v-model="form.t_deptId"
    v-show-field="['t_deptId', includeFields]"
    name="t_deptId"
    label="所在部门/项目部"
  />

  <PostSelect
    v-model="form.t_postIds"
    v-show-field="['t_postIds', includeFields]"
    name="t_postIds"
    label="调入岗位"
    multiple
    :dept-id="form.t_deptId"
    readonly
  />

  <van-field v-show-field="['t_isFormal', includeFields]" label="是否已转正" name="t_isFormal">
    <template #input>
      <YesNoSwitch v-model="form.t_isFormal" readonly />
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
    includeFields: () => ['t_userId', 't_deptId', 't_isFormal', 't_postIds', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
