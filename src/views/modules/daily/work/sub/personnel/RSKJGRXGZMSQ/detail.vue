<template>
  <DictSelect
    v-model="form.l_userType"
    v-show-field="['l_userType', includeFields]"
    label="人员类别"
    name="l_userType"
    :options="[{ label: '咸林', value: '咸林' }, { label: '杰而森', value: '杰而森' }]"
  />

  <DictSelect
    v-model="form.l_proveType"
    v-show-field="['l_proveType', includeFields]"
    label="证明类别"
    name="l_proveType"
    dict-type="oa_daily_work_rskjgrxgzmsq_prove_type"
  />

  <van-field
    v-show-field="['isUseSeal', includeFields]"
    label="是否用印"
    name="isUseSeal"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.isUseSeal"
        readonly
      />
    </template>
  </van-field>

  <DictSelect
    v-model="form.sealUseType"
    v-show-field="['sealUseType', includeFields]"
    label="用印类型"
    name="sealUseType"
    dict-type="oa_seal_use_type"
    multiple
    :is-filter-use-seal="false"
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
    includeFields: () => ['l_userId', 'l_userType', 'l_proveType', 'isUseSeal', 'sealUseType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
