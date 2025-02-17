<template>
  <van-field v-show-field="['s_deptId', includeFields]" label="项目部" name="s_deptId" input-align="right">
    <template #input>
      <DeptSelect v-model="form.s_deptId" readonly />
    </template>
  </van-field>

  <van-field v-model="form.s_costCategory" v-show-field="['s_costCategory', includeFields]" label="申请费用类别" name="s_costCategory" input-align="right" />

  <van-field v-model="form.s_transportationStandards" v-show-field="['s_transportationStandards', includeFields]" label="拟申请交通工具标准" name="s_transportationStandards" input-align="right" />

  <van-field v-model="form.s_transportationFeeAmount" v-show-field="['s_transportationFeeAmount', includeFields]" label="拟申请交通费金额（元/单趟）" name="s_transportationFeeAmount" input-align="right" />

  <van-field v-model="form.s_subsidyStandardDetails" v-show-field="['s_subsidyStandardDetails', includeFields]" label="驻勤补助标准明细" name="s_subsidyStandardDetails" input-align="right" />

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
    includeFields: () => ['s_deptId', 's_costCategory', 's_transportationStandards', 's_transportationFeeAmount', 's_subsidyStandardDetails', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
