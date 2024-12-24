<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 工程管理事业部项目部餐费补助申请 -->
    <div v-if="taskDefinitionKey === 'Activity_1laam19'">
      <!-- <upsert /> -->
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
