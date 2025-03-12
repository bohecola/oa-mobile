<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 生产人员招聘工作奖励费用核算审批表 -->
    <div v-if="taskDefinitionKey === 'Activity_1laam19'">
      <upsert />
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
