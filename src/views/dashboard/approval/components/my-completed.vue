<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      v-model:error="error"
      :finished="finished"
      :finished-text="finishedText"
      :error-text="errorText"
      :immediate-check="immediateCheck"
      @load="onLoad"
    >
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
            <span>发起时间：{{ row.startTime }}</span>
            <span>结束时间：{{ row.endTime ?? '--' }}</span>
          </div>
        </template>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang='ts'>
import type { TaskQuery, TaskVO } from '@/api/workflow/task/types'
import type { RouterJumpVo } from '@/api/workflow/workflowCommon/types'
import { getPageByTaskFinish } from '@/api/workflow/task'
import { useList } from '@/hooks'
import workflowCommon from '@/api/workflow/workflowCommon'

const props = withDefaults(defineProps<{
  keywords?: string
  immediateCheck?: boolean
}>(), {
  immediateCheck: true,
})

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { wf_business_status } = toRefs<any>(proxy?.useDict('wf_business_status'))

// 列表
const {
  refreshing,
  loading,
  list,
  error,
  finished,
  finishedText,
  errorText,
  queryParams,
  onLoad,
  onRefresh,
} = useList<TaskVO, TaskQuery>({
  initQueryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    procinstName: undefined,
    processDefinitionName: undefined,
    processDefinitionKey: undefined,
  },
  request: getPageByTaskFinish,
})

function handleView(row: TaskVO) {
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

watch(() => props.keywords, (val) => {
  queryParams.value.procinstName = val
})

defineExpose({
  refresh: onRefresh,
})
</script>
