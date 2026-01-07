<template>
  <van-field
    v-model="form.reason"
    v-show-field="['reason', includeFields]"
    name="reason"
    type="textarea"
    label="申请事由"
    value-class="flex-nowrap"
    rows="1"
    placeholder="请输入"
    :right-icon="!isEmpty(form.wfRemark) ? 'info-o' : ''"
    :rules="computedRules.reason"
    autosize
    @click-right-icon="handleIconClick"
  />

  <!-- 开票信息 -->
  <InvoiceInfomation v-if="includeFields.includes('receiptInfo')" />

  <!-- 附件列表 -->
  <van-field
    v-show-field="['ossIdList', includeFields]"
    name="ossIdList"
    label="附件列表"
    placeholder="请选择"
    :rules="computedRules.ossIdList"
  >
    <template #input>
      <UploadFile
        v-model="form.ossIdList"
        value-type="array"
        :desc="desc"
      />
    </template>
  </van-field>
</template>

<script setup lang="tsx">
import { isEmpty } from 'lodash-es'
import { showDialog } from 'vant'
import InvoiceInfomation from './InvoiceInfomation.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

type DailyForm = DailyWorkForm & DailyFeeForm

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyForm>
    desc?: string
  }>(),
  {
    includeFields: () => ['reason', 'ossIdList'],
    desc: undefined,
  },
)

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyForm>>('trackFields')
trackFields(props.includeFields.filter(field => ['reason', 'ossIdList'].includes(field)))

// 表单
const form = inject<Ref<DailyForm>>('form')
// 校验
const computedRules = inject<Ref<FormRules<DailyFeeForm>>>('computedRules')

// 指令
const vShowField = createFieldVisibilityDirective<DailyForm>()

function handleIconClick() {
  showDialog({
    title: '申请事由填写说明',
    message: () => <van-field v-model={form.value.wfRemark} type="textarea" rows="1" autosize />,
  })
}
</script>
