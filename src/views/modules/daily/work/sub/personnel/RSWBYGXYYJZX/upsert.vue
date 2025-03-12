<template>
  <van-field v-show-field="['x_deptId', includeFields]" name="x_deptId" label="部门/项目部" input-align="left">
    <template #input>
      <DeptSelect v-model="form.x_deptId" />
    </template>
  </van-field>

  <van-field v-show-field="['x_userId', includeFields]" name="x_userId" label="外包员工" input-align="left">
    <template #input>
      <UserSelect v-model="form.x_userId" :multiple="true" />
    </template>
  </van-field>

  <!-- <el-row :gutter="20">
      <el-col v-show-field="['x_postIds', includeFields]" :span="24">
        <el-form-item prop="x_postIds" label="岗位">
          <PostSelect v-model="form.x_postIds" :dept-id="form.b_deptId"  />
        </el-form-item>
      </el-col>
    </el-row> -->

  <DatePicker v-model="form.x_contractSigningTime" v-show-field="['x_contractSigningTime', includeFields]" name="x_contractSigningTime" label="合同签订时间" />

  <DatePicker v-model="form.x_contractEndTime" v-show-field="['x_contractEndTime', includeFields]" name="x_contractEndTime" label="合同到期时间" />

  <van-field v-show-field="['x_isRetirementAge', includeFields]" name="x_isRetirementAge" label="是否退休年龄" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.x_isRetirementAge" />
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
    includeFields: () => [
      'x_userId',
      'x_deptId',
      'x_postIds',
      'x_contractSigningTime',
      'x_contractEndTime',
      'x_isRetirementAge',
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
