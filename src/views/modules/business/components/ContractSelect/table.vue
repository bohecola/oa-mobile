<template>
  <el-table v-loading="loading" :data="data" show-overflow-tooltip>
    <el-table-column label="流程ID" align="left" prop="id" width="180" />
    <el-table-column label="合同编号" align="center" prop="no" width="150" />
    <el-table-column label="名称" align="center" prop="name" min-width="260" />
    <el-table-column label="申请人" align="center" prop="createByName" width="100" />
    <el-table-column label="合同类型" align="center" width="80">
      <template #default="scope">
        <dict-tag :options="oa_contract_type" :value="scope.row.type" />
      </template>
    </el-table-column>
    <el-table-column label="合同类别" align="center" prop="category" width="160">
      <template #default="scope">
        <template v-if="scope.row.type === 'in'">
          <dict-tag :options="oa_contract_category_in" :value="scope.row.category" />
        </template>
        <template v-if="scope.row.type === 'out'">
          <dict-tag :options="oa_contract_category_out" :value="scope.row.category" />
        </template>
        <template v-if="scope.row.type === 'agreement'">
          <dict-tag :options="oa_contract_category_agreement" :value="scope.row.category" />
        </template>
      </template>
    </el-table-column>
    <el-table-column label="合同金额" align="center" prop="amount" width="120">
      <template #default="scope">
        {{ formatCurrency(scope.row.amount) }}
      </template>
    </el-table-column>
    <el-table-column label="需求部门" align="center" prop="deptName" min-width="120" />
    <el-table-column label="开始日期" align="center" prop="startDate" width="100">
      <template #default="scope">
        <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
      </template>
    </el-table-column>
    <el-table-column label="结束日期" align="center" prop="endDate" width="100">
      <template #default="scope">
        <span>{{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}</span>
      </template>
    </el-table-column>
    <el-table-column v-if="!readonly" label="操作" align="center" class-name="small-padding fixed-width" width="150px">
      <template #default="scope">
        <el-tooltip content="移除" placement="top">
          <el-button text type="primary" icon="Remove" @click.stop="handleRemove(scope.row)" />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { ContractVO } from '@/api/oa/business/contract/types'

withDefaults(
  defineProps<{
    data: ContractVO[]
    readonly?: boolean
    loading?: boolean
  }>(),
  {
    readonly: false,
    loading: false,
  },
)

const emit = defineEmits(['remove'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_contract_type } = toRefs(proxy.useDict('oa_contract_type'))
const { oa_contract_category_in } = toRefs(proxy.useDict('oa_contract_category_in'))
const { oa_contract_category_out } = toRefs(proxy.useDict('oa_contract_category_out'))
const { oa_contract_category_agreement } = toRefs(proxy.useDict('oa_contract_category_agreement'))

function handleRemove(row: ContractVO) {
  emit('remove', row)
}
</script>
