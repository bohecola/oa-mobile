<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 安全类培训费用 -->
    <div v-if="taskDefinitionKey === 'Activity_0wh1ixm'">
      <upsert />
    </div>

    <!-- 其他审批通用节点 -->
    <div v-else>
      <detail />
    </div>
  </template>
</template>

<script setup lang="ts">
import detail from '../detail.vue'
import upsert from '../upsert.vue'

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')
</script>
