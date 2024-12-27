<template>
  <van-field v-show-field="['gg_deptId', includeFields]" label="部门/项目部" name="gg_deptId" input-align="right">
    <template #input>
      <DeptSelect v-model="form.gg_deptId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['gg_changeType', includeFields]" name="gg_changeType" label="变更类型" input-align="right">
    <template #input>
      <DictSelect v-model="form.gg_changeType" dict-type="oa_daily_work_rszpxqbgsq_change_type" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['gg_changeDetails', includeFields]" name="gg_changeDetails" label="变更明细" input-align="right">
    <template #input>
      <DictSelect v-model="form.gg_changeDetails" dict-type="oa_daily_work_rszpxqbgsq_change_details" multiple readonly />
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
    includeFields: () => ['gg_deptId', 'gg_changeType', 'gg_changeDetails', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
