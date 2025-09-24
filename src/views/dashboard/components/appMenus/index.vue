<template>
  <div class="grid grid-cols-3 gap-2">
    <template
      v-for="item in menus"
      :key="item.title"
    >
      <div
        v-if="item.visiable"
        class="
          p-2 h-24
          flex flex-col justify-center items-center gap-1
          select-none border shadow-sm rounded-xl
          bg-[--bg-card] active:bg-[--van-primary-color] active:text-white
        "
        @click="onClick(item)"
      >
        <div class="flex items-center gap-1">
          <span :class="`${item.icon} text-2xl`" />
          <span v-if="item.nums" class="text-sm text-[--van-primary-color]">{{ item.nums }}</span>
        </div>
        <span class="text-sm max-w-[18ch] text-center">{{ item.title }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang='ts'>
import { isNil } from 'lodash-es'
import { checkIndexAppPermission } from '@/api/oa/common'
import { listTaskInfo } from '@/api/oa/task/taskInfo'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

interface AppMenu {
  title: string
  path: string
  icon: string
  visiable: boolean
  permissionKey?: string
  nums?: number
}

const menus = ref<AppMenu[]>([
  { title: '流程中心', path: '/start-workflow', icon: 'i-material-symbols-flowchart', visiable: true },
  { title: '模拟考试', path: '/exam', icon: 'i-mdi-document', visiable: true },
  { title: '每日一报', path: '/daily-report', icon: 'i-mdi-file-document-outline', visiable: false, permissionKey: 'isProjectDayTask' },
  { title: '油卡加油', path: '/fuel-oilcard', icon: 'i-mingcute-bank-card-fill', visiable: true },
  { title: '现金加油', path: '/fuel-cash', icon: 'i-nimbus-cash', visiable: true },
  { title: '待回款查询', path: '/pendingPayment', icon: 'i-tabler-device-analytics', visiable: false, permissionKey: 'isDHKCX' },
  { title: '工作事项', path: '/taskInfo', icon: 'i-carbon-task', visiable: true },
])

function onClick(item: AppMenu) {
  proxy.$router.push(item.path)
}

onMounted(async () => {
  const { data } = await checkIndexAppPermission()

  menus.value.forEach((item) => {
    if (!isNil(item.permissionKey)) {
      item.visiable = data[item.permissionKey] === 'Y'
    }
  })

  listTaskInfo({
    pageNum: 1,
    pageSize: 1,
    queryStatus: 'waiting',
  }).then(({ total }) => {
    for (const item of menus.value) {
      if (item.title === '工作事项') {
        item.nums = total
      }
    }
  })
})
</script>
