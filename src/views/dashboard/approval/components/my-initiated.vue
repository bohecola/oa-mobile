<template>
  <div class="h-[calc(100dvh-var(--van-tabs-line-height)-var(--van-nav-bar-height))] overflow-y-auto">
    <van-list :loading="isFetching" :finished="!hasNextPage && !isFetching" @load="fetchNextPage">
      <van-swipe-cell v-for="row in list" :key="row.id">
        <van-cell @click="handleView(row)">
          <!-- 标题 -->
          <template #title>
            <span class="mr-2">{{ row.processDefinitionName }}</span>
          </template>

          <!-- 描述 -->
          <template #label>
            <div class="flex flex-col gap-1">
              <div class="flex gap-2 text-xs">
                <span>流程状态：</span>
                <dict-tag :options="wf_business_status" :value="row.businessStatus" />
              </div>
              <span>发起时间：{{ row.startTime }}</span>
              <span>结束时间：{{ row.endTime ?? '--' }}</span>
              <span>
                状态：
                <span v-if="row.isSuspended" class="text-red-400">
                  挂起
                </span>
                <span v-else class="text-green-500">
                  激活
                </span>
              </span>
            </div>
          </template>
        </van-cell>
        <template #right>
          <van-button
            v-if="row.businessStatus === 'draft' || row.businessStatus === 'cancel' || row.businessStatus === 'back'"
            square type="danger" text="删除" class="h-full"
            @click="handleDelete(row)"
          />
          <van-button
            v-if="row.businessStatus === 'waiting'"
            square type="primary" text="撤销" class="h-full"
            @click="handleCancelProcessApply(row)"
          />
        </template>
      </van-swipe-cell>
    </van-list>
    <bottom-line v-if="!hasNextPage && !isFetching" />
  </div>
</template>

<script setup lang='ts'>
import { useInfiniteQuery } from '@tanstack/vue-query'
import { showConfirmDialog, showLoadingToast, showSuccessToast } from 'vant'
import type { ProcessInstanceQuery, ProcessInstanceVO } from '@/api/workflow/processInstance/types'
import type { RouterJumpVo } from '@/api/workflow/workflowCommon/types'
import workflowCommon from '@/api/workflow/workflowCommon'
import { service } from '@/service'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { wf_business_status } = toRefs<any>(proxy?.useDict('wf_business_status'))

// 查询参数
const queryParams = ref<ProcessInstanceQuery>({
  pageNum: 1,
  pageSize: 10,
  name: undefined,
  categoryCode: undefined,
})

const { isFetching, data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery({
  queryKey: ['my-initiate'],
  queryFn: async ({ pageParam }) => {
    const { rows, total } = await service.workflow.processInstance.getPageByCurrent(pageParam)

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
  return data.value?.pages.reduce<ProcessInstanceVO[]>((prev, curr) => {
    return prev.concat(curr.rows)
  }, [])
})

function handleView(row: any) {
  const routerJumpVo = reactive<RouterJumpVo>({
    wfDefinitionConfigVo: row.wfDefinitionConfigVo,
    wfNodeConfigVo: row.wfNodeConfigVo,
    businessKey: row.businessKey,
    businessStatus: row.businessStatus,
    taskId: '',
    processInstanceId: row.id,
    type: 'view',
  })
  workflowCommon.routerJump(routerJumpVo, proxy)
}

// 删除
function handleDelete(row: ProcessInstanceVO) {
  showConfirmDialog({
    title: '确定删除吗？',
  })
    .then(async () => {
      // 开启加载
      showLoadingToast({ duration: 0, message: '处理中' })
      await service.workflow.processInstance.deleteRunAndHisInstance(row.businessKey)
      await refetch()
      showSuccessToast('删除成功')
    })
    .catch(() => {})
}

// 撤销
async function handleCancelProcessApply(row: ProcessInstanceVO) {
  showConfirmDialog({
    title: '是否确认撤销当前单据？',
  })
    .then(async () => {
      // 开启加载
      showLoadingToast({ duration: 0, message: '处理中' })
      await service.workflow.processInstance.cancelProcessApply(row.businessKey)
      await refetch()
      showSuccessToast('撤销成功')
    })
    .catch(() => {})
}
</script>
