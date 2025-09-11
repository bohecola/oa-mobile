<template>
  <div>
    <NavBar />

    <van-pull-refresh v-model="paperRefreshing" @refresh="onRefreshPaper">
      <van-list
        v-model:loading="paperLoading"
        v-model:error="paperError"
        :finished="paperFinished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoadPaper"
      >
        <van-cell
          v-for="item in paperList"
          :key="item.id"
          :title="item.paperName"
          @click="onItemClick(item)"
        />
      </van-list>
    </van-pull-refresh>

    <van-popup
      v-model:show="visible"
      position="bottom"
      class="h-[60vh]"
      destroy-on-close
      safe-area-inset-bottom
      @closed="onClosePopup"
    >
      <div class="h-10 leading-10 border-b text-center font-bold">
        {{ currentPaper?.paperName }}
      </div>
      <div class="h-[calc(100%-var(--van-button-default-height)-theme('spacing.14'))] overflow-y-auto">
        <van-list
          v-model:loading="examLoading"
          v-model:error="examError"
          :finished="examFinished"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="onLoadExam"
        >
          <van-cell
            v-for="(item, index) in examList"
            :key="item.id"
            :title="item.id"
            :label="`开始时间：${item.startTime}`"
            title-class="!flex-[2]"
          >
            <template #title>
              <div class="flex gap-2">
                <div>
                  <span>正确</span>
                  <span class="ml-1 italic font-bold text-base text-green-500">{{ item.correctCount }}</span>
                </div>
                <div>
                  <span>得分</span>
                  <span class="ml-1 italic font-bold text-base text-blue-500">{{ item.totalScore }}</span>
                </div>
              </div>
            </template>

            <template #value>
              <div class="h-full flex items-center justify-end gap-1">
                <van-button v-if="item.status === '2'" type="primary" size="small" @click="onViewExam(item)">
                  查看
                </van-button>
                <van-button v-if="item.status !== '2'" type="primary" size="small" @click="onContinueExam(item)">
                  继续
                </van-button>
                <van-button type="danger" size="small" @click="onDeleteExam(item, index)">
                  删除
                </van-button>
              </div>
            </template>
          </van-cell>
        </van-list>
      </div>

      <div class="p-2">
        <van-button block type="primary" @click="onStartExam">
          {{ examList.length > 0 ? '再来一次' : '开始考试' }}
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { useMockExam, useMockPaper } from './helper'
import { usePopup } from '@/hooks'
import { delExam } from '@/api/exam/exam'
import type { PaperVO } from '@/api/exam/paper/types'
import type { ExamVO } from '@/api/exam/exam/types'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 加载
const { confirm, msgSuccess, loading } = proxy.$modal

// 弹窗
const { visible, openPopup } = usePopup()

// 当前试卷
const currentPaper = ref<PaperVO>(undefined)
const currentPaperId = ref(undefined)

// 模拟试卷
const {
  list: paperList,
  loading: paperLoading,
  finished: paperFinished,
  error: paperError,
  refreshing: paperRefreshing,
  onRefresh: onRefreshPaper,
  onLoad: onLoadPaper,
} = useMockPaper()

// 考试记录
const {
  list: examList,
  loading: examLoading,
  finished: examFinished,
  error: examError,
  onLoad: onLoadExam,
} = useMockExam(currentPaperId)

// 开始考试
async function onStartExam() {
  proxy.$router.push({
    path: '/mock-exam',
    query: {
      paperId: currentPaperId.value,
    },
  })
}

// 查看考试
async function onViewExam(item: ExamVO) {
  proxy.$router.push({
    path: '/mock-exam',
    query:
    {
      paperId: currentPaperId.value,
      examId: item.id,
      type: 'view',
    },
  })
}

// 继续考试
async function onContinueExam(item: ExamVO) {
  proxy.$router.push({
    path: '/mock-exam',
    query: {
      paperId: currentPaperId.value,
      examId: item.id,
    },
  })
}

// 删除考试
async function onDeleteExam(item: ExamVO, index: number) {
  confirm('是否删除这次考试记录', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
  })
    .then(async () => {
      loading('删除中')

      const { msg } = await delExam(item.id)
      msgSuccess(msg)

      examList.value.splice(index, 1)
    })
    .catch(() => {})
}

// 关闭弹窗回调
function onClosePopup() {
  examFinished.value = false
  examLoading.value = false
  examError.value = false
  examList.value = []

  currentPaper.value = undefined
  currentPaperId.value = undefined
}

// 点击模拟试卷
async function onItemClick(item: PaperVO) {
  currentPaper.value = item
  currentPaperId.value = item.id

  openPopup()
}
</script>
