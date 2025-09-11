<template>
  <div>
    <NavBar :right-text="showAdd ? '新增' : undefined" @click-right="handleAdd" />

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
            :title="item.deptName"
            title-class="truncate"
            @click="onItemClick(item)"
          >
            <template #label>
              <div class="flex gap-2">
                <div>{{ parseTime(item.operateDate, '{y}-{m}-{d}') }}</div>
                <div>{{ item.operator }}</div>

                <div class="flex-1" />
                <van-tag v-if="item.status === '0'">
                  草稿
                </van-tag>
                <van-tag v-else type="primary">
                  已完成
                </van-tag>
              </div>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { ProductTaskRecordVo } from '@/api/ptms/task/productTaskUpdate/types'
import { getProjectRecordList, isAddProjectDayTask } from '@/api/ptms/task/productTask'
import { useList } from '@/hooks'
import { useStore } from '@/store'

// 用户
const { user } = useStore()

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

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
} = useList<ProductTaskRecordVo, PageQuery>({
  initQueryParams: {
    pageNum: 1,
    pageSize: 10,
  },
  request: getProjectRecordList,
})

// 是否展示新增按钮
const showAdd = ref(false)

// 新增
function handleAdd() {
  proxy.$router.push('/daily-report/new')
}

// 点击
function onItemClick(item: ProductTaskRecordVo) {
  // 状态是草稿 & 自己创建的数据 => 编辑
  if (item.status === '0' && item.createBy === user.info.userId) {
    return proxy.$router.push(`/daily-report/${item.id}/edit`)
  }

  // 查看详情
  proxy.$router.push(`/daily-report/${item.id}`)
}

// 挂载
onMounted(async () => {
  const { data } = await isAddProjectDayTask()

  showAdd.value = data
})
</script>
