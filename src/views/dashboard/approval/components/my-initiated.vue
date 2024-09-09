<template>
  <van-list :loading="isLoading">
    <van-cell v-for="row in data?.rows" :key="row.id">
      <template #title>
        <span class="mr-2">{{ row.processDefinitionName }}</span>

        <dict-tag :options="wf_business_status" :value="row.businessStatus" />
      </template>

      <template #label>
        <div class="flex flex-col gap-1">
          <span>发起时间：{{ row.startTime }}</span>
          <span>结束时间：{{ row.endTime }}</span>
          <span v-if="row.isSuspended" class="text-red-400">
            挂起
          </span>
          <span v-else class="text-green-500">
            激活
          </span>
        </div>
      </template>
    </van-cell>
  </van-list>
</template>

<script setup lang='ts'>
import { useQuery } from '@tanstack/vue-query'
import type { ComponentInternalInstance } from 'vue'
import { service } from '@/service'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { wf_business_status } = toRefs<any>(proxy?.useDict('wf_business_status'))

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['my-initiated'],
  queryFn: async () => {
    const { rows, total } = await service.workflow.processInstance.getPageByCurrent({ pageNum: 1, pageSize: 10 })
    return { rows, total }
  },
})
</script>
