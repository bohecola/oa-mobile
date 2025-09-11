<template>
  <div>
    <NavBar right-text="新增" @click-right="handleAdd" />

    <div class="scroll-container-base">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          v-model:error="error"
          :finished="finished"
          :finished-text="finishedText"
          :error-text="errorText"
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item.id"
            :title="item.carNumber"
            title-class="truncate"
            @click="onItemClick(item)"
          >
            <template #label>
              <div class="flex flex-col">
                <div>部门/项目部：{{ item.deptName }}</div>
                <div v-if="item.payWay === '1'">
                  油卡卡号：{{ item.cardNumber }}
                </div>
                <div>加油金额：{{ item.amount }} 元</div>
                <div>加油日期：{{ parseTime(item.refuelingDate, '{y}-{m}-{d}') }}</div>
              </div>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useHelper } from './form'
import { listCarRefuelingRecord } from '@/api/oa/car/carRefuelingRecord'
import { useList } from '@/hooks'
import type { CarRefuelingRecordQuery, CarRefuelingRecordVO } from '@/api/oa/car/carRefuelingRecord/types'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { isOilcardFuel, isCashFuel } = useHelper()

const payWay = (() => {
  if (isOilcardFuel) {
    return '1'
  }

  if (isCashFuel) {
    return '2'
  }

  return undefined
})()

// 列表
const {
  refreshing,
  loading,
  list,
  error,
  finished,
  finishedText,
  errorText,
  onLoad,
  onRefresh,
} = useList<CarRefuelingRecordVO, CarRefuelingRecordQuery>({
  initQueryParams: {
    pageNum: 1,
    pageSize: 10,
    queryType: 'my',
    payWay,
  },
  request: listCarRefuelingRecord,
})

// 新增
function handleAdd() {
  if (isOilcardFuel) {
    proxy.$router.push('/fuel-oilcard/new')
  }

  if (isCashFuel) {
    proxy.$router.push('/fuel-cash/new')
  }
}

// 点击
function onItemClick(item: CarRefuelingRecordVO) {
  if (isOilcardFuel) {
    proxy.$router.push(`/fuel-oilcard/${item.id}`)
  }

  if (isCashFuel) {
    proxy.$router.push(`/fuel-cash/${item.id}`)
  }
}
</script>
