<template>
  <div class="p-2 flex flex-col gap-2">
    <Swipe />

    <TaskMenus />

    <appMenus />
  </div>
</template>

<script setup lang='ts'>
import Swipe from './components/Swipe.vue'
import TaskMenus from './components/TaskMenus/index.vue'
import appMenus from './components/appMenus/index.vue'
</script>
