<template>
  <div class="p-2">
    <div class="grid grid-cols-2 gap-2">
      <template
        v-for="item in menus"
        :key="item.title"
      >
        <div
          v-if="item.visiable"
          class="
            p-2 h-32
            flex justify-center items-center gap-2
            bg-[--bg-card] rounded
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
      </template>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { isProjectDayTask } from '@/api/ptms/task/productTask'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

interface AppMenu {
  title: string
  path: string
  icon: string
  visiable: boolean
}

const menus = ref<AppMenu[]>([
  { title: '模拟考试', path: '/exam', icon: 'i-mdi-document', visiable: true },
  { title: '每日一报', path: '/daily-report', icon: 'i-mdi-file-document-outline', visiable: false },
  { title: '油卡加油', path: '/fuel-oilcard', icon: 'i-mingcute-bank-card-fill', visiable: true },
  { title: '现金加油', path: '/fuel-cash', icon: 'i-nimbus-cash', visiable: true },
])

function onClick(item: AppMenu) {
  proxy.$router.push(item.path)
}

onMounted(async () => {
  const { data } = await isProjectDayTask()
  menus.value[1].visiable = data
})
</script>
