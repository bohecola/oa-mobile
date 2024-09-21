<template>
  <div class="p-2">
    <van-grid :gutter="20" :column-num="2">
      <van-grid-item
        v-for="menu in menus"
        :key="menu.name"
        :text="menu.name"
        :to="{
          path: menu.path,
          query: { category: menu.category },
        }"
      />
    </van-grid>
  </div>
</template>

<script setup lang='ts'>
const menus = [
  { name: '我发起的', path: '/approval', category: 'my-initiated' },
  { name: '我的待办', path: '/approval', category: 'my-to-do' },
  { name: '我的已办', path: '/approval', category: 'my-completed' },
  { name: '我的抄送', path: '/approval', category: 'my-cc' },
]
</script>
