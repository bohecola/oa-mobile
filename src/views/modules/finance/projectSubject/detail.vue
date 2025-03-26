<template>
  <van-form
    ref="Form"
    v-loading="isLoading && showLoading"
    class="reset-label"
    label-width="auto"
    label-align="top"
    readonly
  >
    <DictSelect
      v-model="form.type"
      v-show-field="['type', includeFields]"
      name="type"
      label="预算类型"
      dict-type="oa_project_subject_type"
    />

    <van-field
      v-model.trim="form.name"
      v-show-field="['name', includeFields]"
      name="name"
      label="名称"
    />

    <van-field
      v-model.trim="form.contractNo"
      v-show-field="['contractNo', includeFields]"
      name="contractNo"
      label="合同编号"
    />

    <DictSelect
      v-if="form.type === 'project'"
      v-model="form.businessType"
      v-show-field="['businessType', includeFields]"
      name="businessType"
      label="业务类型"
      dict-type="oa_project_business_type"
    />

    <van-field
      v-show-field="['startDate', includeFields]"
      :model-value="parseTime(form.startDate, '{y}-{m}-{d}')"
      name="startDate"
      label="开始日期"
    />

    <van-field
      v-show-field="['endDate', includeFields]"
      :model-value="parseTime(form.endDate, '{y}-{m}-{d}')"
      name="endDate"
      label="结束日期"
    />

    <DictSelect
      v-if="['0', '3'].includes(form.businessType)"
      v-model="form.xmbSubjectFeeType"
      v-show-field="['xmbSubjectFeeType', includeFields]"
      name="xmbSubjectFeeType"
      label="项目部可用费用类型"
      dict-type="oa_subject_fee_type_ywl"
      multiple
    />

    <van-field v-show-field="['itemList', includeFields]">
      <template #input>
        <TableCard title="预算科目">
          <BaseTree
            v-model="form.itemList"
            text-key="subjectName"
            tree-line
          >
            <template #default="{ node, stat }">
              <div
                v-if="node.treeType !== 'item'"
                class="flex items-center"
              >
                <OpenIcon
                  v-if="stat.children.length"
                  :open="stat.open"
                  class="fill-[--color]"
                  @click="stat.open = !stat.open"
                />
                <span>{{ node.subjectName }}</span>
              </div>

              <div
                v-else
                class="border px-2 my-2"
              >
                <card-cell
                  label="科目名称"
                  :value="node.subjectName"
                />
                <card-cell
                  label="核算项目"
                  :value="node.sciName"
                />
                <card-cell
                  label="责任部门"
                  :value="node.deptName"
                />
                <card-cell
                  label="预算金额"
                  :value="formatCurrency(node.amount)"
                />
                <card-cell
                  label="期初支出金额"
                  :value="formatCurrency(node.beginAmount)"
                />
                <card-cell
                  label="支出金额"
                  :value="formatCurrency(node.expendAmount)"
                />
                <card-cell
                  label="剩余金额"
                  :value="formatCurrency(node.availableAmount)"
                />
              </div>
            </template>
          </basetree>
        </TableCard>
      </template>
    </van-field>

    <van-field
      v-show-field="['ossIdList', includeFields]"
      name="ossIdList"
      label="附件列表"
    >
      <template #input>
        <UploadFile v-model="form.ossIdList" readonly />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import { BaseTree, OpenIcon } from '@he-tree/vue'
import { useForm } from './form'
import type { ProjectSubjectForm } from '@/api/oa/finance/projectSubject/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<ProjectSubjectForm>
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as KeysOfArray<ProjectSubjectForm>
    },
    showLoading: true,
  },
)

const { Form, form, isLoading, reset, view, viewByDept, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<ProjectSubjectForm>()

defineExpose({
  isLoading,
  reset,
  view,
  viewByDept,
  workflowView,
})
</script>
