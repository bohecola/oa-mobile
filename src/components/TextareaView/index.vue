<template>
  <div v-html="content" />
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: string
}>()

const content = computed(() => props.value?.replace(/\n/g, '<br>'))
</script>
