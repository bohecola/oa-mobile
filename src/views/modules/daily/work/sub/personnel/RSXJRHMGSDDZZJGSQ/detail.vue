<template>
  <!-- <el-row :gutter="20">
    <el-col v-show-field="['g_userId', includeFields]" :span="24">
      <el-form-item prop="g_userId" label="申请人">
        <UserSelectPro v-model="form.g_userId" :multiple="false" readonly />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col v-show-field="['g_deptId', includeFields]" :span="24">
      <el-form-item prop="g_deptId" label="部门">
        <DeptSelect v-model="form.g_deptId" readonly />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col v-show-field="['g_postIds', includeFields]" :span="24">
      <el-form-item prop="g_postIds" label="岗位">
        <PostSelect v-model="form.g_postIds" :dept-id="form.g_deptId" readonly />
      </el-form-item>
    </el-col>
  </el-row> -->

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
    includeFields: () => ['g_userId', 'g_deptId', 'g_postIds', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
