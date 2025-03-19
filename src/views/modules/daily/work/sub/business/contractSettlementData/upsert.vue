<template>
  <van-field
    v-model="form.customizeApprover"
    v-show-field="['customizeApprover', includeFields]"
    is-link
    label="审核人"
    name="customizeApprover"
    :rules="computedRules.customizeApprover"
    @click="UserSelectRef?.open"
  >
    <template #input>
      <UserSelect
        ref="UserSelectRef"
        v-model="form.customizeApprover"
      />
    </template>
  </van-field>

  <van-field
    v-show-field="['customizeTransactor', includeFields]"
    label="办理人"
    name="customizeTransactor"
    :rules="computedRules.customizeTransactor"
  >
    <template #input>
      <UserSelect v-model="form.customizeTransactor" />
    </template>
  </van-field>

  <DictSelect
    v-model="form.fileType"
    v-show-field="['fileType', includeFields]"
    label="资料类型"
    name="fileType"
    dict-type="oa_file_type"
    :multiple="true"
    :rules="computedRules.fileType"
  />

  <van-field
    v-show-field="['isSeal', includeFields]"
    label="是否加盖公章"
    name="isSeal"
    :rules="computedRules.isSeal"
  >
    <template #input>
      <YesNoSwitch v-model="form.isSeal" />
    </template>
  </van-field>

  <van-field
    v-model.trim="form.mm_contractSettlementNature"
    v-show-field="['mm_contractSettlementNature', includeFields]"
    label="合同结算性质"
    type="textarea"
    rows="1"
    autosize
    placeholder="请输入预付款、进场费、月结款、季度款、半年款、进度款、验收款、质保金、考核预留款、全款、奖励款、其他"
    name="mm_contractSettlementNature"
    :rules="computedRules.mm_contractSettlementNature"
  />

  <van-field
    v-model.trim="form.mm_contractSettlementcontent"
    v-show-field="['mm_contractSettlementcontent', includeFields]"
    label="合同结算资料内容"
    placeholder="请输入运维报告、验收单、结算单、其他"
    name="mm_contractSettlementcontent"
    :rules="computedRules.mm_contractSettlementcontent"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import UserSelect from '@/components/UserSelect/index.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { useUserStore } from '@/store/user'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['customizeApprover', 'fileType', 'isSeal', 'mm_contractSettlementNature', 'mm_contractSettlementcontent', 'reason', 'ossIdList'],
  },
)

const userStore = useUserStore()

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')

// 自定义办理人节点特殊处理：不是办理人节点不收集 customizeTransactor
const tractFieldsArr
  = form.value.customizeApprover && userStore.info.userId === form.value.customizeApprover
    ? props.includeFields
    : props.includeFields.filter(field => field !== 'customizeTransactor')

trackFields(tractFieldsArr)

const UserSelectRef = ref<InstanceType<typeof UserSelect> | null>()
</script>
