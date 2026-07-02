<template>
  <div class="h-screen overflow-hidden bg-white flex flex-col">
    <NavBar title="公告接收列表" />

    <div class="shrink-0 border-b border-[#edf0f3]">
      <div class="grid grid-cols-2">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="relative h-10 text-sm"
          :class="activeTab === tab.value ? 'text-[#20242a]' : 'text-[#9aa0a6]'"
          @click="handleTabClick(tab.value)"
        >
          {{ tab.label }}
          <span
            v-if="activeTab === tab.value"
            class="absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-[#1989fa]"
          />
        </button>
      </div>
    </div>

    <main class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
      <van-list
        v-model:loading="loading"
        v-model:error="error"
        :finished="finished"
        :finished-text="finishedText"
        :error-text="errorText"
        :immediate-check="false"
        @load="onLoad"
      >
        <div
          v-for="person in users"
          :key="getUserKey(person)"
          class="ml-4 flex h-14 items-center border-b border-[#edf0f3]"
        >
          <div
            class="mr-4 grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-[#168fff] text-sm text-white"
          >
            <img
              v-if="person.avatar"
              :src="person.avatar"
              :alt="getUserName(person)"
              class="h-full w-full object-cover"
            >
            <span v-else>{{ getUserName(person).slice(0, 1) }}</span>
          </div>
          <div class="text-sm text-[#20242a]">
            {{ getUserName(person) }}
          </div>
        </div>
      </van-list>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NoticeUserVO } from '@/api/system/notice/types'
import { getNoticeUserList } from '@/api/system/notice'

const route = useRoute()

type ReadStatus = '0' | '1'

interface NoticeUserPageResult {
  rows?: NoticeUserVO[]
  data?: NoticeUserVO[] | { rows?: NoticeUserVO[], total?: number }
  total?: number
}

const pageSize = 13
const finishedText = '没有更多了'
const errorText = '请求失败，点击重新加载'

const activeTab = ref<'0' | '1'>('0')
const loading = ref(false)
const error = ref(false)

const usersMap = reactive<Record<ReadStatus, NoticeUserVO[]>>({
  0: [],
  1: [],
})

const totalMap = reactive<Record<ReadStatus, number>>({
  0: 0,
  1: 0,
})

const pageMap = reactive<Record<ReadStatus, number>>({
  0: 1,
  1: 1,
})

const finishedMap = reactive<Record<ReadStatus, boolean>>({
  0: false,
  1: false,
})

const tabs = computed(() => [
  { label: `未读 ${totalMap['0']}`, value: '0' as const },
  { label: `已读 ${totalMap['1']}`, value: '1' as const },
])

const users = computed(() => usersMap[activeTab.value])
const finished = computed(() => finishedMap[activeTab.value])

function normalizeUserPage(result: NoticeUserPageResult) {
  const data = result.data

  if (Array.isArray(data)) {
    return {
      rows: data,
      total: result.total ?? data.length,
    }
  }

  const rows = result.rows ?? data?.rows ?? []

  return {
    rows,
    total: result.total ?? data?.total ?? rows.length,
  }
}

async function requestUsers(status: ReadStatus, pageNum: number) {
  const noticeId = route.params.id as string

  if (!noticeId) {
    return { rows: [], total: 0 }
  }

  const result = await getNoticeUserList(noticeId, status, {
    pageNum,
    pageSize,
  }) as unknown as NoticeUserPageResult

  return normalizeUserPage(result)
}

function setPageData(status: ReadStatus, rows: NoticeUserVO[], total: number, pageNum: number) {
  usersMap[status] = pageNum === 1 ? rows : usersMap[status].concat(rows)
  totalMap[status] = total
  finishedMap[status] = usersMap[status].length >= total || rows.length < pageSize
  pageMap[status] = finishedMap[status] ? pageNum : pageNum + 1
}

async function fetchFirstPage() {
  loading.value = true

  try {
    const [unreadResult, readResult] = await Promise.all([
      requestUsers('0', 1),
      requestUsers('1', 1),
    ])

    setPageData('0', unreadResult.rows, unreadResult.total, 1)
    setPageData('1', readResult.rows, readResult.total, 1)
    activeTab.value = totalMap['0'] === 0 && totalMap['1'] > 0 ? '1' : '0'
  }
  catch {
    error.value = true
  }
  finally {
    loading.value = false
  }
}

async function onLoad() {
  const status = activeTab.value

  if (finishedMap[status]) {
    loading.value = false
    return
  }

  try {
    const { rows, total } = await requestUsers(status, pageMap[status])
    setPageData(status, rows, total, pageMap[status])
  }
  catch {
    error.value = true
  }
  finally {
    loading.value = false
  }
}

function handleTabClick(value: '0' | '1') {
  activeTab.value = value
}

function getUserName(person: NoticeUserVO) {
  return person.nickName ?? person.userName ?? '--'
}

function getUserKey(person: NoticeUserVO) {
  return person.userId ?? getUserName(person)
}

fetchFirstPage()
</script>
