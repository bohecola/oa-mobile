<template>
  <div class="w-full">
    <div

      class="text-xs"
    >
      <!-- 评论 -->
      <template v-if="isFirstLevel">
        <div class="text-[--van-text-color-2]">
          {{ data.createByName }}
        </div>
        <div class="break-all leading-loose" v-html="content" />
      </template>

      <!-- 回复 -->
      <template v-else>
        <span class="text-[--van-text-color-2]">{{ data.createByName }}</span>
        <template v-if="!isNil(data.replyToId)">
          <span class="mx-1">回复</span>
          <span class="text-[--van-text-color-2]">{{ data.parentByName }}</span>
        </template>
        <span v-if="isSecondLevel">：</span>
        <span class="break-all leading-loose" v-html="content" />
      </template>
    </div>

    <div v-if="!isEmpty(data.ossIdList)">
      <UploadFile
        :model-value="data.ossIdList"
        :card-size="40"
        value-type="array"
        readonly
      />
    </div>

    <div class="flex items-center gap-5 text-xs text-[--van-text-color-2]">
      <div class="min-w-32">
        {{ data.createTime }}
      </div>

      <div class="flex-1" />

      <template v-if="showReplyButton">
        <van-icon name="ellipsis" size="14" @click="handleMoreOption(data)" />
        <div class="flex items-center cursor-pointer" @click="handleReply(data)">
          <van-icon name="comment-o" size="14" />
          <span v-if="isFirstLevel && !isEmpty(data.children)" class="ml-1">
            {{ data.children.length }}
          </span>
        </div>
      </template>
    </div>

    <div class="mt-1 ml-5">
      <Comment
        v-for="item in data.children ?? []"
        :key="item.id"
        :data="item"
        :show-reply-button="showReplyButton"
        class="mb-2 last:mb-0"
        @reply-click="handleReply(item)"
        @more-option="handleMoreOption(item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash-es'
import type { TaskRecordVO } from '@/api/oa/task/taskRecord/types'

const props = defineProps<{
  data: TaskRecordVO
  showReplyButton?: boolean
}>()

const emit = defineEmits(['reply-click', 'more-option'])

const isFirstLevel = computed(() => (props.data.parentId as any) === 0)
const isSecondLevel = computed(() => (props.data.parentId as any) !== 0)

const content = computed(() => {
  const value = props.data.content
  if (isEmpty(value)) {
    return value
  }
  return value.replace(/\n/g, '<br>')
})

// 回复点击
function handleReply(item: TaskRecordVO) {
  emit('reply-click', item)
}

// 更多选项
function handleMoreOption(item: TaskRecordVO) {
  emit('more-option', item)
}
</script>
