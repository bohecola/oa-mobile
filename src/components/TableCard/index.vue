<template>
  <div class="bg-[--bg-color] border" :class="[{ 'shadow-sm': shadow }, { rounded: round }]">
    <div v-if="slots.header || title" class="p-2" :class="{ 'border-b': !isCollapse }">
      <slot v-if="slots.header" name="header" :title="title" />
      <div v-else class="flex justify-between" @click="isCollapse = !isCollapse">
        <span :class="titleClass">{{ title }}</span>
        <span>
          <van-icon v-show="isCollapse" name="arrow" />
          <van-icon v-show="!isCollapse" name="arrow-down" />
        </span>
      </div>
    </div>

    <div v-if="slots.default" v-show="!isCollapse" class="p-2">
      <slot name="default" />
    </div>

    <div v-if="slots.footer" class="p-2">
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
  }>(),
  {
    shadow: true,
    round: false,
    defaultCollapse: false,
  },
)

const slots = defineSlots<{
  header?: (props: { title?: string }) => any
  default?: () => any
  footer?: () => any
}>()

const isCollapse = ref(props.defaultCollapse)
</script>
