<template>
  <div class="flex flex-col items-center justify-center gap-3 h-full">
    <template v-if="isExternalExam">
      <p>
        考试成绩：<span class="text-xl font-bold">{{ totalScore }}</span> 分
      </p>
      <div class="w-28">
        <van-button type="primary" size="small" round block @click="proxy.$router.push(`/wechat-exam-entry?userName=${exam.userName}&phonenumber=${exam.phonenumber}&reLogin=true`)">
          返回
        </van-button>
      </div>
    </template>

    <template v-else>
      <van-circle
        :current-rate="totalScore"
        :rate="paper.totalScore"
        :speed="100"
        :color="color"
        :layer-color="layerColor"
        :text="isPassed ? '通过' : '未通过'"
        :stroke-width="120"
      />

      <div class="text-center">
        <div v-if="isPassed" class="flex flex-col gap-1">
          <p class="text-2xl text-green-400">
            恭喜你！通过考试🎉
          </p>
          <p>
            考试成绩：<span class="text-xl font-bold">{{ totalScore }}</span> 分
          </p>
          <p>再接再厉！</p>
        </div>

        <div v-else class="flex flex-col gap-1">
          <p class="text-2xl text-red-400">
            很遗憾，未通过考试😭
          </p>
          <p>
            考试成绩：<span class="text-xl font-bold">{{ totalScore }}</span> 分
          </p>
          <p>继续加油！</p>
        </div>

        <van-button
          v-if="isMockExam"
          class="mt-3"
          type="primary"
          block
          @click="goBack"
        >
          返回
        </van-button>
      </div>
    </template>
  </div>
</template>

<script setup lang='ts'>
import type { ExamVO } from '@/api/exam/exam/types'
import type { PaperVO } from '@/api/exam/paper/types'

const props = defineProps<{
  totalScore: number
  paper: PaperVO
  exam: ExamVO
  isExternalExam: boolean
  isMockExam: boolean
}>()

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const isPassed = computed(() => {
  const { paper, totalScore } = props
  return Number(totalScore) >= Number(paper.passScore)
})

const color = computed(() => {
  if (isPassed.value) {
    return '#4CAF50'
  }

  return '#F44336'
})

const layerColor = computed(() => {
  if (isPassed.value) {
    return '#E8F5E9'
  }

  return '#FFEBEE'
})

function goBack() {
  proxy.$router.push('/exam')
}
</script>
