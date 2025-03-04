<template>
  <van-field v-model="form.pp_contractCategory" v-show-field="['pp_contractCategory', includeFields]" label="合同类别" name="pp_contractCategory" input-align="left" />

  <van-field v-model="form.pp_contractNature" v-show-field="['pp_contractNature', includeFields]" label="合同性质" name="pp_contractNature" input-align="left" />

  <van-field v-model="form.pp_contractNo" v-show-field="['pp_contractNo', includeFields]" label="合同编号" name="pp_contractNo" input-align="left" />

  <van-field v-model="form.pp_customerName" v-show-field="['pp_customerName', includeFields]" label="客户名称" name="pp_customerName" input-align="left" />

  <van-field v-model="form.pp_projectName" v-show-field="['pp_projectName', includeFields]" label="项目名称" name="pp_projectName" input-align="left" />

  <van-field v-model="form.pp_projectOwnership" v-show-field="['pp_projectOwnership', includeFields]" label="项目归属" name="pp_projectOwnership" input-align="left" />

  <van-field v-show-field="['pp_remark', includeFields]" label="备注" name="pp_remark" input-align="left">
    <template #input>
      <TextareaView :value="form.pp_remark" />
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
    includeFields: () => ['pp_contractCategory', 'pp_contractNature', 'pp_contractNo', 'pp_customerName', 'pp_projectName', 'pp_projectOwnership', 'pp_remark', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
