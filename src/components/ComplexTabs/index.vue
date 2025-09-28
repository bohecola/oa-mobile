<template>
  <van-tabs v-model:active="activeName" lazy-render @change="onTabChange">
    <div id="ComplexTabsContainer" class="tabs-container overflow-y-auto bg-[--bg-color]">
      <van-tab title="审批表单" name="form">
        <div class="relative">
          <!-- 发起人信息 -->
          <InitiatorInfo :data="form" readonly />

          <!-- 审批表单 -->
          <van-cell-group inset class="!my-3">
            <slot />
          </van-cell-group>

          <!-- 底线 -->
          <bottom-line />
        </div>
      </van-tab>

      <!-- 审批记录 -->
      <van-tab title="审批记录" name="record" :disabled="isNil(form?.id)">
        <ApprovalSteps ref="ApprovalStepsRef" />
      </van-tab>
    </div>
  </van-tabs>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import ApprovalSteps from '@/components/WorkflowPage/steps.vue'

const props = defineProps<{
  form: any
}>()

const ApprovalStepsRef = ref<InstanceType<typeof ApprovalSteps>>()

const activeName = ref('form')

// 标签切换
function onTabChange(val: any) {
  const TabsContainer = document.querySelector('#ComplexTabsContainer')
  switch (val) {
    case 'record': {
      nextTick(async () => {
        await ApprovalStepsRef.value?.init(props?.form?.id)

        TabsContainer?.scrollTo({ top: TabsContainer.scrollHeight, behavior: 'smooth' })
      })
      break
    }
    default: {
      nextTick(() => {
        TabsContainer?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      })
      break
    }
  }
}
</script>

<style lang="scss" scoped>
  $topHeight: calc(var(--van-nav-bar-height) + var(--van-tabs-line-height) + env(safe-area-inset-top));

  .tabs-container {
    height: calc(100vh - #{$topHeight});
  }
</style>
