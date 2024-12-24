<template>
  <!-- <el-row :gutter="20">
    <el-col v-show-field="['o_userId', includeFields]" :span="24">
      <el-form-item prop="o_userId" label="申请人">
        <UserSelectPro v-model="form.o_userId" :multiple="false" readonly />
      </el-form-item>
    </el-col>
  </el-row> -->

  <van-field v-show-field="['o_deptId', includeFields]" name="o_deptId" label="申请部门" input-align="right">
    <template #input>
      <DeptSelect v-model="form.o_deptId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['o_amount', includeFields]" name="o_amount" label="总金额（元）" input-align="right">
    <template #input>
      {{ form.o_amount }}
      <span v-if="!isNil(form.o_amount)" class="ml-3 text-red">{{ toCnMoney(form.o_amount) }}</span>
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
    includeFields: () => ['o_userId', 'o_deptId', 'o_amount', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
