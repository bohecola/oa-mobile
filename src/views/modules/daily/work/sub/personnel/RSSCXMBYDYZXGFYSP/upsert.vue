<template>
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['o_userId', includeFields]" :span="24">
        <el-form-item prop="o_userId" label="申请人">
          <UserSelectPro v-model="form.o_userId" :multiple="false"  />
        </el-form-item>
      </el-col>
    </el-row> -->

  <van-field v-show-field="['o_deptId', includeFields]" name="o_deptId" label="申请部门" input-align="left">
    <template #input>
      <DeptSelect v-model="form.o_deptId" />
    </template>
  </van-field>

  <van-field-number
    v-model.number="form.o_amount"
    v-show-field="['o_amount', includeFields]"
    label="合计金额（元）"
    name="o_amount"
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
    includeFields: () => ['o_userId', 'o_deptId', 'o_amount', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
