<!-- <template>
  <el-dialog v-model="dialogVisible" title="合同选择" width="80%" append-to-body>
    <el-form ref="queryFormRef" :model="queryParams" :inline="true" class="mb-4">
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="queryParams.name" placeholder="请输入名称" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="编号" prop="no">
        <el-input v-model.trim="queryParams.no" placeholder="请输入编号" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="状态" props="status">
        <dict-select v-model="queryParams.status" clearable dict-type="oa_contract_status" />
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

    <el-table v-loading="loading" :data="tableData" show-overflow-tooltip>
      <el-table-column label="编号" align="center" prop="no" width="150" />
      <el-table-column label="名称" align="center" prop="name" min-width="260" />
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
      <el-table-column label="项目类别" align="center" prop="category" width="160">
        <template #default="scope">
          <dict-tag :options="oa_project_business_type" :value="scope.row.businessType" />
        </template>
      </el-table-column>
      <el-table-column label="需求部门" align="center" prop="deptName" min-width="160" />
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
      <el-table-column label="状态" align="center" width="80">
        <template #default="scope">
          <dict-tag :options="oa_contract_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="选择" align="center" class-name="small-padding fixed-width" width="100px">
        <template #default="scope">
          <el-button
            circle
            :type="`${selectedIdList.includes(scope.row.id) ? 'primary' : ''}`"
            icon="Select"
            :disabled="exclude.includes(scope.row.id)"
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
  </el-dialog>
</template> -->

<script setup lang="ts">
import { cloneDeep, isEmpty } from 'lodash-es'
import type { FormInstance } from 'vant'
import { listContract, noRelListContract } from '@/api/oa/business/contract'
import type { ContractQuery, ContractVO } from '@/api/oa/business/contract/types'

// 属性
const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    multiple?: boolean
    exclude?: string[]
    params?: Partial<ContractQuery>
    relatedProjectId?: boolean
    isNoRelList?: boolean
  }>(),
  {
    multiple: false,
    exclude: () => [],
    params: () => ({}),
    relatedProjectId: false,
    isNoRelList: false,
  },
)

// 事件
const emit = defineEmits(['update:modelValue', 'change'])

// const { proxy } = getCurrentInstance() as ComponentInternalInstance
// const { oa_contract_type } = toRefs(proxy.useDict('oa_contract_type'))
// const { oa_contract_category_in } = toRefs(proxy.useDict('oa_contract_category_in'))
// const { oa_contract_category_out } = toRefs(proxy.useDict('oa_contract_category_out'))
// const { oa_contract_category_agreement } = toRefs(proxy.useDict('oa_contract_category_agreement'))
// const { oa_contract_status } = toRefs(proxy.useDict('oa_contract_status'))
// const { oa_project_business_type } = toRefs(proxy.useDict('oa_project_business_type'))

// 状态
const dialogVisible = ref(false)
const loading = ref(false)
const tableData = ref<ContractVO[]>([])
const total = ref(0)
const selectedList = ref<ContractVO[]>([])

const viewLoading = ref(false)

// 计算属性
const selectedIdList = computed(() => selectedList.value.map(e => e.id))
const selectedIdsStr = computed(() => selectedIdList.value.join(','))

// 引用
const queryFormRef = ref<FormInstance>()

const initailQueryParams = {
  pageNum: 1,
  pageSize: 10,
  no: undefined,
  type: undefined,
  name: undefined,
  category: undefined,
  projectId: undefined,
  status: undefined,
  statusList: [2, 3, 4],
  params: {},
}

// 参数
const queryParams: ContractQuery = reactive({ ...initailQueryParams })

// 查询
async function getList() {
  if (props.relatedProjectId && isEmpty(props.params.projectId)) {
    tableData.value = []
    total.value = 0
    return
  }

  loading.value = true

  if (!props.isNoRelList) {
    const res = await listContract(Object.assign(queryParams, props.params))
    tableData.value = res.rows
    total.value = res.total
  }
  else {
    const params = cloneDeep(queryParams)
    delete params.pageNum
    delete params.pageSize
    // 查询没有绑定项目的合同
    const { data } = await noRelListContract(params)
    tableData.value = data
  }

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
  Object.assign(queryParams, initailQueryParams)
  handleQuery()
}

// // 选择
// function handleSelect(row: ContractVO) {
//   const index = selectedIdList.value.findIndex(e => e === row.id)
//   const isSelected = index !== -1

//   // 单选
//   if (!props.multiple) {
//     selectedList.value = [row]
//     // 单选完自动确定
//     confirm()
//   }
//   else {
//     // 多选
//     if (isSelected) {
//       selectedList.value.splice(index, 1)
//     }
//     else {
//       selectedList.value.push(row)
//     }
//   }
// }

// // 确定
// function confirm() {
//   dialogVisible.value = false
//   const payload = selectedIdsStr.value
//   emit('update:modelValue', payload)
//   emit('change', payload)
// }

// // 取消
// async function cancel() {
//   dialogVisible.value = false

//   if (props.modelValue) {
//     selectedList.value = await getEchoList()
//   }
//   else {
//     selectedList.value = []
//   }
// }

// 刷新
watch(dialogVisible, (val) => {
  if (val) {
    resetQuery()
  }
})

// 反查回显列表
async function getEchoList() {
  if (props.modelValue) {
    viewLoading.value = true
    const { rows } = await listContract({
      ids: (props.modelValue as string).split(','),
    }).finally(() => (viewLoading.value = false))

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
  {
    immediate: true,
  },
)

// 打开弹窗
function open() {
  dialogVisible.value = true
}

// 删除
function remove(item: ContractVO) {
  const index = selectedIdList.value.findIndex(e => e === item.id)
  const isSelected = index !== -1

  if (isSelected) {
    selectedList.value.splice(index, 1)
    emit('update:modelValue', selectedIdsStr.value)
    emit('change', selectedIdsStr.value)
  }
}

// 清除
function clear() {
  selectedList.value = []

  const payload = undefined
  emit('update:modelValue', payload)
  emit('change', payload)
}

// API
defineExpose({
  open,
  remove,
  clear,
  selectedList,
  viewLoading,
})
</script>
