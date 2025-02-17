<template>
  <van-field v-show-field="['e_deptId', includeFields]" name="e_deptId" label="部门/项目部" input-align="right">
    <template #input>
      <DeptSelect v-model="form.e_deptId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['e_deptId', includeFields]" name="e_deptId" label="证明开具人数" input-align="right">
    <template #input>
      {{ form.e_userCounts }}
    </template>
  </van-field>

  <van-field v-show-field="['e_proveType', includeFields]" name="e_proveType" label="证明类型" input-align="right">
    <template #input>
      <DictSelect v-model="form.e_proveType" dict-type="oa_daily_work_rsscxmbyrzryxgzmkjsp_prove_type" multiple readonly />
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
    includeFields: () => ['e_deptId', 'e_userCounts', 'e_proveType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
