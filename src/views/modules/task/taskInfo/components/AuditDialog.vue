<template>
  <van-popup
    v-model:show="visible"
    position="bottom"
    teleport="body"
    round
    destroy-on-close
    safe-area-inset-bottom
  >
    <div class="flex flex-col min-h-[32vh]">
      <van-form
        ref="Form"
        label-width="60"
        label-align="left"
        input-align="left"
        scroll-to-error
      >
        <van-cell-group title="工作事项审批">
          <DictSelect
            v-model="form.status"
            label="审批状态"
            name="status"
            :options="statusOptions"
            :rules="rules.status"
          />

          <van-field
            v-model="form.approvalComment"
            label="审批意见"
            name="approvalComment"
            type="textarea"
            rows="2"
            placeholder="请输入审批意见"
            autosize
            :rules="rules.approvalComment"
          />
        </van-cell-group>
      </van-form>

      <div class="mt-auto p-4 flex justify-end gap-2">
        <van-button type="primary" @click="handleAudit">
          提交
        </van-button>
        <van-button type="default" @click="closePopup">
          取消
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
import { cloneDeep } from 'lodash-es'
import type { TaskInfoForm } from '@/api/oa/task/taskInfo/types'
import { approvalTask } from '@/api/oa/task/taskInfo'
import { usePopup } from '@/hooks'

// 打开选项
interface OpenOptions {
  data: TaskInfoForm
  success?: () => void
}

// 代理
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { loading, closeLoading, msgSuccess, confirm } = proxy.$modal

const { visible, openPopup, closePopup } = usePopup()

// 打开选项
const options = ref<OpenOptions>({
  data: undefined,
  success: undefined,
})

// 表单实例
const Form = ref<FormInstance>()

// 状态选项
const statusOptions = ref<DictDataOption[]>([
  { label: '已完成', value: '4' },
  { label: '驳回', value: '3' },
])

// 表单规则
const rules = ref<FormRules<TaskInfoForm>>({
  status: [{ required: true, message: '请选择状态', trigger: 'onBlur' }],
  approvalComment: [{ required: true, message: '请输入审批意见', trigger: 'onBlur' }],
})

// 表单初始数据
const initFormData = {
  status: undefined,
  approvalComment: undefined,
}

// 表单数据
const form = ref(cloneDeep(initFormData))

// // 重置表单
// function reset() {
//   Form.value?.resetValidation()
//   form.value = cloneDeep(initFormData)
// }

// 审批
function handleAudit() {
  Form.value?.validate()
    .then(() => {
      confirm(`确定要进行审批吗？`)
        .then(async () => {
          loading()
          Object.assign(options.value.data, form.value)

          const { msg } = await approvalTask(options.value.data)
            .finally(closeLoading)

          msgSuccess(msg)
          closePopup()
          options.value.success?.()
        })
    })
}

// 打开对话框
function open(op: OpenOptions) {
  options.value = op

  openPopup()
}

defineExpose({
  open,
})
</script>
