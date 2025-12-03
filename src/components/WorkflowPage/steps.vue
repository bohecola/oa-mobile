<template>
  <div v-loading="loading">
    <van-steps direction="vertical" :active="active">
      <van-step v-for="(item) in historyList" :key="item.id">
        <template #active-icon>
          <van-icon v-if="item.status === 'pass'" name="checked" class="text-[var(--van-primary-color)]" />
          <span v-else class="inline-block w-[10px] h-[10px] rounded-full bg-[var(--van-primary-color)]" />
        </template>

        <h3>{{ item.nickName }}({{ item.name }})</h3>
        <div class="text-xs p-2 flex flex-col gap-1">
          <p>开始时间：{{ item.startTime }}</p>
          <p>结束时间：{{ item.endTime }}</p>
          <p v-if="item.runDuration">
            时长：{{ item.runDuration }}
          </p>
          <div class="flex gap-2">
            <div>
              状态：<van-tag :class="getStatusClass(item.status)">
                {{ item.statusName }}
              </van-tag>
            </div>
          </div>
          <div v-if=" item.comment" class="flex gap2">
            <TextareaView v-if="item.status === 'process_review'" :value="`评论内容：${item.comment ?? ''}`" />
            <TextareaView v-else :value="`审批意见：${item.comment ?? ''}`" />
          </div>
          <div v-if="!isNil(item.attachmentList)" class="flex">
            <div class="break-keep">
              附件：
            </div>
            <UploadFile
              :model-value="item.attachmentList.map((e: any) => e.contentId)"
              value-type="array"
              readonly
            />
          </div>
          <div v-if="!isNil(item.fileList)" class="flex">
            <div class="break-keep">
              附件：
            </div>
            <UploadFile
              :model-value="item.fileList.map((e: any) => e.ossId)"
              value-type="array"
              readonly
            />
          </div>
        </div>
      </van-step>
    </van-steps>
    <bottom-line v-if="!loading" />
  </div>
</template>

<script setup lang='ts'>
import { isNil } from 'lodash-es'
import { service } from '@/service'

const loading = ref(false)
const historyList = ref<any[]>([])

const active = computed(() => historyList.value.length - 1)

async function init(businessKey: string) {
  loading.value = true
  historyList.value = []
  const { data } = await service.workflow.processInstance
    .getHistoryRecord(businessKey)
    .finally(() => { loading.value = false }) as any

  historyList.value = data.reverse()
}

function getStatusClass(status: string) {
  switch (status) {
    case 'pass':
      return 'pass'
    case 'back':
      return 'back'
    case 'pending':
      return 'pending'
    case 'transfer':
      return 'transfer'
    case 'copy':
      return 'copy'
    default:
      return 'primary'
  }
}

defineExpose({
  init,
})
</script>

<style lang="scss" scoped>
.pass {
  background-color: var(--van-success-color);
}

.back {
  background-color: var(--van-danger-color);
}

.pending {
  background-color: #f0b100;
}

.transfer {
  background-color: #7232dd;
}

.copy {
  background-color: var(--van-warning-color);
}

.primary {
  background-color: var(--van-primary-color);
}
</style>
