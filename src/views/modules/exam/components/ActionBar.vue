<template>
  <van-action-bar class="relative">
    <van-action-bar-button type="primary" text="交卷" :disabled="examStatus === 'view'" @click="onSubmit" />
    <van-action-bar-icon icon="checked" color="#3498DB">
      <span class="text-xs text-[#3498DB]">{{ correctCount }}</span>
    </van-action-bar-icon>
    <van-action-bar-icon icon="clear" color="#E74C3C">
      <span class="text-xs text-[#E74C3C]">{{ errorCount }}</span>
    </van-action-bar-icon>
    <van-action-bar-icon icon="apps-o" @click="onQuestionListClick">
      <div class="flex justify-center text-xs">
        <span class="font-bold">{{ currentIndex }}</span>
        <span>/</span>
        <span>{{ paper.totalCount }}</span>
      </div>
    </van-action-bar-icon>
  </van-action-bar>
</template>

<script setup lang='ts'>
import type { ExamStatus } from '../helper'
import type { PaperVO } from '@/api/exam/paper/types'

defineProps<{
  correctCount: number
  errorCount: number
  currentIndex: number
  totalCount: number
  paper: PaperVO
  examStatus: ExamStatus
}>()

const emit = defineEmits<{
  (e: 'list-icon-click'): void
  (e: 'submit'): void
}>()

// 点击题目列表
function onQuestionListClick() {
  emit('list-icon-click')
}

// 交卷
function onSubmit() {
  emit('submit')
}
</script>
