<template>
  <div class="min-h-screen bg-white">
    <NavBar title="公告" />

    <main class="h-[calc(100vh-var(--van-nav-bar-height)-env(safe-area-inset-top))] overflow-y-auto px-6 pb-10">
      <section class="pt-5">
        <h1 class="text-base font-semibold leading-7 text-[#20242a]">
          {{ getNoticeTitle() }}
        </h1>

        <div class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#8f96a0]">
          <span>{{ getNoticeIssueDept() }}</span>
          <span v-if="getNoticeTag()" class="text-[#1989fa]">#{{ getNoticeTag() }}#</span>
          <span class="w-full">{{ getNoticePublishTime() }}</span>
        </div>
      </section>

      <article class="pt-2 text-[#20242a]">
        <div class="notice-content text-sm" v-html="getNoticeContent()" />
      </article>

      <div v-if="noticeAttachments.length" class="mt-8 border-t border-[#edf0f3] pt-7">
        <div class="text-sm text-[#20242a]">
          附件：
        </div>

        <button
          v-for="attachment in noticeAttachments"
          :key="getAttachmentName(attachment)"
          class="mt-5 flex w-full items-center gap-3 text-left"
          @click="openAttachment(attachment)"
        >
          <img :src="getAttachmentIcon(attachment)" :alt="getAttachmentName(attachment)" class="h-6 w-6 shrink-0 object-contain">
          <div class="min-w-0 flex-1">
            <div class="truncate text-sm text-[#20242a]">
              {{ getAttachmentName(attachment) }}
            </div>
            <div class="mt-1 text-xs text-[#a7adb5]">
              {{ attachment.size ?? '' }}
            </div>
          </div>
        </button>
      </div>

      <button
        v-if="hasReadStatus"
        class="mt-8 flex w-full border-t border-[#edf0f3] pt-7 text-left text-xs"
        :class="canViewReadStatus ? 'text-[#1989fa]' : 'text-[#a7adb5]'"
        :disabled="!canViewReadStatus"
        @click="handleReadStatusClick"
      >
        <span v-if="unreadCount === 0">全部已读</span>
        <span v-else class="flex gap-2">
          <span>{{ readCount }}人已读</span>
          <span>{{ unreadCount }}人未读</span>
        </span>
      </button>
    </main>

    <viewer ref="viewerRef" />
  </div>
</template>

<script setup lang="ts">
import type { NoticeAttachment, NoticeMobileVO } from '@/api/system/notice/types'
import { getNotice } from '@/api/system/notice'
import { listByIds } from '@/api/system/oss'
import viewer from '@/components/UploadFile/viewer.vue'
import pdfIcon from '@/assets/images/pdf.png'
import wordIcon from '@/assets/images/word.png'
import otherIcon from '@/assets/images/other.png'
import { useStore } from '@/store'

const route = useRoute()
const router = useRouter()
const { user } = useStore()
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { sys_notice_tags } = toRefs(proxy.useDict('sys_notice_tags'))
const viewerRef = ref<InstanceType<typeof viewer>>()

const notice = ref<NoticeMobileVO>({})

const attachments = ref<NoticeAttachment[]>([])

const noticeAttachments = computed(() => attachments.value)
const hasReadStatus = computed(() => (notice.value.noticeUserIdList?.length ?? 0) > 0 || notice.value.readNum !== undefined)
const canViewReadStatus = computed(() => user.roles.includes('noticeUser'))
const readCount = computed(() => notice.value.readNum ?? 0)
const unreadCount = computed(() => Math.max((notice.value.noticeUserIdList?.length ?? 0) - readCount.value, 0))

function getOssIds() {
  const { ossIdList } = notice.value

  if (Array.isArray(ossIdList)) {
    return ossIdList.filter(Boolean).join(',')
  }

  return ossIdList ?? ''
}

async function fetchNoticeDetail() {
  const noticeId = route.params.id as string

  if (!noticeId) {
    return
  }

  const { data } = await getNotice(noticeId)
  notice.value = data ?? {}
  attachments.value = data?.attachments ?? []

  const ossIds = getOssIds()

  if (ossIds) {
    const { data: ossList } = await listByIds(ossIds)
    attachments.value = ossList
  }
}

function getNoticeTitle() {
  return notice.value.noticeTitle ?? notice.value.title ?? ''
}

function getNoticeIssueDept() {
  return notice.value.issueDeptName ?? '--'
}

function getNoticeTag() {
  const value = notice.value.tags ?? notice.value.tag

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

function getNoticePublishTime() {
  return notice.value.publishTime ?? notice.value.createTime ?? ''
}

function getNoticeContent() {
  return notice.value.noticeContent ?? notice.value.content ?? ''
}

function getAttachmentName(attachment: NoticeAttachment) {
  return attachment.name ?? attachment.originalName ?? attachment.fileName ?? ''
}

function getAttachmentExt(attachment: NoticeAttachment) {
  const name = getAttachmentName(attachment)
  return name.includes('.') ? name.split('.').pop()?.toLowerCase() ?? '' : ''
}

function getAttachmentIcon(attachment: NoticeAttachment) {
  const ext = getAttachmentExt(attachment)

  if (ext === 'pdf') {
    return pdfIcon
  }

  if (ext === 'doc' || ext === 'docx') {
    return wordIcon
  }

  return otherIcon
}

function openAttachment(attachment: NoticeAttachment) {
  viewerRef.value?.open({
    file: {
      ...attachment,
      name: getAttachmentName(attachment),
    },
    ext: getAttachmentExt(attachment),
  })
}

function handleReadStatusClick() {
  if (!canViewReadStatus.value) {
    return
  }

  router.push(`/notice/${route.params.id}/receivers`)
}

fetchNoticeDetail()
</script>

<style scoped>
.notice-content {
  line-height: 1.75;
}

.notice-content :deep(p) {
  white-space: pre-wrap;
}

.notice-content :deep(.ql-align-center) {
  text-align: center;
}

.notice-content :deep(.ql-align-right) {
  text-align: right;
}

.notice-content :deep(.ql-align-justify) {
  text-align: justify;
}

.notice-content :deep(ul),
.notice-content :deep(ol) {
  margin: 0 0 8px;
  padding-left: 1.5em;
}

.notice-content :deep(li) {
  margin: 0;
}

.notice-content :deep(img) {
  max-width: 100%;
  height: auto;
}

.notice-content :deep(blockquote) {
  margin: 0 0 8px;
  padding-left: 12px;
  border-left: 3px solid #edf0f3;
  color: #60656f;
}
</style>
