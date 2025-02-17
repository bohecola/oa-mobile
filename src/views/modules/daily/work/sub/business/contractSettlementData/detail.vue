<template>
  <van-field v-show-field="['customizeApprover', includeFields]" label="审核人" name="customizeApprover" input-align="right">
    <template #input>
      <UserSelect v-model="form.customizeApprover" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['customizeTransactor', includeFields]" label="办理人" input-align="right">
    <template #input>
      <UserSelect v-model="form.customizeTransactor" readonly />
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

  <van-field v-model="form.mm_contractSettlementNature" v-show-field="['mm_contractSettlementNature', includeFields]" label="合同结算性质" name="mm_contractSettlementNature" input-align="right" />

  <van-field v-model="form.mm_contractSettlementcontent" v-show-field="['mm_contractSettlementcontent', includeFields]" label="合同结算资料内容" name="mm_contractSettlementcontent" input-align="right" />

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
    includeFields: () => ['customizeApprover', 'fileType', 'isSeal', 'mm_contractSettlementNature', 'mm_contractSettlementcontent', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
