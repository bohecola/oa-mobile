<template>
  <van-field v-show-field="['fileUseType', includeFields]" label="使用方式：" name="fileUseType" input-align="right">
    <template #input>
      <DictSelect v-model="form.fileUseType" dict-type="oa_file_use_type" :multiple="false" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['sealFileCategory', includeFields]" label="文件类别：" name="sealFileCategory" input-align="right">
    <template #input>
      <DictSelect v-model="form.sealFileCategory" dict-type="oa_seal_file_category" :multiple="false" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['sealUseType', includeFields]" label="用印类型：" name="sealUseType" input-align="right">
    <template #input>
      <DictSelect v-model="form.sealUseType" dict-type="oa_seal_use_type" readonly />
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
    includeFields: () => ['fileUseType', 'sealFileCategory', 'sealUseType'],
  },
)

const form = inject<DailyWorkForm>('form')

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_file_use_type } = toRefs<any>(proxy?.useDict('oa_file_use_type'))
const { oa_seal_file_category } = toRefs<any>(proxy?.useDict('oa_seal_file_category'))
const { oa_seal_use_type } = toRefs<any>(proxy?.useDict('oa_seal_use_type'))

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
