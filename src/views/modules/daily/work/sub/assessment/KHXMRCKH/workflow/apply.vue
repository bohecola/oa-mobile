<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 项目日常考核 -->
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
import { useWorkflowHelper } from '@/hooks'

const { taskDefinitionKey, isView } = useWorkflowHelper()
</script>
