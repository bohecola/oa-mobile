<template>
  <van-field
    v-model="form.pp_contractCategory"
    v-show-field="['pp_contractCategory', includeFields]"
    label="合同类别"
    name="pp_contractCategory"
  />

  <van-field
    v-model="form.pp_contractNature"
    v-show-field="['pp_contractNature', includeFields]"
    label="合同性质"
    name="pp_contractNature"
  />

  <van-field
    v-model="form.pp_contractNo"
    v-show-field="['pp_contractNo', includeFields]"
    label="合同编号"
    name="pp_contractNo"
  />

  <van-field
    v-model="form.pp_customerName"
    v-show-field="['pp_customerName', includeFields]"
    label="客户名称"
    name="pp_customerName"
  />

  <van-field
    v-model="form.pp_projectName"
    v-show-field="['pp_projectName', includeFields]"
    label="项目名称"
    name="pp_projectName"
  />

  <van-field
    v-model="form.pp_projectOwnership"
    v-show-field="['pp_projectOwnership', includeFields]"
    label="项目归属"
    name="pp_projectOwnership"
  />

  <van-field
    v-model="form.pp_projectLeader"
    v-show-field="['pp_projectLeader', includeFields]"
    name="pp_projectLeader"
    label="项目负责人"
  >
    <template #input>
      <UserSelect v-model="form.pp_projectLeader" readonly />
    </template>
  </van-field>

  <van-field
    v-show-field="['pp_remark', includeFields]"
    label="备注"
    name="pp_remark"
  >
    <template #input>
      <TextareaView :value="form.pp_remark" />
    </template>
  </van-field>

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
    includeFields: () => [
      'pp_contractCategory',
      'pp_contractNature',
      'pp_contractNo',
      'pp_customerName',
      'pp_projectName',
      'pp_projectOwnership',
      'pp_projectLeader',
      'pp_remark',
      'reason',
      'ossIdList',
    ],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
