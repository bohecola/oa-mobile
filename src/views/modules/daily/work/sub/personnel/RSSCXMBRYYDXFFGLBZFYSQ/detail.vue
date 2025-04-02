<template>
  <!-- <el-row :gutter="20">
    <el-col v-show-field="['q_userId', includeFields]" :span="24">
      <el-form-item prop="q_userId" label="申请人">
        <UserSelectPro v-model="form.q_userId" :multiple="false" readonly />
      </el-form-item>
    </el-col>
  </el-row> -->

  <DeptSelect
    v-model="form.q_deptId"
    v-show-field="['q_deptId', includeFields]"
    name="q_deptId"
    label="项目部"
  />

  <DictSelect
    v-model="form.q_type"
    v-show-field="['q_type', includeFields]"
    label="申请类型"
    name="q_type"
    dict-type="oa_daily_work_rsscxmbryydxffglbzfysq_type"
    multiple
  />

  <van-field
    v-if="form.q_type?.includes('0')"
    v-show-field="['q_defectEliminationAmount', includeFields]"
    label="技术消缺总金额（元）"
    name="q_defectEliminationAmount"
  >
    <template #input>
      <span class="mr-3">{{ form.q_defectEliminationAmount }}</span>
      <span v-if="!isNil(form.q_defectEliminationAmount)" class="ml-3 text-red-400">{{ toCnMoney(form.q_defectEliminationAmount) }}</span>
    </template>
  </van-field>

  <van-field
    v-if="form.q_type?.includes('1')"
    v-show-field="['q_trafficAmount', includeFields]"
    label="项目交通费（元）"
    name="q_trafficAmount"
  >
    <template #input>
      <span class="mr-3">{{ form.q_trafficAmount }}</span>
      <span v-if="!isNil(form.q_trafficAmount)" class="ml-3 text-red-400">{{ toCnMoney(form.q_trafficAmount) }}</span>
    </template>
  </van-field>

  <van-field
    v-if="form.q_type?.includes('2')"
    v-show-field="['q_personnelReuseSubsidyAmount', includeFields]"
    label="人员复用补贴总金额（元）"
    name="q_personnelReuseSubsidyAmount"
  >
    <template #input>
      <span class="mr-3">{{ form.q_personnelReuseSubsidyAmount }}</span>
      <span v-if="!isNil(form.q_personnelReuseSubsidyAmount)" class="ml-3 text-red-400">{{ toCnMoney(form.q_personnelReuseSubsidyAmount) }}</span>
    </template>
  </van-field>

  <van-field
    v-if="!isNil(form.q_type)"
    v-show-field="['q_totalAmount', includeFields]"
    label="合计金额（元）"
    name="q_totalAmount"
  >
    <template #input>
      <span class="mr-3">{{ form.q_totalAmount }}</span>
      <span v-if="!isNil(form.q_totalAmount)" class="ml-3 text-red-400">{{ toCnMoney(form.q_totalAmount) }}</span>
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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
