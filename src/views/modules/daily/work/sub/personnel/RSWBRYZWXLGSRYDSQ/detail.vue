<template>
  <van-field v-show-field="['aa_deptId', includeFields]" name="aa_deptId" label="项目部" input-align="right">
    <template #input>
      <DeptSelect v-model="form.aa_deptId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['aa_userId', includeFields]" name="aa_userId" label="申请人员名单" input-align="right">
    <template #input>
      <UserSelect v-model="form.aa_userId" :multiple="true" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['aa_effectiveDate', includeFields]" name="aa_effectiveDate" label="生效日期" input-align="right">
    <template #input>
      {{ parseTime(form.aa_effectiveDate, '{y}-{m}-{d}') }}
    </template>
  </van-field>

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
    includeFields: () => ['aa_deptId', 'aa_userId', 'aa_effectiveDate', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
