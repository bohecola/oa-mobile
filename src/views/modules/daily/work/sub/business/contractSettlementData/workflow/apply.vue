<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 合同结算资料申请 -->
    <div v-if="taskDefinitionKey === 'Activity_1laam19'">
      <detail :include-fields="applyFields" />
    </div>

    <!-- 自定义审核人审核 -->
    <div v-else-if="taskDefinitionKey === 'Activity_1p4ss2n'">
      <detail :include-fields="['customizeApprover']" />
      <detail :include-fields="['customizeTransactor']" />
      <detail :include-fields="baseFields" />
    </div>

    <!-- 其他审批通用节点 -->
    <div v-else>
      <detail />
    </div>
  </template>
</template>

<script setup lang="ts">
// import upsert from '../upsert.vue'
import detail from '../detail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

type DailyWorkFormFields = KeysOfArray<DailyWorkForm>

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')

const baseFields: DailyWorkFormFields = ['fileType', 'isSeal', 'reason', 'ossIdList']
const applyFields: DailyWorkFormFields = ['customizeApprover', ...baseFields]
</script>
