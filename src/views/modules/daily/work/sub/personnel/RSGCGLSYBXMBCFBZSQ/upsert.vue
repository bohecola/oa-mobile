<template>
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['p_userId', includeFields]" :span="24">
        <el-form-item prop="p_userId" label="申请人">
          <UserSelectPro v-model="form.p_userId" :multiple="false" readonly />
        </el-form-item>
      </el-col>
    </el-row> -->

  <DeptSelect
    v-model="form.p_deptId"
    v-model:value="form.needDepts"
    v-show-field="['p_deptId', includeFields]"
    name="p_deptId"
    label="项目部"
    :rules="computedRules.p_deptId"
  />

  <van-field-number
    v-model.number="form.p_amount"
    v-show-field="['p_amount', includeFields]"
    label="餐费补助总金额（元）"
    name="p_amount"
    :rules="computedRules.p_amount"
    clearable
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['p_userId', 'p_deptId', 'p_amount', 'reason', 'ossIdList'],
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
