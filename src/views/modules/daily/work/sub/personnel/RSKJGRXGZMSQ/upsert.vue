<template>
  <!-- <el-row :gutter="20">
      <el-col v-show-field="['l_userId', includeFields]" :span="24">
        <el-form-item prop="l_userId" label="申请人">
          <UserSelectPro v-model="form.l_userId" :multiple="false" readonly />
        </el-form-item>
      </el-col>
    </el-row> -->

  <!-- TODO -->
  <DictSelect
    v-model="form.l_userType"
    v-show-field="['l_userType', includeFields]"
    label="人员类别"
    name="l_userType"
    :options="[{ label: '咸林', value: '咸林' }, { label: '杰而森', value: '杰而森' }]"
    :rules="computedRules.l_userType"
  />

  <DictSelect
    v-model="form.l_proveType"
    v-show-field="['l_proveType', includeFields]"
    label="证明类别"
    name="l_proveType"
    dict-type="oa_daily_work_rskjgrxgzmsq_prove_type"
    :rules="computedRules.l_proveType"
  />

  <van-field
    v-show-field="['isUseSeal', includeFields]"
    label="是否用印"
    name="isUseSeal"
    :rules="computedRules.isUseSeal"
  >
    <template #input>
      <YesNoSwitch
        v-model="form.isUseSeal"
        @change="onIsUseSealChange"
      />
    </template>
  </van-field>

  <DictSelect
    v-if="form.isUseSeal === 'Y'"
    v-model="form.sealUseType"
    v-show-field="['sealUseType', includeFields]"
    label="用印类型"
    name="sealUseType"
    dict-type="oa_seal_use_type"
    :is-filter-use-seal="false"
    :rules="computedRules.sealUseType"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
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
