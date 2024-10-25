<template>
  <van-field v-show-field="['customizeApprover', includeFields]" label="选择审核人：" name="customizeApprover" input-align="right">
    <template #input>
      <UserSelectPro v-model="form.customizeApprover" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['customizeTransactor', includeFields]" label="选择办理人：" input-align="right">
    <template #input>
      <UserSelectPro v-model="form.customizeTransactor" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['fileType', includeFields]" label="资料类型：" input-align="right">
    <template #input>
      <DictSelect v-model="form.fileType" dict-type="oa_file_type" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['isSeal', includeFields]" label="是否加盖公章：" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.isSeal" readonly />
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
    includeFields: () => ['customizeApprover', 'fileType', 'isSeal'],
  },
)

const form = inject<DailyWorkForm>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
