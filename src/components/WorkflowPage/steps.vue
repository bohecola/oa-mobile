<template>
  <div v-loading="loading">
    <van-steps direction="vertical" :active="active">
      <van-step v-for="(item, index) in historyList" :key="item.id">
        <template #active-icon>
          <van-icon v-if="item.status === 'pass'" name="checked" class="text-[var(--van-primary-color)]" />
          <van-icon v-else name="pause-circle" class="text-[var(--van-primary-color)]" />
        </template>

        <h3>{{ item.name }}</h3>
        <div class="text-xs p-2 flex flex-col gap-1">
          <p>开始时间：{{ item.startTime }}</p>
          <p>结束时间：{{ item.endTime }}</p>
          <p>时长：{{ item.runDuration }}</p>
          <p>办理人：{{ item.nickName }}</p>
          <div class="flex gap-2">
            <div>状态：</div>

            <van-tag type="primary">
              {{ item.statusName }} {{ item.status }}
            </van-tag>
          </div>
          <div v-if="index > 0" class="flex gap2">
            <div>审批意见：</div>
            <TextareaView :value="item.comment" />
          </div>
        </div>
      </van-step>
      <!-- <dict-tag :options="wf_business_status" :value="item.status" /> -->
      <!-- TODO 附件 -->
    </van-steps>
    <bottom-line v-if="!loading" />
  </div>
</template>

<script setup lang='ts'>
import { service } from '@/service'

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { wf_business_status } = toRefs<any>(proxy?.useDict('wf_business_status'))

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

defineExpose({
  init,
})
</script>
