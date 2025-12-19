<template>
  <van-popup
    v-model:show="visible"
    position="bottom"
    class="h-[75vh]"
    destroy-on-close
    safe-area-inset-bottom
    @closed="onClosePopup"
  >
    <div class="h-10 leading-10 border-b text-center font-bold">
      {{ title }}
    </div>

    <div class="h-[calc(100%-var(--van-button-default-height)-theme('spacing.14'))] overflow-y-auto">
      <van-pull-refresh v-model="examRefreshing" @refresh="onRefreshExam">
        <van-list
          v-model:loading="examLoading"
          v-model:error="examError"
          :finished="examFinished"
          :finished-text="examFinishedText"
          :error-text="examErrorText"
          @load="onLoadExam"
        >
          <RecordItem
            v-for="(item, index) in examList"
            :key="item.id"
            :item="item"
            @view="onViewExam(item)"
            @continue="onContinueExam(item)"
            @delete="onDeleteExam(item, index)"
          />
        </van-list>
      </van-pull-refresh>
    </div>

    <div class="p-2">
      <van-button block type="primary" @click="onStartExam">
        {{ examList.length > 0 ? '再来一次' : '开始考试' }}
      </van-button>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import RecordItem from './record-item.vue'
import { delExam, listExam } from '@/api/exam/exam'
import type { ExamQuery, ExamVO } from '@/api/exam/exam/types'
import { useList, usePopup } from '@/hooks'
import { useStore } from '@/store'

interface OpenOptions {
  title: string
  paperId: string
  path: string
}

// 代理
const { proxy } = getCurrentInstance() as ComponentInternalInstance
// 加载
const { confirm, msgSuccess, loading } = proxy.$modal
// 用户
const { user } = useStore()
// 弹窗
const { title, visible, openPopup } = usePopup()

const paperId = ref<string>()
const path = ref<string>(undefined)

// 考试记录列表
const {
  queryParams: examQueryParams,
  list: examList,
  loading: examLoading,
  finished: examFinished,
  refreshing: examRefreshing,
  error: examError,
  finishedText: examFinishedText,
  errorText: examErrorText,
  onLoad: onLoadExam,
  onRefresh: onRefreshExam,
} = useList<ExamVO, ExamQuery>({
  initQueryParams: {
    userId: user.info.userId,
    paperId: undefined,
    pageNum: 1,
    pageSize: 20,
  },
  request: listExam,
})

// 关闭弹窗回调
function onClosePopup() {
  examFinished.value = false
  examLoading.value = false
  examError.value = false
  examList.value = []
}

// 开始考试
function onStartExam() {
  proxy.$router.push({
    path: path.value,
    query: {
      paperId: paperId.value,
    },
  })
}

// 查看
function onViewExam(item: ExamVO) {
  proxy.$router.push({
    path: path.value,
    query: {
      paperId: paperId.value,
      examId: item.id,
      type: 'view',
    },
  })
}

// 继续考试
async function onContinueExam(item: ExamVO) {
  proxy.$router.push({
    path: path.value,
    query: {
      paperId: paperId.value,
      examId: item.id,
    },
  })
}

// 删除考试
async function onDeleteExam(item: ExamVO, index: number) {
  confirm('是否删除这次考试记录', { confirmButtonText: '删除', cancelButtonText: '取消' })
    // 确认
    .then(async () => {
      loading('删除中')
      const { msg } = await delExam(item.id)
      msgSuccess(msg)
      examList.value.splice(index, 1)
    })
    // 取消
    .catch(() => {})
}

// 打开弹窗
function open(options: OpenOptions) {
  openPopup()

  // 设置标题、试卷ID、路径
  title.value = options.title
  paperId.value = options.paperId
  path.value = options.path
  examQueryParams.value.paperId = options.paperId
  examQueryParams.value.pageNum = 1
}

defineExpose({
  open,
})
</script>
