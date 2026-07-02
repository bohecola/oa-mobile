<template>
  <div class="min-h-screen bg-white">
    <NavBar title="搜索">
      <template #right />
    </NavBar>

    <form action="/" class="px-5 pt-5">
      <van-search
        v-model.trim="keywords"
        autofocus
        clearable
        shape="round"
        background="transparent"
        placeholder="搜索公告标题、公告内容"
        class="notice-search-input"
        @search="handleSearch"
      />
    </form>

    <div class="border-b border-[#edf0f3] px-5 pt-3">
      <div class="flex gap-10">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="relative h-10 text-sm"
          :class="activeTab === tab.value ? 'font-medium text-[#20242a]' : 'text-[#737980]'"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
          <span
            v-if="activeTab === tab.value"
            class="absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-[#20242a]"
          />
        </button>
      </div>
    </div>

    <div class="flex h-[calc(100vh-var(--van-nav-bar-height)-var(--van-search-input-height)-84px-env(safe-area-inset-top))] flex-col items-center justify-center pb-24">
      <div class="relative h-20 w-20 text-[#20242a]">
        <i class="i-carbon-folder h-16 w-16 text-[64px]" />
        <i class="i-carbon-search absolute bottom-0 right-0 text-[42px] text-[#1989fa]" />
      </div>
      <div class="mt-5 text-sm text-[#a7adb5]">
        输入关键词开始搜索
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const keywords = ref('')

const activeTab = ref('all')

const tabs = [
  { label: '全部', value: 'all' },
  { label: '搜标题', value: 'title' },
  { label: '搜正文', value: 'content' },
]

function handleSearch() {
  // TODO: 接入公告搜索接口后在这里触发查询。
}
</script>

<style scoped>
.notice-search-input {
  padding: 0;
}
</style>
