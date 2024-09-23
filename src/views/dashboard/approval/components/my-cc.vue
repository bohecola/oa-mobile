<template>
  <div class="h-[calc(100vh-var(--van-tabs-line-height)-var(--van-nav-bar-height))] overflow-y-auto">
    <van-list :loading="isFetching" :finished="!hasNextPage && !isFetching" @load="fetchNextPage">
      <van-cell v-for="row in list" :key="row.id" @click="handleView(row)">
        <!-- 标题 -->
        <template #title>
          <span class="mr-2">{{ row.procinstName }}</span>
        </template>

        <!-- 描述 -->
        <template #label>
          <div class="flex flex-col gap-1">
            <span>办理人：<van-tag type="success">{{ row.assigneeName }}</van-tag></span>
            <div class="flex gap-2 text-xs">
              <span>流程状态：</span>
              <dict-tag :options="wf_business_status" :value="row.businessStatus" />
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
    <bottom-line v-if="!hasNextPage && !isFetching" />
  </div>
</template>

<script setup lang='ts'>
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { TaskQuery, TaskVO } from '@/api/workflow/task/types'
import type { RouterJumpVo } from '@/api/workflow/workflowCommon/types'
import { service } from '@/service'
import workflowCommon from '@/api/workflow/workflowCommon'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { wf_business_status } = toRefs<any>(proxy?.useDict('wf_business_status'))

// 查询参数
const queryParams = ref<TaskQuery>({
  pageNum: 1,
  pageSize: 10,
  name: undefined,
  processDefinitionName: undefined,
  processDefinitionKey: undefined,
})

const { isFetching, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['my-cc'],
  queryFn: async (ctx) => {
    const { pageParam } = ctx
    const { rows, total } = await service.workflow.task.getPageByTaskCopy(pageParam)

    // 返回当前页的数据和总数
    return {
      rows,
      total,
      pageNum: pageParam.pageNum,
      pageSize: queryParams.value.pageSize,
    }
  },
  initialPageParam: queryParams as any,
  getNextPageParam: (lastPage) => {
    const totalPages = Math.ceil(lastPage.total / lastPage.pageSize)
    const query = {
      ...queryParams.value,
      pageNum: lastPage.pageNum + 1,
    }
    return lastPage.pageNum < totalPages ? query : undefined
  },
})

const list = computed(() => {
  return data.value?.pages.reduce<TaskVO[]>((prev, curr) => {
    return prev.concat(curr.rows)
  }, [])
})

function handleView(row: any) {
  const routerJumpVo = reactive<RouterJumpVo>({
    wfDefinitionConfigVo: row.wfDefinitionConfigVo,
    wfNodeConfigVo: row.wfNodeConfigVo,
    businessKey: row.businessKey,
    businessStatus: row.businessStatus,
    taskId: row.id,
    processInstanceId: '',
    type: 'view',
  })
  workflowCommon.routerJump(routerJumpVo, proxy)
}
</script>
