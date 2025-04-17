<template>
  <van-form
    ref="Form"
    v-loading="isLoading && showLoading"
    label-width="auto"
    label-align="top"
    input-align="left"
    required="auto"
    scroll-to-error
  >
    <van-field
      v-model="form.processName"
      v-show-field="['processName', includeFields]"
      label="流程名称"
      name="processName"
      type="textarea"
      rows="1"
      autosize
      :rules="computedRules.processName"
    />

    <DictSelect
      v-model="form.subjectType"
      v-show-field="['subjectType', includeFields]"
      name="subjectType"
      label="预算类型"
      dict-type="oa_project_subject_type"
      :rules="computedRules.subjectType"
      :disabled="upsertDisabled"
      @change="onSubjectTypeChange"
    />

    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      label="需求部门"
      name="deptId"
      :rules="computedRules.deptId"
      :disabled="upsertDisabled"
      @change="onDeptChange"
    />

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
          ? userStore.info.deptType === '2'
            ? form?.initiator?.deptId ?? form?.createDept ?? initiatorDeptId
            : undefined
          : form?.initiator?.deptId ?? form?.createDept ?? initiatorDeptId,
        // 需求部门id：部门预算使用
        deptDeptId: !isProject ? form.deptId : undefined,
        status: '5',
      }"
      :disabled="upsertDisabled"
      clearable
      :rules="computedRules.psId"
      @change="onPsIdChange"
    />

    <van-field
      v-if="isProject && !isNil(form.psId)"
      v-model="form.contractNo"
      v-show-field="['contractNo', includeFields]"
      label="合同编号"
      name="contractNo"
      readonly
    />

    <DictSelect
      v-if="isProject && !isNil(form.contractNo)"
      v-model="form.contractExecute"
      v-show-field="['contractExecute', includeFields]"
      label="合同执行情况"
      clearable
      name="contractExecute"
      dict-type="oa_contract_execute_situation"
      :rules="computedRules.contractExecute"
    />

    <DictSelect
      v-model="form.type"
      v-show-field="['type', includeFields]"
      label="采购类型"
      name="type"
      dict-type="oa_purchase_type"
      :rules="computedRules.type"
      clearable
      @change="onTypeChange"
    />

    <!-- 项目预算 ? 项目的业务类型 : 采购业务类别 -->
    <DictSelect
      v-model="form.businessCategory"
      v-show-field="['businessCategory', includeFields]"
      label="业务类别"
      name="businessCategory"
      :options="isProject ? oa_project_business_type : oa_purchase_business_type"
      :rules="isProject ? computedRules.serviceCategory : computedRules.businessCategory"
      :disabled="isProject"
      :readonly="isProject"
    />

    <DictSelect
      v-model="form.objectCategory"
      v-show-field="['objectCategory', includeFields]"
      label="物品类别"
      clearable
      name="objectCategory"
      dict-type="oa_purchase_object_category"
      :rules="computedRules.objectCategory"
    />

    <DictSelect
      v-model="form.serviceCategory"
      v-show-field="['serviceCategory', includeFields]"
      label="服务类别"
      name="serviceCategory"
      :options="serviceCategoryOptions"
      placeholder="请选择服务类别"
      clearable
      @change="onServiceCategoryChange"
    />

    <!-- 服务类别为租赁时显示 -->
    <DictSelect
      v-if="form.serviceCategory === '3'"
      v-model="form.leaseType"
      v-show-field="['leaseType', includeFields]"
      label="租赁类型"
      name="leaseType"
      dict-type="oa_purchase_lease_type"
      :rules="computedRules.leaseType"
      clearable
      @change="onLeaseTypeChange"
    />

    <!-- 服务类别为租赁时显示 -->
    <van-field
      v-if="form.serviceCategory === '3'"
      v-show-field="['isDeposit', includeFields]"
      label="是否有押金"
      name="isDeposit"
    >
      <template #input>
        <YesNoSwitch v-model="form.isDeposit" />
      </template>
    </van-field>

    <van-field-number
      v-model.number="form.amount"
      v-show-field="['amount', includeFields]"
      label="含税总金额"
      name="amount"
      :rules="computedRules.amount"
    >
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.amount) }}</span>
          <span class="text-red-400">{{ toCnMoney(form.amount) }}</span>
        </div>
      </template>
    </van-field-number>

    <van-field-number
      v-if="isProject && !isNil(form.psId) && !isYwl"
      v-model.number="form.notTaxAmount"
      v-show-field="['notTaxAmount', includeFields]"
      label="不含税总金额"
      name="notTaxAmount"
      :rules="computedRules.notTaxAmount"
    >
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.notTaxAmount) }}</span>
          <span class="text-red-400">{{ toCnMoney(form.notTaxAmount) }}</span>
        </div>
      </template>
    </van-field-number>

    <van-field-number
      v-model.number="form.realAmount"
      v-show-field="['realAmount', includeFields]"
      label="含税实际总金额"
      name="realAmount"
    >
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.realAmount) }} </span>
          <span class="text-red-400">{{ toCnMoney(form.realAmount) }}</span>
        </div>
      </template>
    </van-field-number>

    <van-field-number
      v-if="!isYwl && isProject"
      v-model.number="form.notTaxRealAmount"
      v-show-field="['notTaxRealAmount', includeFields]"
      label="不含税实际总金额"
      name="notTaxRealAmount"
    >
      <template #input>
        <div class="flex items-baseline">
          <span class="mr-3">{{ formatCurrency(form.notTaxRealAmount) }} </span>
          <span class="text-red-400">{{ toCnMoney(form.notTaxRealAmount) }}</span>
        </div>
      </template>
    </van-field-number>

    <van-field
      v-show-field="['isOwnerSettlement', includeFields]"
      label="是否业主单独结算"
      name="isOwnerSettlement"
    >
      <template #input>
        <YesNoSwitch v-model="form.isOwnerSettlement" />
      </template>
    </van-field>

    <van-field
      v-model="form.description"
      v-show-field="['description', includeFields]"
      label="采购说明"
      placeholder="请输入"
      name="description"
      type="textarea"
      rows="1"
      autosize
      :rules="computedRules.description"
    />

    <van-field
      v-model="form.remark"
      v-show-field="['remark', includeFields]"
      label="备注"
      placeholder="请输入"
      name="remark"
      type="textarea"
      rows="1"
      autosize
    />

    <van-field v-show-field="['itemList', includeFields]">
      <template #label>
        <span class=" text-red-400 mr-1">*</span>
        <span>采购清单</span>
      </template>

      <template #input>
        <div class="w-full flex flex-col gap-2">
          <TableCard
            v-for="(item, index) in form.itemList"
            :key="index"
            :ref="(el) => (TableCardRefs[index] = (el as TableCardType))"
            :default-collapse="index !== 0"
            :title="item.name"
            @click="TableCardRefs.filter(e => e !== TableCardRefs[index]).forEach(e => e.collapse())"
          >
            <PurchaseCategorySelect
              v-model="item.psiId"
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
              :disabled="disabledColumn"
              :readonly="disabledColumn"
            />

            <van-field
              :name="`itemList.${index}.budgetAmount`"
              label="预算金额"
            >
              <template #input>
                {{ formatCurrency(item.budgetAmount) }}
              </template>
            </van-field>
            <van-field
              :name="`itemList.${index}.applyingAmount`"
              label="申请中"
            >
              <template #input>
                {{ formatCurrency(item.applyingAmount) }}
              </template>
            </van-field>
            <van-field
              :name="`itemList.${index}.finishAmount`"
              label="已申请"
            >
              <template #input>
                {{ formatCurrency(item.finishAmount) }}
              </template>
            </van-field>
            <van-field
              :name="`itemList.${index}.availableAmount`"
              label="剩余金额"
            >
              <template #input>
                {{ formatCurrency(item.availableAmount) }}
              </template>
            </van-field>
            <van-field
              v-model.trim="item.name"
              :name="`itemList.${index}.name`"
              label="物品名称"
              placeholder="请输入"
              :maxlength="100"
              :disabled="disabledColumn"
              :rules="[{ required: true, message: '物品名称不能为空', trigger: 'onBlur' }]"
            />
            <van-field
              v-model.trim="item.brand"
              :name="`itemList.${index}.brand`"
              label="品牌"
              placeholder="请输入"
              :maxlength="100"
              :disabled="disabledColumn"
            />
            <van-field
              v-model.trim="item.specsModel"
              :name="`itemList.${index}.specsModel`"
              label="规格型号"
              placeholder="请输入"
              :maxlength="100"
              :disabled="disabledColumn"
            />
            <van-field
              v-model="item.unit"
              :name="`itemList.${index}.unit`"
              label="单位"
              placeholder="请输入"
              :maxlength="10"
              :disabled="disabledColumn"
              :rules="[{ required: true, message: '单位不能为空', trigger: 'onBlur' }]"
            />
            <van-field-number
              v-model.number="item.num"
              :name="`itemList.${index}.num`"
              label="数量"
              type="digit"
              placeholder="请输入"
              :disabled="disabledColumn"
              :rules="[{ required: true, message: '数量不能为空', trigger: 'onBlur' }]"
            />
            <DictSelect
              v-if="!isYwl && isProject"
              v-model="item.invoiceType"
              label="发票类型"
              :name="`itemList.${index}.invoiceType`"
              :options="oa_purchase_invoice_type"
              :rules="[{ required: true, message: '发票类型不能为空', trigger: 'onChange' }]"
              :disabled="disabledColumn"
              @change="
                (val) => {
                  if (val === '0') {
                    item.taxRate = '0';
                  }
                }
              "
            />

            <DictSelect
              v-if="!isYwl && isProject"
              v-model="item.taxRate"
              label="税率(%)"
              :name="`itemList.${index}.taxRate`"
              :options="oa_contract_tax_rate"
              :rules="[{ required: true, message: '税率不能为空', trigger: 'onChange' }]"
              :disabled="disabledColumn || item.invoiceType === '0'"
            />

            <van-field-number
              v-model.number="item.taxAmount"
              :name="`itemList.${index}.taxAmount`"
              label="含税单价(元)"
              placeholder="请输入"
              :disabled="disabledColumn"
              :rules="[{ required: true, message: '含税单价(元)不能为空', trigger: 'onBlur' }]"
            />

            <van-field-number
              v-if="!isYwl && isProject"
              v-model.number="item.amount"
              :name="`itemList.${index}.amount`"
              label="不含税单价(元)"
              placeholder="自动计算"
              disabled
            >
              <template #input>
                {{ formatCurrency(item.amount) }}
              </template>
            </van-field-number>

            <van-field-number
              v-if="includeFields.includes('realAmount')"
              v-model.number="item.taxRealAmount"
              :name="`itemList.${index}.taxRealAmount`"
              label="含税实际单价(元)"
              :rules="[{ required: taxRealAmountRequired, message: '含税实际单价不能为空', trigger: 'onBlur' }]"
            />

            <van-field-number
              v-if="includeFields.includes('notTaxRealAmount') && !isYwl && isProject"
              v-model.number="item.realAmount"
              :name="`itemList.${index}.realAmount`"
              label="不含税实际单价(元)"
              placeholder="自动计算"
              disabled
            >
              <template #input>
                {{ formatCurrency(item.realAmount) }}
              </template>
            </van-field-number>

            <van-field-number
              :name="`itemList.${index}.taxTotalAmount`"
              label="含税合计(元)"
              placeholder="自动求和"
              disabled
            >
              <template #input>
                {{ formatCurrency(item.taxTotalAmount) }}
              </template>
            </van-field-number>
            <van-field-number
              v-if="!isYwl && isProject"
              :name="`itemList.${index}.totalAmount`"
              label="不含税合计(元)"
              placeholder="自动求和"
              disabled
            >
              <template #input>
                {{ formatCurrency(item.totalAmount) }}
              </template>
            </van-field-number>
            <van-field-number
              v-if="includeFields.includes('realAmount')"
              :name="`itemList.${index}.taxRealTotalAmount`"
              label="含税实际合计(元)"
              placeholder="自动求和"
              disabled
            >
              <template #input>
                {{ formatCurrency(item.taxRealTotalAmount) }}
              </template>
            </van-field-number>
            <van-field-number
              v-if="includeFields.includes('notTaxRealAmount') && !isYwl && isProject"
              :name="`itemList.${index}.realTotalAmount`"
              label="不含税实际合计(元)"
              placeholder="自动求和"
              disabled
            >
              <template #input>
                {{ formatCurrency(item.realTotalAmount) }}
              </template>
            </van-field-number>
            <van-field
              v-model="item.inquiryWay"
              :name="`itemList.${index}.inquiryWay`"
              label="询价途径"
              type="textarea"
              rows="1"
              autosize
              placeholder="请输入"
              :maxlength="1000"
              :disabled="disabledColumn"
            />
            <van-field
              v-model="item.supplier"
              :name="`itemList.${index}.supplier`"
              label="指定供应商"
              type="textarea"
              rows="1"
              autosize
              placeholder="请输入"
              :maxlength="50"
              :disabled="disabledColumn"
            />
            <van-field
              v-model="item.remark"
              :name="`itemList.${index}.remark`"
              type="textarea"
              label="备注"
              placeholder="请输入"
              rows="1"
              autosize
              :maxlength="255"
              :disabled="disabledColumn"
            />

            <template v-if="!disabledColumn" #footer>
              <div class="text-right">
                <van-button
                  v-if="form.itemList.length - 1 === index"
                  type="primary"
                  icon="plus"
                  size="small"
                  @click="handleAdd"
                />
                <van-button
                  class="ml-2"
                  type="danger"
                  icon="delete"
                  size="small"
                  :disabled="form.itemList.length === 1"
                  @click="handleRemove(item, index)"
                />
              </div>
            </template>
          </TableCard>
        </div>
      </template>
    </van-field>

    <van-field
      v-show-field="['checkFiles', includeFields]"
      label="验收附件"
      name="checkFiles"
      :rules="computedRules.checkFiles"
    >
      <template #input>
        <div class="flex flex-col">
          <UploadFile v-model="form.checkFiles" :exclude="excludeCheckFiles" />
          <div class="text-red-400">
            验收附件上传说明：1.通过采购部采购的需要上传收货确认单及全部物资照片 2.自行采购需要上传网络订单截图(线上)/店内销售清单(线下)及全部物资照片
            [注：照片必需带时间、地点(水印相机拍照)]
          </div>
        </div>
      </template>
    </van-field>

    <!-- 附件列表 -->
    <van-field
      v-show-field="['ossIdList', includeFields]"
      name="ossIdList"
      placeholder="请选择"
      :rules="computedRules.ossIdList"
    >
      <template #label>
        <span>附件列表</span><span class=" text-gray-400">（请上传申购内容附件）</span>
      </template>
      <template #input>
        <UploadFile v-model="form.ossIdList" value-type="array" :exclude="excludeOssIdList" />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import Big from 'big.js'
import { isEmpty, isNil, isNumber } from 'lodash-es'
import type { FieldRule } from 'vant'
import ProjectSubjectSelect from '../components/ProjectSubjectSelect.vue'
import PurchaseCategorySelect from '../components/PurchaseCategorySelect.vue'
import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { getBusinessTypeByPsId } from '@/api/oa/business/project'
import type { PurchaseForm, PurchaseItemVO } from '@/api/oa/business/purchase/types'
import { useUserStore } from '@/store/user'
import { isNumeric } from '@/utils'
import TableCard from '@/components/TableCard/index.vue'

type TableCardType = InstanceType<typeof TableCard>

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<PurchaseForm>
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as KeysOfArray<PurchaseForm>
    },
    showLoading: true,
  },
)

const userStore = useUserStore()

const taskDefinitionKey = inject<Ref<string>>('taskDefinitionKey', ref(undefined))
const initiatorDeptId = inject<Ref<any>>('initiatorDeptId')

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const TableCardRefs = ref<TableCardType[]>([])

// 采购-业务类别、项目-业务类别、服务类别、发票类型、税率
const { oa_purchase_business_type, oa_project_business_type, oa_purchase_service_category, oa_purchase_invoice_type, oa_contract_tax_rate } = toRefs(
  proxy.useDict(
    'oa_purchase_business_type',
    'oa_project_business_type',
    'oa_purchase_service_category',
    'oa_purchase_invoice_type',
    'oa_contract_tax_rate',
  ),
)

// 表单
const {
  Form,
  form,
  rules,
  isLoading,
  updateLoading,
  purchaseItem,
  excludeCheckFiles,
  excludeOssIdList,
  reset,
  resetFields,
  view,
  submit,
  workflowSubmit,
  workflowView,
} = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<PurchaseForm>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<PurchaseForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }

  // 业务中修改不校验验收附件
  if (isNil(taskDefinitionKey.value)) {
    (newRules.checkFiles as Array<FieldRule>).forEach((e: FieldRule) => (e.required = false))
  }

  return newRules
})

// 禁用列
const disabledColumn = computed(() => {
  if (!isNil(form.value.id) && isNil(taskDefinitionKey.value)) {
    return true
  }

  return ['Activity_0x4xddm', 'Activity_0qbyt2w'].includes(taskDefinitionKey.value)
})

// 是否是项目预算
const isProject = computed(() => form.value.subjectType === 'project')
// 是否是部门预算
const isDept = computed(() => form.value.subjectType === 'dept')
// 业务类型为运维类
const isYwl = computed(() => isProject.value && ['0', '3'].includes(form.value.businessCategory))
// 服务类别选项
const serviceCategoryOptions = computed(() => {
  if (form.value.type === '1') {
    return oa_purchase_service_category.value
  }
  return oa_purchase_service_category.value.filter(e => e.value !== '3')
})

// 预算科目查询条件
const PurchaseCategorySelectParams = computed(() => {
  const psId = form.value.psId
  const applyDeptId = (form.value as any)?.initiator?.deptId ?? form.value?.createDept ?? initiatorDeptId.value

  return {
    psId,
    applyDeptId,
  }
})

// 含税实际金额是否必填
const taxRealAmountRequired = computed(() => {
  if (props.includeFields.includes('realAmount')) {
    if (taskDefinitionKey.value === 'Activity_0x4xddm') {
      return true
    }
    return false
  }
  else {
    return false
  }
})

// 业务编辑时禁用
const upsertDisabled = computed(() => !isNil(form.value.id) && isNil(taskDefinitionKey.value))

function resetPS() {
  resetFields(['psId', 'contractId', 'contractNo', 'contractExecute', 'businessCategory'])
  form.value.contractNo = undefined
  setItemList({
    psiId: undefined,
    subjectItemDeptId: undefined,
    budgetAmount: undefined,
    applyingAmount: undefined,
    finishAmount: undefined,
    availableAmount: undefined,
  });
  (rules.value.contractId as Array<FieldRule>).forEach(e => (e.required = false))
  // (rules.value.contractExecute as Array<FieldRule>).forEach((e) => (e.required = false));
}

// 预算类型切换
function onSubjectTypeChange() {
  resetPS()
}

// 需求部门切换
function onDeptChange() {
  resetPS()
}

// 预算选择
async function onPsIdChange(val: string) {
  resetFields(['businessCategory', 'contractId', 'contractNo', 'contractExecute'])
  setItemList({ psiId: undefined })

  if (isEmpty(val)) {
    (rules.value.contractId as Array<FieldRule>).forEach(e => (e.required = false))
    // (rules.value.contractExecute as Array<FieldRule>).forEach((e) => (e.required = false));
  }
  else {
    // 项目预算
    if (isProject.value) {
      (rules.value.contractId as Array<FieldRule>).forEach(e => (e.required = true))
      // 根据预算查询项目的业务类型
      const { msg } = await getBusinessTypeByPsId(val)
      form.value.businessCategory = msg
    }
    else {
      // 部门预算
      resetFields(['serviceCategory', 'leaseType', 'isDeposit'])
    }
  }
}

// 采购类型选择
function onTypeChange(_?: string) {
  resetFields(['serviceCategory', 'leaseType', 'isDeposit'])
}

// 服务类别选择
function onServiceCategoryChange(val?: string) {
  // 不是租赁时，重置租赁类型、押金
  if (val !== '3') {
    resetFields(['leaseType', 'isDeposit'])
  }
}

// 租赁类型选择
function onLeaseTypeChange(val?: string) {
  // 车辆租赁时，采购说明赋值默认值
  if (val === '1') {
    form.value.description
      = '使用责任人：\n租车用途：\n用车详细地点：\n车辆品牌及型号：\n租赁开始日期：\n租赁结束日期：\n用油方式：（现金加油或申请加油卡）'
  }
}

// 新增采购清单
function handleAdd() {
  if (!isYwl.value && isProject.value) {
    form.value.itemList.push({ ...purchaseItem })
  }
  else {
    form.value.itemList.push({ ...purchaseItem, invoiceType: '0', taxRate: '0' })
  }
}

// 更新采购清单数据
function setItemList(obj: Partial<PurchaseItemVO>) {
  form.value.itemList.forEach((item) => {
    for (const [key, value] of Object.entries(obj)) {
      item[key] = value
    }
  })
}

// 空键检查
function isAllKeyNil(list: PurchaseItemVO[], key: keyof PurchaseItemVO) {
  return list.every(e => isNil(e[key]))
}

// 总金额计算
function sumTotalMoney(list: PurchaseItemVO[], key: keyof PurchaseItemVO) {
  const value = list.reduce<Big.Big>((prev, curr) => {
    if (isNumber(curr[key])) {
      return prev.add(Big(curr[key]))
    }
    return prev.add(0)
  }, Big(0))

  return value.toNumber()
}

// 采购清单监听
watch(
  () => form.value.itemList,
  (val) => {
    // 单项合计
    val.forEach((item) => {
      // 数量、含税单价为空
      if (!isNumeric(item.num) || !isNumeric(item.taxAmount)) {
        item.amount = undefined
        item.taxTotalAmount = undefined
        item.totalAmount = undefined
        return
      }
      // 含税合计
      item.taxTotalAmount = Big(item.taxAmount).times(item.num).toNumber()

      // 税率为空
      if (!isNumeric(item.taxRate)) {
        item.amount = undefined
        return
      }
      // 不含税单价
      item.amount = Big(item.taxAmount)
        .div(Big(1).add(Big(item.taxRate).div(100)))
        .toNumber()

      // 不含税单价为空
      if (!isNumeric(item.amount)) {
        return
      }
      // 不含税合计
      item.totalAmount = Big(item.amount).times(item.num).toNumber()

      // 含税实际单价为空
      if (!isNumeric(item.taxRealAmount)) {
        item.realAmount = undefined
        item.taxRealTotalAmount = undefined
        item.realTotalAmount = undefined
        return
      }

      // 不含税实际单价
      item.realAmount = Big(item.taxRealAmount)
        .div(Big(1).add(Big(item.taxRate).div(100)))
        .toNumber()

      // 含税实际合计
      item.taxRealTotalAmount = Big(item.taxRealAmount).times(item.num).toNumber()
      // 不含税实际合计
      item.realTotalAmount = Big(item.realAmount).times(item.num).toNumber()
    })

    // 含税总金额合计
    const amount = sumTotalMoney(val, 'taxTotalAmount')
    form.value.amount = amount

    // 不含税总金额合计
    const notTaxAmount = sumTotalMoney(val, 'totalAmount')
    form.value.notTaxAmount = notTaxAmount

    // 含税实际总金额
    const realAmount = isAllKeyNil(val, 'taxRealTotalAmount') ? undefined : sumTotalMoney(val, 'taxRealTotalAmount')
    form.value.realAmount = realAmount

    // 不含税实际总金额
    const notTaxRealAmount = isAllKeyNil(val, 'realTotalAmount') ? undefined : sumTotalMoney(val, 'realTotalAmount')
    form.value.notTaxRealAmount = notTaxRealAmount
  },
  {
    deep: true,
    immediate: true,
  },
)

// 采购清单删除
function handleRemove(_: any, index: number) {
  const { confirm } = proxy.$modal

  confirm('是否删除这条数据？')
    .then(() => {
      form.value.itemList.splice(index, 1)
    })
    .catch(() => {})
}

watch([isYwl, isDept], ([isYwlVal, isDeptVal]) => {
  if (isYwlVal || isDeptVal) {
    setItemList({
      invoiceType: '0',
      taxRate: '0',
    })
  }
})

defineExpose({
  updateLoading,
  isLoading,
  form,
  reset,
  view,
  submit,
  workflowSubmit,
  workflowView,
})
</script>
