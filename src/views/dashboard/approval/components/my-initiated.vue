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
      <van-cell
        v-for="row in list"
        :key="row.id"
        @click="handleOpen(row, 'view')"
      >
        <!-- 标题 -->
        <template #title>
          <span class="mr-2">{{ row.name }}</span>
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
          <div class="mt-1 flex gap-2 justify-end">
            <!-- <van-button
            v-if="row.businessStatus === 'waiting'"
            color="#8b898d"
            text="撤销"
            size="small"
            @click.stop="handleCancelProcessApply(row)"
          /> -->

            <van-button
              v-if="row.businessStatus === 'draft' || row.businessStatus === 'back'"
              type="primary"
              text="修改"
              size="small"
              @click.stop="handleOpen(row, 'update')"
            />

            <van-button
              v-if="row.businessStatus === 'draft'"
              type="danger"
              text="删除"
              size="small"
              @click.stop="handleDelete(row)"
            />

          <!-- <van-button
            v-if="row.businessStatus === 'waiting'"
            color="#7232dd"
            text="添加附件"
            size="small"
            @click.stop="openFilePopup(row)"
          /> -->
          </div>
        </template>
      </van-cell>
    </van-list>
  </van-pull-refresh>

  <van-popup
    v-model:show="visible"
    position="bottom"
    class="h-[60vh]"
    @closed="onFilePopupClosed"
  >
    <div class="px-3 h-10 leading-10 text-lg text-center border-b truncate">
      （添加附件）{{ currentRow?.name }}
    </div>

    <div v-loading="fileViewLoading" class="p-2 h-[calc(100%-theme('spacing.24'))] overflow-y-auto">
      <UploadFile
        v-model="form.ossIdList"
        value-type="array"
        :exclude="exclude"
        :readonly="fileConfirmLoading"
      />
    </div>

    <div class="p-2 h-14 flex items-center justify-end gap-2 border-t">
      <van-button
        type="primary"
        text="确认"
        :loading="fileConfirmLoading"
        @click="handleFileConfirm"
      />
      <van-button
        type="default"
        text="取消"
        @click="closePopup"
      />
    </div>
  </van-popup>
</template>

<script setup lang='ts'>
import { isEqual } from 'lodash-es'
import { showConfirmDialog, showLoadingToast, showSuccessToast } from 'vant'
import { useList, usePopup, useWorkflowViewData } from '@/hooks'
import type { ProcessInstanceQuery, ProcessInstanceVO } from '@/api/workflow/processInstance/types'
import type { RouterJumpVo } from '@/api/workflow/workflowCommon/types'
import type { EditOaWfFileVO } from '@/api/oa/common/types'
import { deleteRunAndHisInstance, getPageByCurrent } from '@/api/workflow/processInstance'
import { editOaWfFile } from '@/api/oa/common'
import workflowCommon from '@/api/workflow/workflowCommon'

const props = withDefaults(defineProps<{
  keywords?: string
  immediateCheck?: boolean
}>(), {
  immediateCheck: true,
})

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { wf_business_status } = toRefs(proxy?.useDict('wf_business_status'))

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
} = useList<ProcessInstanceVO, ProcessInstanceQuery>({
  initQueryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    categoryCode: undefined,
  },
  request: getPageByCurrent,
})

const { visible, openPopup, closePopup } = usePopup()

const form = ref<Record<string, any>>({})
const exclude = ref([])
const currentRow = ref<ProcessInstanceVO>(undefined)

const fileViewLoading = ref(false)
const fileConfirmLoading = ref(false)

function handleOpen(row: any, type: string) {
  const routerJumpVo = reactive<RouterJumpVo>({
    wfDefinitionConfigVo: row.wfDefinitionConfigVo,
    wfNodeConfigVo: row.wfNodeConfigVo,
    businessKey: row.businessKey,
    businessStatus: row.businessStatus,
    taskId: '',
    processInstanceId: row.id,
    type,
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
      await deleteRunAndHisInstance(row.businessKey)
      showSuccessToast('删除成功')
      onRefresh()
    })
    .catch(() => {})
}

// // 撤销
// async function handleCancelProcessApply(row: ProcessInstanceVO) {
//   showConfirmDialog({
//     title: '是否确认撤销当前单据？',
//   })
//     .then(async () => {
//       // 开启加载
//       showLoadingToast({ duration: 0, message: '处理中' })
//       await service.workflow.processInstance.cancelProcessApply(row.businessKey)
//       await refetch()
//       showSuccessToast('撤销成功')
//     })
//     .catch(() => {})
// }

// 打开附件弹窗
async function openFilePopup(row: ProcessInstanceVO) {
  openPopup()

  fileViewLoading.value = true

  currentRow.value = row
  const { data } = await useWorkflowViewData({ processInstanceId: row.id }).finally(() => fileViewLoading.value = false)
  const { entity } = data

  form.value = entity
  exclude.value = entity.ossIdList
}

// 确认添加附件
async function handleFileConfirm() {
  const { msgWarning, msgSuccess } = proxy.$modal

  if (isEqual(form.value.ossIdList, exclude.value)) {
    return msgWarning('请选择需要新增的附件')
  }

  fileConfirmLoading.value = true

  const { businessKey, tableName, id: processInstanceId } = currentRow.value

  const data: EditOaWfFileVO = {
    businessKey,
    tableName,
    processInstanceId,
    ossIdList: form.value.ossIdList,
    entity: form.value,
  }

  const { msg } = await editOaWfFile(data).finally(() => {
    fileConfirmLoading.value = false
    closePopup()
  })

  msgSuccess(msg)
}

function onFilePopupClosed() {
  form.value = {}
  exclude.value = []
  currentRow.value = undefined
}

watch(() => props.keywords, (val) => {
  queryParams.value.name = val
})

defineExpose({
  refresh: onRefresh,
})
</script>
