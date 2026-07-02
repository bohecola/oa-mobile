<template>
  <div class="min-h-screen bg-white">
    <NavBar title="公告" />

    <main class="h-[calc(100vh-var(--van-nav-bar-height)-env(safe-area-inset-top))] overflow-y-auto px-6 pb-10">
      <section class="pt-5">
        <h1 class="text-base font-semibold leading-7 text-[#20242a]">
          {{ notice.title }}
        </h1>

        <div class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#8f96a0]">
          <span>{{ notice.department }}</span>
          <span class="text-[#1989fa]">#{{ notice.category }}#</span>
          <span class="w-full">{{ notice.publishTime }}</span>
        </div>
      </section>

      <article class="pt-12 text-[#20242a]">
        <h2 class="text-center text-base font-semibold leading-7">
          关于住房公积金缴纳比例调整的
        </h2>
        <h2 class="mt-5 text-center text-base font-semibold leading-7">
          通知
        </h2>

        <div class="mt-10 space-y-3 text-sm leading-7">
          <p class="indent-[2em]">
            根据《住房公积金管理条例》等相关法律法规规定，结合公司经营发展实际情况，现公司对住房公积金缴纳比例进行调整。现将具体事宜告知如下：
          </p>
          <p class="indent-[2em]">
            公司住房公积金缴纳比例调整方案：自2025年12月起，公司住房公积金单位缴纳比例由现行12%调整至5%，职工个人缴纳比例由现行8%调整至5%，缴纳基数上调。职工个人应缴纳部分，仍按原方式从当月工资中代扣代缴。
          </p>
        </div>

        <div class="mt-14 text-right text-sm leading-8">
          <p>{{ notice.department }}</p>
          <p class="mt-5">
            2025年12月4日
          </p>
        </div>
      </article>

      <div class="mt-8 border-t border-[#edf0f3] pt-7">
        <div class="text-base text-[#20242a]">
          附件：
        </div>

        <button
          v-for="attachment in notice.attachments"
          :key="attachment.name"
          class="mt-5 flex w-full items-center gap-3 text-left"
          @click="openAttachment(attachment)"
        >
          <img :src="pdfIcon" alt="pdf" class="h-10 w-10 shrink-0 object-contain">
          <div class="min-w-0 flex-1">
            <div class="truncate text-sm text-[#20242a]">
              {{ attachment.name }}
            </div>
            <div class="mt-1 text-xs text-[#a7adb5]">
              {{ attachment.size }}
            </div>
          </div>
        </button>
      </div>

      <div class="mt-8 border-t border-[#edf0f3] pt-7">
        <button
          class="flex gap-5 text-xs text-[#1989fa]"
          @click="handleAllRead"
        >
          <span>{{ notice.readCount }}人已读</span>
          <span>{{ notice.unreadCount }}人未读</span>
        </button>
      </div>
    </main>

    <van-popup
      v-model:show="attachmentPreviewVisible"
      position="bottom"
      class="h-full w-full"
      teleport="body"
      safe-area-inset-bottom
    >
      <NavBar
        :title="currentAttachment?.name ?? '附件预览'"
        :is-left-click-back="false"
        @click-left="attachmentPreviewVisible = false"
      />

      <div class="h-[calc(100vh-var(--van-nav-bar-height)-env(safe-area-inset-top))] overflow-hidden bg-[#f7f8fa]">
        <iframe
          v-if="attachmentPreviewVisible"
          :srcdoc="attachmentPreviewHtml"
          class="h-full w-full border-none bg-white"
        />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import pdfIcon from '@/assets/images/pdf.png'

const route = useRoute()
const router = useRouter()

interface AttachmentItem {
  name: string
  size: string
  previewHtml: string
}

const notice = {
  title: '关于住房公积金缴纳比例调整的通知',
  department: '人力资源部',
  category: '通知',
  publishTime: '2025.12.05 10:08',
  readCount: 40,
  unreadCount: 0,
  attachments: [
    {
      name: '关于优化创新技术研发中心考勤管理的通知.pdf',
      size: '183.79KB',
      previewHtml: `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
              body { margin: 0; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif; background: #f7f8fa; color: #20242a; }
              .page { min-height: 100vh; padding: 24px 18px 32px; box-sizing: border-box; background: #fff; }
              h1 { margin: 0 0 16px; font-size: 18px; line-height: 1.5; text-align: center; }
              p { margin: 0 0 12px; font-size: 14px; line-height: 1.9; text-indent: 2em; }
              .meta { margin-top: 28px; text-align: right; font-size: 14px; line-height: 1.8; }
            </style>
          </head>
          <body>
            <div class="page">
              <h1>关于优化创新技术研发中心考勤管理的通知</h1>
              <p>为进一步提升团队工作质量与协作效率，建立科学、高效、有序的工作节奏，结合创新技术研发中心岗位工作特点及实际业务情况，经公司研究决定，对创新技术研发中心现有出勤及加班管理进行优化调整。请大家严格按照调整后的制度标准执行。</p>
              <p>附件内容示意预览。点击附件后可在此处查看文件内容，后续接入真实附件地址后可替换为正式 PDF 预览。</p>
              <div class="meta">
                <div>人力资源部</div>
                <div>2025年12月4日</div>
              </div>
            </div>
          </body>
        </html>
      `,
    },
  ],
}

const attachmentPreviewVisible = ref(false)
const currentAttachment = ref<AttachmentItem | null>(null)
const attachmentPreviewHtml = ref('')

function openAttachment(attachment: AttachmentItem) {
  currentAttachment.value = attachment
  attachmentPreviewHtml.value = attachment.previewHtml
  attachmentPreviewVisible.value = true
}

function handleAllRead() {
  router.push(`/notice/${route.params.id}/receivers`)
}
</script>
