<template>
  <div class="p-2">
    <div class="mb-2">
      <Swipe />
    </div>

    <van-grid :column-num="4">
      <van-grid-item
        v-for="menu in menus"
        :key="menu.name"
        :to="{
          path: menu.path,
          query: { category: menu.category },
        }"
      >
        <template #icon>
          <div class="flex items-center gap-2">
            <!-- 图标 -->
            <span class="text-xl" :class="menu.icon" />
            <!-- 数量 -->
            <span v-if="menu.badge" class="text-xs" :style="{ color: getBadgeColor(menu.category) }">{{ menu.badge }}</span>
          </div>
        </template>

        <template #text>
          <span class="text-xs mt-2">{{ menu.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>

    <div class="my-2">
      <DateBoard />
    </div>

    <!-- <div>
      <Weather />
    </div> -->
  </div>
</template>

<script setup lang='ts'>
import DateBoard from './components/DateBoard.vue'
import Swipe from './components/Swipe.vue'
import { getTaskNum } from '@/api/workflow/task'
// import Weather from './components/Weather.vue'

const menus = ref([
  { name: '我发起的', path: '/approval', icon: 'i-lucide-send', category: 'my-initiated', badge: undefined },
  { name: '我的待办', path: '/approval', icon: 'i-lucide-clock-4', category: 'my-to-do', badge: undefined },
  { name: '我的已办', path: '/approval', icon: 'i-lucide-clipboard-check', category: 'my-completed', badge: undefined },
  { name: '我的抄送', path: '/approval', icon: 'i-lucide-clipboard-copy', category: 'my-cc', badge: undefined },
])

function getBadgeColor(category: string) {
  if (category === 'my-initiated') {
    return '#409EFF'
  }
  if (category === 'my-to-do') {
    return '#D73A3A'
  }
  if (category === 'my-completed') {
    return '#67C23A'
  }
  if (category === 'my-cc') {
    return '#6ECFF6'
  }
  return 'gray'
}

onMounted(async () => {
  const { data } = await getTaskNum()
  const { startNum, waitNum, doneNum, copyNum } = data

  for (const menu of menus.value) {
    switch (menu.category) {
      case 'my-initiated':
        menu.badge = startNum
        break
      case 'my-to-do':
        menu.badge = waitNum
        break
      case 'my-completed':
        menu.badge = doneNum
        break
      case 'my-cc':
        menu.badge = copyNum
        break
    }
  }
})
</script>
