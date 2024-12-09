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
          <span class="text-xl" :class="menu.icon" />
        </template>

        <template #text>
          <span class="text-xs mt-2">{{ menu.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>

    <div class="my-2">
      <DateBoard />
    </div>

    <div>
      <Weather />
    </div>
  </div>
</template>

<script setup lang='ts'>
import DateBoard from './components/DateBoard.vue'
import Swipe from './components/Swipe.vue'
import Weather from './components/Weather.vue'

const menus = [
  { name: '我发起的', path: '/approval', icon: 'i-lucide-send', category: 'my-initiated' },
  { name: '我的待办', path: '/approval', icon: 'i-lucide-clock-4', category: 'my-to-do' },
  { name: '我的已办', path: '/approval', icon: 'i-lucide-clipboard-check', category: 'my-completed' },
  { name: '我的抄送', path: '/approval', icon: 'i-lucide-clipboard-copy', category: 'my-cc' },
]
</script>

<style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
