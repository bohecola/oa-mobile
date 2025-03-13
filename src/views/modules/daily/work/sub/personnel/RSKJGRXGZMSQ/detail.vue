<template>
  <!-- <el-row :gutter="20">
    <el-col v-show-field="['l_userId', includeFields]" :span="24">
      <el-form-item prop="l_userId" label="申请人">
        <UserSelectPro v-model="form.l_userId" :multiple="false" readonly />
      </el-form-item>
    </el-col>
  </el-row> -->

  <van-field v-show-field="['l_userType', includeFields]" label="人员类别" name="l_userType">
    <template #input>
      {{ form.l_userType }}
    </template>
  </van-field>
  <DictPicker
    v-model="form.l_proveType"
    v-show-field="['l_proveType', includeFields]"
    label="证明类别"
    name="l_proveType"
    dict-type="oa_daily_work_rskjgrxgzmsq_prove_type"
    :multiple="false"
    :readonly="true"
  />

  <van-field v-show-field="['isUseSeal', includeFields]" label="是否用印" name="isUseSeal">
    <template #input>
      <YesNoSwitch v-model="form.isUseSeal" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['sealUseType', includeFields]" label="用印类型" name="sealUseType">
    <template #input>
      <dict-select v-model="form.sealUseType" dict-type="oa_seal_use_type" readonly :is-filter-use-seal="false" />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
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
