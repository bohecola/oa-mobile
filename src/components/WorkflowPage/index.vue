<template>
  <div>
    <NavBar />

    <van-floating-bubble v-if="approvalVisible" axis="xy">
      <van-button type="primary" :disabled="actionBtnDisabled" round @click="handleApproval">
        <span class="!text-xs text-nowrap w-[4ch] inline-block">
          审批
        </span>
      </van-button>
    </van-floating-bubble>

    <van-tabs v-model:active="active" lazy-render @change="onTabChange">
      <div
        id="TabsContainer"
        :class="`overflow-y-auto ${saveOrSubmitVisible ? 'bottom-panel' : ''}`"
      >
        <van-tab v-loading="loading" title="审批表单" name="form">
          <div id="AFC" class="relative">
            <van-notice-bar
              v-if="$route.query.isEditNode === 'true' && $route.query.type === 'approval'"
              :scrollable="false"
              text="当前节点存在需要填写的字段，请暂时在PC端审批"
            />

            <van-form label-width="auto" class="reset-label" label-align="top">
              <van-cell-group v-if="!isNil(entityVariables)" inset class="!mt-3">
                <van-field label="流程ID" input-align="left">
                  <template #input>
                    <span>{{ entityVariables.id }}</span>
                  </template>
                </van-field>
                <van-field label="发起人" input-align="left">
                  <template #input>
                    <span>{{ entityVariables.initiator.nickName }}</span>
                  </template>
                </van-field>
                <van-field label="部门" input-align="left">
                  <template #input>
                    <DeptSelect v-model="entityVariables.initiator.deptId!" readonly />
                  </template>
                </van-field>
                <van-field label="发起时间" input-align="left">
                  <template #input>
                    <span>{{ parseTime(entityVariables?.initiator?.createTime, '{y}-{m}-{d}')! }}</span>
                  </template>
                </van-field>
              </van-cell-group>
            </van-form>

            <!-- 审批表单 -->
            <van-cell-group v-if="group" inset class="!my-3">
              <slot />
            </van-cell-group>
            <slot v-else />

            <!-- 审批状态 -->
            <StatusIcon v-if="isView && businessStatus !== 'draft'" :business-status="businessStatus" />
          </div>

          <!-- 审批附件 -->
          <div v-if="!isNil(entityVariables?.id)" class="!mt-2">
            <ApprovalFileTable :business-key="entityVariables?.id" />
          </div>

          <!-- 底线 -->
          <bottom-line />
        </van-tab>

        <!-- 审批记录 -->
        <van-tab v-if="processVisible" title="审批记录" name="record">
          <ApprovalSteps ref="ApprovalStepsRef" />
        </van-tab>
      </div>

      <div v-if="saveOrSubmitVisible" class="p-2 pb-safe-offset-2 grid grid-cols-[1fr,4fr] gap-2 bg-[--bg-card]">
        <van-button
          v-if="saveVisible"
          :loading="tempSaveLoading"
          type="default"
          :disabled="actionBtnDisabled"
          @click="handleTempSave"
        >
          暂存
        </van-button>

        <van-button
          v-if="submitVisible"
          :loading="submitLoading"
          type="primary"
          :disabled="actionBtnDisabled"
          @click="handleSubmit"
        >
          提交
        </van-button>
      </div>
    </van-tabs>

    <!-- 提交组件 -->
    <SubmitVerify ref="submitVerifyRef" :entity-variables="entityVariables" @submit-callback="submitCallback" />
  </div>
</template>

<script setup lang='ts'>
import dayjs from 'dayjs'
import { isNil } from 'lodash-es'
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from './types'
import ApprovalSteps from './steps.vue'
import StatusIcon from './status-icon.vue'
import SubmitVerify from '@/components/Process/submitVerify.vue'
import { useStore } from '@/store'

interface EntityVariables {
  initiator: Initiator
  [key: string]: any
}

interface Emits {
  (event: 'temp-save', payload: TempSavePayload): void
  (event: 'submit', payload: SubmitPayload): void
  (event: 'approval', payload: ApprovalPayload): void
}

const props = withDefaults(
  defineProps<{
    entityVariables?: EntityVariables
    group?: boolean
    loading?: boolean
  }>(),
  {
    group: true,
    loading: false,
  },
)

const emit = defineEmits<Emits>()

const { user } = useStore()
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 提交组件
const submitVerifyRef = ref<InstanceType<typeof SubmitVerify>>()
// 审批记录组件
const ApprovalStepsRef = ref<InstanceType<typeof ApprovalSteps> | null>()

// 活跃标签栏
const active = ref<'form' | 'record'>('form')
// 暂存加载
const tempSaveLoading = ref(false)
// 提交加载
const submitLoading = ref(false)
// 发起人部门ID
const deptId = computed(() => props.entityVariables?.initiator.deptId)
// 依赖提供
provide('initiatorDeptId', deptId)

// 按钮禁用
const actionBtnDisabled = computed(() => active.value === 'record')

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
  const { type, wfStatus, isEditNode } = proxy.$route.query
  return type === 'approval' && wfStatus && wfStatus === 'waiting' && isEditNode !== 'true'
})

// 流程可见
const processVisible = computed(() => {
  const { wfStatus } = proxy?.$route.query
  return wfStatus && wfStatus !== 'draft'
})

// 是否查看
const isView = computed(() => proxy.$route.query.type === 'view')

// 流程状态
const businessStatus = computed(() => proxy.$route.query.wfStatus as string)

// 发起人信息
function createInitiator(): Initiator {
  if (props.entityVariables?.initiator) {
    return props.entityVariables?.initiator
  }

  const initialValue = {
    userId: user.info?.userId,
    deptId: user.info?.deptId,
    nickName: user.info?.nickName,
    deptName: user.info?.deptName,
    maxPostLevel: user.info?.maxPostLevel,
    createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  }

  return initialValue
}

// 暂存
function handleTempSave() {
  const initiator = createInitiator()
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
  const initiator = createInitiator()
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
</script>

<style lang="scss" scoped>
  $topHeight: calc(var(--van-nav-bar-height) + var(--van-tabs-line-height) + env(safe-area-inset-top));
  $bottomHeight: calc(var(--van-button-default-height) + env(safe-area-inset-bottom) + theme('spacing.2') * 2);

  #TabsContainer {
    height: calc(100vh - #{$topHeight});

    &.bottom-panel {
      height: calc(100vh - #{$topHeight} - #{$bottomHeight});
    }
  }
</style>
