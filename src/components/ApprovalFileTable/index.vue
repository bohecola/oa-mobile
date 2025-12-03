<template>
  <div v-if="!isEmpty(historyList)" class="px-4">
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
  </div>
  <div v-if="!isEmpty(processReviewList)" class="px-4">
    <TableCard title="评论记录" :is-empty="isEmpty(processReviewList)">
      <van-cell-group>
        <van-cell v-for="(item, index) in processReviewList" :key="index" :title="item.nickName" class="full-width-label-cell">
          <template #value>
            <span style="font-size: 12px;">{{ item.startTime }}</span>
          </template>
          <template #label>
            <div>
              {{ item.comment }}
              <UploadFile v-for="file in item.fileList" :key="file.ossId" v-model="file.ossId" readonly />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </TableCard>
  </div>
</template>

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash-es'
import processApi from '@/api/workflow/processInstance'

const props = defineProps<{
  businessKey?: string | number
}>()

const loading = ref(false)
// 审批附件
const historyList = ref<Array<any>>([])
// 评论记录
const processReviewList = ref<Array<any>>([])

// 初始化查询审批记录
async function init(businessKey: string | number) {
  loading.value = true
  historyList.value = []
  processReviewList.value = []
  processApi.getHistoryRecord(businessKey).then((resp: any) => {
    historyList.value = resp.data.filter((e: any) => !isEmpty(e.attachmentList))
    processReviewList.value = resp.data.filter((e: any) => e.status === 'process_review')
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

<style scoped lang="scss">
/* 关键CSS：改变布局方向并调整细节 */
.full-width-label-cell.van-cell {
  /* 核心：改为垂直布局 */
  flex-direction: column;
  align-items: stretch; /* 让子元素撑满宽度 */
}

/* 调整标题和值的容器，使其在一行内左右分布 */
.full-width-label-cell .van-cell__title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
/* 确保右侧value部分正常显示 */
.full-width-label-cell .van-cell__value {
  flex-shrink: 0; /* 防止被挤压 */
  margin-left: 16px; /* 可选，增加与标题的间距 */
}

/* 此时label会自然在第二行整行显示 */
.full-width-label-cell .van-cell__label {
  display: block;
  width: 100%;
  margin-top: 8px; /* 增加与上一行的间距 */
  color: #969799; /* 可选，使用Vant默认的辅助文字色 */
  font-size: 12px;
}
</style>
