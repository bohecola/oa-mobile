<template>
  <ContractSelect
    v-model="form.a_contractId"
    v-show-field="['a_contractId', includeFields]"
    label="合同名称"
    name="a_contractId"
    :params="{ type: 'in' }"
  />

  <DictSelect
    v-model="form.a_businessType"
    v-show-field="['a_businessType', includeFields]"
    label="项目类别"
    name="a_businessType"
    dict-type="oa_project_business_type"
  />

  <DeptSelect
    v-model="form.a_deptId"
    v-show-field="['a_deptId', includeFields]"
    name="a_deptId"
    label="部门"
  />

  <van-field
    v-show-field="['a_contractNo', includeFields]"
    label="合同编号"
    name="a_contractNo"
  >
    <template #input>
      {{ form.a_contractNo }}
    </template>
  </van-field>

  <SCSelect
    v-model="form.a_partyA"
    v-show-field="['a_partyA', includeFields]"
    label="甲方名称"
    name="a_partyA"
    multiple
  />

  <van-field
    v-if="!isNil(form.a_businessType) && form.a_businessType !== '0'"
    v-show-field="['customizeApprover', includeFields]"
    label="审核人"
    name="customizeApprover"
  >
    <template #input>
      <UserSelect
        v-model="form.customizeApprover"
        multiple
        readonly
      />
    </template>
  </van-field>

  <van-field
    v-show-field="['a_assessmentAmount', includeFields]"
    label="考核金额（元）"
    name="a_assessmentAmount"
  >
    <template #input>
      <div class="flex flex-col">
        <span>{{ formatCurrency(form.a_assessmentAmount) }}</span>
        <span class="text-red-400">{{ toCnMoney(form.a_assessmentAmount) }}</span>
      </div>
    </template>
  </van-field>

  <van-field
    v-show-field="['a_rewardAmount', includeFields]"
    label="奖励金额（元）"
    name="a_rewardAmount"
  >
    <template #input>
      <div class="flex flex-col">
        <span>{{ formatCurrency(form.a_rewardAmount) }}</span>
        <span class="text-red-400">{{ toCnMoney(form.a_rewardAmount) }}</span>
      </div>
    </template>
  </van-field>

  <van-field
    v-show-field="['isSeal', includeFields]"
    label="是否盖章"
    name="isSeal"
    input-align="left"
  >
    <template #input>
      <YesNoSwitch v-model="form.isSeal" readonly />
    </template>
  </van-field>

  <DictSelect
    v-model="form.a_isAssessment"
    v-show-field="['a_isAssessment', includeFields]"
    label="是否有公司内部考核"
    name="a_isAssessment"
    dict-type="sys_yes_no"
  />

  <van-field
    v-show-field="['a_assessmentReport', includeFields]"
    label="公司内部考核通报"
    name="a_assessmentReport"
  >
    <template #input>
      <UploadFile v-model="form.a_assessmentReport" readonly />
    </template>
  </van-field>

  <van-field
    v-if="form.a_isAssessment === 'Y'"
    v-model.trim="form.a_businessKey"
    v-show-field="['a_businessKey', includeFields]"
    label="考核类事务/项目日常考核流程ID"
    name="a_businessKey"
    placeholder="请输入"
  >
    <template #input>
      <span
        class="text-[--van-primary-color]"
        @click="handleViewBusinessKey(form.a_businessKey)"
      >
        {{ form.a_businessKey }}
      </span>
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { useWorkflowURL } from '@/hooks'
import { dd } from '@/plugins/dingTalk'
import ContractSelect from '@/views/modules/business/components/ContractSelect.vue'
import SCSelect from '@/views/modules/business/components/SCSelect.vue'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => [
      'a_contractId',
      'a_businessType',
      'a_deptId',
      'a_contractNo',
      'a_partyA',
      'customizeApprover',
      'a_assessmentAmount',
      'a_rewardAmount',
      'a_isAssessment',
      'a_assessmentReport',
      'a_businessKey',
      'isSeal',
      'reason',
      'ossIdList',
    ],
  },
)

const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 表单
const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)

const { url, isError, msg, fetchWorkflowURL } = useWorkflowURL()

// 查看考核类事务/项目日常考核流程ID
async function handleViewBusinessKey(businessKey: string) {
  proxy?.$modal.loading()
  await fetchWorkflowURL({ businessKey, timestamp: true }).finally(proxy?.$modal.closeLoading)

  if (isError.value) {
    return proxy.$modal.msgError(msg.value)
  }

  if (dd.env.platform === 'notInDingTalk') {
    return
  }

  dd.openLink({ url: url.value })
}
</script>
