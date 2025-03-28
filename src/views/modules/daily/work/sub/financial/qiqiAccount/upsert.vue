<template>
  <!-- <van-field v-show-field="['hh_deptId', includeFields]" label="项目部" name="hh_deptId" :rules="computedRules.needDepts">
      <template #input>
        <DeptSelect v-model="form.hh_deptId" readonly />
      </template>
    </van-field>
    <van-field v-show-field="['hh_userId', includeFields]" label="姓名" name="hh_userId" :rules="computedRules.needDepts">
      <template #input>
        <UserSelect v-model="form.hh_userId" :multiple="false" readonly />
      </template>
    </van-field> -->

  <van-field
    v-model.trim="form.hh_userName"
    v-show-field="['hh_userName', includeFields]"
    label="姓名"
    placeholder="请输入"
    name="hh_userName"
    :rules="computedRules.hh_userName"
  />

  <van-field-number
    v-model.number="form.hh_phone"
    v-show-field="['hh_phone', includeFields]"
    type="tel"
    maxlength="11"
    label="电话(企企登录账号)"
    placeholder="请输入"
    name="hh_phone"
    :rules="computedRules.hh_phone"
  />

  <van-field
    v-model.trim="form.hh_type"
    v-show-field="['hh_type', includeFields]"
    label="申请类型"
    placeholder="请输入账号新增"
    name="hh_type"
    :rules="computedRules.hh_type"
  />

  <van-field
    v-model="form.hh_superiorLeaders"
    v-show-field="['hh_superiorLeaders', includeFields]"
    label="上级主管领导"
    name="hh_superiorLeaders"
    :rules="computedRules.hh_superiorLeaders"
    is-link
    @click="UserSelectRef?.open"
  >
    <template #input>
      <UserSelect ref="UserSelectRef" v-model="form.hh_superiorLeaders" />
    </template>
  </van-field>

  <van-field
    v-show-field="['hh_isApprovalAuthority', includeFields]"
    label="是否有审批权"
    name="hh_isApprovalAuthority"
    :rules="computedRules.hh_isApprovalAuthority"
  >
    <template #input>
      <YesNoSwitch v-model="form.hh_isApprovalAuthority" size="18px" />
    </template>
  </van-field>

  <van-field
    v-model="form.hh_applyForAWebsite"
    v-show-field="['hh_applyForAWebsite', includeFields]"
    type="textarea"
    rows="1"
    autosize
    label="申请站点"
    placeholder="请输入费用报销站点（个人借款，费用报销，报销还款等业务，如员工借款、差旅费报销、招待费报销、项目交通费报销等）、经营管理站点（合同管理、资产管理、客户、供应商管理等业务，如销售合同、采购合同、资产卡片管理、对客户开票、供应商付款、报销等）"
    name="hh_applyForAWebsite"
    :rules="computedRules.hh_applyForAWebsite"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import UserSelect from '@/components/UserSelect/index.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['hh_deptId', 'hh_userId', 'hh_userName', 'hh_phone', 'hh_type', 'hh_superiorLeaders', 'hh_isApprovalAuthority', 'hh_applyForAWebsite', 'ossIdList'],
  },
)
const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

const UserSelectRef = ref<InstanceType<typeof UserSelect> | null>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
