<template>
  <div class="p-2">
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="item in menus"
        :key="item.title"
        class="
          p-2  h-32
          flex justify-center items-center gap-2
          bg-card rounded
          border
          shadow-sm
          active:bg-[--van-primary-color]
          active:text-white
        "
        @click="onClick(item)"
      >
        <span :class="`${item.icon} text-2xl`" />
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
const { proxy } = getCurrentInstance() as ComponentInternalInstance

interface AppMenu {
  title: string
  path: string
  icon: string
}

const menus: AppMenu[] = [
  { title: '模拟考试', path: '/exam', icon: 'i-mdi-document' },
  // { title: '每日一报', path: '/daily-report', icon: 'i-mdi-file-document-outline' },
]

function onClick(item: AppMenu) {
  proxy.$router.push(item.path)
}
</script>
