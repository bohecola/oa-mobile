<template>
  <van-field v-show-field="['needDepts', includeFields]" name="needDepts" prop="needDepts" label="需求部门：" input-align="right">
    <template #input>
      <DeptSelect v-model="form.needDepts" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['isExistRegulations', includeFields]" label="是否存在违章：" prop="isExistRegulations" name="isExistRegulations" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.isExistRegulations" readonly />
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
    includeFields: () => ['needDepts', 'isExistRegulations', 'reason'],
  },
)

const form = inject<DailyWorkForm>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
