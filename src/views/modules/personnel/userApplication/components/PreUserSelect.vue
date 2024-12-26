<template>
  <div v-if="readonly">
    {{ detail?.name }}
  </div>
  <div
    v-else
    class="w-55 h-8 border border-solid border-[var(--el-border-color)] hover:border-[var(--el-border-color-hover)]"
    @click="handleFocusClick"
  >
    <!-- <div class="pl-2 flex gap-2 items-center h-full w-55 hover:cursor-text group">
      <template v-if="selected">
        <span class="text-[var(--el-input-text-color)]">{{ selected?.label }}</span>
        <span class="flex-1"></span>
        <span v-if="clearable" class="mr-1 cursor-pointer opacity-30 hidden group-hover:flex" @click.stop="handleClear">
          <el-icon><Close /></el-icon>
        </span>
      </template>
      <input v-else :placeholder="placeholder" class="el-input__inner" readonly />
      <span class="flex mr-1 opacity-30">
        <el-icon><Search /></el-icon>
      </span>
    </div>

    <el-dialog v-model="dialogVisible" title="预入职员工选择" width="75%" append-to-body>
      <el-form ref="queryFormRef" :model="queryParams" :inline="true" class="mb-4">
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
      </el-form>
      <el-table v-loading="loading" :data="tableData">
        <el-table-column label="部门名称" align="center" prop="deptName" />
        <el-table-column label="岗位名称" align="center" prop="postName" />
        <el-table-column label="姓名" align="center" prop="name" width="100" />
        <el-table-column label="用户性别" align="center" prop="sex" width="80">
          <template #default="scope">
            <dict-tag :options="sys_user_sex" :value="scope.row.sex" />
          </template>
        </el-table-column>
        <el-table-column label="手机号码" align="center" prop="phonenumber" width="110" />
        <el-table-column label="面试形式" align="center" prop="interviewWay" width="90">
          <template #default="scope">
            <dict-tag :options="oa_interview" :value="scope.row.interviewWay" />
          </template>
        </el-table-column>
        <el-table-column label="面试日期" align="center" prop="interviewDate" width="110">
          <template #default="scope">
            <span>{{ parseTime(scope.row.interviewDate, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否有试用期" align="center" prop="isProbation" width="80">
          <template #default="scope">
            <dict-tag :options="sys_yes_no" :value="scope.row.isProbation" />
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status" width="60">
          <template #default="scope">
            <dict-tag :options="computedStatus" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="选择" align="center" class-name="small-padding fixed-width" width="70">
          <template #default="scope">
            <el-button
              circle
              :type="selected?.value === scope.row.id ? 'primary' : ''"
              icon="Select"
              :disabled="exclude.includes(scope.row.id)"
              @click.stop="handleSelectClick(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-dialog> -->
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
import { getUserPreEmployment, listUserPreEmployment } from '@/api/oa/personnel/userPreEmployment'
import type { UserPreEmploymentQuery, UserPreEmploymentVO } from '@/api/oa/personnel/userPreEmployment/types'
import { listSysDeptPost } from '@/api/system/deptPost'

interface Option { label: string, value: string | number }

// 属性
const props = withDefaults(
  defineProps<{
    modelValue: string | undefined
    placeholder?: string
    clearable?: boolean
    options?: Promise<Option[]> | Option[]
    exclude?: string[]
    readonly?: boolean
  }>(),
  {
    placeholder: '请选择',
    clearable: false,
    exclude: () => [],
    options: async () => {
      const { rows } = await listUserPreEmployment({ status: '2', pageNum: undefined, pageSize: undefined })
      return (rows ?? []).map(item => ({ label: item.name, value: item.id }))
    },
    readonly: false,
  },
)

// 事件
const emit = defineEmits(['update:modelValue', 'update:name', 'change', 'getRow'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { sys_user_sex, oa_interview, sys_yes_no, oa_employment_status } = toRefs(
  proxy.useDict('sys_user_sex', 'oa_interview', 'sys_yes_no', 'oa_employment_status'),
)

// 状态
const dialogVisible = ref(false)
const loading = ref(false)
const tableData = ref<UserPreEmploymentVO[]>([])
const total = ref(0)
const selected = ref()
const postList = ref([])

// 引用
const queryFormRef = ref<FormInstance>()

// 参数
const queryParams: UserPreEmploymentQuery = reactive({
  pageNum: 1,
  pageSize: 10,
  recruitPostId: undefined,
  deptId: undefined,
  postId: undefined,
  name: undefined,
  sex: undefined,
  phonenumber: undefined,
  certificates: undefined,
  interviewWay: undefined,
  interviewDate: undefined,
  isOwnerInterview: undefined,
  isProbation: undefined,
  probationCycle: undefined,
  status: '2',
})

// 查询
async function getList() {
  loading.value = true
  const res = await listUserPreEmployment(queryParams)
  tableData.value = res.rows
  total.value = res.total
  loading.value = false
}

// 搜索
function handleQuery() {
  queryParams.pageNum = 1
  getList()
}

// 部门changge事件获取岗位下拉框的数据
async function deptChange(deptId: string) {
  // 清空岗位名称
  postList.value = []
  queryParams.postId = ''
  // 获取搜索添加上下拉框的数据，部门change事件
  const res = await listSysDeptPost({ deptId, pageNum: 1, pageSize: 10 })
  postList.value = res.rows
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
function handleSelectClick(row: UserPreEmploymentVO) {
  emit('update:modelValue', row.id)
  emit('update:name', row.name)
  emit('change', row.id)
  emit('getRow', row)
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

// 选项
async function getOptions() {
  if (props.options instanceof Promise) {
    return await props.options
  }

  return props.options
}

// 只读回显
const detail = asyncComputed(async () => {
  const obj = {} as UserPreEmploymentVO
  if (props.readonly) {
    if (props.modelValue) {
      const { data } = await getUserPreEmployment(props.modelValue)
      Object.assign(obj, data)
    }
  }
  return obj
})

// 重新计算状态 状态去掉草稿
const computedStatus = computed(() => {
  return oa_employment_status.value.filter((item: any) => item.value !== '0')
})

onMounted(() => {
  if (!props.readonly) {
    getList()
  }
})
// 回显
watch(
  () => props.modelValue,
  async (val) => {
    if (val) {
      const options = await getOptions()

      selected.value = options.find(item => item.value === val)
    }
    else {
      selected.value = null
    }
  },
  { immediate: true },
)
</script>
