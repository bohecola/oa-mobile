<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" :model="form" label-width="8em" readonly>
    <van-cell-group inset class="!my-3">
      <van-field v-model="form.type" v-show-field="['type', includeFields]" name="type" label="预算类型" input-align="right">
        <template #input>
          <DictSelect v-model="form.type" dict-type="oa_project_subject_type" readonly />
        </template>
      </van-field>
      <van-field v-model="form.name" v-show-field="['name', includeFields]" name="name" label="名称" input-align="right" />
      <van-field v-model="form.contractNo" v-show-field="['contractNo', includeFields]" name="contractNo" label="合同编号" input-align="right" />
      <van-field v-model="form.startDate" v-show-field="['startDate', includeFields]" name="startDate" label="开始日期" input-align="right">
        <template #input>
          {{ parseTime(form.startDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>
      <van-field v-model="form.endDate" v-show-field="['endDate', includeFields]" name="endDate" label="结束日期" input-align="right">
        <template #input>
          {{ parseTime(form.endDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>
    </van-cell-group>

    <div v-show-field="['itemList', includeFields]">
      <TableCard title="预算科目" class="mx-4 mb-2">
        <BaseTree v-model="form.itemList" text-key="subjectName" tree-line>
          <template #default="{ node, stat }">
            <div v-if="node.treeType !== 'item'" class="flex items-center">
              <OpenIcon
                v-if="stat.children.length"
                :open="stat.open"
                class="fill-[--color]"
                @click="stat.open = !stat.open"
              />
              <span>{{ node.subjectName }}</span>
            </div>

            <div v-else class="border px-2 my-2">
              <card-cell label="科目名称" :value="node.subjectName" />
              <card-cell label="核算项目" :value="node.sciName" />
              <card-cell label="责任部门" :value="node.deptName" />
              <card-cell label="预算金额" :value="node.amount" />
              <card-cell label="期初金额" :value="node.beginAmount" />
              <card-cell label="支出金额" :value="node.expendAmount" />
              <card-cell label="剩余金额" :value="node.availableAmount" />
            </div>
          </template>
        </basetree>
      </TableCard>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { BaseTree, OpenIcon } from '@he-tree/vue'
import { useForm } from './form'
import type { ProjectSubjectForm } from '@/api/oa/finance/projectSubject/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import '@he-tree/vue/style/default.css'
// import '@he-tree/vue/style/material-design.css'

withDefaults(
  defineProps<{
    includeFields?: (keyof ProjectSubjectForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof ProjectSubjectForm)[]
    },
    showLoading: true,
  },
)

const { Form, form, isLoading, reset, view, viewByDept, workflowView } = useForm()

const Table = ref()

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
