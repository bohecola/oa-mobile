<template>
  <!-- <el-row :gutter="20">
    <el-col v-show-field="['h_userId', includeFields]" :span="24">
      <el-form-item prop="h_userId" label="申请子管理员权限人员">
        <UserSelectPro v-model="form.h_userId" :multiple="false" readonly />
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
    includeFields: () => ['h_userId', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
