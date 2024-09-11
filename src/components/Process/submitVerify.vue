<template>
  <van-popup v-model:show="dialog.visible" position="bottom" round class="h-30vh" :before-close="cancel" :close-on-click-overlay="false">
    <van-form label-width="120px">
      <van-field name="messageType" label="消息提醒">
        <template #input>
          <van-checkbox-group v-model="form.messageType" direction="horizontal">
            <van-checkbox name="1" shape="square" icon-size="16px" disabled>
              站内信
            </van-checkbox>
            <!-- <van-checkbox name="2" shape="square" icon-size="16px">
              邮件
            </van-checkbox>
            <van-checkbox name="3" shape="square" icon-size="16px">
              短信
            </van-checkbox> -->
          </van-checkbox-group>
        </template>
      </van-field>
      <!-- <el-form-item v-if="task.businessStatus === 'waiting'" label="附件">
        <fileUpload v-model="form.fileId" :file-type="['doc', 'xls', 'ppt', 'txt', 'pdf', 'xlsx', 'docx', 'zip']" :file-size="20" />
      </el-form-item> -->
      <!-- <el-form-item label="抄送">
        <el-button type="primary" icon="Plus" circle @click="openUserSelectCopy" />
        <el-tag v-for="user in selectCopyUserList" :key="user.userId" closable style="margin: 2px" @close="handleCopyCloseTag(user)">
          {{ user.nickName }}
        </el-tag>
      </el-form-item> -->
      <van-field
        v-if="task.businessStatus === 'waiting'"
        v-model="form.message"
        rows="2"
        autosize
        label="审批意见"
        type="textarea"
        maxlength="500"
        placeholder="请输入审批意见"
        show-word-limit
      />
    </van-form>

    <span class="flex justify-end gap-2 p-2">
      <van-button :disabled="buttonDisabled" type="primary" size="small" @click="handleCompleteTask"> 提交 </van-button>
      <!-- <van-button v-if="task.businessStatus === 'waiting'" :disabled="buttonDisabled" type="primary" @click="openDelegateTask"> 委托 </van-button> -->
      <!-- <van-button v-if="task.businessStatus === 'waiting'" :disabled="buttonDisabled" type="primary" @click="openTransferTask"> 转办 </van-button> -->
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
      <van-button v-if="task.businessStatus === 'waiting'" :disabled="buttonDisabled" type="danger" size="small" @click="handleTerminationTask"> 终止 </van-button>
      <van-button v-if="task.businessStatus === 'waiting'" :disabled="buttonDisabled" type="danger" size="small" @click="handleBackProcessOpen"> 退回 </van-button>
      <van-button :disabled="buttonDisabled" size="small" @click="cancel">取消</van-button>
    </span>

    <!-- 抄送 -->
    <!-- <UserSelect ref="userSelectCopyRef" :multiple="true" :data="selectCopyUserIds" @confirm-call-back="userSelectCopyCallBack" /> -->
    <!-- 转办 -->
    <!-- <UserSelect ref="transferTaskRef" :multiple="false" @confirm-call-back="handleTransferTask" /> -->
    <!-- 委托 -->
    <!-- <UserSelect ref="delegateTaskRef" :multiple="false" @confirm-call-back="handleDelegateTask" /> -->
    <!-- 加签组件 -->
    <!-- <MultiInstanceUser ref="multiInstanceUserRef" :title="title" @submit-callback="closeDialog" /> -->

    <!-- 驳回开始 -->
    <van-dialog v-model:show="backVisible" title="驳回" :close-on-click-overlay="false" show-cancel-button @confirm="handleBackProcess()">
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
      <van-popup v-model:show="showNodePicker" round position="bottom" teleport="body">
        <van-picker
          :columns="computedTaskNodeList"
          @confirm="onRejectNodeConfirm"
          @cancel="onRejectNodeCancel"
        />
      </van-popup>
      <!-- <ElForm v-if="task.businessStatus === 'waiting'" v-loading="backLoading" :model="backForm" label-width="120px">
        <el-form-item label="驳回节点">
          <el-select v-model="backForm.targetActivityId" clearable placeholder="请选择" style="width: 300px">
            <el-option v-for="item in taskNodeList" :key="item.nodeId" :label="item.nodeName" :value="item.nodeId" />
          </el-select>
        </el-form-item>
        <el-form-item label="消息提醒">
          <el-checkbox-group v-model="backForm.messageType">
            <el-checkbox label="1" name="type" disabled>
              站内信
            </el-checkbox>
            <el-checkbox label="2" name="type">
              邮件
            </el-checkbox>
            <el-checkbox label="3" name="type">
              短信
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="审批意见">
          <el-input v-model="backForm.message" type="textarea" resize="none" />
        </el-form-item>
      </ElForm>
      <template #footer>
        <div class="dialog-footer" style="float: right; padding-bottom: 20px">
          <el-button :disabled="backButtonDisabled" type="primary" @click="handleBackProcess">
            确认
          </el-button>
          <el-button :disabled="backButtonDisabled" @click="backVisible = false">
            取消
          </el-button>
        </div>
      </template> -->
    </van-dialog>
    <!-- 驳回结束 -->
  </van-popup>
</template>

<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { ref } from 'vue'
import { backProcess, completeTask, getTaskById, getTaskNodeList, terminationTask } from '@/api/workflow/task'
// import UserSelect from '@/components/UserSelect/index.vue'
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

// const userSelectCopyRef = ref<InstanceType<typeof UserSelect>>()
// const transferTaskRef = ref<InstanceType<typeof UserSelect>>()
// const delegateTaskRef = ref<InstanceType<typeof UserSelect>>()

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
// 抄送人id
const selectCopyUserIds = ref<string | undefined>(undefined)
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
const dialog = reactive<DialogOption>({
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
function closeDialog() {
  dialog.visible = false
}
// 打开弹窗
function openDialog(id?: string) {
  selectCopyUserIds.value = undefined
  selectCopyUserList.value = []
  form.value.fileId = undefined
  taskId.value = id as string
  form.value.message = undefined
  dialog.visible = true
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

onMounted(() => {})
/** 办理流程 */
async function handleCompleteTask() {
  form.value.taskId = taskId.value
  form.value.entityVariable = props.entityVariables
  if (selectCopyUserList.value && selectCopyUserList.value.length > 0) {
    const wfCopyList: any[] = []
    selectCopyUserList.value.forEach((e) => {
      const copyUser = {
        userId: e.userId,
        userName: e.nickName,
      }
      wfCopyList.push(copyUser)
    })
    form.value.wfCopyList = wfCopyList
  }
  console.log(form.value)

  await proxy?.$modal.confirm('是否确认提交？')
  loading.value = true
  buttonDisabled.value = true
  try {
    await completeTask(form.value)
    dialog.visible = false
    emits('submitCallback')
    proxy?.$modal.msgSuccess('操作成功')
  }
  finally {
    loading.value = false
    buttonDisabled.value = false
  }
}

/** 驳回弹窗打开 */
async function handleBackProcessOpen() {
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
/** 驳回流程 */
async function handleBackProcess() {
  backForm.value.taskId = taskId.value
  await proxy?.$modal.confirm('是否确认驳回到申请人？')
  loading.value = true
  backLoading.value = true
  backButtonDisabled.value = true
  await backProcess(backForm.value).finally(() => (loading.value = false))
  dialog.visible = false
  backLoading.value = false
  backButtonDisabled.value = false
  emits('submitCallback')
  proxy?.$modal.msgSuccess('操作成功')
}
// 取消
async function cancel() {
  dialog.visible = false
  buttonDisabled.value = false
  emits('cancelCallback')

  return true
}
// // 打开抄送人员
// function openUserSelectCopy() {
//   userSelectCopyRef.value.open()
// }
// // 确认抄送人员
// function userSelectCopyCallBack(data: UserVO[]) {
//   if (data && data.length > 0) {
//     selectCopyUserList.value = data
//     selectCopyUserIds.value = selectCopyUserList.value.map(item => item.userId).join(',')
//   }
// }
// // 删除抄送人员
// function handleCopyCloseTag(user: UserVO) {
//   const userId = user.userId
//   // 使用split删除用户
//   const index = selectCopyUserList.value.findIndex(item => item.userId === userId)
//   selectCopyUserList.value.splice(index, 1)
//   selectCopyUserIds.value = selectCopyUserList.value.map(item => item.userId).join(',')
// }
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
// // 打开转办
// function openTransferTask() {
//   transferTaskRef.value.open()
// }
// // 转办
// async function handleTransferTask(data) {
//   if (data && data.length > 0) {
//     const params = {
//       taskId: taskId.value,
//       userId: data[0].userId,
//       comment: form.value.message,
//     }
//     await proxy?.$modal.confirm('是否确认提交？')
//     loading.value = true
//     buttonDisabled.value = true
//     await transferTask(params).finally(() => (loading.value = false))
//     dialog.visible = false
//     emits('submitCallback')
//     proxy?.$modal.msgSuccess('操作成功')
//   }
//   else {
//     proxy?.$modal.msgWarning('请选择用户！')
//   }
// }

// // 打开委托
// function openDelegateTask() {
//   delegateTaskRef.value.open()
// }
// // 委托
// async function handleDelegateTask(data) {
//   if (data && data.length > 0) {
//     const params = {
//       taskId: taskId.value,
//       userId: data[0].userId,
//       nickName: data[0].nickName,
//     }
//     await proxy?.$modal.confirm('是否确认提交？')
//     loading.value = true
//     buttonDisabled.value = true
//     await delegateTask(params).finally(() => (loading.value = false))
//     dialog.visible = false
//     emits('submitCallback')
//     proxy?.$modal.msgSuccess('操作成功')
//   }
//   else {
//     proxy?.$modal.msgWarning('请选择用户！')
//   }
// }
// 终止任务
async function handleTerminationTask(data: any) {
  const params = {
    taskId: taskId.value,
    comment: form.value.message,
  }
  await proxy?.$modal.confirm('是否确认终止？')
  loading.value = true
  buttonDisabled.value = true
  await terminationTask(params).finally(() => (loading.value = false))
  dialog.visible = false
  emits('submitCallback')
  proxy?.$modal.msgSuccess('操作成功')
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
/**
 * 对外暴露子组件方法
 */
defineExpose({
  openDialog,
})
</script>
