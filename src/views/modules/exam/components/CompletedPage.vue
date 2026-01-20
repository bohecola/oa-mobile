<template>
  <div v-loading="loading" class="flex flex-col items-center justify-center gap-3 h-full">
    <template v-if="isExternalExam">
      <p>
        <span>考试成绩：</span>
        <span class="text-xl font-bold">{{ totalScore }}</span> 分
      </p>
      <div class="w-28">
        <van-button
          type="primary"
          size="small"
          round
          block
          @click="proxy.$router.push(`/wechat-exam-entry?userName=${exam.userName}&phonenumber=${exam.phonenumber}&reLogin=true`)"
        >
          返回
        </van-button>
      </div>
    </template>

    <template v-else>
      <template v-if="paper.isExistsJdt !== 'Y'">
        <van-circle
          :current-rate="totalScore"
          :rate="paper.totalScore"
          :speed="100"
          :color="color"
          :layer-color="layerColor"
          :text="isPassed ? '通过' : '未通过'"
          :stroke-width="120"
        />

        <p v-if="isPassed" cclass="text-2xl text-green-400">
          恭喜你！通过考试🎉
        </p>
        <p v-else class="text-2xl text-red-400">
          很遗憾，未通过考试😭
        </p>
      </template>

      <div>
        考试成绩：<span class="text-xl font-bold">{{ totalScore }}</span> 分
      </div>

      <div class="w-28">
        <van-button
          v-if="isMockExam || isTrainingExam"
          class="mt-3"
          type="primary"
          block
          @click="mockGoBack"
        >
          返回
        </van-button>
      </div>
    </template>

    <div v-if="paper.isExistsJdt === 'Y'" class="mt-2">
      <div class="text-sm opacity-50 mb-2">
        <p>当前考试包含简答题，存在人工阅卷过程</p>
      </div>
      <van-button
        type="primary"
        block
        @click="getExamDetail"
      >
        点击查询最新数据
      </van-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getExam } from '@/api/exam/exam'
import type { ExamVO } from '@/api/exam/exam/types'
import type { PaperVO } from '@/api/exam/paper/types'

const props = defineProps<{
  paper: PaperVO
  exam: ExamVO
  isExternalExam: boolean
  isMockExam: boolean
  isTrainingExam: boolean
}>()

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const loading = ref(false)

const totalScore = ref<number>(0)

const isPassed = computed(() => {
  const { paper } = props
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

// 获取考试详情
async function getExamDetail() {
  loading.value = true
  const { data } = await getExam(props.exam.id).finally(() => loading.value = false)
  totalScore.value = Number(data.totalScore ?? 0)
}

onMounted(() => {
  if (props.paper.isExistsJdt) {
    getExamDetail()
  }
})

function mockGoBack() {
  if (props.isMockExam) {
    proxy.$router.replace('/mock-exam-entry')
  }

  if (props.isTrainingExam) {
    proxy.$router.replace('/training-exam-entry')
  }
}
</script>
