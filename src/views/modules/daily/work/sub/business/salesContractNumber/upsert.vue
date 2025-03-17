<template>
  <van-field
    v-model.trim="form.pp_contractCategory"
    v-show-field="['pp_contractCategory', includeFields]"
    label="合同类别"
    placeholder="请输入"
    name="pp_contractCategory"
    :rules="computedRules.pp_contractCategory"
  />

  <van-field
    v-model.trim="form.pp_contractNature"
    v-show-field="['pp_contractNature', includeFields]"
    label="合同性质"
    placeholder="请输入新签/续签(续签需写上该项目上年度合同编号)"
    name="pp_contractNature"
    :rules="computedRules.pp_contractNature"
  />

  <van-field
    v-model.trim="form.pp_contractNo"
    v-show-field="['pp_contractNo', includeFields]"
    label="合同编号"
    placeholder="请输入"
    name="pp_contractNo"
    :rules="computedRules.pp_contractNo"
  />

  <van-field
    v-model.trim="form.pp_customerName"
    v-show-field="['pp_customerName', includeFields]"
    label="客户名称"
    placeholder="请输入"
    name="pp_customerName"
    :rules="computedRules.pp_customerName"
  />

  <van-field
    v-model.trim="form.pp_projectName"
    v-show-field="['pp_projectName', includeFields]"
    label="项目名称"
    placeholder="请输入"
    name="pp_projectName"
    :rules="computedRules.pp_projectName"
  />

  <van-field
    v-model.trim="form.pp_projectOwnership"
    v-show-field="['pp_projectOwnership', includeFields]"
    label="项目归属"
    placeholder="请输入"
    name="pp_projectOwnership"
    :rules="computedRules.pp_projectOwnership"
  />

  <van-field
    v-model.trim="form.pp_remark"
    v-show-field="['pp_remark', includeFields]"
    label="备注"
    name="pp_remark"
    placeholder="请输入"
    type="textarea"
    rows="1"
    :rules="computedRules.pp_remark"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['pp_contractCategory', 'pp_contractNature', 'pp_contractNo', 'pp_customerName', 'pp_projectName', 'pp_projectOwnership', 'pp_remark', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
