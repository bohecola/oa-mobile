<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 开具相关证明或人事相关资质的申请 -->
    <div v-if="taskDefinitionKey === 'Activity_1laam19'">
      <upsert :include-fields="['d_deptId', 'd_proveType', 'reason', 'ossIdList']" />
    </div>

    <!-- 专员确认 -->
    <div v-else-if="taskDefinitionKey === 'Activity_171tryh'">
      <detail :include-fields="['d_deptId', 'd_proveType']" />
      <upsert :include-fields="['d_personnelCategory']" />
      <detail :include-fields="['reason', 'ossIdList']" />
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

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')
</script>
