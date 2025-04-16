<template>
  <div class="w-full border bg-[--bg-card]" :class="[{ 'shadow-sm': shadow }, { rounded: round }]">
    <div class="px-2 py-1" :class="{ 'border-b': !isCollapse }" @click="handleCollapse">
      <div class="flex justify-between items-baseline">
        <slot v-if="slots.header" name="header" />
        <span v-else :class="titleClass">{{ title }}</span>

        <span v-if="showCollapse">
          <van-icon v-show="isCollapse" name="arrow" />
          <van-icon v-show="!isCollapse" name="arrow-down" />
        </span>
      </div>
    </div>

    <div v-if="slots.default" v-show="!isCollapse" class="p-2">
      <slot v-if="!isEmpty" name="default" />
      <van-empty v-else image-size="60" description="数据为空" class="!py-2" />
    </div>

    <div v-if="slots.footer" class="px-2 py-1 border-t">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = withDefaults(
  defineProps<{
    title?: string | number
    titleClass?: string
    round?: boolean
    shadow?: boolean
    showCollapse?: boolean
    defaultCollapse?: boolean
    isEmpty?: boolean
  }>(),
  {
    shadow: true,
    showCollapse: true,
  },
)

const emit = defineEmits<{
  (e: 'click'): void
}>()

const slots = defineSlots<{
  header?: () => any
  default?: () => any
  footer?: () => any
}>()

const isCollapse = ref(props.defaultCollapse)

function handleCollapse() {
  if (props.showCollapse) {
    toggleCollapse()
    emit('click')
  }
}

function collapse() {
  isCollapse.value = true
}

function expand() {
  isCollapse.value = false
}

function toggleCollapse() {
  isCollapse.value = !isCollapse.value
}

defineExpose({
  collapse,
  expand,
  toggleCollapse,
})
</script>
