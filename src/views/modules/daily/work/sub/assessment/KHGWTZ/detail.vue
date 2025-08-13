<template>
  <van-field
    v-show-field="['vv_userId', includeFields]"
    label="员工"
    name="vv_userId"
  >
    <template #input>
      <UserSelect v-model="form.vv_userId" readonly />
    </template>
  </van-field>

  <DeptSelect
    v-model="form.vv_deptId"
    v-show-field="['vv_deptId', includeFields]"
    label="部门/项目部"
    name="vv_deptId"
    readonly
  />

  <PostSelect
    v-model="form.vv_oldPostId"
    v-show-field="['vv_oldPostId', includeFields]"
    label="原岗位"
    name="vv_oldPostId"
    :dept-id="form.vv_deptId"
    readonly
  />

  <PostSelect
    v-model="form.vv_newPostId"
    v-show-field="['vv_newPostId', includeFields]"
    :dept-id="form.vv_deptId"
    label="新岗位"
    name="vv_newPostId"
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => [
      'vv_userId',
      'vv_deptId',
      'vv_oldPostId',
      'vv_newPostId',
      'reason',
      'ossIdList',
    ],
  },
)

// 表单
const form = inject<Ref<DailyWorkForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
