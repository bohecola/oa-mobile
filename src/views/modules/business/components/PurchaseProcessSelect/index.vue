<template>
  <div class="w-full">
    <div class="mb-2">
      <span class="flex justify-between mb-2">
        <span class="text-sm font-bold indent-2">关联采购申请</span>
        <van-button v-if="!readonly" type="primary" class="ml-auto" icon="Plus" plain @click="open"> 新增 </van-button>
      </span>

      <TableView :data="selectedList" :loading="viewLoading" :readonly="readonly" @view="view" @remove="remove" />
    </div>

    <!-- <el-dialog v-model="dialogVisible" title="采购流程选择" width="80%" append-to-body>
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="申请部门" prop="createDept" class="w-[200px]">
          <DeptSelect v-model="queryParams.createDept" clearable />
        </el-form-item>
        <el-form-item label="申请人" prop="createUserName" class="w-[200px]">
          <el-input v-model="queryParams.createUserName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="采购类型" prop="type" class="w-[200px]">
          <dict-select v-model="queryParams.type" :options="oa_purchase_type" clearable />
        </el-form-item>
        <el-form-item label="业务类别" prop="businessCategory" class="w-[200px]">
          <dict-select v-model="queryParams.businessCategory" :options="[...oa_project_business_type, ...oa_purchase_business_type]" clearable />
        </el-form-item>
        <el-form-item label="物品类别" prop="objectCategory" class="w-[200px]">
          <dict-select v-model="queryParams.objectCategory" :options="oa_purchase_object_category" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">
            搜索
          </el-button>
          <el-button icon="Refresh" @click="resetQuery">
            重置
          </el-button>
        </el-form-item>
      </el-form>

      <el-table
        v-loading="loading"
        :data="tableData"
        :row-class-name="(data) => (selectedIdList.includes(data.row.id) ? '!bg-[#ecf5ff] dark:!bg-[#18222c]' : '')"
        @row-click="handleSelect"
      >
        <el-table-column label="申请部门" align="left" prop="createDeptName" min-width="160" />
        <el-table-column label="申请人" align="center" prop="createByName" />
        <el-table-column label="采购类型" align="center" width="120">
          <template #default="scope">
            <dict-tag :options="oa_purchase_type" :value="scope.row.type" />
          </template>
        </el-table-column>
        <el-table-column label="业务类别" align="center" width="80">
          <template #default="scope">
            <dict-tag v-if="scope.row.subjectType === 'project'" :options="oa_project_business_type" :value="scope.row.businessCategory" />
            <dict-tag v-else :options="oa_purchase_business_type" :value="scope.row.businessCategory" />
          </template>
        </el-table-column>
        <el-table-column label="物品类别" align="center" width="120">
          <template #default="scope">
            <dict-tag :options="oa_purchase_object_category" :value="scope.row.objectCategory" />
          </template>
        </el-table-column>
        <el-table-column label="含税总金额" align="center" width="120">
          <template #default="scope">
            {{ formatCurrency(scope.row.amount) }}
          </template>
        </el-table-column>
        <el-table-column label="实际金额" align="center" width="120">
          <template #default="scope">
            {{ formatCurrency(scope.row.realAmount) }}
          </template>
        </el-table-column>
        <el-table-column label="采购说明" align="center">
          <template #default="scope">
            <TextareaView :value="scope.row.description" />
          </template>
        </el-table-column>
        <el-table-column label="申请时间" align="center" width="100">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100">
          <template #default="scope">
            <dict-tag :options="oa_purchase_status" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="选择" align="center" class-name="small-padding fixed-width" width="80px">
          <template #default="scope">
            <el-button
              circle
              icon="Select"
              :type="`${selectedIdList.includes(scope.row.id) ? 'primary' : ''}`"
              @click.stop="handleSelect(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />

      <template v-if="multiple" #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">
            取消
          </el-button>
          <el-button type="primary" :disabled="loading" @click="confirm">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog> -->
  </div>
</template>

<script setup lang="ts">
import { isArray, isEmpty, isNil } from 'lodash-es'
import type { FormInstance } from 'vant'
import TableView from './table.vue'
import type { RouterJumpVo } from '@/api/workflow/workflowCommon/types'
import type { PurchaseQuery, PurchaseVO } from '@/api/oa/business/purchase/types'
import { listPurchase } from '@/api/oa/business/purchase'
import { getActHiProcinstByBusinessKey } from '@/api/workflow/processInstance'
import workflowCommon from '@/api/workflow/workflowCommon'

const props = withDefaults(
  defineProps<{
    modelValue?: string | string[]
    multiple?: boolean
    readonly?: boolean
    limit?: number
  }>(),
  {
    multiple: false,
    readonly: false,
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { oa_purchase_type } = toRefs(proxy.useDict('oa_purchase_type'))
const { oa_project_business_type } = toRefs(proxy.useDict('oa_project_business_type'))
const { oa_purchase_business_type } = toRefs(proxy.useDict('oa_purchase_business_type'))
const { oa_purchase_object_category } = toRefs(proxy.useDict('oa_purchase_object_category'))
const { oa_purchase_status } = toRefs(proxy.useDict('oa_purchase_status'))

const queryFormRef = ref<FormInstance>()
const queryParams = reactive<PurchaseQuery>({
  pageNum: 1,
  pageSize: 10,
  no: undefined,
  projectId: undefined,
  projectName: undefined,
  type: undefined,
  businessCategory: undefined,
  objectCategory: undefined,
  serviceCategory: undefined,
  leaseType: undefined,
  isDeposit: undefined,
  contractId: undefined,
  contractExecute: undefined,
  queryType: undefined,
  status: undefined,
  statusList: [2, 4],
  params: {},
})

const loading = ref(false)
const dialogVisible = ref(false)
const tableData = ref<PurchaseVO[]>([])
const total = ref(0)
const viewLoading = ref(false)

const selectedList = ref<PurchaseVO[]>([])
const selectedIdList = computed(() => selectedList.value.map(item => item.id))

// 搜索
function handleQuery() {
  queryParams.pageNum = 1
  getList()
}

// 重置
function resetQuery() {
  queryFormRef.value?.resetValidation()
  handleQuery()
}

// 打开
function open() {
  dialogVisible.value = true
}

// 查询
async function getList() {
  loading.value = true
  const res = await listPurchase(queryParams)
  tableData.value = res.rows
  total.value = res.total
  loading.value = false
}

// 选择
function handleSelect(row: PurchaseVO) {
  const index = selectedIdList.value.findIndex(e => e === row.id)
  const isSelected = index !== -1

  // 单选
  if (!props.multiple) {
    selectedList.value = [row]
    // 单选完自动确定
    confirm()
  }
  else {
    // 多选
    if (isSelected) {
      selectedList.value.splice(index, 1)
    }
    else {
      selectedList.value.push(row)
    }
  }
}

// 确定
function confirm() {
  if (props.multiple) {
    if (!isNil(props.limit)) {
      if (selectedList.value.length > props.limit) {
        return proxy?.$modal.msgWarning(`最多只能选择${props.limit}个采购流程`)
      }
    }
  }

  const payload = props.multiple ? selectedIdList.value : selectedIdList.value?.[0]
  emit('update:modelValue', payload)
  emit('change', payload)

  dialogVisible.value = false
}

// 取消
async function cancel() {
  dialogVisible.value = false
  selectedList.value = await getEchoList()
}

// 删除
function remove(item: PurchaseVO) {
  const index = selectedIdList.value.findIndex(e => e === item.id)
  const isSelected = index !== -1

  if (isSelected) {
    selectedList.value.splice(index, 1)
    const payload = props.multiple ? selectedIdList.value : selectedIdList.value?.[0]
    emit('update:modelValue', payload)
    emit('change', payload)
  }
}

// 查看
async function view(item: PurchaseVO) {
  proxy.$modal.loading()

  const { data } = await getActHiProcinstByBusinessKey(item.id).finally(() => {
    proxy.$modal.closeLoading()
  })

  const routerJumpVo = reactive<RouterJumpVo>({
    wfDefinitionConfigVo: data.wfDefinitionConfigVo,
    wfNodeConfigVo: data.wfNodeConfigVo,
    businessKey: data.businessKey,
    businessStatus: data.businessStatus,
    taskId: '',
    processInstanceId: data.id,
    type: 'view',
  })
  workflowCommon.routerJump(routerJumpVo, proxy, false)
}

// 清除
function clear() {
  const payload = props.multiple ? [] : undefined

  emit('update:modelValue', payload)
  emit('change', payload)
}

// 反查回显列表
async function getEchoList() {
  if (isEmpty(props.modelValue)) {
    return []
  }

  if (!isEmpty(tableData.value)) {
    return selectedList.value
  }

  viewLoading.value = true

  const { rows } = await listPurchase({
    ids: isArray(props.modelValue) ? props.modelValue : [props.modelValue],
  }).finally(() => (viewLoading.value = false))

  return rows ?? []
}

// 刷新
watch(dialogVisible, (val) => {
  if (val) {
    resetQuery()
  }
})

// 回显
watch(
  () => props.modelValue,
  async () => {
    selectedList.value = await getEchoList()
  },
  {
    immediate: true,
  },
)
</script>
