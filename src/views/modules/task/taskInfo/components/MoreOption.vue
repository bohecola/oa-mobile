<template>
  <van-action-sheet
    v-model:show="visible"
    :actions="actions"
    cancel-text="取消"
    close-on-click-action
    @closed="reset"
    @cancel="closePopup"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es'
import type { ActionSheetAction } from 'vant'
import { useCopy, usePopup } from '@/hooks'
import type { TaskRecordVO } from '@/api/oa/task/taskRecord/types'
import { delTaskRecord } from '@/api/oa/task/taskRecord'
import { useStore } from '@/store'

interface OpenOptions {
  data?: TaskRecordVO
}

const props = defineProps<{
  onDeleteSuccess?: () => void
}>()

const emit = defineEmits(['reply'])

const { user } = useStore()

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { msgSuccess, msg } = proxy.$modal

const { visible, openPopup, closePopup } = usePopup()

const { copy } = useCopy()

const defaultOptions: OpenOptions = {
  data: undefined,
}

const options = ref(cloneDeep(defaultOptions))

function reset() {
  options.value = cloneDeep(defaultOptions)
}

const defaultActions = [
  { name: '回复' },
  { name: '复制' },
]

const actions = ref<ActionSheetAction[]>(cloneDeep(defaultActions))

function onSelect(action: ActionSheetAction) {
  const { name } = action
  switch (name) {
    case '回复':
      emit('reply', options.value.data)
      break
    case '复制':
      copy(options.value.data?.content, () => msg('复制成功'))
      break
    case '删除':
      handleDelete(options.value.data)
      break
  }
}

function open(op: OpenOptions) {
  options.value = op

  const { data } = op

  if (data.createBy === user.info.userId) {
    actions.value = [...defaultActions, { name: '删除', color: '#ee0a24' }]
  }
  else {
    actions.value = defaultActions
  }

  openPopup()
}

// 删除
function handleDelete(item: TaskRecordVO) {
  proxy.$modal
    .confirm('删除评论后，评论下的所有回复将会被删除')
    .then(async () => {
      const { msg } = await delTaskRecord(item.id)
      msgSuccess(msg)
      props.onDeleteSuccess?.()
    })
}

defineExpose({
  open,
})
</script>
