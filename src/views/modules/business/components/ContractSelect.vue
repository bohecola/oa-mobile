<template>
  <span v-if="readonly" class="w-full">
    <!-- 只读 -->
    <template v-if="selectedList.length > 0">
      <!-- 单选回显 -->
      <div v-if="!multiple">
        {{ selectedList[0].name }}
      </div>

      <!-- 多选回显 -->
      <template v-else>
        <div class="py-1 flex flex-wrap gap-1">
          <div
            v-for="selected in selectedList"
            :key="selected.id"
            class="p-1 flex items-center border border-solid text-xs border-[var(--van-border-color)]"
          >
            <span class="w-[30ch] mr-1 text-left">{{ selected.name }}</span>
          </div>
        </div>
      </template>
    </template>
  </span>

  <!-- <div
    v-else
    class="w-full border border-solid border-[var(--van-border-color)] hover:border-[var(--van-border-color-hover)]"
    @click="handleFocusClick"
  >
    <div class="pl-2 flex items-center min-h-8 hover:cursor-text group">
      <template v-if="selectedList.length > 0">

        <div v-if="!multiple" class="text-truncate">
          {{ selectedList[0].name }}
        </div>

        <template v-else>
          <div class="py-1 flex flex-wrap gap-1">
            <div
              v-for="selected in selectedList"
              :key="selected.id"
              class="p-1 flex items-center border border-solid text-xs border-[var(--van-border-color)]"
            >
              <span class="w-15ch mr-1 text-truncate">{{ selected.name }}</span>
              <span v-if="multiple" class="flex mr-1 cursor-pointer opacity-30 hover:opacity-100" @click.stop="removeTag(selected)">
                <el-icon><Close /></el-icon>
              </span>
            </div>
          </div>
        </template>

        <span class="flex-1"></span>
        <span v-if="clearable" class="hidden group-hover:flex mr-2 cursor-pointer opacity-30 hover:opacity-100" @click.stop="handleClear">
          <el-icon><Close /></el-icon>
        </span>
      </template>
      <input v-else :placeholder="placeholder" class="el-input__inner" readonly />
      <span class="flex mr-1 opacity-30">
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <el-dialog v-model="dialogVisible" title="合同选择" width="70%" append-to-body>
      <el-form ref="queryFormRef" :model="queryParams" :inline="true" class="mb-4">
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="queryParams.name" placeholder="请输入名称" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item label="编号" prop="no">
          <el-input v-model.trim="queryParams.no" placeholder="请输入编号" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="tableData">
        <el-table-column label="编号" align="center" prop="no" />
        <el-table-column label="名称" align="center" prop="name" show-overflow-tooltip width="160" />
        <el-table-column label="合同类型" align="center" width="80">
          <template #default="scope">
            <dict-tag :options="oa_contract_type" :value="scope.row.type" />
          </template>
        </el-table-column>
        <el-table-column label="合同类别" align="center" prop="category">
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
            <dict-tag :options="oa_contract_type" :value="scope.row.type" />
          </template>
        </el-table-column>
        <el-table-column label="合同金额" align="center" prop="amount" />
        <el-table-column label="需求部门" align="center" prop="deptName" />
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

        <el-table-column label="选择" align="center" class-name="small-padding fixed-width" width="150px">
          <template #default="scope">
            <el-button
              circle
              :type="`${selectedIdList.includes(scope.row.id) ? 'primary' : ''}`"
              icon="Select"
              :disabled="exclude.includes(scope.row.id)"
              @click.stop="handleSelectClick(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />

      <template v-if="multiple" #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div> -->
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
import { listContract } from '@/api/oa/business/contract'
import type { ContractQuery, ContractVO } from '@/api/oa/business/contract/types'

// 属性
const props = withDefaults(
  defineProps<{
    modelValue: string | number | undefined
    placeholder?: string
    clearable?: boolean
    exclude?: string[]
    multiple?: boolean
    query?: Partial<ContractQuery>
    relationProjectId?: boolean
    readonly?: boolean
  }>(),
  {
    placeholder: '请选择',
    clearable: false,
    multiple: false,
    relationProjectId: false,
    readonly: false,
    exclude: () => [],
    query: () => ({}),
  },
)

// 事件
const emit = defineEmits(['update:modelValue', 'change'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_contract_type } = toRefs(proxy!.useDict('oa_contract_type'))
const { oa_contract_category_in } = toRefs(proxy!.useDict('oa_contract_category_in'))
const { oa_contract_category_out } = toRefs(proxy!.useDict('oa_contract_category_out'))
const { oa_contract_category_agreement } = toRefs(proxy!.useDict('oa_contract_category_agreement'))

// 状态
const dialogVisible = ref(false)
const loading = ref(false)
const tableData = ref<ContractVO[]>([])
const total = ref(0)
const selectedList = ref<ContractVO[]>([])

// 计算属性
const selectedIdList = computed(() => selectedList.value.map(e => e.id))
const selectedIdsStr = computed(() => selectedIdList.value.join(','))

// 引用
const queryFormRef = ref<FormInstance>()

// 参数
const queryParams: ContractQuery = reactive({
  pageNum: 1,
  pageSize: 10,
  no: undefined,
  // 合同类型
  type: undefined,
  name: undefined,
  category: undefined,
  projectId: undefined,
  params: {},
})

// 查询
async function getList() {
  if (props.relationProjectId && (props.query.projectId === undefined || props.query.projectId === null)) {
    tableData.value = []
    total.value = 0
    return
  }
  loading.value = true
  const res = await listContract(Object.assign(queryParams, props.query))
  tableData.value = res.rows
  total.value = res.total
  loading.value = false
}

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

// 点击
function handleFocusClick() {
  dialogVisible.value = true
}

// 选择
function handleSelectClick(row: ContractVO) {
  const index = selectedIdList.value.findIndex(e => e === row.id)
  const isSelected = index !== -1

  // 单选
  if (!props.multiple) {
    selectedList.value = [row]
    confirm()
    // 多选
  }
  else {
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
  dialogVisible.value = false
  emit('update:modelValue', selectedIdsStr.value)
  emit('change', selectedIdsStr.value)
}

// 取消
async function cancel() {
  dialogVisible.value = false

  if (props.modelValue) {
    selectedList.value = await getEchoList()
  }
  else {
    selectedList.value = []
  }
}

// 标签删除
function removeTag(item: ContractVO) {
  const index = selectedIdList.value.findIndex(e => e === item.id)
  const isSelected = index !== -1

  if (isSelected) {
    selectedList.value.splice(index, 1)
    emit('update:modelValue', selectedIdsStr.value)
    emit('change', selectedIdsStr.value)
  }
}

// 清除
function handleClear() {
  const payload = undefined
  emit('update:modelValue', payload)
  emit('change', payload)
}

// 刷新
watch(dialogVisible, (val) => {
  if (val) {
    resetQuery()
  }
})

// 反查回显列表
async function getEchoList() {
  if (props.modelValue) {
    const { rows } = await listContract({
      ids: (props.modelValue as string).split(','),
    })

    return rows ?? []
  }

  return []
}

// 回显
watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      selectedList.value = await getEchoList()
    }
    else {
      selectedList.value = []
    }
  },
  { immediate: true },
)
</script>
