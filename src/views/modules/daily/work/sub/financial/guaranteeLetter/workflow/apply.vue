<template>
  <detail v-if="isView" ref="Detail" :include-fields="includeFields" />
  <template v-else>
    <!-- 开具保函申请 -->
    <div v-if="taskDefinitionKey === 'Activity_16c7u7l'">
      <upsert />
    </div>

    <!-- 其他审批通用节点 -->
    <div v-else>
      <detail ref="DetailOther" :include-fields="includeFields" />
    </div>
  </template>
</template>

<script setup lang="ts">
import detail from '../detail.vue'
import { filterTruthyKeys } from '@/utils'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

const isView = inject<boolean>('isView')
const taskDefinitionKey = inject<string>('taskDefinitionKey')

// 引用
const Detail = ref<InstanceType<typeof detail> | null>()
const DetailOther = ref<InstanceType<typeof detail> | null>()

// 字段
const includeFields = ref(
  filterTruthyKeys<DailyWorkForm>({
    contractCategory: true,
    reason: true,
    ossIdList: true,
  }),
)
</script>
