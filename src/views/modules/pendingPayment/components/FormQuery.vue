<template>
  <van-popup
    v-model:show="visible"
    position="right"
    class="h-full w-[80%]"
    closeable
    safe-area-top-bottom
    safe-area-inset-bottom
  >
    <div class="flex flex-col h-full">
      <div class="pt-4 text-center font-bold">
        {{ title }}
      </div>

      <van-form label-align="top" class="query-form overflow-y-auto">
        <slot />
      </van-form>

      <div class="mt-auto p-2 w-full flex gap-2 bg-[--bg-card]">
        <van-button
          type="default"
          class="flex-[1]"
          @click="onReset"
        >
          重置
        </van-button>
        <van-button
          type="primary"
          class="flex-[4]"
          @click="onSearch"
        >
          搜索
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang='ts'>
import { usePopup } from '@/hooks'

const emit = defineEmits(['onSearch', 'onReset'])

const { title, visible, openPopup, closePopup } = usePopup({ title: '高级筛选' })

function onSearch() {
  closePopup()
  emit('onSearch')
}

function onReset() {
  emit('onReset')
}

function open() {
  openPopup()
}

defineExpose({
  open,
})
</script>

<style lang="scss" scoped>
$topHeight: calc(theme('spacing.10') + env(safe-area-inset-bottom));
$bottomHeight: env(safe-area-inset-bottom);

.query-form {
  height: calc(100vh - $topHeight - $bottomHeight);
}
</style>
