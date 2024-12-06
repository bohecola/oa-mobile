<template>
  <div :class="`py-1 flex items-center text-xs ${readonly ? '' : 'px-1 border border-solid border-[var(--el-border-color)]'}`">
    <span v-if="readonly" class="mr-1">
      <slot />
    </span>

    <span v-else class="w-15ch text-truncate mr-1">
      <slot />
    </span>

    <span v-if="closeable" class="flex mr-1 cursor-pointer opacity-30 hover:opacity-100" @click.stop="handleClose">
      <van-icon name="cross" />
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  closeable?: boolean
  readonly?: boolean
}>()

const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
}
</script>
