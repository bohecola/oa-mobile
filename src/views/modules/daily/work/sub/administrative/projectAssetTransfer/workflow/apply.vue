<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 撤场项目物资流转申请 -->
    <div v-if="taskDefinitionKey === 'Activity_1laam19'">
      <detail />
    </div>

    <!-- 其他审批通用节点 -->
    <div v-else>
      <detail />
    </div>
  </template>
</template>

<script setup lang="ts">
import detail from '../detail.vue'

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')
</script>
