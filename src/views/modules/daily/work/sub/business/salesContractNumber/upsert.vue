<template>
  <van-field v-model="form.pp_contractCategory" v-show-field="['pp_contractCategory', includeFields]" label="合同类别" placeholder="请输入" name="pp_contractCategory" input-align="left" />

  <van-field v-model="form.pp_contractNature" v-show-field="['pp_contractNature', includeFields]" label="合同性质" placeholder="请输入" name="pp_contractNature" input-align="left" />

  <van-field v-model="form.pp_contractNo" v-show-field="['pp_contractNo', includeFields]" label="合同编号" placeholder="请输入" name="pp_contractNo" input-align="left" />

  <van-field v-model="form.pp_customerName" v-show-field="['pp_customerName', includeFields]" label="客户名称" placeholder="请输入" name="pp_customerName" input-align="left" />

  <van-field v-model="form.pp_projectName" v-show-field="['pp_projectName', includeFields]" label="项目名称" placeholder="请输入" name="pp_projectName" input-align="left" />

  <van-field v-model="form.pp_projectOwnership" v-show-field="['pp_projectOwnership', includeFields]" label="项目归属" placeholder="请输入" name="pp_projectOwnership" input-align="left" />

  <van-field v-show-field="['pp_remark', includeFields]" label="备注" name="pp_remark" placeholder="请输入" type="textarea" rows="2" input-align="left" />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'

import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

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

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
