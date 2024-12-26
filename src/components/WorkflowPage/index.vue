<template>
  <div>
    <NavBar />

    <!-- <div v-if="submitVisible || approvalVisible" class="p-2 flex gap-2 bg-[var(--van-background-3)] border border-l-0 border-r-0 dark:border-zinc-600"> -->
    <!-- <van-button v-if="saveVisible" :loading="tempSaveLoading" type="default" size="small" :disabled="actionBtnDisabled" @click="handleTempSave">
    暂存
  </van-button>
  <van-button v-if="submitVisible" :loading="submitLoading" type="primary" size="small" :disabled="actionBtnDisabled" @click="handleSubmit">
    提 交
  </van-button> -->
    <!-- <van-button v-if="approvalVisible" type="primary" size="small" class="px-6" :disabled="actionBtnDisabled" @click="handleApproval">
    审批
  </van-button> -->
    <!-- </div> -->

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
        class="flex flex-col gap-2 overflow-y-auto h-[calc(100vh-var(--van-nav-bar-height)-var(--van-tabs-line-height)-env(safe-area-inset-top))]"
      >
        <van-tab v-loading="loading" title="审批表单" name="form">
          <div id="AFC">
            <van-notice-bar
              v-if="$route.query.isEditNode === 'true' && $route.query.type === 'approval'"
              :scrollable="false"
              text="当前节点存在需要填写的字段，请暂时在PC端审批"
            />

            <van-cell-group inset class="!mt-3">
              <van-field label="发起人" input-align="right">
                <template #input>
                  <span>{{ entityVariables?.initiator?.nickName }}</span>
                </template>
              </van-field>
              <van-field label="部门" input-align="right">
                <template #input>
                  <span>{{ entityVariables?.initiator?.deptName }}</span>
                </template>
              </van-field>
              <van-field label="发起时间" input-align="right">
                <template #input>
                  <span>{{ parseTime(entityVariables?.initiator?.createTime, '{y}-{m}-{d}')! }}</span>
                </template>
              </van-field>
            </van-cell-group>

            <van-cell-group v-if="group" inset class="!my-3">
              <slot />
            </van-cell-group>
            <slot v-else />
          </div>
          <bottom-line />
        </van-tab>

        <van-tab title="审批记录" name="record">
          <ApprovalSteps ref="ApprovalStepsRef" />
        </van-tab>
      </div>
    </van-tabs>

    <!-- 提交组件 -->
    <SubmitVerify ref="submitVerifyRef" :entity-variables="entityVariables" @submit-callback="submitCallback" />
  </div>
</template>

<script setup lang='ts'>
import type { ApprovalPayload, Initiator, SubmitPayload, TempSavePayload } from './types'
import ApprovalSteps from './steps.vue'
import SubmitVerify from '@/components/Process/submitVerify.vue'
import { useStore } from '@/store'

interface EntityVariables {
  initiator: Initiator
  [key: string]: any
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

interface Emits {
  (event: 'temp-save', payload: TempSavePayload): void
  (event: 'submit', payload: SubmitPayload): void
  (event: 'approval', payload: ApprovalPayload): void
}

const { proxy } = getCurrentInstance() as ComponentInternalInstance
// 提交组件
const submitVerifyRef = ref<InstanceType<typeof SubmitVerify>>()
const ApprovalStepsRef = ref<InstanceType<typeof ApprovalSteps> | null>()

const active = ref<'form' | 'record'>('form')

const { user } = useStore()

// 暂存加载
const tempSaveLoading = ref(false)
// 提交加载
const submitLoading = ref(false)

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

// 审批可见
const approvalVisible = computed(() => {
  const { type, wfStatus, isEditNode } = proxy.$route.query
  return type === 'approval' && wfStatus && wfStatus === 'waiting' && isEditNode !== 'true'
})

// 流程可见
const processVisible = computed(() => {
  const { wfStatus } = proxy?.$route.query ?? {}
  return wfStatus && wfStatus !== 'draft'
})

// 发起人信息
function createInitiator(): Initiator {
  const initialValue = {
    userId: user.info?.userId as (string | number),
    deptId: user.info?.deptId as (string | number),
    nickName: user.info?.nickName as string,
    deptName: user.info?.deptName as string,
    maxPostLevel: user.info?.maxPostLevel as number,
    createTime: new Date().toLocaleString(),
  }

  return props.entityVariables?.initiator ?? initialValue
}

// 暂存
function handleTempSave() {
  const initiator = createInitiator()
  const load = () => (tempSaveLoading.value = true)
  const done = () => (tempSaveLoading.value = false)
  const next = () => {
    // proxy?.$modal.msgSuccess('暂存成功')
    // proxy.$tab.closePage(proxy.$route)
    // proxy.$router.go(-1)
  }
  const payload = {
    load,
    done,
    next,
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
  if (window.history.state.back) {
    proxy?.$router.back()
  }
  else {
    proxy?.$router.push('/')
  }
}

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
