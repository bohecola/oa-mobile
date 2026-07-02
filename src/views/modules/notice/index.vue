<template>
  <div class="h-screen overflow-hidden bg-[#f7f8fa] flex flex-col">
    <NavBar title="公告">
      <template #right>
        <button
          class="flex h-10 w-10 items-center justify-center text-2xl text-[#1f2933]"
          @click="handleSearch"
        >
          <i class="i-carbon-search" />
        </button>
      </template>
    </NavBar>

    <div class="shrink-0 bg-[#f7f8fa] px-4 pt-3 pb-2">
      <div class="flex gap-3 overflow-x-auto notice-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="shrink-0 h-8 px-4 rounded-full text-sm leading-8" :class="[
            activeTab === tab.value
              ? 'text-[#1989fa] bg-[#eaf5ff] font-medium'
              : 'text-[#5f646d] bg-white',
          ]"
          @click="handleTabClick(tab)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <main class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-8 notice-list-wrapper">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
      >
        <van-list
          v-model:loading="loading"
          v-model:error="error"
          :finished="finished"
          :finished-text="finishedText"
          :error-text="errorText"
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
              <span v-if="notice.avatar" class="grid h-5 w-5 place-items-center overflow-hidden rounded-sm bg-[#e8f1fb] text-[10px] text-[#3f8ed8]">
                {{ notice.avatar }}
              </span>
              <span>{{ getNoticePublisher(notice) }}</span>
              <span>{{ getNoticePublishTime(notice) }} 发布</span>
              <span v-if="notice.more" class="ml-auto text-base leading-none text-[#8f96a0]">...</span>
            </div>
          </article>
        </van-list>
      </van-pull-refresh>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NoticeMobileQuery, NoticeMobileVO } from '@/api/system/notice/types'
import { getNoticeMobileList } from '@/api/system/notice'
import { useList } from '@/hooks'

interface NoticeTab {
  label: string
  value: string
}

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { sys_notice_tags } = toRefs(proxy.useDict('sys_notice_tags'))

const fixedTabs: NoticeTab[] = [
  { label: '全部', value: '' },
  { label: '未读', value: '0' },
]

const tabs = computed<NoticeTab[]>(() => [
  ...fixedTabs,
  ...sys_notice_tags.value.map(item => ({
    label: item.label,
    value: String(item.value),
  })),
])

const activeTab = ref('')

const router = useRouter()
const pageSize = 5

const {
  refreshing,
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
    tags: '',
  },
  request: getNoticeMobileList,
})

function handleSearch() {
  router.push('/notice-search')
}

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
  return notice.createByName ?? notice.publisher ?? notice.createBy ?? '--'
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

function handleTabClick(tab: NoticeTab) {
  activeTab.value = tab.value
  queryParams.value.pageNum = 1
  queryParams.value.tags = tab.value

  onRefresh()
}
</script>

<style scoped>
.notice-tabs {
  scrollbar-width: none;
}

.notice-tabs::-webkit-scrollbar {
  display: none;
}
</style>
