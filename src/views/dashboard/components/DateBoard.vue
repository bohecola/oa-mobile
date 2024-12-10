<template>
  <div class="flex gap-2 px-3 py-5 bg-[--bg-card] rounded">
    <div class="flex-1 flex flex-wrap gap-2">
      <span class="flex items-center justify-center text-2xl p-2 w-[4ch] bg-[--bg-color] rounded active:bg-[--van-primary-color] active:text-[--bg-color] select-none" @click="handleClick">
        <span class="i-ic-outline-self-improvement" />
        <!-- <span class="i-lucide-smile" /> -->
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
      <div class="w-full bg-[--bg-color] text-center font-[500] rounded p-2">
        <template v-if="daysUntilFriday !== 0">
          <div class="text-sm mb-1">
            距离周五还有几天？
          </div>
          <van-rolling-text
            ref="RollingText"
            class="my-rolling-text !text-3xl"
            direction="up"
            :start-num="0"
            :target-num="daysUntilFriday"
            :duration="rollingTextDuration"
            :auto-start="false"
          />
          <span class="text-sm font-normal">天{{ modalParticle }}</span>
        </template>

        <div v-else clas="text-sm mb-1 ">
          <div>
            当前是
            <span class="text-lg">{{ currentYear }}</span>
            年第
          </div>
          <van-rolling-text
            ref="RollingText"
            class="my-rolling-text !text-3xl"
            direction="up"
            :duration="rollingTextDuration"
            :start-num="0"
            :target-num="currentWeek"
            :auto-start="false"
          />
          <span>周</span>
        </div>
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
import 'dayjs/locale/zh-cn'

dayjs.extend(weekOfYear)
dayjs.locale('zh-cn')

const RollingText = ref<RollingTextInstance>()
const rollingTextDuration = ref(0)

// 年份
const currentYear = computed(() => dayjs().year())
// 月份
const currentMonth = computed(() => dayjs().month() + 1)
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
// 星期
const weekDay = computed(() => dayjs().format('dddd'))
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

function handleClick() {
  rollingTextDuration.value = 2
  RollingText.value?.reset()
  setTimeout(() => {
    RollingText.value?.start()
  }, 0)
}

onMounted(() => {
  rollingTextDuration.value = 0
  RollingText.value?.start()
})
</script>
