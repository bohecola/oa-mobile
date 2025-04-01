<template>
  <DictSelect
    v-model="form.subjectType"
    v-show-field="['subjectType', includeFields]"
    dict-type="oa_project_subject_type"
    label="预算类型"
    name="subjectType"
    component="radio"
    :rules="computedRules.subjectType"
    @change="onSubjectTypeChange"
  />

  <DeptSelect
    v-model="form.deptId"
    v-show-field="['deptId', includeFields]"
    label="需求部门"
    name="deptId"
    :rules="computedRules.deptId"
    @change="onDeptSelectChange"
  />

  <!-- @vue-ignore -->
  <ProjectSubjectSelect
    v-model="form.psId"
    v-model:contract-no="form.contractNo"
    v-show-field="['psId', includeFields]"
    label="预算"
    name="psId"
    :params="{
      type: form.subjectType,
      // 申请部门id：项目预算使用
      projectDeptId: isProject
        ? user.info.deptType === '2'
          ? form?.initiator?.deptId ?? form?.createDept ?? initiatorDeptId
          : undefined
        : form?.initiator?.deptId ?? form?.createDept ?? initiatorDeptId,
      // 需求部门id：部门预算使用
      deptDeptId: !isProject ? form.deptId : undefined,
      status: '5',
    }"
    clearable
    :rules="computedRules.psId"
    @change="onProjectSubjectChange"
  />

  <van-field
    v-if="isProject && !isNil(form.psId)"
    v-model="form.contractNo" v-show-field="['contractNo', includeFields]"
    label="合同编号"
    name="contractNo"
  />

  <van-field
    v-show-field="['amount', includeFields]"
    label="申请总金额"
    name="amount"
  >
    <template #input>
      <div class="flex items-baseline">
        <span class="mr-3">{{ formatCurrency(form.amount) }}</span>
        <span class="text-red-400">{{ toCnMoney(form.amount) }}</span>
      </div>
    </template>
  </van-field>

  <van-field v-show-field="['itemList', includeFields]">
    <template #label>
      <div class="flex justify-between w-full">
        <span>费用明细</span>
        <van-button type="primary" icon="plus" size="small" @click="handleAdd" />
      </div>
    </template>

    <template #input>
      <div class="w-full flex flex-col gap-2">
        <TableCard
          v-for="(item, index) in form.itemList"
          :key="item.id"
          :title="`# ${index + 1}`"
        >
          <template #footer>
            <div class="text-right">
              <van-button
                type="danger"
                icon="delete"
                size="small"
                :disabled="form.itemList.length === 1"
                @click="handleDelete(item, index)"
              />
            </div>
          </template>

          <PurchaseCategorySelect
            v-model="item.subjectItemId"
            v-model:dept-id="item.subjectItemDeptId"
            v-model:amount="item.budgetAmount"
            v-model:applying-amount.v-model:amount="item.applyingAmount"
            v-model:finish-amount.v-model:amount="item.finishAmount"
            v-model:available-amount.v-model:amount="item.availableAmount"
            label="预算科目"
            :name="`itemList.${index}.subjectItemId`"
            :rules="[{
              required: true,
              message: '预算科目不能为空',
              trigger: 'onChange',
            }]"
            :params="PurchaseCategorySelectParams"
            clearable
          />

          <van-field
            :name="`itemList.${index}.budgetAmount`"
            label="预算金额"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].budgetAmount) }}
            </template>
          </van-field>

          <van-field
            :name="`itemList.${index}.applyingAmount`"
            label="申请中"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].applyingAmount) }}
            </template>
          </van-field>

          <van-field
            :name="`itemList.${index}.finishAmount`"
            label="已申请"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].finishAmount) }}
            </template>
          </van-field>

          <van-field
            :name="`itemList.${index}.availableAmount`"
            label="剩余金额"
          >
            <template #input>
              {{ formatCurrency(form.itemList[index].availableAmount) }}
            </template>
          </van-field>

          <van-field-number
            v-model="item.amount"
            label="申请金额（元）"
            :name="`itemList.${index}.amount`"
            :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
            clearable
          />
        </TableCard>
      </div>
    </template>
  </van-field>

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import Big from 'big.js'
import ProjectSubjectSelect from '../../business/components/ProjectSubjectSelect.vue'
import { dailyFeeItem } from '../fee/form'
import BaseUpsert from './BaseUpsert.vue'
import PurchaseCategorySelect from '@/views/modules/business/components/PurchaseCategorySelect.vue'
import type { DailyFeeForm, DailyFeeItemVO } from '@/api/oa/daily/fee/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { useStore } from '@/store'
import { isNumeric } from '@/utils'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyFeeForm>
  }>(),
  {
    includeFields: () => defaultFields,
  },
)

const { user } = useStore()

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const form = inject<Ref<DailyFeeForm>>('form')
const computedRules = inject<Ref<FormRules<DailyFeeForm>>>('computedRules')
const initiatorDeptId = inject<Ref<string | number>>('initiatorDeptId')
const resetFields = inject<(names: KeysOfArray<DailyFeeForm>) => void>('resetFields')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyFeeForm>>('trackFields')
trackFields(props.includeFields.filter(field => defaultFields.includes(field)))

// 指令
const vShowField = createFieldVisibilityDirective<DailyFeeForm>()

const PurchaseCategorySelectParams = computed(() => {
  const psId = form.value.psId
  const applyDeptId = form.value?.initiator?.deptId ?? form.value?.createDept ?? initiatorDeptId.value

  return {
    psId,
    applyDeptId,
  }
})

// 是否是项目预算
const isProject = computed(() => form.value.subjectType === 'project')

function resetSubjectItemId() {
  form.value.itemList.forEach((e) => {
    e.subjectItemId = undefined
    e.subjectItemDeptId = undefined
    e.budgetAmount = undefined
    e.applyingAmount = undefined
    e.finishAmount = undefined
    e.availableAmount = undefined
  })
}

// 新增费用明细
function handleAdd() {
  const { confirm } = proxy.$modal

  confirm('点击确定进行添加数据')
    .then(() => {
      form.value.itemList.push({ ...dailyFeeItem })
    })
    .catch(() => {})
}

// 删除费用明细
function handleDelete(_: DailyFeeItemVO, index: number) {
  const { confirm } = proxy.$modal

  confirm('是否删除这条数据？')
    .then(() => {
      form.value.itemList.splice(index, 1)
    })
    .catch(() => {})
}

// 预算类型修改
function onSubjectTypeChange() {
  resetFields(['deptId', 'psId', 'contractId', 'contractNo'])
  resetSubjectItemId()
}

// 部门修改
function onDeptSelectChange() {
  resetFields(['psId', 'contractId', 'contractNo'])
  resetSubjectItemId()
}

// 预算修改
function onProjectSubjectChange() {
  resetFields(['contractId', 'contractNo'])
  resetSubjectItemId()
}

// 金额计算
watch(
  () => form.value.itemList,
  (val) => {
    const amount = val
      ?.reduce<Big.Big>((acc, curr) => {
        if (isNumeric(curr.amount)) {
          return acc.add(curr.amount)
        }

        return acc.add(0)
      }, Big(0))
      .toNumber()

    form.value.amount = amount
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<script lang="ts">
const defaultFields = [
  'subjectType',
  'deptId',
  'psId',
  'contractNo',
  'itemList',
  'amount',
  'reason',
  'receiptInfo',
  'ossIdList',
] as KeysOfArray<DailyFeeForm>
</script>
