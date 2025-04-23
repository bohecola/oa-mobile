<template>
  <van-popup v-model:show="listVisible" destroy-on-close position="bottom" closeable>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      class="pt-10"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item.createByName">
        <template #label>
          <div>申请人：{{ item.createByName }}</div>
          <div>申请部门：{{ item.deptName }}</div>
          <div>申请时间：{{ item.createTime }}</div>
          <div>申请金额：{{ item.amount }}</div>
          <div>申请事由：{{ item.reason }}</div>
        </template>

        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <div class="text-blue-600" @click="handleDetail(item)">
            查看车辆详情
          </div>
        </template>
      </van-cell>
    </van-list>
  </van-popup>

  <van-popup v-model:show="itemVisible" destroy-on-close position="bottom" closeable>
    <div v-loading="detailLoading">
      <detail :show-view-btn="false" :vehicle-detail="vehicleDetail" />
    </div>
  </van-popup>
</template>

<script setup lang='ts'>
import detail from './detail.vue'
import type { DailyFeeForm, DailyFeeQuery } from '@/api/oa/daily/fee/types'
import { getActHiProcinstByBusinessKey } from '@/api/workflow/processInstance'
import { getVariablesByProcessInstanceId } from '@/api/workflow/task'
import { listDailyFee } from '@/api/oa/daily/fee'
import { usePopup } from '@/hooks'

const props = defineProps<{
  formValue: DailyFeeForm
}>()

const { visible: listVisible, openPopup: openListPopup } = usePopup()
const { visible: itemVisible, openPopup: openItemPopup } = usePopup()

const loading = ref(false)
const finished = ref(false)

const list = ref([])
const total = ref(0)

const detailLoading = ref(false)
const vehicleDetail = ref<any>({})

const queryParams: DailyFeeQuery = reactive({
  pageNum: 1,
  pageSize: 10,
  feeType: props.formValue.feeType,
  contentJson: props.formValue.b_vehicleNo,
})

async function getList() {
  loading.value = true
  const res = await listDailyFee(queryParams)
  list.value = res.rows
  total.value = res.total
  loading.value = false
}

async function onLoad() {
  list.value = []
  try {
    const { rows } = await listDailyFee(queryParams)

    list.value.push(...rows)

    if (rows.length < queryParams.pageSize) {
      finished.value = true
    }
    else {
      queryParams.pageNum++
    }
  }
  catch (error) {
    console.error('Error loading data:', error)
    finished.value = true
  }
  finally {
    loading.value = false
  }
}

async function handleDetail(row: any) {
  openItemPopup()

  detailLoading.value = true

  const { data } = await getActHiProcinstByBusinessKey(row.id)
  const { data: { entity } } = await getVariablesByProcessInstanceId(data.id)

  vehicleDetail.value = entity

  detailLoading.value = false
}

onMounted(() => {
  getList()
})

defineExpose({
  openListPopup,
})
</script>
