import { isEqual, isNil, sortBy } from 'lodash-es'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import Big from 'big.js'
import type { PaperVO } from '@/api/exam/paper/types'
import type { QuestionVO } from '@/api/exam/question/types'
import type { DoExamQrCodeParams, ExamHistoryRecordVO, ExamVO, UpdateExamRecordData } from '@/api/exam/exam/types'
import { getExamPaper } from '@/api/exam/paper'
import { doExamMock, doExamQrCode, getExamQuestion, submitExam, updateExamRecord } from '@/api/exam/exam'

dayjs.extend(duration)

export type PaperStatus = 'notEffective' | 'effective' | 'expired' | 'pending'
export type ExamStatus = 'notStart' | 'inProgress' | 'completed' | 'view'

export interface ExamOptions {
  paperId: string
  examId?: string
  isView?: boolean
}

// 试卷
export function usePaper(id: string) {
  const { proxy } = getCurrentInstance() as ComponentInternalInstance
  // 加载
  const { loading, closeLoading } = proxy.$modal

  // 试卷
  const paper = ref<PaperVO>(undefined)

  // 试卷生效状态
  const paperStatus = computed<PaperStatus>(() => {
    if (isNil(paper.value)) {
      return 'pending'
    }

    const { startTime, endTime } = paper.value
    const startTimestamp = dayjs(startTime).valueOf()
    const endTimestamp = dayjs(endTime).valueOf()
    const currentTimestamp = dayjs().valueOf()

    if (currentTimestamp < startTimestamp) {
      return 'notEffective'
    }
    else if (currentTimestamp >= startTimestamp && currentTimestamp <= endTimestamp) {
      return 'effective'
    }
    else {
      return 'expired'
    }
  })

  async function fetchPaper() {
    loading()

    const { data } = await getExamPaper(id).finally(closeLoading)

    paper.value = data
  }

  return {
    paper,
    paperStatus,
    fetchPaper,
  }
}

// 考试
export function useExam(options: ExamOptions) {
  const { paperId, examId, isView } = options

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 试卷
  const { paper, paperStatus, fetchPaper } = usePaper(paperId as string)

  // 加载
  const { loading, closeLoading, confirm } = proxy.$modal

  // 考试数据
  const exam = ref<ExamVO>(undefined)

  // 考试状态
  const examStatus = ref<ExamStatus>('notStart')

  // 考试开始时间
  const startTime = ref<string>(undefined)

  // 考试结束时间
  const endTime = ref<string>(undefined)

  // 倒计时
  const { remainingTime, startCountdown, stopCountdown } = useCountdown(
    () => endTime.value,
    {
      onFinish: async () => {
        await doSubmitExam()
      },
    },
  )

  // 当前题目索引
  const currentIndex = ref(1)

  // 当前题目对象
  const currentQuestion = ref<QuestionVO>({})

  // 当前题目答案
  const currentAnswer = ref<string>(undefined)

  // 当前题目答案排序后
  const currentAnswerSorted = computed(() => isNil(currentAnswer.value) ? undefined : sortBy(currentAnswer.value).join(''))

  // 题目列表
  const itemList = ref<ExamHistoryRecordVO[]>([])

  // 当前回答是否正确
  const isCurrentCorrect = computed(() => isAnswerEqual(currentAnswer.value, currentQuestion.value.correctAnswer))

  // 考试类型
  const isMockExam = computed(() => proxy.$route.path === '/mock-exam')
  const isExternalExam = computed(() => proxy.$route.path === '/external-exam')
  const isInternalExam = computed(() => proxy.$route.path === '/internal-exam')
  const isRealExam = computed(() => isExternalExam.value || isInternalExam.value)

  // 未作答数量
  const unAnsweredCount = computed(() => itemList.value.filter(({ userAnswer }) => isNil(userAnswer)).length)

  // 正确数量
  const correctCount = computed(() => getCountByCorrect('Y'))

  // 错误数量
  const errorCount = computed(() => getCountByCorrect('N'))

  // 总分
  const totalScore = computed(() => {
    const totalScore = itemList.value.reduce<Big.Big>((prev, item) => {
      if (item.isCorrect === 'Y') {
        return prev.add(item.score)
      }

      return prev.add(0)
    }, Big(0))

    return totalScore.toNumber()
  })

  // 当前题目选项
  const currentOptions = computed(() => {
    const options = JSON.parse(currentQuestion.value?.options ?? '{}') as Record<string, string>

    return Object
      .entries(options)
      .map(([value, label]) => {
        return {
          value,
          label: `${value}. ${label}`,
        }
      })
  })

  // 是否多选
  const isMultiple = computed(() => currentQuestion.value.type === '2')

  // 是否禁用选择
  const isDisabled = computed(() => {
    if (isView) {
      return true
    }

    const isAnswered = !isNil(currentAnswer.value)

    const item = itemList.value.find(e => e.currentIndex === currentIndex.value)

    return isAnswered && !isNil(item.userAnswer)
  })

  // 是否最后一题
  const isLast = computed(() => currentIndex.value === itemList.value.length)

  // 根据是否正确获取数量
  function getCountByCorrect(correct: 'Y' | 'N') {
    return itemList.value.reduce((prev, item) => {
      if (item.isCorrect === correct) {
        return ++prev
      }

      return prev
    }, 0)
  }

  // 开始考试
  async function doExam(type: 'real' | 'mock', value?: DoExamQrCodeParams) {
    loading('正在加载考试信息')

    // 获取考试信息
    const { data } = type === 'real'
      ? await doExamQrCode(value)
      : await doExamMock({ paperId, id: examId })

    // 设置考试数据
    exam.value = data

    // 设置考试开始时间
    startTime.value = data.startTime

    // 设置真实考试结束时间
    if (type === 'real') {
      endTime.value = dayjs(data.startTime)
        .add(paper.value.duration, 'minute')
        .format('YYYY-MM-DD HH:mm:ss')
    }

    // 设置模拟考试结束时间 = 当前时间 + 剩余秒数
    if (type === 'mock') {
      // 剩余秒数 = 考试时长 - 已作答时长
      const remainingSeconds = paper.value.duration * 60 - data.duration
      // 当前时间
      const now = dayjs()
      // 结束时间
      endTime.value = now
        .add(remainingSeconds, 'second')
        .format('YYYY-MM-DD HH:mm:ss')
    }

    // 设置当前题目索引
    currentIndex.value = data.currentIndex

    // 设置题目列表
    itemList.value = data.historyRecordList

    // 设置当前题目
    const { data: question } = await getExamQuestion(exam.value.id, currentIndex.value)
    currentQuestion.value = question

    // 设置当前题目答案
    currentAnswer.value = itemList.value.find(e => e.currentIndex === currentIndex.value)?.userAnswer

    closeLoading()

    // 查看考试
    if (isView) {
      // 设置考试状态 => 查看
      return examStatus.value = 'view'
    }

    const now = dayjs()
    const end = dayjs(endTime.value)

    // 当前时间大于考试结束时间
    if (now.isAfter(end)) {
      // 设置考试状态 => 已结束
      return examStatus.value = 'completed'
    }

    // 考试状态 => 已结束
    if (data.status === '2') {
      // 设置考试状态 => 已结束
      return examStatus.value = 'completed'
    }

    // 设置考试状态 => 进行中
    examStatus.value = 'inProgress'

    // 开始倒计时
    startCountdown()
  }

  // 保存答题纪录
  async function updateItem() {
    // 答案是否正确
    const isCorrect = isAnswerEqual(currentAnswer.value, currentQuestion.value.correctAnswer)

    // 保存答题记录
    for (const item of itemList.value) {
      if (item.currentIndex === currentIndex.value) {
        item.userAnswer = currentAnswerSorted.value
        item.isCorrect = isCorrect ? 'Y' : 'N'

        await updateExamRecord(item as UpdateExamRecordData)
        break
      }
    }
  }

  // 跳转目标题目
  async function turnTo(index: number) {
    // 获取目标题目
    const { data: question } = await getExamQuestion(exam.value.id, index)

    // 获取目标答题记录项
    const item = itemList.value.find(e => e.currentIndex === index)

    // 设置当前题目
    currentQuestion.value = question

    // 设置用户答案
    currentAnswer.value = item.userAnswer

    // 更新题目索引
    currentIndex.value = index

    // 返回题目和答题记录项
    return { question, item }
  }

  // 加载下一题
  async function next() {
    // 跳转到下一题
    await turnTo(currentIndex.value + 1)
  }

  // 自动下一题
  async function autoNext() {
    loading('保存中')
    // 保存答题纪录
    await updateItem()

    // 最后一题
    if (isLast.value) {
      closeLoading()

      // 内部考试、面试考试
      if (isRealExam.value) {
        // 提示交卷
        confirm('答题已结束，请确认交卷')
          .then(async () => {
            // 停止计时
            stopCountdown()
            // 交卷
            await doSubmitExam()
          })
          .catch(() => {})
      }

      return
    }

    // 模拟考试
    if (isMockExam.value && !isCurrentCorrect.value) {
      // 当前题目回答不正确不自动下一题
      closeLoading()
      return
    }

    loading('加载下一题中')

    // 加载下一题
    await next()

    closeLoading()
  }

  // 交卷
  async function doSubmitExam() {
    loading('交卷中')

    await submitExam(exam.value.id)

    stopCountdown()

    closeLoading()

    examStatus.value = 'completed'
  }

  // 退出考试
  async function exitExam() {
    stopCountdown()

    proxy.$router.push('/exam')
  }

  return {
    paper,
    paperStatus,
    isRealExam,
    isMockExam,
    isExternalExam,
    isInternalExam,
    fetchPaper,

    remainingTime,

    exam,
    examStatus,
    startTime,
    endTime,
    currentIndex,
    currentQuestion,
    itemList,
    currentAnswer,
    currentAnswerSorted,
    isCurrentCorrect,
    unAnsweredCount,
    correctCount,
    errorCount,
    totalScore,
    currentOptions,
    isMultiple,
    isDisabled,
    isLast,

    doExam,
    exitExam,

    updateItem,
    turnTo,
    next,
    autoNext,
    doSubmitExam,

    stopCountdown,
  }
}
// 判断作答是否正确
export function isAnswerEqual(answer: string, correctAnswer: string) {
  return isEqual(sortBy(answer), sortBy(correctAnswer))
}

// 获取题目类型颜色
export function getQuestionTypeColor(type: string) {
  switch (type) {
    // 单选题 => 深天蓝
    case '1':
      return '#3498DB'
    // 多选题 => 浅紫色
    case '2':
      return '#9B59B6'
    // 判断题 => 深橙色
    case '3':
      return '#E67E22'
  }
}

// 获取题目难度颜色
export function getQuestionDifficultyColor(difficulty: string) {
  switch (difficulty) {
    // 一级难度 => 绿色
    case '1':
      return '#27AE60'
    // 二级难度 => 橙色
    case '2':
      return '#F39C12'
    // 三级难度 => 紫色
    case '3':
      return '#8E44AD'
  }
}

// 获取题目类别颜色
export function getQuestionCategoryColor(category: string) {
  switch (category) {
    // 安全考试 => 蓝色
    case '1':
      return '#2E86C1'
    // 消防安全 => 红色
    case '2':
      return '#E74C3C'
    // 电工基础 => 黄色
    case '3':
      return '#F1C40F'
  }
}

// 获取倒计时
export function useCountdown(
  targetTime: string | (() => string),
  options: {
    onFinish?: () => void
  } = {},
) {
  const { onFinish } = options

  const remainingTime = ref('00:00:00')
  const isFinished = ref(false)

  let timer: ReturnType<typeof setTimeout> | null

  function updateCountdown() {
    const now = dayjs()
    const target = dayjs(
      typeof targetTime === 'function'
        ? targetTime()
        : targetTime,
    )
    const diff = target.diff(now)

    if (diff <= 0) {
      remainingTime.value = '00:00:00'
      isFinished.value = true
      clearInterval(timer)
      onFinish?.()
      return
    }

    remainingTime.value = dayjs.duration(diff).format('HH:mm:ss')
  }

  function startCountdown() {
    updateCountdown()
    timer = setInterval(updateCountdown, 1000)
  }

  function pauseCountdown() {
    clean()
  }

  function resumeCountdown() {
    startCountdown()
  }

  function stopCountdown() {
    pauseCountdown()
  }

  function clean() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }
  })

  return {
    remainingTime,
    isFinished,
    startCountdown,
    pauseCountdown,
    resumeCountdown,
    stopCountdown,
  }
}
