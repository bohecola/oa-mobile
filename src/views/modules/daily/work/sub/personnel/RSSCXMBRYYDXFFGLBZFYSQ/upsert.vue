<template>
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['q_userId', includeFields]" :span="24">
        <el-form-item prop="q_userId" label="申请人">
          <UserSelectPro v-model="form.q_userId" :multiple="false"  />
        </el-form-item>
      </el-col>
    </el-row> -->

  <van-field
    v-show-field="['q_deptId', includeFields]"
    label="项目部"
    name="q_deptId"
    :rules="computedRules.q_deptId"
  >
    <template #input>
      <DeptSelect v-model="form.q_deptId" />
    </template>
  </van-field>

  <DictSelect
    v-model="form.q_type"
    v-show-field="['q_type', includeFields]"
    label="申请类型"
    name="q_type"
    dict-type="oa_daily_work_rsscxmbryydxffglbzfysq_type"
    multiple
    :rules="computedRules.q_type"
    @change="onTypeChange"
  />

  <van-field-number
    v-if="form.q_type?.includes('0')"
    v-model.number="form.q_defectEliminationAmount"
    v-show-field="['q_defectEliminationAmount', includeFields]"
    label="技术消缺总金额（元）"
    name="q_defectEliminationAmount"
    :rules="computedRules.q_defectEliminationAmount"
    clearable
  />

  <van-field-number
    v-if="form.q_type?.includes('1')"
    v-model.number="form.q_trafficAmount"
    v-show-field="['q_trafficAmount', includeFields]"
    label="项目交通费（元）"
    name="q_trafficAmount"
    :rules="computedRules.q_trafficAmount"
    clearable
  />

  <van-field-number
    v-if="form.q_type?.includes('2')"
    v-model.number="form.q_personnelReuseSubsidyAmount"
    v-show-field="['q_personnelReuseSubsidyAmount', includeFields]"
    label="人员复用补贴总金额（元）"
    name="q_personnelReuseSubsidyAmount"
    :rules="computedRules.q_personnelReuseSubsidyAmount"
    clearable
  />

  <van-field-number
    v-model.number="form.q_totalAmount"
    v-show-field="['q_totalAmount', includeFields]"
    label="合计金额（元）"
    name="q_totalAmount"
    :rules="computedRules.q_totalAmount"
    :disabled="true"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import Big from 'big.js'
import type { FormInstance } from 'vant'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => [
      'q_userId',
      'q_deptId',
      'q_type',
      'q_defectEliminationAmount',
      'q_trafficAmount',
      'q_personnelReuseSubsidyAmount',
      'q_totalAmount',
      'reason',
      'ossIdList',
    ],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
const Form = inject<Ref<FormInstance>>('Form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)

// 申请类型切换
function onTypeChange(val: string) {
  if (isNil(val)) {
    Form?.value?.resetValidation(['q_defectEliminationAmount', 'q_trafficAmount', 'q_personnelReuseSubsidyAmount'])
    return
  }

  if (!val.includes('0')) {
    Form?.value?.resetValidation(['q_defectEliminationAmount'])
  }
  if (!val.includes('1')) {
    Form?.value?.resetValidation(['q_trafficAmount'])
  }
  if (!val.includes('2')) {
    Form?.value?.resetValidation(['q_personnelReuseSubsidyAmount'])
  }
}

// 总金额计算
watchEffect(() => {
  const defectEliminationAmount = Big(form.value.q_defectEliminationAmount ?? 0)
  const trafficAmount = Big(form.value.q_trafficAmount ?? 0)
  const personnelReuseSubsidyAmount = Big(form.value.q_personnelReuseSubsidyAmount ?? 0)

  form.value.q_totalAmount = defectEliminationAmount.add(trafficAmount).add(personnelReuseSubsidyAmount).toNumber()
})
</script>
