<template>
  <DeptSelect
    v-model="form.needDepts"
    v-show-field="['needDepts', includeFields]"
    name="needDepts"
    label="需求部门"
  />

  <van-field
    v-show-field="['u_carNumber', includeFields]"
    :model-value="form.u_carNumber"
    name="u_carNumber"
    label="车牌号"
  />

  <van-field
    v-if="!isNil(form.u_vinNo)"
    :model-value="form.u_vinNo"
    name="u_vinNo"
    label="车架号"
    readonly
  />

  <CompanySelect
    v-model="form.u_newCompanyId"
    v-show-field="['u_newCompanyId', includeFields]"
    name="u_newCompanyId"
    label="新公司"
  />

  <DeptSelect
    v-model="form.u_newDeptId"
    v-show-field="['u_newDeptId', includeFields]"
    name="u_newDeptId"
    label="新部门"
  />

  <van-field
    v-show-field="['recipient', includeFields]"
    name="recipient"
    label="接收人"
  >
    <template #input>
      <UserSelect v-model="form.recipient" readonly />
    </template>
  </van-field>

  <van-field
    v-show-field="['isExistRegulations', includeFields]"
    label="是否存在违章"
    name="isExistRegulations"
  >
    <template #input>
      <YesNoSwitch v-model="form.isExistRegulations" readonly />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => [
      'needDepts',
      'u_carNumber',
      'u_vinNo',
      'u_newCompanyId',
      'u_newDeptId',
      'recipient',
      'isExistRegulations',
      'reason',
      'ossIdList',
    ],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
