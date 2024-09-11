<template>
  <NavBar />

  <div v-if="submitVisible || approvalVisible" class="p-2 flex gap-2 bg-[var(--van-background-3)]">
    <!-- <van-button v-if="submitVisible" :loading="tempSaveLoading" type="default" size="small" @click="handleTempSave">
      暂存
    </van-button>
    <van-button v-if="submitVisible" :loading="submitLoading" type="primary" size="small" @click="handleSubmit">
      提 交
    </van-button> -->
    <van-button v-if="approvalVisible" type="primary" size="small" class="px-6" @click="handleApproval">
      审批
    </van-button>
  </div>
  <div
    :class="`
      py-2 flex flex-col gap-2 overflow-y-auto
      ${
      submitVisible || approvalVisible
        ? 'h-[calc(100vh-var(--van-nav-bar-height)-var(--van-button-small-height)-16px)]'
        : 'h-[calc(100vh-var(--van-nav-bar-height))]'}`"
  >
    <div v-if="entityVariables?.initiator">
      <van-divider>发起人信息</van-divider>
      <van-cell title="发起人：" :value="entityVariables.initiator.nickName" />
      <van-cell title="部门：" :value="entityVariables.initiator.deptName" />
      <van-cell title="发起时间：" :value="parseTime(entityVariables.initiator.createTime, '{y}-{m}-{d}')!" />
    </div>
    <van-divider>表单</van-divider>
    <slot />
    <van-divider>已经到底部了</van-divider>

    <!-- 提交组件 -->
    <SubmitVerify ref="submitVerifyRef" :entity-variables="entityVariables" @submit-callback="submitCallback" />
  </div>
</template>

<script setup lang='ts'>
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from './types'
import SubmitVerify from '@/components/Process/submitVerify.vue'
import { useStore } from '@/store'

interface EntityVariables {
  initiator: Initiator
  [key: string]: any
}

const props = defineProps<{
  entityVariables?: EntityVariables
}>()

const emit = defineEmits<Emits>()

interface Emits {
  (event: 'temp-save', payload: TempSavePayload): void
  (event: 'submit', payload: SubmitPayload): void
  (event: 'approval', payload: ApprovalPayload): void
}

const { proxy } = getCurrentInstance() as ComponentInternalInstance
// 提交组件
const submitVerifyRef = ref<InstanceType<typeof SubmitVerify>>()

const { user } = useStore()

// 暂存加载
const tempSaveLoading = ref(false)
// 提交加载
const submitLoading = ref(false)

// 提交可见
const submitVisible = computed(() => {
  const { type, wfStatus } = proxy?.$route.query ?? {}
  return type === 'add' || (type === 'update' && wfStatus && (wfStatus === 'draft' || wfStatus === 'cancel' || wfStatus === 'back'))
})

// 审批可见
const approvalVisible = computed(() => {
  const { type, wfStatus } = proxy?.$route.query ?? {}
  return type === 'approval' && wfStatus && wfStatus === 'waiting'
})

// 流程可见
const processVisible = computed(() => {
  const { wfStatus } = proxy?.$route.query ?? {}
  return wfStatus && wfStatus !== 'draft'
})

// 发起人信息
function createInitiator(): Initiator {
  const initialValue = {
    nickName: user.info?.nickName as string,
    deptName: user.info?.deptName as string,
    createTime: new Date().toLocaleString(),
  }

  return props.entityVariables?.initiator ?? initialValue
}

// 暂存
function handleTempSave() {
  const initiator = createInitiator()
  const load = () => (tempSaveLoading.value = true)
  const done = () => (tempSaveLoading.value = false)
  const payload = {
    load,
    done,
    initiator,
  }
  emit('temp-save', payload)
}

// 提交
function handleSubmit() {
  const initiator = createInitiator()
  const load = () => (submitLoading.value = true)
  const done = () => (submitLoading.value = false)
  const payload = {
    load,
    done,
    open: submitVerifyRef.value!.openDialog,
    initiator,
  }
  emit('submit', payload)
}

// 审批
function handleApproval() {
  emit('approval', {
    open: submitVerifyRef.value!.openDialog,
  })
}

// 提交回调
async function submitCallback() {
  // await proxy.$tab.closePage(proxy.$route);
  proxy?.$router.go(-1)
}
</script>
