<template>
  <van-collapse v-model="activeNames" v-loading="loading">
    <template v-for="(menus, title) in menusMap" :key="title">
      <van-collapse-item v-if="title !== '财务'" :name="title" :border="false">
        <template #title>
          <div class="font-bold text-base">
            {{ title }}
          </div>
        </template>
        <div class="grid grid-cols-4 gap-x-6 gap-y-3">
          <div
            v-for="item in menus"
            :key="item.id"
            class="w-16"
            @click="handleItemClick(item)"
          >
            <div class="mx-auto mb-2 w-12 h-12 bg-[rgba(var(--van-primary-color-rgb),0.2)] rounded-xl flex items-center justify-center">
              <i :class="`iconfont text-2xl text-[--van-primary-color] icon-${item.processKey}`" />
            </div>
            <div class="text-xs text-center">
              {{ item.procdefName }}
            </div>
          </div>
        </div>
      </van-collapse-item>
    </template>
  </van-collapse>
</template>

<script setup lang='ts'>
import { getUseMap } from '@/api/workflow/task'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const loading = ref(false)
const activeNames = ref<string[]>([])
const menusMap = ref<Record<string, any>>({})

// 流程项点击
function handleItemClick(val: Record<string, any>) {
  proxy.$router.push({
    path: val.router,
    query: {
      type: 'add',
      nodeId: val.nodeId,
      procdefName: val.procdefName,
    },
  })
}

// 挂载
onMounted(async () => {
  loading.value = true
  const { data } = await getUseMap().finally(() => (loading.value = false))
  menusMap.value = data
  activeNames.value = Object.keys(data)
})
</script>
