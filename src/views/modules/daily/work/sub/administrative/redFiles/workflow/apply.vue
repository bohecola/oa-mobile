<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 红头文件申请 -->
    <div v-if="taskDefinitionKey === 'Activity_16c7u7l'">
      <!-- <upsert /> -->
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
