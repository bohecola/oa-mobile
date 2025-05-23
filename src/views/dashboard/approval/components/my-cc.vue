<template>
  <van-list :loading="isFetching" :finished="!hasNextPage && !isFetching" @load="fetchNextPage">
    <van-cell v-for="row in list" :key="row.id" @click="handleView(row)">
      <!-- 标题 -->
      <template #title>
        <span class="mr-2">{{ row.procinstName }}</span>
      </template>

      <!-- 描述 -->
      <template #label>
        <span>流程ID：{{ row.businessKey }}</span>
        <div class="flex flex-col gap-1">
          <span>办理人：{{ row.assigneeName }}</span>
          <div class="flex gap-2 text-xs">
            <span>流程状态：<dict-tag :options="wf_business_status" :value="row.businessStatus" /></span>
          </div>
          <span>
            查看状态：<van-tag v-if="row.isRead === 'Y'" type="success">已读</van-tag>
            <van-tag v-else type="warning">未读</van-tag>
          </span>
        </div>
      </template>
    </van-cell>
  </van-list>
  <bottom-line v-if="!hasNextPage && !isFetching" />
</template>

<script setup lang='ts'>
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { TaskQuery, TaskVO } from '@/api/workflow/task/types'
import type { RouterJumpVo } from '@/api/workflow/workflowCommon/types'
import { service } from '@/service'
import workflowCommon from '@/api/workflow/workflowCommon'
import { updateCopyTaskRead } from '@/api/workflow/task'

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
  processDefinitionName: undefined,
  processDefinitionKey: undefined,
})

watch(() => props.keywords, (val) => {
  queryParams.value.processDefinitionName = val
})

const { isFetching, data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery({
  queryKey: ['my-cc', queryParams, proxy.$route.path, Date.now],
  queryFn: async (ctx) => {
    const { pageParam } = ctx
    const { rows, total } = await service.workflow.task.getPageByTaskCopy(pageParam)

    // 返回当前页的数据和总数
    return {
      rows,
      total,
      ...pageParam,
      processDefinitionName: proxy.$route.query.keywords,
    }
  },
  enabled: false,
  initialPageParam: queryParams,
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
  updateCopyTaskRead(row.id, { isRead: 'Y' })
}

defineExpose({
  refetch,
})
</script>
