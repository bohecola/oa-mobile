<template>
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['q_userId', includeFields]" :span="24">
        <el-form-item prop="q_userId" label="申请人">
          <UserSelectPro v-model="form.q_userId" :multiple="false"  />
        </el-form-item>
      </el-col>
    </el-row> -->

  <van-field v-show-field="['q_deptId', includeFields]" label="项目部" name="q_deptId" input-align="left">
    <template #input>
      <DeptSelect v-model="form.q_deptId" />
    </template>
  </van-field>

  <van-field v-show-field="['q_type', includeFields]" label="申请类型" name="q_type" input-align="left">
    <template #input>
      <DictSelect v-model="form.q_type" dict-type="oa_daily_work_rsscxmbryydxffglbzfysq_type" multiple />
    </template>
  </van-field>

  <van-field-number
    v-if="form.q_type?.includes('0')"
    v-model.number="form.q_defectEliminationAmount"
    v-show-field="['q_defectEliminationAmount', includeFields]"
    label="技术消缺总金额（元）"
    name="q_defectEliminationAmount"
    :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
    clearable
  />

  <van-field-number
    v-if="form.q_type?.includes('1')"
    v-model.number="form.q_trafficAmount"
    v-show-field="['q_trafficAmount', includeFields]"
    label="项目交通费（元）"
    name="q_trafficAmount"
    :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
    clearable
  />

  <van-field-number
    v-if="form.q_type?.includes('2')"
    v-model.number="form.q_personnelReuseSubsidyAmount"
    v-show-field="['q_personnelReuseSubsidyAmount', includeFields]"
    label="人员复用补贴总金额（元）"
    name="q_personnelReuseSubsidyAmount"
    :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
    clearable
  />
  <van-field-number
    v-if="!isNil(form.q_type)"
    v-model.number="form.q_totalAmount"
    v-show-field="['q_totalAmount', includeFields]"
    label="合计金额（元）"
    name="q_totalAmount"
    :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
    clearable
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
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
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
