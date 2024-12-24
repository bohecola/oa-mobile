<template>
  <!-- <el-row :gutter="20">
    <el-col v-show-field="['i_userId', includeFields]" :span="24">
      <el-form-item prop="i_userId" label="提交人">
        <UserSelectPro v-model="form.i_userId" :multiple="false" readonly />
      </el-form-item>
    </el-col>
  </el-row> -->
  <van-field v-show-field="['i_deptIds', includeFields]" name="i_deptIds" label="项目部" input-align="right">
    <template #input>
      <DeptSelect v-model="form.i_deptIds" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['i_deptIds', includeFields]" name="i_deptIds" label="所发工资月份" input-align="right">
    <template #input>
      {{ parseTime(form.i_month, '{y}-{m}') }}
    </template>
  </van-field>

  <van-field v-show-field="['i_deptIds', includeFields]" name="i_deptIds" label="所发工资月份" input-align="right">
    <template #input>
      <span>{{ form.i_amount }}</span>
      <span v-if="!isNil(form.i_amount)" class="ml-3 text-red-400">{{ toCnMoney(form.i_amount) }}</span>
    </template>
  </van-field>

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
    includeFields: () => ['i_userId', 'i_deptIds', 'i_amount', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
