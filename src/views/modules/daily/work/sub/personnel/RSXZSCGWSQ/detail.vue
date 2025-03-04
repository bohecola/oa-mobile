<template>
  <van-field v-show-field="['z_deptId', includeFields]" name="z_deptId" label="项目部" input-align="left">
    <template #input>
      <!-- TODO 筛选部门 -->
      <DeptSelect v-model="form.z_deptId" readonly />
    </template>
  </van-field>

  <van-field v-model="form.z_postNumber" v-show-field="['z_postNumber', includeFields]" label="新增岗位个数" name="z_postNumber" input-align="left" />

  <van-field v-model="form.z_postNames" v-show-field="['z_postNames', includeFields]" label="本次所有新增岗位名称" name="z_postNames" input-align="left" />

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
    includeFields: () => ['z_deptId', 'z_postNumber', 'z_postNames', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
