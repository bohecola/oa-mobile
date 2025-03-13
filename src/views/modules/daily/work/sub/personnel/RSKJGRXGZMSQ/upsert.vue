<template>
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['l_userId', includeFields]" :span="24">
        <el-form-item prop="l_userId" label="申请人">
          <UserSelectPro v-model="form.l_userId" :multiple="false" readonly />
        </el-form-item>
      </el-col>
    </el-row> -->

  <!-- TODO -->
  <van-field v-show-field="['l_userType', includeFields]" label="人员类别" name="l_userType" :rules="computedRules.l_userType">
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
    :rules="computedRules.l_proveType"
  />

  <van-field v-show-field="['isUseSeal', includeFields]" label="是否用印" name="isUseSeal" :rules="computedRules.isUseSeal">
    <template #input>
      <YesNoSwitch v-model="form.isUseSeal" @change="onIsUseSealChange" />
    </template>
  </van-field>

  <van-field v-show-field="['sealUseType', includeFields]" label="用印类型" name="sealUseType" :rules="computedRules.sealUseType">
    <template #input>
      <dict-select v-model="form.sealUseType" dict-type="oa_seal_use_type" :is-filter-use-seal="false" />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
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

const Form = inject<Ref<FormInstance>>('Form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

function onIsUseSealChange() {
  // 清空用印类型
  form.value.sealUseType = undefined
  Form?.value?.resetValidation(['sealUseType'])
}
</script>
