<template>
  <!-- <van-field v-show-field="['hh_deptId', includeFields]" label="项目部" name="hh_deptId" input-align="left">
      <template #input>
        <DeptSelect v-model="form.hh_deptId" readonly />
      </template>
    </van-field>
    <van-field v-show-field="['hh_userId', includeFields]" label="姓名" name="hh_userId" input-align="left">
      <template #input>
        <UserSelect v-model="form.hh_userId" :multiple="false" readonly />
      </template>
    </van-field> -->

  <van-field v-model="form.hh_userName" v-show-field="['hh_userName', includeFields]" label="姓名" placeholder="请输入" name="hh_userName" input-align="left" />

  <van-field-number v-model="form.hh_phone" v-show-field="['hh_phone', includeFields]" type="tel" maxlength="11" label="电话(企企登录账号)" placeholder="请输入" name="hh_phone" input-align="left" />

  <van-field v-model="form.hh_type" v-show-field="['hh_type', includeFields]" label="申请类型" placeholder="请输入" name="hh_type" input-align="left" />

  <van-field v-show-field="['hh_superiorLeaders', includeFields]" label="上级主管领导" name="hh_superiorLeaders" input-align="left">
    <template #input>
      <UserSelect v-model="form.hh_superiorLeaders" :multiple="false" />
    </template>
  </van-field>
  <van-field v-show-field="['hh_isApprovalAuthority', includeFields]" label="是否有审批权" name="hh_isApprovalAuthority" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.hh_isApprovalAuthority" size="18px" />
    </template>
  </van-field>

  <van-field v-show-field="['hh_applyForAWebsite', includeFields]" type="textarea" rows="2" label="申请站点" placeholder="请输入" name="hh_applyForAWebsite" input-align="left" />

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
    includeFields: () => ['hh_deptId', 'hh_userId', 'hh_userName', 'hh_phone', 'hh_type', 'hh_superiorLeaders', 'hh_isApprovalAuthority', 'hh_applyForAWebsite', 'reason', 'ossIdList'],
  },
)
const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
