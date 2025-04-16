<template>
  <van-list :loading="isFetching" :finished="!hasNextPage && !isFetching" @load="fetchNextPage">
    <van-cell v-for="row in list" :key="row.id" @click="handleView(row)">
      <!-- 标题 -->
      <template #title>
        <span class="mr-2">{{ row.procinstName }}</span>
      </template>

      <!-- 描述 -->
      <template #label>
        <div class="flex flex-col gap-1">
          <span>流程ID：{{ row.businessKey }}</span>
          <div class="flex gap-2 text-xs">
            <span>流程状态：<dict-tag :options="wf_business_status" :value="row.businessStatus" /></span>
          </div>
          <span>发起时间：{{ row.createTime }}</span>
          <span>结束时间：{{ row.endTime ?? '--' }}</span>
        </div>
      </template>
    </van-cell>
  </van-list>
  <bottom-line v-if="!hasNextPage && !isFetching" />
</template>

<script setup lang='ts'>
import { useInfiniteQuery } from '@tanstack/vue-query'
import { service } from '@/service'
import type { TaskQuery, TaskVO } from '@/api/workflow/task/types'
import type { RouterJumpVo } from '@/api/workflow/workflowCommon/types'
import workflowCommon from '@/api/workflow/workflowCommon'

const props = defineProps<{
  keywords?: string
}>()

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { wf_business_status } = toRefs<any>(proxy?.useDict('wf_business_status'))

// 查询参数
const queryParams = ref<TaskQuery>({
  pageNum: 1,
  pageSize: 10,
  name: undefined,
  procinstName: undefined,
  processDefinitionName: undefined,
  processDefinitionKey: undefined,
})

watch(() => props.keywords, (val) => {
  queryParams.value.procinstName = val
})

const { isFetching, data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery({
  queryKey: ['my-to-do', queryParams, proxy.$route.path, Date.now],
  queryFn: async (ctx) => {
    const { pageParam } = ctx
    const { rows, total } = await service.workflow.task.getPageByTaskWait(pageParam)

    // 返回当前页的数据和总数
    return {
      rows,
      total,
      ...pageParam,
    }
  },
  initialPageParam: queryParams,
  enabled: false,
  getNextPageParam: (lastPage) => {
    const { total, pageNum, pageSize } = lastPage
    const totalPages = Math.ceil(total / pageSize)

    // 生成下一页查询参数
    return pageNum < totalPages
      ? { ...queryParams.value, pageNum: pageNum + 1 }
      : undefined
  },
})

const list = computed(() => {
  return data.value?.pages.reduce<TaskVO[]>((prev, curr) => {
    return prev.concat(curr.rows)
  }, [])
})

function handleView(row: TaskVO) {
  const routerJumpVo = reactive<RouterJumpVo>({
    wfDefinitionConfigVo: row.wfDefinitionConfigVo,
    wfNodeConfigVo: row.wfNodeConfigVo,
    businessKey: row.businessKey,
    businessStatus: row.businessStatus,
    taskId: row.id as string,
    processInstanceId: '',
    type: 'approval',
  })
  workflowCommon.routerJump(routerJumpVo, proxy)
}

defineExpose({
  refetch,
})
</script>
