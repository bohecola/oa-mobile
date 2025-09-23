<template>
  <div>
    <NavBar />

    <div
      class="py-2"
      :class="{
        'scroll-container-middle': isExecutePage || isAuditPage,
        'scroll-container-base': isViewPage,
      }"
    >
      <van-form
        ref="Form"
        v-loading="isLoading"
        label-width="auto"
        label-align="top"
        input-align="left"
        class="reset-label"
        readonly
      >
        <van-cell-group inset>
          <van-field
            v-model.trim="form.title"
            label="标题"
            name="title"
            placeholder="请输入标题"
            :rules="rules.title"
          />

          <van-field
            v-model="form.content"
            label="内容"
            name="content"
            type="textarea"
            placeholder="请输入内容"
            :rules="rules.content"
            rows="1"
            autosize
          />

          <DateSelect
            v-model="form.startDate"
            label="开始日期"
            name="startDate"
          />

          <DateSelect
            v-model="form.endDate"
            label="完成日期"
            name="endDate"
          />

          <van-field
            v-if="!isNil(form.realEndDate) && form.status === '4'"
            v-model="form.realEndDate"
            label="实际完成日期"
            name="realEndDate"
          />

          <van-field
            v-if="!isNil(form.endUserName) && form.status === '4'"
            v-model="form.endUserName"
            label="完成人"
            name="endUserName"
          />

          <van-field
            v-if="!isNil(form.approvalComment)"
            v-model="form.approvalComment"
            label="审批意见"
            name="approvalComment"
            type="textarea"
            rows="1"
            autosize
          />
        </van-cell-group>

        <van-cell-group title="执行记录" inset>
          <div class="p-4">
            <van-empty
              v-if="isEmpty(form.recordList)"
              :image="emptyImage"
              image-size="60"
              description="暂无数据"
            />

            <Comment
              v-for="item in form.recordList ?? []"
              :key="item.id"
              :data="item"
              :show-reply-button="isExecutePage"
              class="mb-2"
              @reply-click="handleReplyClick"
              @more-option="handleMoreOption"
            />
          </div>

          <!-- 回复弹窗 -->
          <Reply ref="ReplyRef" :task-id="form.id" @send-success="refresh" />

          <!-- 更多选项弹窗 -->
          <MoreOption ref="MoreOptionRef" @delete-success="refresh" @reply="handleReplyClick" />
        </van-cell-group>
      </van-form>
    </div>

    <div v-if="isExecutePage || isAuditPage" class="op-bottom-base">
      <van-button
        v-if="isExecutePage"
        type="primary"
        class="flex-[4]"
        :disabled="isLoading"
        @click="addNewRecord"
      >
        新增执行记录
      </van-button>

      <van-button
        v-if="isAuditPage"
        type="primary"
        class="flex-[4]"
        :disabled="isLoading"
        @click="handleAudit"
      >
        审批
      </van-button>
    </div>

    <AuditDialog ref="AuditDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash-es'
import { useForm } from './form'
import Reply from './components/Reply.vue'
import Comment from './components/Comment.vue'
import MoreOption from './components/MoreOption.vue'
import AuditDialog from './components/AuditDialog.vue'
import emptyImage from '@/assets/images/custom-empty-image.png'
import type { TaskRecordVO } from '@/api/oa/task/taskRecord/types'

const ReplyRef = ref<InstanceType<typeof Reply>>()
const MoreOptionRef = ref<InstanceType<typeof MoreOption>>()
const AuditDialogRef = ref<InstanceType<typeof AuditDialog>>()

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { Form, form, rules, isLoading, viewAndRecordType, viewAndRecord } = useForm()

// 是否显示回复按钮
const isExecutePage = computed(() => viewAndRecordType.value === 'execute')
const isAuditPage = computed(() => viewAndRecordType.value === 'audit')
const isViewPage = computed(() => viewAndRecordType.value === 'view')

// 新增执行记录
function addNewRecord() {
  ReplyRef.value?.open({
    placeholder: '新增执行记录',
    taskId: form.value.id,
  })
}

// 审批
function handleAudit() {
  AuditDialogRef.value?.open({
    data: form.value,
    success: () => {
      proxy.$router.back()
    },
  })
}

// 回复点击
function handleReplyClick(data: TaskRecordVO) {
  ReplyRef.value?.open({
    placeholder: `回复${data.createByName}`,
    taskId: form.value.id,
    targetData: data,
  })
}

// 更多选项
function handleMoreOption(data: TaskRecordVO) {
  MoreOptionRef.value?.open({ data })
}

// 刷新
async function refresh() {
  await viewAndRecord({ id: form.value.id, type: 'execute' })
}

// 挂载
onMounted(() => {
  const route = useRoute()
  const { id } = route.params
  const isExecute = route.path.includes('execute')
  const isAudit = route.path.includes('audit')

  const type = (() => {
    if (isExecute) {
      return 'execute'
    }

    if (isAudit) {
      return 'audit'
    }

    return 'view'
  })()

  viewAndRecord({ id: id as string, type })
})
</script>
