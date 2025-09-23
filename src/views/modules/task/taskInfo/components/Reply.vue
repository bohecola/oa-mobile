<template>
  <van-popup
    v-model:show="visible"
    position="bottom"
    teleport="body"
    round
    destroy-on-close
    safe-area-inset-bottom
    @closed="onClosed"
  >
    <van-form label-width="40px">
      <van-field
        ref="ContentRef"
        v-model="newRecordItem.content"
        label="内容"
        type="textarea"
        :placeholder="options.placeholder"
        show-word-limit
        maxlength="500"
        autosize
      />

      <van-field label="附件">
        <template #input>
          <UploadFile
            v-model="newRecordItem.ossIdList"
            is-multiple
            value-type="array"
          />
        </template>
      </van-field>

      <div class="mt-auto p-4 flex justify-end gap-2">
        <van-button type="primary" @click="handleAddRecord">
          提交
        </van-button>
      </div>
    </van-form>
  </van-popup>
</template>

<script setup lang="ts">
import { cloneDeep, isEmpty, isNil } from 'lodash-es'
import type { FieldInstance } from 'vant'
import { useRecordItem } from '../helper'
import { usePopup } from '@/hooks'
import type { TaskRecordVO } from '@/api/oa/task/taskRecord/types'
import { addTaskRecord } from '@/api/oa/task/taskRecord'

const emit = defineEmits(['send-success'])

const ContentRef = ref<FieldInstance>()

interface OpenOptions {
  placeholder?: string
  taskId: string
  targetData?: TaskRecordVO
}

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { msgSuccess, loading } = proxy.$modal

const { recordItem, newRecordItem } = useRecordItem()

const { visible, openPopup, closePopup } = usePopup()

const defaultOptions: OpenOptions = {
  placeholder: '请输入',
  taskId: undefined,
  targetData: undefined,
}

const options = ref(cloneDeep(defaultOptions))

// 关闭时 => 重置表单
function onClosed() {
  reset()
}

function reset() {
  newRecordItem.value = cloneDeep(recordItem)
  options.value = cloneDeep(defaultOptions)
}

function open(op: OpenOptions) {
  options.value = op

  openPopup()

  nextTick(() => {
    ContentRef.value?.focus()
  })
}

// 新增
async function handleAddRecord() {
  if (isEmpty(newRecordItem.value.content)) {
    return proxy.$modal.msg('请输入内容')
  }

  loading()

  newRecordItem.value.taskId = options.value.taskId

  // 如果存在父级，则设置父级ID
  if (!isNil(options.value.targetData)) {
    newRecordItem.value.parentId = options.value.targetData.id
  }

  // 新增记录
  const { msg } = await addTaskRecord(newRecordItem.value)
  msgSuccess(msg)

  // 重置
  reset()

  emit('send-success')

  closePopup()
}

defineExpose({
  open,
})
</script>
