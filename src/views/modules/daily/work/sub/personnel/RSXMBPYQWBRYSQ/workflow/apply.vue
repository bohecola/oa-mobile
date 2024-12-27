<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 项目部聘用外包人员申请 -->
    <div v-if="taskDefinitionKey === 'Activity_1laam19'">
      <!-- <upsert :include-fields="['k_deptId', 'k_isUniform', 'reason', 'ossIdList']" /> -->
    </div>

    <div v-else-if="taskDefinitionKey === 'Activity_171tryh'">
      <detail :include-fields="['k_deptId']" />
      <detail :include-fields="['k_userType']" />
      <detail :include-fields="['k_isUniform', 'reason', 'ossIdList']" />
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

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')
</script>
