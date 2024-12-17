<template>
  <div :class="`flex items-center gap-1 ${readonly ? '' : 'text-xs py-1 px-1 border border-solid border-[var(--el-border-color)]'}`">
    <template v-if="readonly">
      <slot />
    </template>

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
