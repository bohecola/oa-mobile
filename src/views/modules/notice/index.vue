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
          :key="tab"
          class="shrink-0 h-8 px-4 rounded-full text-sm leading-8" :class="[
            activeTab === tab
              ? 'text-[#1989fa] bg-[#eaf5ff] font-medium'
              : 'text-[#5f646d] bg-white',
          ]"
          @click="handleTabClick(tab)"
        >
          {{ tab }}
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
          :immediate-check="false"
          @load="onLoad"
        >
          <article
            v-for="notice in notices"
            :key="notice.id"
            class="mb-3 rounded-xl border border-[#edf0f3] bg-white px-4 py-3 shadow-[0_1px_5px_rgba(31,41,51,0.04)]"
            @click="handleView(notice)"
          >
            <div class="flex items-start gap-2">
              <h3 class="flex-1 truncate text-sm font-normal leading-6 text-[#20242a]">
                {{ notice.title }}
              </h3>
              <span
                v-if="notice.tag"
                class="mt-0.5 shrink-0 rounded-full border border-[#fde7a8] bg-[#fffaf0] px-1.5 py-0.5 text-xs text-[#e6a23c]"
              >
                {{ notice.tag }}
              </span>
            </div>

            <p class="mt-2 line-clamp-2 text-xs leading-5 text-[#747b85]">
              {{ notice.content }}
            </p>

            <div class="mt-4 flex items-center gap-3 text-xs text-[#a7adb5]">
              <span v-if="notice.avatar" class="grid h-5 w-5 place-items-center overflow-hidden rounded-sm bg-[#e8f1fb] text-[10px] text-[#3f8ed8]">
                {{ notice.avatar }}
              </span>
              <span>{{ notice.publisher }}</span>
              <span>{{ notice.publishTime }} 发布</span>
              <span v-if="notice.more" class="ml-auto text-base leading-none text-[#8f96a0]">...</span>
            </div>
          </article>
        </van-list>
      </van-pull-refresh>
    </main>
  </div>
</template>

<script setup lang="ts">
interface NoticeItem {
  id: number
  title: string
  content: string
  publisher: string
  publishTime: string
  tag?: string
  avatar?: string
  more?: boolean
}

const tabs = ['全部', '未读', '公司制度', '生产制度', '通知']

const activeTab = ref('全部')

const router = useRouter()
const pageSize = 5

const refreshing = ref(false)
const loading = ref(false)
const error = ref(false)
const finished = ref(false)
const finishedText = '没有更多'
const errorText = '加载失败，点击重试'
const notices = ref<NoticeItem[]>([])

function handleSearch() {
  router.push('/notice-search')
}

function handleView(notice: NoticeItem) {
  router.push(`/notice/${notice.id}`)
}

const allNotices: NoticeItem[] = [
  {
    id: 1,
    title: '仓颉开发部和力牧研究部-关于发布项目交付质量提升通知',
    content: '为进一步提升部门整体运作效率，保障项目交付质量，强化责任落实，提升团队执行力与专业协作能力，现发布相关要求。',
    publisher: '李润润',
    publishTime: '2026-03-13 18:48',
  },
  {
    id: 2,
    title: '西安成林能源科技有限公司-出差管理制度',
    content: '各部门、全体员工：为顺应公司持续发展的整体需求，进一步健全出差管理体系，规范出差审批及报销流程。',
    publisher: '刘淑娟（离职中）',
    publishTime: '2025-11-04 18:39',
  },
  {
    id: 3,
    title: '西安成林能源科技有限公司-关于鼓励员工考取职业资格证书的制度',
    content: '西安成林能源科技有限公司-关于鼓励员工考取职称、职业资格证书的制度。',
    publisher: '杜媛媛（离职中）',
    publishTime: '2025-02-27 15:10',
  },
  {
    id: 4,
    title: '关于[成林 OA]系统功能上线的通知',
    content: '各位领导、同事：大家好！经智慧运维中心团队的不懈努力，[成林 OA]系统功能已完成上线。',
    publisher: '陈伟奇',
    publishTime: '2024-12-28 19:47',
    tag: '保密',
  },
  {
    id: 5,
    title: '项目部办公及生活用品采购流程（暂行）',
    content: '为提高各项目部生活及办公用品采购效率，现下发《项目部办公及生活用品采购流程（暂行）》。',
    publisher: '陈伟奇',
    publishTime: '2024-09-29 11:13',
  },
  {
    id: 6,
    title: '西安成林能源科技有限公司-车辆管理制度',
    content: '西安成林能源科技有限公司-车辆管理制度。',
    publisher: '王云婷',
    publishTime: '2022-01-10 11:27',
    avatar: 'OA',
    more: true,
  },
  {
    id: 7,
    title: '西安成林能源科技有限公司-项目部印章管理制度',
    content: '西安成林能源科技有限公司-项目部印章管理制度。',
    publisher: '王云婷',
    publishTime: '2022-01-10 11:21',
    avatar: 'OA',
    more: true,
  },
  {
    id: 8,
    title: '西安成林能源科技有限公司-印章管理制度',
    content: '西安成林能源科技有限公司-印章管理制度。',
    publisher: '王云婷',
    publishTime: '2022-01-10 11:18',
    avatar: 'OA',
    more: true,
  },
]

function getNextNotices() {
  return allNotices.slice(notices.value.length, notices.value.length + pageSize)
}

function loadFirstPage() {
  error.value = false
  loading.value = false
  notices.value = allNotices.slice(0, pageSize)
  finished.value = notices.value.length >= allNotices.length
}

function onLoad() {
  notices.value.push(...getNextNotices())
  loading.value = false
  finished.value = notices.value.length >= allNotices.length
}

function onRefresh() {
  loadFirstPage()
  refreshing.value = false
}

function handleTabClick(tab: string) {
  activeTab.value = tab
  loadFirstPage()
}

loadFirstPage()
</script>

<style scoped>
.notice-tabs {
  scrollbar-width: none;
}

.notice-tabs::-webkit-scrollbar {
  display: none;
}
</style>
