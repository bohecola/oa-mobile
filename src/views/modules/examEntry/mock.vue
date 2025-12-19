<template>
  <div>
    <NavBar />

    <van-pull-refresh v-model="paperRefreshing" @refresh="onRefreshPaper">
      <!-- 试卷列表 -->
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

    <!-- 考试记录弹窗 -->
    <RecordPopup ref="recordPopupRef" />
  </div>
</template>

<script setup lang="ts">
import { usePaperList } from './helper'
import RecordPopup from './components/record-popup.vue'
import type { PaperVO } from '@/api/exam/paper/types'

// 引用
const recordPopupRef = ref<InstanceType<typeof RecordPopup>>()
// 当前试卷
const currentPaper = ref<PaperVO>(undefined)

// 试卷列表
const {
  list: paperList,
  loading: paperLoading,
  finished: paperFinished,
  error: paperError,
  refreshing: paperRefreshing,
  onRefresh: onRefreshPaper,
  onLoad: onLoadPaper,
} = usePaperList({ query: { paperType: '1' } })

// 点击模拟试卷
async function onItemClick(item: PaperVO) {
  // 设置当前试卷
  currentPaper.value = item
  // 打开考试记录弹窗
  recordPopupRef.value?.open({
    title: item.paperName,
    paperId: item.id,
    path: '/mock-exam',
  })
}
</script>
