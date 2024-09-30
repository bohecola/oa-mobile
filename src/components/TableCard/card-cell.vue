<template>
  <div class="text-sm w-full flex py-2">
    <div v-if="slots.label || label" class="flex-1 text-left" :class="labelClass">
      <span v-if="label" class="opacity-70">
        {{ label }}
      </span>
      <slot v-else name="label" />
    </div>

    <div v-if="slots.value || value" class="flex-1 text-right" :class="valueClass">
      <span v-if="value">
        {{ value }}
      </span>
      <slot v-else name="value" />
    </div>
  </div>
</template>

<script setup lang='ts'>
defineProps<{
  label?: string | number
  value?: string | number
  labelClass?: string
  valueClass?: string
}>()

const slots = defineSlots<{
  label?: () => any
  value?: () => any
}>()
</script>
