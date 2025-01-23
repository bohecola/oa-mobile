<template>
  <div v-if="readonly">
    {{ selected?.name }}
  </div>
  <div
    v-else
    class="w-55 h-8 border border-solid border-[var(--el-border-color)] hover:border-[var(--el-border-color-hover)]"
    @click="handleFocusClick"
  >
    <div class="pl-2 flex gap-2 items-center h-full w-55 hover:cursor-text group">
      <template v-if="selected">
        <span class="text-[var(--el-input-text-color)]">{{ selected?.name }}</span>
        <span class="flex-1" />
        <span v-if="clearable" class="mr-1 cursor-pointer opacity-30 hidden group-hover:flex" @click.stop="handleClear">
          <el-icon><Close /></el-icon>
        </span>
      </template>
      <input v-else :placeholder="placeholder" class="el-input__inner" readonly>
      <span class="flex mr-1 opacity-30">
        <el-icon><Search /></el-icon>
      </span>
    </div>

    <!-- <el-dialog v-model="dialogVisible" title="待入职员工选择" width="75%" append-to-body> -->
    <!-- <el-form ref="queryFormRef" :model="queryParams" :inline="true" class="mb-4">
        <el-row :gutter="15">
          <el-form-item label="部门名称" prop="deptId">
            <DeptSelect v-model="queryParams.deptId" clearable @change="deptChange" />
          </el-form-item>
          <el-form-item label="岗位名称" prop="postId">
            <el-select v-model="queryParams.postId" placeholder="请选择岗位名称" clearable>
              <el-option v-for="post in postList" :key="post.postId" :label="post.postName" :value="post.postId" />
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="queryParams.name" placeholder="请输入姓名" clearable style="width: 120px" @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form> -->
    <!-- <el-table
        v-loading="loading"
        :data="tableData"
        :row-class-name="(data) => (selected?.value === data.row.id ? '!bg-[#ecf5ff] dark:!bg-[#18222c]' : '')"
        @row-click="handleSelect"
      >
        <el-table-column label="姓名" align="center" prop="preEmploymentName" width="200" />
        <el-table-column label="学历" align="center" prop="education" width="100">
          <template #default="scope">
            <dict-tag :options="oa_education_type" :value="scope.row.education" />
          </template>
        </el-table-column>
        <el-table-column label="是否实习" align="center" prop="isIntern" width="100">
          <template #default="scope">
            <dict-tag :options="sys_yes_no" :value="scope.row.isIntern" />
          </template>
        </el-table-column>
        <el-table-column label="是否推荐" align="center" prop="isRecommend" width="100">
          <template #default="scope">
            <dict-tag :options="sys_yes_no" :value="scope.row.isRecommend" />
          </template>
        </el-table-column>
        <el-table-column label="推荐来源" align="center" prop="reference" />

        <el-table-column label="状态" align="center" prop="status" width="100">
          <template #default="scope">
            <dict-tag :options="oa_employment_status" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="选择" align="center" class-name="small-padding fixed-width" width="70">
          <template #default="scope">
            <el-button
              circle
              :type="selected?.value === scope.row.id ? 'primary' : ''"
              icon="Select"
              :disabled="exclude.includes(scope.row.id)"
              @click.stop="handleSelect(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-dialog> -->
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
import { queryByIdUserPreEmploymentAndEmployment } from '@/api/oa/personnel/pendingEmployment'
import { listUserEmployment } from '@/api/oa/personnel/userEmployment'
import type { UserEmploymentQuery, UserEmploymentVO } from '@/api/oa/personnel/userEmployment/types'

// 属性
const props = withDefaults(
  defineProps<{
    modelValue: string | undefined
    placeholder?: string
    clearable?: boolean
    exclude?: string[]

    readonly?: boolean
  }>(),
  {
    placeholder: '请选择',
    clearable: false,
    exclude: () => [],
    readonly: false,
  },
)

// 事件
const emit = defineEmits(['update:modelValue', 'update:name', 'change', 'getSelectedRow'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_education_type, sys_yes_no, oa_employment_status } = toRefs(proxy.useDict('oa_education_type', 'sys_yes_no', 'oa_employment_status'))

// 状态
const dialogVisible = ref(false)
const loading = ref(false)
const tableData = ref<UserEmploymentVO[]>([])
const total = ref(0)
const selected = ref()

// 引用
const queryFormRef = ref<FormInstance>()

// 参数
const queryParams: UserEmploymentQuery = reactive({
  pageNum: 1,
  pageSize: 10,
  status: '5',
})

// 查询
async function getList() {
  loading.value = true
  const res = await listUserEmployment(queryParams)
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
  queryFormRef.value.resetValidation()
  handleQuery()
}

// 点击
function handleFocusClick() {
  dialogVisible.value = true
}

// TODO 组件优化
// 选择
async function handleSelect(row: UserEmploymentVO) {
  const { data } = await queryByIdUserPreEmploymentAndEmployment(row.id as string)
  selected.value = data
  emit('update:modelValue', selected.value.employmentId)
  emit('change', selected.value.employmentId)
  emit('getSelectedRow', selected.value)

  dialogVisible.value = false
}

// 清除
function handleClear() {
  emit('update:modelValue', undefined)
}

// 刷新
watch(dialogVisible, (val) => {
  if (val) {
    resetQuery()
  }
})

onMounted(() => {
  if (!props.readonly) {
    getList()
  }
  else if (props.modelValue) {
    queryByIdUserPreEmploymentAndEmployment(props.modelValue).then(({ data }) => {
      selected.value = data
    })
  }
})

// 回显
watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      const { data } = await queryByIdUserPreEmploymentAndEmployment(val)
      selected.value = data
    }
    else {
      selected.value = null
    }
  },
  { immediate: true },
)
</script>
