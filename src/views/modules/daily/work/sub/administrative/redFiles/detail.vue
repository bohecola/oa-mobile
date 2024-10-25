<template>
  <van-field v-show-field="['isPersonnelTransfer', includeFields]" label="是否涉及人员任命、调整：" prop="isPersonnelTransfer" name="isPersonnelTransfer" input-align="right" label-width="170">
    <template #input>
      <YesNoSwitch v-model="form.isPersonnelTransfer" readonly />
    </template>
  </van-field>

  <van-field
    v-model="form.reason"
    v-show-field="['reason', includeFields]" prop="reason" label="申请事由："
    rows="2"
    autosize
    type="textarea"
    placeholder="请输入留言"
    show-word-limit
    input-align="right"
  />
</template>

<script setup lang="ts">
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['isPersonnelTransfer', 'reason'],
  },
)

const form = inject<DailyWorkForm>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
