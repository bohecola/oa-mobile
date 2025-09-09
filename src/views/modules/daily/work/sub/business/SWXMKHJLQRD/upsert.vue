<template>
  <ContractSelect
    v-model="form.a_contractId"
    v-show-field="['a_contractId', includeFields]"
    label="合同名称"
    name="a_contractId"
    :rules="computedRules.a_contractId"
    :params="{ type: 'in' }"
    clearable
    @update:selected-list="onContractSelectedListChange"
  />

  <DictSelect
    v-model="form.a_businessType"
    v-show-field="['a_businessType', includeFields]"
    label="项目类别"
    name="a_businessType"
    :rules="computedRules.a_businessType"
    dict-type="oa_project_business_type"
    readonly
  />

  <DeptSelect
    v-model="form.a_deptId"
    v-show-field="['a_deptId', includeFields]"
    name="a_deptId"
    label="部门"
    :rules="computedRules.a_deptId"
    readonly
  />

  <van-field
    v-model.trim="form.a_contractNo"
    v-show-field="['a_contractNo', includeFields]"
    label="合同编号"
    name="a_contractNo"
    :rules="computedRules.a_contractNo"
    readonly
  />

  <SCSelect
    v-model="form.a_partyA"
    v-show-field="['a_partyA', includeFields]"
    label="甲方名称"
    name="a_partyA"
    :rules="computedRules.a_partyA"
    multiple
    readonly
  />

  <van-field
    v-if="!isNil(form.a_businessType) && form.a_businessType !== '0'"
    v-show-field="['customizeApprover', includeFields]"
    label="审核人"
    name="customizeApprover"
    :rules="computedRules.customizeApprover"
  >
    <template #input>
      <UserSelect
        v-model="form.customizeApprover"
        multiple
      />
    </template>
  </van-field>

  <van-field-number
    v-model.number="form.a_assessmentAmount"
    v-show-field="['a_assessmentAmount', includeFields]"
    name="a_assessmentAmount"
    label="考核金额（元）"
    placeholder="请输入"
    :rules="computedRules.a_assessmentAmount"
  >
    <template #extra>
      <div v-if="form.a_assessmentAmount">
        <span class="text-red-400">{{ toCnMoney(form.a_assessmentAmount) }}</span>
      </div>
    </template>
  </van-field-number>

  <van-field-number
    v-model.number="form.a_rewardAmount"
    v-show-field="['a_rewardAmount', includeFields]"
    name="a_rewardAmount"
    label="奖励金额（元）"
    placeholder="请输入"
    :rules="computedRules.a_rewardAmount"
  >
    <template #extra>
      <div v-if="form.a_rewardAmount">
        <span class="text-red-400">{{ toCnMoney(form.a_rewardAmount) }}</span>
      </div>
    </template>
  </van-field-number>

  <van-field
    v-show-field="['isSeal', includeFields]"
    label="是否盖章"
    name="isSeal"
    input-align="left"
  >
    <template #input>
      <YesNoSwitch v-model="form.isSeal" />
    </template>
  </van-field>

  <template v-if="needBMJL?.includes(user.info.userId as string)">
    <DictSelect
      v-model="form.a_isAssessment"
      v-show-field="['a_isAssessment', includeFields]"
      label="是否有公司内部考核"
      name="a_isAssessment"
      dict-type="sys_yes_no"
      :rules="computedRules.a_isAssessment"
      :readonly="false"
      @change="onIsAssessmentChange"
    />

    <van-field
      v-if="form.a_isAssessment === 'Y'"
      v-model.trim="form.a_businessKey"
      v-show-field="['a_businessKey', includeFields]"
      label="考核类事务/项目日常考核流程ID"
      name="a_businessKey"
      placeholder="请输入"
      :rules="computedRules.a_businessKey"
      :readonly="false"
    >
      <template #button>
        <van-button
          type="primary"
          :disabled="!form.a_businessKey"
          :loading="loading"
          size="small"
          @click="handleViewBusinessKey(form.a_businessKey)"
        >
          查看
        </van-button>
      </template>
    </van-field>
  </template>

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import type { ContractVO } from '@/api/oa/business/contract/types'
import { useWorkflowHelper, useWorkflowURL } from '@/hooks'
import { useStore } from '@/store'
import { dd } from '@/plugins/dingTalk'
import ContractSelect from '@/views/modules/business/components/ContractSelect.vue'
import SCSelect from '@/views/modules/business/components/SCSelect.vue'

const props = withDefaults(
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
      'a_businessKey',
      'isSeal',
      'reason',
      'ossIdList',
    ],
  },
)

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { user } = useStore()

const { taskDefinitionKey, needBMJL } = useWorkflowHelper()

const { url, loading, isError, msg, fetchWorkflowURL } = useWorkflowURL()

// 表单
const form = inject<Ref<DailyWorkForm>>('form')

// 校验规则
const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 重置字段
const resetFields = inject<(names: KeysOfArray<DailyWorkForm>) => void>('resetFields')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 更新规则
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

function onContractSelectedListChange(selectedList: ContractVO[]) {
  const [contract] = selectedList

  form.value.a_deptId = contract?.deptId
  form.value.a_partyA = contract?.partyA
  form.value.a_contractNo = contract?.no
  form.value.a_businessType = contract?.businessType
  form.value.needDepts = contract?.deptId as string

  // 清空审核人
  resetFields(['customizeApprover'])
}

// 是否公司内部考核修改
function onIsAssessmentChange(value: string) {
  updateRuleRequired('a_businessKey', value === 'Y')

  if (value === 'N') {
    form.value.a_businessKey = undefined
  }
}

// 查看考核类事务/项目日常考核流程ID
async function handleViewBusinessKey(businessKey: string) {
  await fetchWorkflowURL({ businessKey, timestamp: true })

  if (isError.value) {
    return proxy.$modal.msgError(msg.value)
  }

  dd.openLink({ url: url.value })
}

onMounted(() => {
  // 需求部门经理审批时
  if (taskDefinitionKey.value === 'Activity_1p4ss2n' && needBMJL.value?.includes(user.info.userId as string)) {
    // 是否公司内部考核必填
    updateRuleRequired('a_isAssessment', true)
  }
})
</script>
