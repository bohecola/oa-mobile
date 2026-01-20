<template>
  <div class="h-full">
    <NavBar
      :is-left-click-back="false"
      @click-left="onBackClick"
    >
      <template #title>
        <van-tabs v-model:active="currentTab" type="card" @change="onTabChange">
          <van-tab v-for="item in tabOptions" :key="item.value" :name="item.value" :title="item.label" />
        </van-tabs>
      </template>
    </NavBar>

    <main id="content" class="scroll-container-base py-6 px-3 border-b bg-[--bg-card]">
      <van-empty
        v-show="isEmpty(currentList)"
        :image="customEmptyImage"
        image-size="100"
        description="暂无数据"
      />

      <div v-for="item in currentList" :key="item.id">
        <div>
          <span>{{ item.currentIndex }}.</span>
          <van-tag class="mx-2" :color="getQuestionTypeColor(item.type)">
            <dict-tag
              :options="questionTypeOptions"
              :value="item.type"
              tag-class="text-base text-nowrap"
            />
          </van-tag>
          <span :class="{ 'text-red-500': item.isCorrect === 'N' }">{{ item.content }}</span>
          <span>【{{ item.score }}分】</span>
        </div>

        <div class="px-6 py-2">
          <div class="flex flex-col gap-1">
            <div v-for="(value, key) in item.options" :key="key">
              <span class="mr-2">{{ key }}.</span>
              <span>{{ value }}</span>
              <span v-if="isJSON(item.correctAnswer)" class="ml-3 text-sm text-blue-400">
                {{ JSON.parse(item.correctAnswer)[key] }} 分
              </span>
            </div>
          </div>

          <div class="mt-3 px-3 py-2 rounded bg-[--bg-color]">
            <div class="flex gap-1 text-sm font-bold">
              <!-- 简答题答案 -->
              <template v-if="item.type === '4'">
                <span>答：</span>
                <span class="font-normal">{{ isEmpty(item.userAnswer) ? '（未填写）' : item.userAnswer }}</span>
              </template>

              <!-- 选择题答案 -->
              <template v-else>
                <template v-if="isJSON(item.correctAnswer)">
                  <span>您选择</span>
                  <span class="font-bold text-blue-500">{{ item.userAnswer }}</span>
                </template>
                <template v-else>
                  <span>答案</span>
                  <span class="text-blue-500">{{ item.correctAnswer }}</span>
                  <span>您选择</span>
                  <span
                    class="font-bold"
                    :class="[
                      isAnswerEqual(item.userAnswer, item.correctAnswer)
                        ? 'text-blue-500'
                        : 'text-red-500',
                    ]"
                  >
                    {{ item.userAnswer }}
                  </span>
                </template>
              </template>
            </div>
            <div v-if="!isEmpty(item.ossIdList)" class="mt-2">
              <UploadFile
                :model-value="item.ossIdList"
                value-type="array"
                readonly
              />
              <span
                v-if="!isNil(item.answerScore)"
                class="text-sm font-normal text-blue-400"
              >
                {{ item.answerScore }} 分
              </span>
            </div>
          </div>

          <div class="p-2">
            <div v-if="item.analysis">
              解析：{{ item.analysis }}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang='ts'>
import { isEmpty, isNil } from 'lodash-es'
import { getQuestionTypeColor, isAnswerEqual } from '../helper'
import { queryExamRecordList } from '@/api/exam/exam'
import type { ExamRecordVO } from '@/api/exam/exam/types'
import { isJSON } from '@/utils'
import customEmptyImage from '@/assets/images/custom-empty-image.png'

const props = defineProps<{
  examId: string
  questionTypeOptions: DictDataOption[]
}>()

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { loading, closeLoading } = proxy.$modal

const currentTab = ref<'all' | 'error'>('all')
const rawList = ref<ExamRecordVO[]>([])
const list = computed(() => {
  return rawList.value.map((item) => {
    return {
      ...item,
      options: JSON.parse(item.options),
    }
  })
})

const errorList = computed(() => list.value.filter(e => e.isCorrect === 'N'))
const currentList = computed(() => {
  if (currentTab.value === 'error') {
    return errorList.value
  }

  return list.value
})

const tabOptions = computed(() => {
  return [
    {
      label: `全部 ${list.value.length}`,
      value: 'all',
    },
    {
      label: `错误 ${errorList.value.length}`,
      value: 'error',
    },
  ]
})

function onBackClick() {
  proxy.$router.back()
}

function onTabChange() {
  document.querySelector('#content').scrollTop = 0
}

onMounted(async () => {
  loading()
  const { data } = await queryExamRecordList({ examId: props.examId })
  rawList.value = data
  closeLoading()
})
</script>
