<template>
  <div>
    <div
      v-if="examStatus === 'notStart' && isRealExam"
      class="w-full h-full flex items-center justify-center warp-background"
    >
      <LaunchPage
        ref="LaunchPageRef"
        :class="{ hidden: isExternalExam && paperStatus === 'effective' }"
        :paper="paper"
        :paper-status="paperStatus"
        class="-translate-y-16"
        @submit="onSubmitExaminee"
      />
    </div>

    <ViewPage v-if="isView" :exam-id="examId" :question-type-options="oa_exam_question_type" />

    <template v-else>
      <div v-if="examStatus === 'inProgress'" class="h-full select-none">
        <NavBar
          :title="`倒计时 ${remainingTime}`"
          :is-left-click-back="false"
          :right-disabled="isLast"
          title-class="text-red-600"
          @click-left="onBackClick"
        >
          <template v-if="!isRealExam" #right>
            <span class="text-[--van-primary-color]" @click="onNextQuestion">下一题</span>
          </template>
        </NavBar>

        <!-- 内容 -->
        <main class="question py-6 px-3 border-b overflow-y-auto bg-[--bg-card]">
          <div class="flex gap-2">
            <!-- 题目类型 -->
            <van-tag :color="getQuestionTypeColor(currentQuestion.type)" size="large">
              <dict-tag :options="oa_exam_question_type" :value="currentQuestion.type" tag-class="text-base" />
            </van-tag>
          </div>

          <!-- 题干 -->
          <div v-if="!isEmpty(currentQuestion)" class="my-3 text-lg">
            <span>{{ `${currentIndex}. ${currentQuestion.content}` }}</span>
            <span>【{{ currentQuestion.score }}分】</span>
          </div>

          <!-- 简答题输入框 -->
          <van-field
            v-if="isFieldQuestion"
            v-model.trim="currentAnswer"
            rows="2"
            type="textarea"
            maxlength="200"
            placeholder="请输入答案"
            autosize
            clearable
            show-word-limit
            :disabled="isDisabled"
          />

          <!-- 选择题选项 -->
          <DictSelect
            v-if="isSelectQuestion"
            v-model="currentAnswer"
            class="!p-1"
            label-class="text-base"
            direction="vertical"
            group-class="flex flex-col gap-3 w-full text-lg"
            icon-size="20"
            separator=""
            :component="isMultiple ? 'checkbox' : 'radio'"
            :multiple="isMultiple"
            :options="currentOptions"
            :border="false"
            :disabled="isDisabled"
            @radio-click="onRadioClick"
          />

          <div v-if="!isDisabled" class="flex justify-center">
            <van-button
              class="my-3 w-[40%]"
              type="primary"
              block
              round
              size="small"
              @click="onConfirmAnswer"
            >
              确认
            </van-button>
          </div>

          <!-- 解析 -->
          <div v-if="isDisabled && isMockExam" class="mt-3 text-sm rounded">
            <div v-if="isSelectQuestion" class="p-3 flex gap-1 font-bold bg-[--bg-color]">
              <template v-if="isJsonQuestion">
                <span>您选择</span>
                <span class="font-bold text-blue-500">{{ currentAnswerSorted }}</span>
              </template>
              <template v-else>
                <span>答案</span>
                <span class="text-blue-500">{{ currentQuestion.correctAnswer }}</span>
                <span>您选择</span>
                <span class="font-bold" :class="[isCurrentCorrect ? 'text-blue-500' : 'text-red-500']">{{ currentAnswerSorted }}</span>
              </template>
            </div>

            <div class="p-2">
              <div v-if="currentQuestion.analysis">
                解析：{{ currentQuestion.analysis }}
              </div>
              <div v-else>
                暂无解析
              </div>
            </div>
          </div>
        </main>

        <!-- 底部 -->
        <ActionBar
          v-if="!isNil(exam)"
          :correct-count="correctCount"
          :error-count="errorCount"
          :current-index="currentIndex"
          :total-count="paper.totalCount"
          :paper="paper"
          :exam-status="examStatus"
          @list-icon-click="onListIconClick"
          @submit="onSubmitPaper"
        />

        <van-popup
          v-model:show="visible"
          class="h-[70%]"
          position="bottom"
          destroy-on-close
        >
          <ActionBar
            v-if="!isNil(exam)"
            :correct-count="correctCount"
            :error-count="errorCount"
            :current-index="currentIndex"
            :total-count="paper.totalCount"
            :paper="paper"
            :exam-status="examStatus"
            :safe-area-inset-bottom="false"
            @list-icon-click="onListIconClick"
            @submit="onSubmitPaper"
          />

          <div class="h-[calc(100%-var(--van-action-bar-height))] border-t overflow-y-auto">
            <div class="p-2 grid grid-cols-6 gap-2 place-items-center">
              <div
                v-for="item in itemList"
                :key="item.id"
                class="h-10 w-10 rounded-full leading-10 border text-center text-sm"
                :class="{
                  'bg-blue-500/20 text-blue-500': item.isCorrect === 'Y',
                  'bg-red-500/20 text-red-500': item.isCorrect === 'N',
                  'border-blue-500': item.currentIndex === currentIndex && (isNil(item.userAnswer) || item.isCorrect === 'Y'),
                  'border-red-500': item.currentIndex === currentIndex && item.isCorrect === 'N',
                  'border-none': item.currentIndex !== currentIndex && !isNil(item.isCorrect),
                }"
                @click="onItemClick(item)"
              >
                {{ item.currentIndex }}
              </div>
            </div>
          </div>
        </van-popup>
      </div>

      <CompletedPage
        v-if="examStatus === 'completed'"
        :total-score="totalScore"
        :exam="exam"
        :paper="paper"
        :is-mock-exam="isMockExam"
        :is-external-exam="isExternalExam"
      />
    </template>
  </div>
</template>

<script setup lang='ts'>
import dayjs from 'dayjs'
import { isEmpty, isNil } from 'lodash-es'
import type { LocationQueryValue } from 'vue-router'
import ActionBar from './components/ActionBar.vue'
import LaunchPage from './components/LaunchPage.vue'
import CompletedPage from './components/CompletedPage.vue'
import ViewPage from './components/ViewPage.vue'
import { getQuestionTypeColor, useExam } from './helper'
import type { DoExamQrCodeParams, ExamHistoryRecordVO } from '@/api/exam/exam/types'
import { usePopup } from '@/hooks'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const LaunchPageRef = ref<InstanceType<typeof LaunchPage>>()

// 参数
const { paperId, examId, type, iouId, qrCodeExpireTimestamp } = proxy.$route.query as Record<string, LocationQueryValue>

// 是否查看模式
const isView = type === 'view'

// 提示
const { loading, closeLoading, confirm, msg } = proxy.$modal

// 弹窗
const { visible, closePopup, togglePopup } = usePopup()

// 字典
const { oa_exam_question_type } = toRefs(proxy.useDictNoAuth('oa_exam_question_type'))

// 考试
const {
  // 试卷
  paper,
  paperStatus,
  isExternalExam,
  isMockExam,
  isRealExam,
  isInternalExam,
  // 倒计时
  remainingTime,

  // 考试
  exam,
  // 考试状态
  examStatus,

  // 当前题目
  currentIndex,
  currentQuestion,
  currentOptions,
  currentAnswer,
  currentAnswerSorted,
  isCurrentCorrect,
  isSelectQuestion,
  isFieldQuestion,
  isJsonQuestion,

  // 答题记录
  itemList,
  unAnsweredCount,
  correctCount,
  errorCount,
  totalScore,

  // 其他状态
  isMultiple,
  isDisabled,
  isLast,

  // 获取试卷
  fetchPaper,

  // 开始考试
  doExam,

  // 跳转题目
  turnTo,

  // 下一题
  next,

  // 自动下一题
  autoNext,

  // 交卷
  doSubmitExam,

  // 退出考试
  exitExam,
} = useExam({
  paperId,
  examId,
  isView,
  qrCodeExpireTimestamp,
})

// 输入姓名、手机号确定
async function onSubmitExaminee(value: DoExamQrCodeParams) {
  doExam('real', value)
}

// 点击左上角回退按钮
function onBackClick() {
  // 真实考试
  if (isRealExam.value) {
    // 提示交卷
    return onSubmitPaper()
  }

  confirm('确认是否退出考试')
    .then(exitExam)
    .catch(() => {})
}

// 点击题目列表
function onListIconClick() {
  togglePopup()
}

// 单选点击
function onRadioClick() {
  if (isDisabled.value)
    return void 0

  // nextTick(autoNext)
}

// 确认点击
async function onConfirmAnswer() {
  if (isEmpty(currentAnswer.value))
    return msg(`请${isSelectQuestion.value ? '选择' : '输入'}答案`)

  // if (currentAnswer.value.length === 1) {
  //   return msg('请选择多个答案')
  // }

  if (isDisabled.value)
    return

  // 自动下一题
  await autoNext()
}

// 答题记录项点击
async function onItemClick(item: ExamHistoryRecordVO) {
  if (currentIndex.value === item.currentIndex)
    return

  if (isRealExam.value)
    return msg('当前考试不允许跳转题目，请按顺序答题')

  loading('正在加载目标题目')

  closePopup()

  // 跳转到目标题目
  await turnTo(item.currentIndex)

  closeLoading()
}

// 点击下一题按钮
async function onNextQuestion() {
  if (isLast.value)
    return

  loading('正在加载下一题')

  await next()

  closeLoading()
}

// 交卷
function onSubmitPaper() {
  const confirmText = unAnsweredCount.value > 0
    ? `当前还有 ${unAnsweredCount.value} 道题未答，确定要交卷吗？`
    : '确定要交卷吗？'

  confirm(confirmText)
    .then(doSubmitExam)
    .catch(() => {})
}

// 页面挂载
onMounted(async () => {
  if (!isView) {
    // 获取试卷
    await fetchPaper()

    // 模拟考试
    if (isMockExam.value) {
      return await doExam('mock')
    }

    // 内部考试
    if (isInternalExam.value) {
      // 当前时间戳
      const now = dayjs().valueOf()

      // 判断二维码是否过期
      if (now > Number(qrCodeExpireTimestamp)) {
        return proxy.$router.push('/qrcode-expired')
      }
    }

    // 微信公众号中转页面自动登录
    if (['effective', 'expired'].includes(paperStatus.value) && !isNil(iouId)) {
      return LaunchPageRef.value?.doManualLogin()
    }
  }
})
</script>

<style lang="scss" scoped>
$topHeight: calc(var(--van-nav-bar-height) + env(safe-area-inset-top));
$bottomHeight: calc(var(--van-action-bar-height) + env(safe-area-inset-bottom));

.question {
  height: calc(100vh - $topHeight - $bottomHeight);
}
</style>
