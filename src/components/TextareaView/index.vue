<template>
  <div class="w-full text-left" v-html="content" />
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: string
}>()

const content = computed(() => props.value?.replace(/\n/g, '<br>'))
</script>
