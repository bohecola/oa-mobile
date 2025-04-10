<template>
  <van-field v-show-field="['rr_deptId', includeFields]" name="rr_deptId" label="所在部门" input-align="left">
    <template #input>
      <DeptSelect v-model="form.rr_deptId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['rr_userId', includeFields]" name="rr_userId" label="姓名" input-align="left">
    <template #input>
      <UserSelect v-model="form.rr_userId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['rr_permission', includeFields]" name="rr_permission" label="权限" input-align="left">
    <template #input>
      <DictSelect v-model="form.rr_permission" dict-type="oa_daily_work_xzxlnynasxtzhsq_permission" readonly />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['rr_deptId', 'rr_userId', 'rr_permission', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
