<template>
  <!-- <van-field v-show-field="['hh_deptId', includeFields]" label="项目部" name="hh_deptId" >
    <template #input>
      <DeptSelect v-model="form.hh_deptId" readonly />
    </template>
  </van-field>
  <van-field v-show-field="['hh_userId', includeFields]" label="姓名" name="hh_userId" >
    <template #input>
      <UserSelect v-model="form.hh_userId" :multiple="false" readonly />
    </template>
  </van-field> -->

  <van-field
    v-model="form.hh_userName"
    v-show-field="['hh_userName', includeFields]"
    readonly
    label="姓名"
    name="hh_userName"
  />

  <van-field
    v-model="form.hh_phone"
    v-show-field="['hh_phone', includeFields]"
    readonly
    label="电话(企企登录账号)"
    name="hh_phone"
  />

  <van-field
    v-model="form.hh_type"
    v-show-field="['hh_type', includeFields]"
    readonly
    label="申请类型"
    name="hh_type"
  />

  <van-field
    v-show-field="['hh_superiorLeaders', includeFields]"
    label="上级主管领导"
    name="hh_superiorLeaders"
  >
    <template #input>
      <UserSelect v-model="form.hh_superiorLeaders" :multiple="false" readonly />
    </template>
  </van-field>
  <van-field
    v-show-field="['hh_isApprovalAuthority', includeFields]"
    label="是否有审批权"
    name="hh_isApprovalAuthority"
  >
    <template #input>
      <YesNoSwitch v-model="form.hh_isApprovalAuthority" readonly />
    </template>
  </van-field>

  <van-field
    v-model="form.hh_applyForAWebsite"
    v-show-field="['hh_applyForAWebsite', includeFields]"
    type="textarea"
    rows="2"
    label="申请站点"
    name="hh_applyForAWebsite"
  />

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
    includeFields: () => ['hh_deptId', 'hh_userId', 'hh_userName', 'hh_phone', 'hh_type', 'hh_superiorLeaders', 'hh_isApprovalAuthority', 'hh_applyForAWebsite', 'reason', 'ossIdList'],
  },
)
const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
