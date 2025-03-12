<template>
  <van-popup
    v-model:show="popup.visible"
    :before-close="cancel"
    :close-on-click-overlay="false"
    position="bottom"
    class="h-30vh"
    round
    safe-area-inset-bottom
  >
    <van-form v-loading="loading" label-width="120px">
      <van-field
        v-model="form.message"
        rows="2"
        autosize
        label="审批意见"
        type="textarea"
        maxlength="500"
        placeholder="请输入审批意见"
        show-word-limit
      />
      <van-field label="抄送人" is-link @click="UserSelectRef?.open">
        <template #input>
          <UserSelect
            ref="UserSelectRef"
            v-model="selectCopyUserList"
            value-type="object"
            :multiple="true"
          />
        </template>
      </van-field>

      <span class="flex justify-end gap-2 px-3 py-4">
        <van-button type="primary" size="small" :disabled="buttonDisabled" @click="handleCompleteTask">提交</van-button>
        <van-button v-if="task.businessStatus === 'waiting'" type="primary" size="small" :disabled="buttonDisabled" @click="openDelegateTask"> 委托 </van-button>
        <van-button v-if="task.businessStatus === 'waiting'" type="primary" size="small" :disabled="buttonDisabled" @click="openTransferTask"> 转办 </van-button>
        <!-- <van-button
        v-if="task.businessStatus === 'waiting' && task.multiInstance"
        :disabled="buttonDisabled"
        type="primary"
        @click="addMultiInstanceUser"
      >
        加签
      </van-button> -->
        <!-- <van-button
        v-if="task.businessStatus === 'waiting' && task.multiInstance"
        :disabled="buttonDisabled"
        type="primary"
        @click="deleteMultiInstanceUser"
      >
        减签
      </van-button> -->
        <!-- <van-button v-if="task.businessStatus === 'waiting'" :disabled="buttonDisabled" type="danger" size="small" @click="handleTerminationTask"> 终止 </van-button> -->
        <van-button v-if="task.businessStatus === 'waiting'" :disabled="buttonDisabled" type="danger" size="small" @click="handleBackProcessOpen"> 退回 </van-button>
        <van-button :disabled="buttonDisabled" size="small" @click="cancel">取消</van-button>
      </span>
    </van-form>

    <!-- 委托 -->
    <UserSelect ref="DelegateTaskRef" value-type="object" :multiple="false" popup-only @confirm="handleDelegateTask" />
    <!-- 转办 -->
    <UserSelect ref="TransferTaskRef" value-type="object" :multiple="false" popup-only @confirm="handleTransferTask" />
    <!-- 加签组件 -->
    <!-- <MultiInstanceUser ref="multiInstanceUserRef" :title="title" @submit-callback="closeDialog" /> -->
    <!-- 驳回弹窗 -->
    <van-dialog
      v-model:show="backVisible"
      title="驳回"
      show-cancel-button
      :close-on-click-overlay="false"
      :confirm-button-disabled="backButtonDisabled"
      :cancel-button-disabled="backButtonDisabled"
      @confirm="handleBackProcess"
    >
      <van-field
        v-if="task.businessStatus === 'waiting'"
        v-model="rejectNodeName"
        is-link
        readonly
        name="targetActivityId"
        label="驳回节点"
        placeholder="请选择"
        @click="showNodePicker = true"
      />
      <van-popup
        v-model:show="showNodePicker"
        position="bottom"
        teleport="body"
        round
        safe-area-inset-bottom
      >
        <van-picker
          :columns="computedTaskNodeList"
          @confirm="onRejectNodeConfirm"
          @cancel="onRejectNodeCancel"
        />
      </van-popup>
    </van-dialog>
  </van-popup>
</template>

<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { ref } from 'vue'
import { backProcess, completeTask, delegateTask, getTaskById, getTaskNodeList, terminationTask, transferTask } from '@/api/workflow/task'
import UserSelect from '@/components/UserSelect/index.vue'
// import MultiInstanceUser from '@/components/Process/multiInstanceUser.vue'
import type { UserVO } from '@/api/system/user/types'
import type { TaskVO } from '@/api/workflow/task/types'

const props = defineProps({
  entityVariables: {
    type: Object,
    default: () => {},
  },
})
const emits = defineEmits(['submitCallback', 'cancelCallback'])
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const UserSelectRef = ref<InstanceType<typeof UserSelect> | null>()
const TransferTaskRef = ref<InstanceType<typeof UserSelect> | null>()
const DelegateTaskRef = ref<InstanceType<typeof UserSelect> | null>()
// const userSelectCopyRef = ref<InstanceType<typeof UserSelect>>()

// 加签组件
// const multiInstanceUserRef = ref<InstanceType<typeof MultiInstanceUser>>()

// 驳回节点选择器显示
const showNodePicker = ref(false)
const rejectNodeName = ref('')

// 遮罩层
const loading = ref(true)
// 按钮
const buttonDisabled = ref(true)
// 任务id
const taskId = ref<string>('')
// 抄送人
const selectCopyUserList = ref<UserVO[]>([])

// 驳回是否显示
const backVisible = ref(false)
const backLoading = ref(true)
const backButtonDisabled = ref(true)
// 可驳回得任务节点
const taskNodeList = ref<any[]>([])
const computedTaskNodeList = computed(() => {
  return taskNodeList.value.map((e: any) => {
    return {
      text: e.nodeName,
      value: e.nodeId,
    }
  })
})

// 任务
const task = ref<TaskVO>({
  id: undefined,
  name: undefined,
  description: undefined,
  priority: undefined,
  owner: undefined,
  assignee: undefined,
  assigneeName: undefined,
  processInstanceId: undefined,
  executionId: undefined,
  taskDefinitionId: undefined,
  processDefinitionId: undefined,
  endTime: undefined,
  taskDefinitionKey: undefined,
  dueDate: undefined,
  category: undefined,
  parentTaskId: undefined,
  tenantId: undefined,
  claimTime: undefined,
  businessStatus: undefined,
  businessStatusName: undefined,
  processDefinitionName: undefined,
  processDefinitionKey: undefined,
  participantVo: undefined,
  multiInstance: undefined,
  businessKey: undefined,
  wfNodeConfigVo: undefined,
})

// 加签 减签标题
const title = ref('')
const popup = reactive<DialogOption>({
  visible: false,
  title: '提示',
})

const form = ref<Record<string, any>>({
  taskId: undefined,
  message: undefined,
  variables: {},
  messageType: ['1'],
  wfCopyList: [],
})
const backForm = ref<Record<string, any>>({
  taskId: undefined,
  targetActivityId: undefined,
  message: undefined,
  variables: {},
  messageType: ['1'],
})

const backNode = computed(() => taskNodeList.value.find(e => e.nodeId === backForm.value.targetActivityId))

function closeDialog() {
  popup.visible = false
}

// 审批意见校验
function isMessageEmpty() {
  if (!form.value.message) {
    proxy.$modal.msgWarning('请填写审批意见')
    return true
  }
  return false
}

// 打开弹窗
function openDialog(id?: string) {
  selectCopyUserList.value = []
  form.value.fileId = undefined
  taskId.value = id as string
  form.value.message = undefined
  popup.visible = true
  loading.value = true
  buttonDisabled.value = true
  nextTick(() => {
    getTaskById(taskId.value).then((response: any) => {
      task.value = response.data
      loading.value = false
      buttonDisabled.value = false
    })
  })
}

// 取消
function cancel() {
  popup.visible = false
  buttonDisabled.value = false
  emits('cancelCallback')
  return true
}

// 提交
async function handleCompleteTask() {
  if (isMessageEmpty()) {
    return false
  }
  form.value.taskId = taskId.value
  form.value.entityVariable = props.entityVariables
  form.value.wfCopyList = selectCopyUserList.value.map(e => ({
    userId: e.userId,
    userName: e.nickName,
  }))

  await proxy.$modal.confirm('是否确认提交？')
  loading.value = true
  buttonDisabled.value = true
  try {
    await completeTask(form.value)
    popup.visible = false
    emits('submitCallback')
    proxy.$modal.msgSuccess('操作成功')
  }
  finally {
    loading.value = false
    buttonDisabled.value = false
  }
}

// 驳回弹窗打开
async function handleBackProcessOpen() {
  if (isMessageEmpty()) {
    return false
  }
  // TODO
  Object.assign(backForm.value, form.value)
  backForm.value.variables = undefined
  backForm.value.wfCopyList = undefined
  // backForm.value = {}
  // backForm.value.messageType = ['1']
  rejectNodeName.value = ''
  backVisible.value = true
  backLoading.value = true
  backButtonDisabled.value = true
  const data: any = await getTaskNodeList(task.value.processInstanceId as string)

  taskNodeList.value = data.data
  backLoading.value = false
  backButtonDisabled.value = false
  const [{ nodeId, nodeName }] = taskNodeList.value
  backForm.value.targetActivityId = nodeId
  rejectNodeName.value = nodeName
}
// 驳回
async function handleBackProcess() {
  backForm.value.taskId = taskId.value
  await proxy.$modal.confirm(`是否确认驳回到${backNode.value.nodeName}？`)
  loading.value = true
  backLoading.value = true
  backButtonDisabled.value = true
  await backProcess(backForm.value).finally(() => (loading.value = false))
  popup.visible = false
  backLoading.value = false
  backButtonDisabled.value = false
  emits('submitCallback')
  proxy.$modal.msgSuccess('操作成功')
}

// // 加签
// function addMultiInstanceUser() {
//   if (multiInstanceUserRef.value) {
//     title.value = '加签人员'
//     multiInstanceUserRef.value.getAddMultiInstanceList(taskId.value, [])
//   }
// }
// // 减签
// function deleteMultiInstanceUser() {
//   if (multiInstanceUserRef.value) {
//     title.value = '减签人员'
//     multiInstanceUserRef.value.getDeleteMultiInstanceList(taskId.value)
//   }
// }

// 打开委托
function openDelegateTask() {
  DelegateTaskRef.value?.open()
}
// 委托
async function handleDelegateTask(user: UserVO) {
  if (user) {
    const params = {
      taskId: taskId.value,
      userId: user.userId,
      nickName: user.nickName,
      comment: form.value.message,
    }
    await proxy.$modal.confirm('是否确认提交？')
    loading.value = true
    buttonDisabled.value = true
    await delegateTask(params).finally(() => (loading.value = false))
    popup.visible = false
    emits('submitCallback')
    proxy.$modal.msgSuccess('操作成功')
  }
  else {
    proxy.$modal.msgWarning('请选择用户！')
  }
}

// 打开转办
function openTransferTask() {
  if (isMessageEmpty()) {
    return false
  }
  TransferTaskRef.value?.open()
}
// 转办
async function handleTransferTask(user: UserVO) {
  if (user) {
    const params = {
      taskId: taskId.value,
      userId: user.userId,
      comment: form.value.message,
    }
    await proxy.$modal.confirm('是否确认提交？')
    loading.value = true
    buttonDisabled.value = true
    await transferTask(params).finally(() => (loading.value = false))
    popup.visible = false
    emits('submitCallback')
    proxy.$modal.msgSuccess('操作成功')
  }
  else {
    proxy.$modal.msgWarning('请选择用户！')
  }
}

// 终止任务
async function handleTerminationTask(data: any) {
  const params = {
    taskId: taskId.value,
    comment: form.value.message,
  }
  await proxy.$modal.confirm('是否确认终止？')
  loading.value = true
  buttonDisabled.value = true
  await terminationTask(params).finally(() => (loading.value = false))
  popup.visible = false
  emits('submitCallback')
  proxy.$modal.msgSuccess('操作成功')
}

// 驳回节点选择器确认
function onRejectNodeConfirm({ selectedOptions }: any) {
  rejectNodeName.value = selectedOptions[0]?.text
  backForm.value.targetActivityId = selectedOptions[0]?.value
  showNodePicker.value = false
}

function onRejectNodeCancel() {
  // rejectNodeName.value = ''
  // backForm.value.targetActivityId = undefined
  showNodePicker.value = false
}

defineExpose({
  openDialog,
})
</script>
