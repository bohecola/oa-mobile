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
    v-show-field="['p_deptId', includeFields]"
    name="p_deptId"
    label="项目部"
  />

  <van-field v-show-field="['p_amount', includeFields]" label="餐费补助总金额（元）" name="p_amount">
    <template #input>
      {{ form.p_amount }}
      <span v-if="!isNil(form.p_amount)" class="ml-3 text-red-400">{{ toCnMoney(form.p_amount) }}</span>
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
    includeFields: () => ['p_userId', 'p_deptId', 'p_amount', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
