<template>
  <detail v-if="isView" />
  <template v-else>
    <!-- 生产项目部临聘人员月度食堂补助费用审批 -->
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
import upsert from '../upsert.vue'
import detail from '../detail.vue'

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')
</script>
