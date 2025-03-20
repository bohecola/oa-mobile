<template>
  <!-- <el-row :gutter="20">
    <el-col v-show-field="['j_userId', includeFields]" :span="24">
      <el-form-item prop="j_userId" label="提交人">
        <UserSelectPro v-model="form.j_userId" :multiple="false" readonly />
      </el-form-item>
    </el-col>
  </el-row> -->
  <DeptSelect
    v-model="form.j_deptIds"
    v-show-field="['j_deptIds', includeFields]"
    name="j_deptIds"
    label="项目部"
    multiple
  />

  <DateSelect
    v-model="form.j_month"
    v-show-field="['j_month', includeFields]"
    name="j_month"
    label="所发工资月份"
    :columns-type="['year', 'month']"
    component="date-picker"
  />

  <van-field-number
    v-model.number="form.j_number"
    v-show-field="['j_number', includeFields]"
    label="所发工资人数"
    type="digit"
    name="j_number"
    readonly
  />

  <van-field v-show-field="['j_amount', includeFields]" label="应发工资总额（元）" name="j_amount" class="!items-baseline">
    <template #input>
      <div class="items-baseline">
        <span>{{ form.j_amount }}</span>
        <span v-if="!isNil(form.j_amount)" class="ml-3 text-red-400">{{ toCnMoney(form.j_amount) }}</span>
      </div>
    </template>
  </van-field>

  <van-field v-show-field="['j_scAmount', includeFields]" label="单位社保总额（元）" name="j_scAmount">
    <template #input>
      <span>{{ form.j_scAmount }}</span>
      <span v-if="!isNil(form.j_scAmount)" class="ml-3 text-red-400">{{ toCnMoney(form.j_scAmount) }}</span>
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
    includeFields: () => ['j_userId', 'j_deptIds', 'j_month', 'j_number', 'j_amount', 'j_scAmount', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
