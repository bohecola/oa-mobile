<template>
  <van-field
    v-show-field="['reason', includeFields]"
    name="reason"
    label="申请事由："
    input-align="right"
    value-class="flex-nowrap"
    :right-icon="form.wfRemark ? 'info-o' : ''"
    @click-right-icon="handleReasonClick"
  >
    <template #input>
      <div>
        <TextareaView :value="form.reason" />
      </div>
    </template>
  </van-field>

  <Teleport to="#DailyWorkFormContainer">
    <TableCard v-show-field="['ossIdList', includeFields]" :is-empty="isEmpty(form.ossIdList)" title="附件列表" class="mx-4">
      <UploadFile v-model="form.ossIdList" readonly :card-size="60" />
    </TableCard>
  </Teleport>
</template>

<script setup lang="tsx">
import { isEmpty } from 'lodash-es'
import { showDialog } from 'vant'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import TextareaView from '@/components/TextareaView/index.vue'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['dailyWorkType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

function handleReasonClick() {
  showDialog({
    title: '备注',
    message: () => <TextareaView value={form.value.wfRemark} />,
  })
}
</script>
