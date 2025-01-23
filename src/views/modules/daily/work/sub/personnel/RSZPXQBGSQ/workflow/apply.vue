<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 招聘需求变更申请 -->
    <div v-if="taskDefinitionKey === 'Activity_1laam19'">
      <!-- <upsert /> -->
    </div>

    <!-- 专员确认节点 -->
    <div v-else-if="taskDefinitionKey === 'Activity_171tryh'">
      <detail :include-fields="['k_deptId', 'gg_changeType', 'gg_changeDetails']" />
      <detail :include-fields="['gg_additionalBudgetExpenses']" />
      <detail :include-fields="['reason', 'ossIdList']" />
    </div>

    <!-- 其他审批通用节点 -->
    <div v-else>
      <detail />
    </div>
  </template>
</template>

<script setup lang="ts">
// import upsert from '../upsert.vue';
import detail from '../detail.vue'

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')
</script>
