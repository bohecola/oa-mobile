<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 调用公司员工电子版信息申请 -->
    <div v-if="taskDefinitionKey === 'Activity_1laam19'">
      <upsert :include-fields="['f_deptId', 'f_fileType', 'reason', 'ossIdList']" />
    </div>

    <!-- 专员确认 -->
    <div v-else-if="taskDefinitionKey === 'Activity_171tryh'">
      <detail :include-fields="['f_deptId', 'f_fileType']" />
      <upsert :include-fields="['f_personnelCategory']" />
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
