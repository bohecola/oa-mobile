<template>
  <van-field v-show-field="['isYwlProject', includeFields]" label="是否运维类项目：" prop="isYwlProject" name="isYwlProject" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.isYwlProject" read-only />
    </template>
  </van-field>

  <van-field v-show-field="['isPersonnelTransfer', includeFields]" label="是否涉及人员任命、调整：" prop="isPersonnelTransfer" name="isPersonnelTransfer" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.isPersonnelTransfer" read-only />
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
    includeFields: () => ['isYwlProject', 'isPersonnelTransfer', 'reason'],
  },
)

const form = inject<DailyWorkForm>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
