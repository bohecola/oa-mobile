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
        v-model="newForm.message"
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
            v-model="newForm.ossIdList"
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
import { cloneDeep, isEmpty } from 'lodash-es'
import type { FieldInstance } from 'vant'
import { usePopup } from '@/hooks'
import { addProcessReview } from '@/api/workflow/processReview/index'
import type { ProcessReviewForm } from '@/api/workflow/processReview/types'

const emit = defineEmits(['approvalfiletable-init'])

const ContentRef = ref<FieldInstance>()

interface OpenOptions {
  placeholder?: string
  businessKey: string
}

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { msgSuccess, loading } = proxy.$modal

const form = ref<ProcessReviewForm>({})
const newForm = ref<ProcessReviewForm>({})

const { visible, openPopup, closePopup } = usePopup()

const defaultOptions: OpenOptions = {
  placeholder: '请输入',
  businessKey: undefined,
}

const options = ref(cloneDeep(defaultOptions))

// 关闭时 => 重置表单
function onClosed() {
  reset()
}

function reset() {
  newForm.value = cloneDeep(form.value)
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
  if (isEmpty(newForm.value.message)) {
    return proxy.$modal.msg('请输入内容')
  }

  loading()

  newForm.value.businessKey = options.value.businessKey
  if (newForm.value.ossIdList) {
    newForm.value.files = newForm.value.ossIdList.join(',')
  }
  // 新增评论
  const { msg } = await addProcessReview(newForm.value)
  msgSuccess(msg)

  // 重置
  reset()
  // 刷新审批表单（ApprovalFileTable）数据
  emit('approvalfiletable-init')

  closePopup()
}

defineExpose({
  open,
})
</script>
