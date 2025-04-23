<template>
  <van-field
    v-model="form.reason"
    v-show-field="['reason', includeFields]"
    name="reason"
    type="textarea"
    label="申请事由"
    input-align="left"
    rows="1"
    autosize
    :right-icon="!isEmpty(form.wfRemark) ? 'info-o' : ''"
    @click-right-icon="handleIconClick"
  />

  <!-- 开票信息 -->
  <InvoiceInfomation v-if="includeFields.includes('receiptInfo')" readonly />

  <!-- 附件列表 -->
  <van-field
    v-show-field="['ossIdList', includeFields]"
    name="ossIdList"
    label="附件列表"
  >
    <template #input>
      <UploadFile v-model="form.ossIdList" readonly />
    </template>
  </van-field>
</template>

<script setup lang="tsx">
import { isEmpty, isNil } from 'lodash-es'
import { showDialog } from 'vant'
import InvoiceInfomation from './InvoiceInfomation.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

type DailyForm = DailyWorkForm & DailyFeeForm

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyForm>
    formValue?: DailyWorkForm | DailyFeeForm
  }>(),
  {
    includeFields: () => ['reason', 'ossIdList'],
  },
)

// 表单
const injectForm = inject<Ref<DailyForm>>('form')

const form = computed(() => {
  if (!isNil(props.formValue)) {
    return props.formValue
  }

  return injectForm.value
})

// 指令
const vShowField = createFieldVisibilityDirective<DailyForm>(form)

function handleIconClick() {
  showDialog({
    title: '申请事由填写说明',
    message: () => <van-field v-model={form.value.wfRemark} type="textarea" rows="1" autosize />,
  })
}
</script>
