<template>
  <DeptSelect
    v-model="form.needDepts"
    v-show-field="['needDepts', includeFields]"
    name="needDepts"
    label="原部门"
    :rules="computedRules.needDepts"
    :params="{
      companyId: form.companyId,
    }"
    :data-config="{
      disabledKey: 'deptId',
      disabledValue: form.u_newDeptId,
      disabled: true,
    }"
    clearable
    @change="onNeedDeptsChange"
  />

  <DictSelect
    v-model="form.u_carNumber"
    v-show-field="['u_carNumber', includeFields]"
    name="u_carNumber"
    label="车牌号"
    :rules="computedRules.u_carNumber"
    :options="carNumberOptions"
    clearable
    @update:items="onCarNumberItemsChange"
  />

  <van-field
    v-if="!isNil(form.u_vinNo)"
    :model-value="form.u_vinNo"
    name="u_vinNo"
    label="车架号"
    readonly
  />

  <CompanySelect
    v-model="form.u_newCompanyId"
    v-show-field="['u_newCompanyId', includeFields]"
    name="u_newCompanyId"
    label="新公司"
    :rules="computedRules.u_newCompanyId"
  />

  <DeptSelect
    v-model="form.u_newDeptId"
    v-show-field="['u_newDeptId', includeFields]"
    name="u_newDeptId"
    label="新部门"
    :rules="computedRules.u_newDeptId"
    :params="{
      companyId: form.u_newCompanyId,
    }"
    :data-config="{
      disabledKey: 'deptId',
      disabledValue: form.needDepts,
      disabled: true,
    }"
  />

  <van-field
    v-model="form.recipient"
    v-show-field="['recipient', includeFields]"
    name="recipient"
    label="接收人"
    :rules="computedRules.recipient"
    is-link
    @click="UserSelectRef?.open"
  >
    <template #input>
      <UserSelect ref="UserSelectRef" v-model="form.recipient" />
    </template>
  </van-field>

  <van-field
    v-show-field="['isExistRegulations', includeFields]"
    label="是否存在违章"
    name="isExistRegulations"
    :rules="computedRules.isExistRegulations"
  >
    <template #input>
      <YesNoSwitch v-model="form.isExistRegulations" />
    </template>
  </van-field>

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import UserSelect from '@/components/UserSelect/index.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import type { CarInfoVO } from '@/api/oa/car/carInfo/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { useCarNumberOptions } from '@/hooks'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => [
      'needDepts',
      'u_carNumber',
      'u_vinNo',
      'u_newCompanyId',
      'u_newDeptId',
      'recipient',
      'isExistRegulations',
      'reason',
      'ossIdList',
    ],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

const UserSelectRef = ref<InstanceType<typeof UserSelect>>()

const { options: carNumberOptions, fetch: fetchCarNumberOptions } = useCarNumberOptions({ initFetch: false })

function onNeedDeptsChange(deptId: string) {
  form.value.u_carNumber = undefined
  form.value.u_vinNo = undefined
  carNumberOptions.value = []

  if (!isNil(deptId)) {
    fetchCarNumberOptions({ deptId })
  }
}

function onCarNumberItemsChange([car]: CarInfoVO[]) {
  form.value.u_vinNo = car?.vinNo
}

onMounted(() => {
  if (!isNil(form.value.needDepts)) {
    fetchCarNumberOptions({ deptId: form.value.needDepts })
  }
})
</script>
