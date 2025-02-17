<template>
  <van-field
    v-show-field="['reason', includeFields]"
    name="reason"
    label="申请事由"
    input-align="right"
    value-class="flex-nowrap"
    :right-icon="form.wfRemark ? 'info-o' : ''"
    @click-right-icon="handleIconClick"
  >
    <template #input>
      <div>
        <TextareaView :value="form.reason" />
      </div>
    </template>
  </van-field>

  <Teleport to="#AFC" defer>
    <!-- 开票信息 -->
    <InvoiceInfomation v-if="includeFields.includes('receiptInfo')" readonly class="!mb-6" />
    <TableCard v-show-field="['ossIdList', includeFields]" :is-empty="isEmpty(form.ossIdList)" title="附件列表" class="mx-4">
      <UploadFile v-model="form.ossIdList" readonly :card-size="60" />
    </TableCard>
  </Teleport>
</template>

<script setup lang="tsx">
import { isEmpty } from 'lodash-es'
import { showDialog } from 'vant'
import InvoiceInfomation from './InvoiceInfomation.vue'
import TextareaView from '@/components/TextareaView/index.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import type { DailyFeeForm } from '@/api/oa/daily/fee/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

type DailyForm = DailyWorkForm & DailyFeeForm

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyForm>
  }>(),
  {
    includeFields: () => ['reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyForm>(form)

function handleIconClick() {
  showDialog({
    title: '申请事由填写说明',
    message: () => <TextareaView value={form.value.wfRemark} class="text-left" />,
  })
}
</script>
