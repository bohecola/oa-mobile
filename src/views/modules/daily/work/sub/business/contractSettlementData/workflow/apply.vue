<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 合同结算资料申请 -->
    <div v-if="taskDefinitionKey === 'Activity_16c7u7l'">
      <!-- <upsert :include-fields="baseFields" /> -->
    </div>

    <!-- 自定义审核人审核 -->
    <div v-else-if="taskDefinitionKey === 'Activity_06fn9qa'">
      <!-- <upsert :include-fields="customizeTransactorNodeFields" /> -->
      <detail :include-fields="baseFields" />
    </div>

    <!-- 自定义办理人审核 | 申请确认 -->
    <div v-else-if="['Activity_0rbi19e', 'Activity_0p8z1ua'].includes(taskDefinitionKey)">
      <detail />
    </div>

    <!-- 其他审批通用节点 -->
    <div v-else>
      <detail :include-fields="baseFields" />
    </div>
  </template>
</template>

<script setup lang="ts">
import detail from '../detail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

type DailyWorkFormFields = KeysOfArray<DailyWorkForm>

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')

const baseFields: DailyWorkFormFields = ['customizeApprover', 'fileType', 'isSeal', 'reason']
const customizeTransactorNodeFields: DailyWorkFormFields = ['customizeTransactor']
</script>
