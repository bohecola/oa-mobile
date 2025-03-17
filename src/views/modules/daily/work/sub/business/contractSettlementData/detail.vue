<template>
  <van-field
    v-show-field="['customizeApprover', includeFields]"
    label="审核人"
    name="customizeApprover"
  >
    <template #input>
      <UserSelect v-model="form.customizeApprover" readonly />
    </template>
  </van-field>

  <van-field
    v-show-field="['customizeTransactor', includeFields]"
    label="办理人"
    name="customizeTransactor"
  >
    <template #input>
      <UserSelect v-model="form.customizeTransactor" readonly />
    </template>
  </van-field>

  <DictPicker
    v-model="form.fileType"
    v-show-field="['fileType', includeFields]"
    label="资料类型"
    name="fileType"
    dict-type="oa_file_type"
    :multiple="true"
    :readonly="true"
  />

  <van-field
    v-show-field="['isSeal', includeFields]"
    label="是否加盖公章"
    name="isSeal"
  >
    <template #input>
      <YesNoSwitch v-model="form.isSeal" readonly />
    </template>
  </van-field>

  <van-field
    v-model="form.mm_contractSettlementNature"
    v-show-field="['mm_contractSettlementNature', includeFields]"
    label="合同结算性质"
    name="mm_contractSettlementNature"
  />

  <van-field
    v-model="form.mm_contractSettlementcontent"
    v-show-field="['mm_contractSettlementcontent', includeFields]"
    label="合同结算资料内容"
    name="mm_contractSettlementcontent"
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

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
