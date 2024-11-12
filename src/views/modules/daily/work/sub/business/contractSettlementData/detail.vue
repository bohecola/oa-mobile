<template>
  <van-field v-show-field="['customizeApprover', includeFields]" label="审核人" name="customizeApprover" input-align="right">
    <template #input>
      <UserSelect v-model="form.customizeApprover" />
    </template>
  </van-field>

  <van-field v-show-field="['customizeTransactor', includeFields]" label="办理人" input-align="right">
    <template #input>
      <UserSelect v-model="form.customizeTransactor" />
    </template>
  </van-field>

  <van-field v-show-field="['fileType', includeFields]" label="资料类型" input-align="right">
    <template #input>
      <DictSelect v-model="form.fileType" dict-type="oa_file_type" multiple readonly />
    </template>
  </van-field>

  <van-field v-show-field="['isSeal', includeFields]" label="是否加盖公章" input-align="right">
    <template #input>
      <YesNoSwitch v-model="form.isSeal" readonly />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'

import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['customizeApprover', 'fileType', 'isSeal', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
