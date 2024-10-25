<template>
  <van-field v-show-field="['administrationFileType', includeFields]" label="申请资料：" name="administrationFileType" input-align="right">
    <template #input>
      <DictSelect v-model="form.administrationFileType" dict-type="oa_administration_file_type" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['fileType', includeFields]" label="资料类型：" name="fileType" input-align="right">
    <template #input>
      <DictSelect v-model="form.fileType" dict-type="oa_file_type" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['isUseSeal', includeFields]" label="是否用印：" name="isUseSeal" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.isUseSeal" readonly />
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
    includeFields: () => ['administrationFileType', 'fileType', 'isUseSeal'],
  },
)

const form = inject<DailyWorkForm>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
