<template>
  <van-cell
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

    <template #label>
      <div>开始时间：{{ item.startTime }}</div>
      <div v-if="!isNil(item.endTime)">
        结束时间：{{ item.endTime }}
      </div>
    </template>

    <template #value>
      <div class="h-full flex items-center justify-end gap-1">
        <van-button v-if="item.status === '2'" type="primary" size="small" @click="onView">
          查看
        </van-button>
        <template v-if="item.status !== '2'">
          <van-button type="primary" size="small" @click="onContinue">
            继续
          </van-button>
          <van-button type="danger" size="small" @click="onDelete">
            删除
          </van-button>
        </template>
      </div>
    </template>
  </van-cell>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import type { ExamVO } from '@/api/exam/exam/types'

defineProps<{
  item: ExamVO
}>()

const emits = defineEmits(['view', 'continue', 'delete'])

function onView() {
  emits('view')
}

function onContinue() {
  emits('continue')
}

function onDelete() {
  emits('delete')
}
</script>
