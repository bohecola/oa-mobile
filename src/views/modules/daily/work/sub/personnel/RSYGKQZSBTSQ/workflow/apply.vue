<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 员工考取证书补贴申请 -->
    <div v-if="taskDefinitionKey === 'Activity_1laam19'">
      <upsert />
    </div>

    <!-- 专员确认节点 -->
    <div v-else-if="taskDefinitionKey === 'Activity_0y4z19l'">
      <detail :include-fields="['yy_subsidyStandards']" />
      <detail :include-fields="applyFields" />
    </div>
    <!-- 其他审批通用节点 -->
    <div v-else>
      <detail />
    </div>
  </template>
</template>

<script setup lang="ts">
import upsert from '../upsert.vue'
import detail from '../detail.vue'
import { filterTruthyKeys } from '@/utils'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')

// 申请字段
const applyFields = ref(
  filterTruthyKeys<DailyWorkForm>({
    yy_dailyWorkId: true,
    yy_type: true,
    yy_name: true,
    yy_certificateLevel: true,
    yy_otherCompanyUseStatus: true,
    yy_entryCompanyDate: true,
    yy_subsidyStandards: false,
    yy_certificateStatus: true,
    yy_registrationCompanyDate: true,
    yy_speciality: true,
    yy_no: true,
    yy_issuanceDate: true,
    yy_recheckDate: true,
    yy_startDate: true,
    yy_endDate: true,
    yy_unit: true,
    yy_isTraining: true,
    reason: true,
    ossIdList: true,
  }),
)
</script>
