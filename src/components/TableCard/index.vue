<template>
  <div class="bg-[--bg-card] border" :class="[{ 'shadow-sm': shadow }, { rounded: round }]">
    <div class="p-2" :class="{ 'border-b': !isCollapse }" @click="handleCollapse">
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

    <div v-if="slots.footer" class="border-t p-2">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = withDefaults(
  defineProps<{
    title?: string
    titleClass?: string
    shadow?: boolean
    round?: boolean
    defaultCollapse?: boolean
    showCollapse?: boolean
    isEmpty?: boolean
  }>(),
  {
    shadow: true,
    round: false,
    defaultCollapse: false,
    showCollapse: true,
    isEmpty: false,
  },
)

const slots = defineSlots<{
  header?: () => any
  default?: () => any
  footer?: () => any
}>()

const isCollapse = ref(props.defaultCollapse)

function handleCollapse() {
  if (props.showCollapse) {
    isCollapse.value = !isCollapse.value
  }
}
</script>
