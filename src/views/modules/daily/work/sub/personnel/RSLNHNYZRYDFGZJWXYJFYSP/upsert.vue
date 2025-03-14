<template>
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['j_userId', includeFields]" :span="24">
        <el-form-item prop="j_userId" label="提交人">
          <UserSelectPro v-model="form.j_userId" :multiple="false"  />
        </el-form-item>
      </el-col>
    </el-row> -->
  <van-field v-show-field="['j_deptIds', includeFields]" label="项目部" name="j_deptIds" :rules="computedRules.j_deptIds">
    <template #input>
      <DeptSelect v-model="form.j_deptIds" multiple />
    </template>
  </van-field>

  <DatePicker
    v-model="form.j_month"
    v-show-field="['j_month', includeFields]"
    name="j_month"
    label="所发工资月份"
    :columns-type="['year', 'month']"
    :rules="computedRules.j_month"
  />

  <van-field-number
    v-model.number="form.j_amount"
    v-show-field="['j_amount', includeFields]"
    label="应发工资总额（元）"
    name="j_amount"
    :rules="computedRules.j_amount"
    clearable
  />

  <van-field-number
    v-model.number="form.j_scAmount"
    v-show-field="['j_scAmount', includeFields]"
    label="单位社保总额（元）"
    name="j_scAmount"
    :rules="computedRules.j_scAmount"
    clearable
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['j_userId', 'j_deptIds', 'j_month', 'j_amount', 'j_scAmount', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)
</script>
