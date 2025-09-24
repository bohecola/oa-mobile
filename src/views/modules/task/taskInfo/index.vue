<template>
  <div>
    <NavBar>
      <template #right>
        <span v-hasPermi="['oa:task:taskInfo:add']" class="text-[--van-primary-color]" @click="onClickRight">
          新增
        </span>
      </template>
    </NavBar>

    <van-tabs v-model:active="activeName" @change="onTabChange">
      <van-tab title="我的待办" name="waiting">
        <div class="scroll-container-tabs">
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
                :title="item.title"
                title-class="w-full"
              >
                <template #label>
                  <div class="break-words line-clamp-2 mb-1" v-html="item.content?.replace(/\n/g, '<br>')" />
                  <div class="grid grid-cols-2">
                    <div>创建人：{{ item.createByName }}</div>
                    <div>状态：<dict-tag :value="item.status" :options="oa_task_info_status" /></div>
                    <div>开始日期：{{ parseTime(item.startDate, '{y}-{m}-{d}') }}</div>
                    <div>完成日期：{{ parseTime(item.endDate, '{y}-{m}-{d}') }}</div>
                  </div>

                  <div class="mt-2 flex justify-end gap-3">
                    <van-button
                      v-if="['0'].includes(item.status) && user.info.userId === item.createBy"
                      type="primary"
                      size="small"
                      plain
                      @click="handleEdit(item)"
                    >
                      修 改
                    </van-button>

                    <van-button
                      v-if="['1', '3'].includes(item.status)"
                      type="primary"
                      size="small"
                      @click="handleView(item, 'execute')"
                    >
                      执 行
                    </van-button>

                    <van-button
                      v-if="['1', '3'].includes(item.status)"
                      type="success"
                      size="small"
                      plain
                      @click="handleSubmitAudit(item)"
                    >
                      事项完毕，提交审核
                    </van-button>

                    <van-button
                      v-if="['2'].includes(item.status) && user.info.userId === item.createBy"
                      type="primary"
                      size="small"
                      @click="handleAudit(item)"
                    >
                      事项审批
                    </van-button>

                    <van-button
                      v-if="['1', '3'].includes(item.status) && user.info.userId === item.createBy"
                      type="danger"
                      plain size="small"
                      @click="handleInvalid(item)"
                    >
                      作 废
                    </van-button>

                    <van-button
                      v-if="['0'].includes(item.status) && user.info.userId === item.createBy"
                      type="danger"
                      size="small"
                      @click="handleDelete(item)"
                    >
                      删除
                    </van-button>
                  </div>
                </template>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>

      <van-tab title="我的已办" name="finish">
        <div class="scroll-container-tabs">
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
                :title="item.title"
                title-class="w-full"
                @click="handleView(item, 'view')"
              >
                <template #label>
                  <div class="break-words line-clamp-2 mb-1" v-html="item.content?.replace(/\n/g, '<br>')" />
                  <div class="grid grid-cols-2">
                    <div>创建人：{{ item.createByName }}</div>
                    <div>状态：<dict-tag :value="item.status" :options="oa_task_info_status" /></div>
                    <div>开始日期：{{ parseTime(item.startDate, '{y}-{m}-{d}') }}</div>
                    <div>完成日期：{{ parseTime(item.endDate, '{y}-{m}-{d}') }}</div>
                    <div
                      :class="{
                        'text-[--van-warning-color]': dayjs(item.realEndDate).isAfter(dayjs(item.endDate)),
                      }"
                    >
                      实际完成日期：{{ parseTime(item.realEndDate, '{y}-{m}-{d}') }}
                    </div>
                    <div>完成人：{{ item.endUserName }}</div>
                  </div>
                </template>
              </van-cell>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { ViewAndRecordType } from './form'
import type { TaskInfoQuery, TaskInfoVO } from '@/api/oa/task/taskInfo/types'
import { delTaskInfo, editStatus, listTaskInfo } from '@/api/oa/task/taskInfo'
import { useList } from '@/hooks'
import { useStore } from '@/store'

type TabName = 'waiting' | 'finish'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { msgSuccess, confirm, loading: loadingModal, closeLoading: closeLoadingModal } = proxy.$modal

const { oa_task_info_status } = toRefs(proxy.useDict('oa_task_info_status'))

const { user } = useStore()

const activeName = ref<TabName>('waiting')

const { list, loading, refreshing, finished, finishedText, errorText, error, queryParams, onLoad, onRefresh } = useList<TaskInfoVO, TaskInfoQuery>({
  initQueryParams: {
    pageNum: 1,
    pageSize: 10,
    title: undefined,
    status: undefined,
    queryStatus: activeName.value,
    params: {},
  },
  request: listTaskInfo,
})

// 新增
function onClickRight() {
  proxy.$router.push('/taskInfo/new')
}

// 查看 / 执行
async function handleView(row: TaskInfoVO, type: ViewAndRecordType) {
  if (type === 'view') {
    proxy.$router.push(`/taskInfo/${row.id}`)
  }

  if (type === 'execute') {
    proxy.$router.push(`/taskInfo/${row.id}/execute`)
  }
}

// 修改
async function handleEdit(row: TaskInfoVO) {
  proxy.$router.push(`/taskInfo/${row.id}/edit`)
}

// 提交审核
async function handleSubmitAudit(row: TaskInfoVO) {
  confirm('确认事项完毕，是否提交审核？').then(
    async () => {
      loadingModal()
      const { msg } = await editStatus(row.id, '2').finally(closeLoadingModal)
      msgSuccess(msg)
      onRefresh()
    },
  )
}

// 事项审批
function handleAudit(row: TaskInfoVO) {
  proxy.$router.push(`/taskInfo/${row.id}/audit`)
}

// 作废
function handleInvalid(row?: TaskInfoVO) {
  confirm('是否作废当前工作任务？')
    .then(async () => {
      loadingModal()
      const { msg } = await editStatus(row?.id, '9').finally(closeLoadingModal)
      msgSuccess(msg)
      onRefresh()
    })
}

// 删除
function handleDelete(row?: TaskInfoVO) {
  confirm(`是否确认删除标题为 ${row.title} 的数据？`)
    .then(async () => {
      const { msg } = await delTaskInfo(row.id)
      msgSuccess(msg)
      onRefresh()
    })
}

// 切换标签
function onTabChange(name: TabName) {
  queryParams.value.queryStatus = name
  queryParams.value.pageNum = 1
  onRefresh()
}
</script>
