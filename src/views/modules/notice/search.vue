<template>
  <div class="min-h-screen bg-white">
    <NavBar title="搜索">
      <template #right />
    </NavBar>

    <form action="/" class="px-5 pt-5" @submit.prevent>
      <van-search
        v-model.trim="keywords"
        autofocus
        clearable
        shape="round"
        background="transparent"
        placeholder="搜索公告标题、公告内容"
        class="notice-search-input"
        @search="handleSubmitSearch"
      />
    </form>

    <div class="border-b border-[#edf0f3] px-5 pt-3">
      <div class="flex gap-10">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="relative h-10 text-sm"
          :class="activeTab === tab.value ? 'font-medium text-[#20242a]' : 'text-[#737980]'"
          @click="handleTabClick(tab.value)"
        >
          {{ tab.label }}
          <span
            v-if="activeTab === tab.value"
            class="absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-[#20242a]"
          />
        </button>
      </div>
    </div>

    <main
      v-if="searched"
      class="h-[calc(100vh-var(--van-nav-bar-height)-var(--van-search-input-height)-84px-env(safe-area-inset-top))] overflow-y-auto overflow-x-hidden px-4 py-3 bg-[#f7f8fa]"
    >
      <van-list
        v-model:loading="loading"
        v-model:error="error"
        :finished="finished"
        :finished-text="finishedText"
        :error-text="errorText"
        :immediate-check="false"
        @load="onLoad"
      >
        <article
          v-for="notice in notices"
          :key="getNoticeId(notice)"
          class="mb-3 rounded-xl border border-[#edf0f3] bg-white px-4 py-3 shadow-[0_1px_5px_rgba(31,41,51,0.04)]"
          @click="handleView(notice)"
        >
          <div class="flex items-start gap-2">
            <h3 class="flex-1 truncate text-sm font-normal leading-6 text-[#20242a]">
              {{ getNoticeTitle(notice) }}
            </h3>
            <span
              v-if="getNoticeTag(notice)"
              class="mt-0.5 shrink-0 rounded-full border border-[#fde7a8] bg-[#fffaf0] px-1.5 py-0.5 text-xs text-[#e6a23c]"
            >
              {{ getNoticeTag(notice) }}
            </span>
          </div>

          <p class="mt-2 line-clamp-2 text-xs leading-5 text-[#747b85]">
            {{ getNoticeContent(notice) }}
          </p>

          <div class="mt-4 flex items-center gap-3 text-xs text-[#a7adb5]">
            <span v-if="getNoticePublisher(notice)">{{ getNoticePublisher(notice) }}</span>
            <span>{{ getNoticePublishTime(notice) }} 发布</span>
          </div>
        </article>
      </van-list>
    </main>

    <div v-else class="flex h-[calc(100vh-var(--van-nav-bar-height)-var(--van-search-input-height)-84px-env(safe-area-inset-top))] flex-col items-center justify-center pb-24">
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
import { debounce, isEmpty } from 'lodash-es'
import type { NoticeMobileQuery, NoticeMobileVO } from '@/api/system/notice/types'
import { getNoticeMobileList } from '@/api/system/notice'
import { useList } from '@/hooks'

type SearchType = 'title' | 'content'
type RouteSearchType = SearchType | undefined

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { sys_notice_tags } = toRefs(proxy.useDict('sys_notice_tags'))

const keywords = ref('')
const searched = ref(false)
const isRestoring = ref(false)

const activeTab = ref<SearchType>('title')
const route = useRoute()
const router = useRouter()
const pageSize = 5

const tabs = [
  { label: '搜标题', value: 'title' as const },
  { label: '搜正文', value: 'content' as const },
]

const {
  loading,
  list: notices,
  error,
  finished,
  finishedText,
  errorText,
  queryParams,
  onLoad,
  onRefresh,
} = useList<NoticeMobileVO, NoticeMobileQuery>({
  initQueryParams: {
    pageNum: 1,
    pageSize,
  },
  request: getNoticeMobileList,
})

function setSearchParams() {
  delete queryParams.value.noticeTitle
  delete queryParams.value.noticeContent

  if (activeTab.value === 'title') {
    queryParams.value.noticeTitle = keywords.value
  }

  if (activeTab.value === 'content') {
    queryParams.value.noticeContent = keywords.value
  }
}

function syncSearchRoute() {
  if (isEmpty(keywords.value)) {
    router.replace({ query: {} })
    return
  }

  router.replace({
    query: {
      keyword: keywords.value,
      searchType: activeTab.value,
    },
  })
}

function resetSearch() {
  searched.value = false
  notices.value = []
  loading.value = false
  finished.value = false
  error.value = false
  queryParams.value.pageNum = 1
  delete queryParams.value.noticeTitle
  delete queryParams.value.noticeContent
}

function handleSearch() {
  if (isEmpty(keywords.value)) {
    resetSearch()
    syncSearchRoute()
    return
  }

  searched.value = true
  setSearchParams()
  syncSearchRoute()
  onRefresh()
}

function handleTabClick(value: SearchType) {
  activeTab.value = value

  if (!isEmpty(keywords.value)) {
    handleSearch()
  }
}

const debouncedSearch = debounce(handleSearch, 400)

function handleSubmitSearch() {
  debouncedSearch.cancel()
  handleSearch()
}

watch(keywords, () => {
  if (isRestoring.value) {
    return
  }

  debouncedSearch()
})

onBeforeUnmount(() => {
  debouncedSearch.cancel()
})

onMounted(() => {
  const keyword = String(route.query.keyword ?? '').trim()
  const searchType = route.query.searchType as RouteSearchType

  if (isEmpty(keyword)) {
    resetSearch()
    return
  }

  isRestoring.value = true
  keywords.value = keyword
  activeTab.value = searchType === 'content' ? 'content' : 'title'
  handleSearch()
  nextTick(() => {
    isRestoring.value = false
  })
})

function handleView(notice: NoticeMobileVO) {
  router.push(`/notice/${getNoticeId(notice)}`)
}

function getNoticeId(notice: NoticeMobileVO) {
  return notice.noticeId ?? notice.id
}

function getNoticeTitle(notice: NoticeMobileVO) {
  return notice.noticeTitle ?? notice.title ?? ''
}

function getNoticeContent(notice: NoticeMobileVO) {
  const content = notice.noticeContent ?? notice.content ?? ''
  return String(content)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;|\u00A0/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getNoticePublisher(notice: NoticeMobileVO) {
  return notice.createByName ?? notice.publisher ?? notice.createBy ?? ''
}

function getNoticePublishTime(notice: NoticeMobileVO) {
  return notice.publishTime ?? notice.createTime ?? '--'
}

function getNoticeTag(notice: NoticeMobileVO) {
  const value = notice.tags ?? notice.tag

  if (!value) {
    return ''
  }

  return String(value)
    .split(',')
    .map((item) => {
      return sys_notice_tags.value.find(dict => String(dict.value) === item)?.label ?? item
    })
    .join('、')
}
</script>

<style scoped>
.notice-search-input {
  padding: 0;
}
</style>
