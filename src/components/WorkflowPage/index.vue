<template>
  <div>
    <NavBar v-if="!app.isInIframe" />

    <van-floating-bubble v-if="approvalVisible" axis="xy">
      <van-button type="primary" :disabled="actionBtnDisabled" round @click="handleApproval">
        <span class="!text-xs text-nowrap w-[4ch] inline-block">
          审批
        </span>
      </van-button>
    </van-floating-bubble>
    <van-floating-bubble v-if="isView" axis="xy">
      <van-button type="primary" :disabled="actionBtnDisabled" round class="w-full h-full border-[3px] border-slate-300" @click="handleProcessReview">
        <span class="!text-xs text-nowrap w-[4ch] inline-block">
          评论
        </span>
      </van-button>
    </van-floating-bubble>

    <van-tabs v-model:active="active" lazy-render @change="onTabChange">
      <div
        id="TabsContainer"
        class="tabs-container overflow-y-auto"
        :class="{
          'bottom-panel': saveOrSubmitVisible,
          'tabs-container__iframe': app.isInIframe,
        }"
      >
        <van-tab v-loading="loading" title="审批表单" name="form">
          <div class="relative">
            <!-- 发起人信息 -->
            <InitiatorInfo
              ref="initiatorInfoRef"
              v-model:dept-id="deptId"
              :data="entityVariables"
              :readonly="!isAdd"
              :reset-form="resetForm"
            />

            <!-- 审批表单 -->
            <van-cell-group v-if="group" inset class="!my-3">
              <slot />
            </van-cell-group>
            <slot v-else />

            <!-- 审批状态 -->
            <StatusIcon
              v-if="isView && businessStatus !== 'draft'"
              :business-status="businessStatus"
            />
          </div>

          <!-- 审批附件 -->
          <div v-if="!isNil(entityVariables?.id)" class="!mt-2">
            <ApprovalFileTable ref="approvalFileTableRef" :business-key="entityVariables?.id" />
          </div>

          <!-- 底线 -->
          <bottom-line />
        </van-tab>

        <!-- 审批记录 -->
        <van-tab v-if="processVisible" title="审批记录" name="record" :disabled="loading">
          <ApprovalSteps ref="ApprovalStepsRef" />
        </van-tab>
      </div>

      <div v-if="saveOrSubmitVisible" class="p-2 pb-safe-offset-2 flex gap-2 bg-[--bg-card]">
        <van-button
          v-if="saveVisible"
          type="default"
          class="flex-[1]"
          :loading="tempSaveLoading"
          :disabled="loading"
          @click="handleTempSave"
        >
          暂存
        </van-button>

        <van-button
          v-if="submitVisible"
          type="primary"
          class="flex-[4]"
          :loading="submitLoading"
          :disabled="loading"
          @click="handleSubmit"
        >
          提交
        </van-button>
      </div>
    </van-tabs>

    <!-- 提交组件 -->
    <SubmitVerify ref="submitVerifyRef" :entity-variables="entityVariables" @submit-callback="submitCallback" />

    <!-- 回复弹窗 -->
    <ProcessReview ref="ProcessReviewRef" :business-key="entityVariables?.id" @approvalfiletable-init="approvalFileTableInit" />
  </div>
</template>

<script setup lang='ts'>
import { isNil } from 'lodash-es'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from './types'
import ApprovalSteps from './steps.vue'
import StatusIcon from './status-icon.vue'
import ProcessReview from './processReview.vue'
import ApprovalFileTable from '@/components/ApprovalFileTable/index.vue'
import SubmitVerify from '@/components/Process/submitVerify.vue'
import InitiatorInfo from '@/components/InitiatorInfo/index.vue'
import { useStore } from '@/store'

const props = withDefaults(
  defineProps<{
    entityVariables?: EntityVariables
    loading?: boolean
    group?: boolean
    resetForm?: () => void
  }>(),
  {
    group: true,
  },
)

const emit = defineEmits<Emits>()

// 评论记录
const ProcessReviewRef = ref<InstanceType<typeof ProcessReview>>()
// 审批附件表格组件
const approvalFileTableRef = ref<InstanceType<typeof ApprovalFileTable>>()

interface EntityVariables {
  initiator: Initiator
  [key: string]: any
}

interface Emits {
  (event: 'temp-save', payload: TempSavePayload): void
  (event: 'submit', payload: SubmitPayload): void
  (event: 'approval', payload: ApprovalPayload): void
}

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { app } = useStore()

// 提交组件
const submitVerifyRef = ref<InstanceType<typeof SubmitVerify>>()
// 审批记录组件
const ApprovalStepsRef = ref<InstanceType<typeof ApprovalSteps>>()
// 发起人信息
const initiatorInfoRef = ref<InstanceType<typeof InitiatorInfo>>()

// 活跃标签栏
const active = ref<'form' | 'record'>('form')
// 暂存加载
const tempSaveLoading = ref(false)
// 提交加载
const submitLoading = ref(false)
// 发起人部门ID
const deptId = ref(undefined)
// 依赖提供
provide('initiatorDeptId', deptId)

// 按钮禁用
const actionBtnDisabled = computed(() => active.value === 'record' || props.loading)

// 暂存可见
const saveVisible = computed(() => {
  const { type, wfStatus } = proxy.$route.query
  return type === 'add' || (type === 'update' && wfStatus && (wfStatus === 'draft' || wfStatus === 'cancel'))
})

// 提交可见
const submitVisible = computed(() => {
  const { type, wfStatus } = proxy.$route.query
  return (
    type === 'add'
    || (type === 'update' && wfStatus && (wfStatus === 'draft' || wfStatus === 'cancel' || wfStatus === 'back'))
    || (type === 'approval' && wfStatus && wfStatus === 'back')
  )
})

const saveOrSubmitVisible = computed(() => saveVisible.value || submitVisible.value)

// 审批可见
const approvalVisible = computed(() => {
  const { type, wfStatus } = proxy.$route.query
  return type === 'approval' && wfStatus && wfStatus === 'waiting'
})

// 流程可见
const processVisible = computed(() => {
  const { wfStatus } = proxy?.$route.query
  return wfStatus && wfStatus !== 'draft'
})

// 是否查看
const isView = computed(() => proxy.$route.query.type === 'view')

// 是否新增
const isAdd = computed(() => proxy.$route.query.type === 'add')

// 流程状态
const businessStatus = computed(() => proxy.$route.query.wfStatus as string)

// 暂存
function handleTempSave() {
  const initiator = initiatorInfoRef.value?.createInitiator()
  const load = () => (tempSaveLoading.value = true)
  const done = () => (tempSaveLoading.value = false)
  const next = () => {
    proxy.$modal.msgSuccess('暂存成功')
    proxy.$router.go(-1)
  }
  const payload: TempSavePayload = {
    load,
    done,
    next,
    initiator,
    operation: 'tempSave',
  }
  emit('temp-save', payload)
}

// 提交
function handleSubmit() {
  const initiator = initiatorInfoRef.value?.createInitiator()
  const load = () => (submitLoading.value = true)
  const done = () => (submitLoading.value = false)
  const payload: SubmitPayload = {
    load,
    done,
    open: submitVerifyRef.value.openDialog,
    initiator,
    operation: 'submit',
  }
  emit('submit', payload)
}

// 审批
function handleApproval() {
  emit('approval', {
    open: submitVerifyRef.value.openDialog,
  })
}

// 提交回调
async function submitCallback() {
  if (window.history.state.back) {
    proxy?.$router.back()
  }
  else {
    proxy?.$router.push('/')
  }
}

// 标签切换
function onTabChange(val: any) {
  const TabsContainer = document.querySelector('#TabsContainer')
  switch (val) {
    case 'record': {
      nextTick(async () => {
        await ApprovalStepsRef.value?.init(props.entityVariables?.id)

        TabsContainer?.scrollTo({
          top: TabsContainer.scrollHeight,
          behavior: 'smooth',
        })
      })
      break
    }
    default: {
      nextTick(() => {
        TabsContainer?.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      })
      break
    }
  }
}
// 打开评论
function handleProcessReview() {
  ProcessReviewRef.value?.open({
    placeholder: `添加评论`,
    businessKey: props.entityVariables?.id,
  })
}

// 刷新审批表单数据
function approvalFileTableInit() {
  approvalFileTableRef.value.init(props.entityVariables.id)
}
</script>

<style lang="scss" scoped>
  $topHeight: calc(var(--van-nav-bar-height) + var(--van-tabs-line-height) + env(safe-area-inset-top));
  $bottomHeight: calc(var(--van-button-default-height) + env(safe-area-inset-bottom) + theme('spacing.2') * 2);

  $iframeTopHeight: calc(var(--van-tabs-line-height));

  .tabs-container {
    height: calc(100vh - #{$topHeight});

    &.bottom-panel {
      height: calc(100vh - #{$topHeight} - #{$bottomHeight});
    }

    &.tabs-container__iframe {
      height: calc(100vh - #{$iframeTopHeight});
    }
  }
</style>
