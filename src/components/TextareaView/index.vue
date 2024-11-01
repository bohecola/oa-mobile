<template>
  <div class="w-full" v-html="content" />
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: string
}>()

const content = computed(() => props.value?.replace(/\n/g, '<br>'))
</script>
