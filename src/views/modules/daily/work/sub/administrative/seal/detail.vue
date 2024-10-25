<template>
  <van-field v-show-field="['sealType', includeFields]" label="申请类型：" name="sealType" input-align="right">
    <template #input>
      <DictSelect v-model="form.sealType" dict-type="oa_seal_type" :multiple="false" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['isReturnSeal', includeFields]" label="是否交回原印：" name="isReturnSeal" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.isReturnSeal" readonly />
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
    includeFields: () => ['sealType', 'isReturnSeal'],
  },
)

const form = inject<DailyWorkForm>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
