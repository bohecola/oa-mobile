<template>
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['i_userId', includeFields]" :span="24">
        <el-form-item prop="i_userId" label="提交人">
          <UserSelectPro v-model="form.i_userId" :multiple="false"  />
        </el-form-item>
      </el-col>
    </el-row> -->
  <van-field v-show-field="['i_deptIds', includeFields]" name="i_deptIds" label="项目部" :rules="computedRules.i_deptIds">
    <template #input>
      <DeptSelect v-model="form.i_deptIds" multiple />
    </template>
  </van-field>

  <DatePicker
    v-model="form.i_month"
    v-show-field="['i_month', includeFields]"
    name="i_month"
    label="所发工资月份"
    :columns-type="['year', 'month']"
    :rules="computedRules.i_month"
  />

  <van-field-number
    v-model.number="form.i_number"
    v-show-field="['i_amount', includeFields]"
    label="所发工资人数"
    type="digit"
    name="i_amount"
    :rules="computedRules.i_amount"
    clearable
  />

  <van-field-number
    v-model.number="form.i_amount"
    v-show-field="['i_amount', includeFields]"
    label="所发工资总金额"
    name="i_amount"
    :rules="computedRules.i_amount"
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
    includeFields: () => ['i_userId', 'i_deptIds', 'i_month', 'i_amount', 'reason', 'ossIdList'],
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
