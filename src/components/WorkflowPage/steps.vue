<template>
  <div v-loading="loading">
    <van-steps direction="vertical" :active="active">
      <van-step v-for="(item, index) in historyList" :key="item.id">
        <template #active-icon>
          <van-icon v-if="item.status === 'pass'" name="checked" class="text-[var(--van-primary-color)]" />
          <span v-else class="inline-block w-[10px] h-[10px] rounded-full bg-[var(--van-primary-color)]" />
        </template>

        <h3>{{ item.name }}</h3>
        <div class="text-xs p-2 flex flex-col gap-1">
          <p>开始时间：{{ item.startTime }}</p>
          <p>结束时间：{{ item.endTime }}</p>
          <p>时长：{{ item.runDuration }}</p>
          <p>办理人：{{ item.nickName }}</p>
          <div class="flex gap-2">
            <div>
              状态：<van-tag :class="getStatusClass(item.status)">
                {{ item.statusName }}
              </van-tag>
            </div>
          </div>
          <div v-if="index > 0" class="flex gap2">
            <TextareaView :value="`审批意见：${item.comment ?? ''}`" />
          </div>
        </div>
      </van-step>
      <!-- TODO 附件 -->
    </van-steps>
    <bottom-line v-if="!loading" />
  </div>
</template>

<script setup lang='ts'>
import { service } from '@/service'

const loading = ref(false)
const historyList = ref<any[]>([])

const active = computed(() => historyList.value.length - 1)

async function init(businessKey: string | number) {
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
