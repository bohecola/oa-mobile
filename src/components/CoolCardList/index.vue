<template>
  <div class="w-full flex flex-col gap-2">
    <slot />
  </div>
</template>

<script setup lang='ts'>
const { accordion, defaultStartActive, activeOnRegister } = defineProps<{
  accordion?: boolean
  defaultStartActive?: boolean
  activeOnRegister?: boolean
}>()

// 计数器
const count = ref(0)
// 注册列表
const registers = ref<number[]>([])

// 活跃集合
const actives = ref(new Set<number>())

// 是否活跃状态
const isActive = (index: number) => actives.value.has(index)

// 切换索引
function toggleTo(index: number) {
  const next = new Set(actives.value)

  if (accordion) {
    if (next.has(index)) {
      next.delete(index)
    }
    else {
      next.clear()
      next.add(index)
    }
  }
  else {
    next.has(index) ? next.delete(index) : next.add(index)
  }

  actives.value = next
}

// 注册索引
function register() {
  const index = count.value++

  // 添加到注册列表
  registers.value.push(index)

  // 注册时激活
  if (activeOnRegister) {
    toggleTo(index)
  }

  return index
}

// 注销索引
function unregister(index: number) {
  // 移除活跃状态
  actives.value.delete(index)
  // 移除注册列表
  registers.value = registers.value.filter(item => item !== index)
}

// provide 给子组件使用
provide('card-list-wrap:isActive', isActive)
provide('card-list-wrap:toggleTo', toggleTo)
provide('card-list-wrap:register', register)
provide('card-list-wrap:unregister', unregister)

const toggleStart = () => toggleTo(0)
const toggleEnd = () => toggleTo(count.value)

onMounted(() => {
  // 默认激活首项
  if (defaultStartActive) {
    toggleStart()
  }
})

defineExpose({
  toggleTo,
  toggleStart,
  toggleEnd,
})
</script>
