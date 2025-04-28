<template>
  <van-cell-group v-if="!isEmpty(historyList)" inset>
    <TableCard title="审批附件" :is-empty="isEmpty(historyList)">
      <van-form label-width="auto">
        <van-field v-for="(item, index) in historyList" :key="index" :label="item.nickName" input-align="right">
          <template #input>
            <div class="flex justify-end flex-wrap">
              <UploadFile v-for="file in item.attachmentList" :key="file.contentId" v-model="file.contentId" readonly />
            </div>
          </template>
        </van-field>
      </van-form>
    </TableCard>
  </van-cell-group>
</template>

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash-es'
import processApi from '@/api/workflow/processInstance'

const props = defineProps<{
  businessKey?: string | number
}>()

const loading = ref(false)
const historyList = ref<Array<any>>([])

// 初始化查询审批记录
async function init(businessKey: string | number) {
  loading.value = true
  historyList.value = []
  processApi.getHistoryRecord(businessKey).then((resp: any) => {
    historyList.value = resp.data.filter((e: any) => !isEmpty(e.attachmentList))
    loading.value = false
  })
}

onMounted(() => {
  if (!isNil(props.businessKey)) {
    init(props.businessKey)
  }
})

defineExpose({
  init,
})
</script>
