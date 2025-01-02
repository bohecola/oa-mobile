<template>
  <div class="flex gap-2 px-3 py-5 bg-[--bg-card] rounded">
    <div class="flex-1 flex flex-wrap gap-2">
      <span
        class="
          flex items-center justify-center select-none
          text-2xl p-2 w-[4ch] bg-[--bg-color] rounded
          active:bg-[--van-primary-color] active:text-[--bg-color]
        "
        @click="handleClick"
        @touchend="handleClick"
      >

        <img :src="logo" class="object-cover pointer-events-none" alt="Logo">
        <!-- <span class="i-ic-outline-self-improvement" /> -->
      </span>
      <div class="flex-1 text-center p-2 bg-[--bg-color] rounded">
        <div class="text-lg font-bold">
          <span>{{ currentMonth }}</span>
          <span class="font-normal mx-[1px] opacity-80">/</span>
          <span>{{ currentDate }}</span>
        </div>
        <div class="text-xs">
          {{ weekDay }}
        </div>
      </div>
      <div class="w-full bg-[--bg-color] text-center text-sm font-[500] rounded p-2">
        <template v-if="isWorkday">
          <template v-if="daysUntilFriday !== 0">
            <div class="mb-1">
              距离周五还有几天？
            </div>
            <van-rolling-text
              ref="RollingText"
              class="!text-2xl"
              direction="up"
              :start-num="0"
              :target-num="daysUntilFriday"
              :duration="rollingTextDuration"
              :auto-start="false"
            />
            <span class="ml-1">天{{ modalParticle }}</span>
          </template>
          <template v-else>
            <div class="mb-1">
              周五了
            </div>
            <div>
              当前是第
              <van-rolling-text
                ref="RollingText"
                class="!text-2xl"
                direction="up"
                :duration="rollingTextDuration"
                :start-num="0"
                :target-num="currentWeek"
                :auto-start="false"
              />
              周
            </div>
          </template>
        </template>
        <template v-else>
          <div class="mb-1">
            当前是
            <span>{{ currentYear }}</span>
            年第
          </div>
          <van-rolling-text
            ref="RollingText"
            class="!text-2xl"
            direction="up"
            :duration="rollingTextDuration"
            :start-num="0"
            :target-num="currentWeek"
            :auto-start="false"
          />
          <span class="ml-1">周</span>
        </template>
      </div>
    </div>
    <div class="relative flex-1 bg-gradient-to-br from-[--van-primary-color] rounded">
      <span class="absolute right-2 bottom-2 font-bold text-4xl text-[--bg-color]">
        {{ currentYear }}
      </span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { RollingTextInstance } from 'vant'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import logo from '@/assets/images/logo.png'
import 'dayjs/locale/zh-cn'

dayjs.extend(weekOfYear)
dayjs.locale('zh-cn')

const RollingText = ref<RollingTextInstance>()
const rollingTextDuration = ref(0)

// 年份
const currentYear = computed(() => dayjs().year())
// 月份
const currentMonth = computed(() => {
  const month = dayjs().month() + 1
  if (month < 10) {
    return `0${month}`
  }
  return month
})
// 日期
const currentDate = computed(() => {
  const day = dayjs().date()
  if (day < 10) {
    return `0${day}`
  }
  return day
})

// 第几周
const currentWeek = computed(() => dayjs().week())
// 星期几
const weekDay = computed(() => dayjs().format('dddd'))
// 是否是工作日
const isWorkday = computed(() => {
  const day = dayjs().day()
  return day >= 1 && day <= 5
})

// 距离周五还有几天
const daysUntilFriday = computed(() => {
  const today = dayjs().day()
  return (5 - today + 7) % 7
})

// 语气助词
const modalParticle = computed(() => {
  if (daysUntilFriday.value > 3) {
    return '呐'
  }
  else if (daysUntilFriday.value > 2) {
    return '哦'
  }
  else if (daysUntilFriday.value > 1) {
    return '啦'
  }
  return '耶'
})

// 数字动画
function handleClick() {
  rollingTextDuration.value = 2
  RollingText.value?.reset()
  setTimeout(() => {
    RollingText.value?.start()
  }, 0)
}

// 挂载时初始化动画
onMounted(() => {
  rollingTextDuration.value = 0
  RollingText.value?.start()
})
</script>
