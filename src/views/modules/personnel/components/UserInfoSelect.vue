<template>
  <div v-if="readonly">
    {{ detail?.userName }}
  </div>
  <div
    v-else
    class="w-55 h-8 border border-solid border-[var(--el-border-color)] hover:border-[var(--el-border-color-hover)]"
    @click="handleFocusClick"
  >
    <div class="pl-2 flex gap-2 items-center h-full w-55 hover:cursor-text group">
      <template v-if="selected">
        <!-- TODO 转正和见习入职使用同一个组件优化 -->
        <span v-if="props.status === '5'" class="text-[var(--el-input-text-color)]">{{ selected?.userName }}</span>
        <span v-else class="text-[var(--el-input-text-color)]">{{ selected?.label }}</span>
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
    <!-- TODO 选中行背景 -->
    <!-- <el-dialog v-model="dialogVisible" title="用户选择" width="70%" append-to-body>
      <el-table
        v-loading="loading"
        :data="tableData"
        :row-class-name="(data) => (selected?.value === data.row.id ? '!bg-[#ecf5ff] dark:!bg-[#18222c]' : '')"
        @row-click="handleSelect"
      >
        <el-table-column label="用户" align="center" prop="userName" width="120" show-overflow-tooltip />
        <el-table-column label="部门名称" align="center" prop="deptName" show-overflow-tooltip />
        <el-table-column label="岗位名称" align="center" prop="postName" show-overflow-tooltip />
        <el-table-column label="民族" align="center" prop="nation" width="80">
          <template #default="scope">
            <dict-tag :options="oa_nation" :value="scope.row.nation" />
          </template>
        </el-table-column>
        <el-table-column label="学历" align="center" prop="education" width="100">
          <template #default="scope">
            <dict-tag :options="oa_education_type" :value="scope.row.education" />
          </template>
        </el-table-column>
        <el-table-column label="试用期时长" align="center" prop="probationPeriod" width="100" />

        <el-table-column label="状态" align="center" prop="status" width="90">
          <template #default="scope">
            <dict-tag :options="oa_user_state" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="选择" align="center" class-name="small-padding fixed-width" width="80">
          <template #default="scope">
            <el-button
              circle
              icon="Select"
              :type="selected?.value === scope.row.id ? 'primary' : ''"
              :disabled="exclude.includes(scope.row.id)"
              @click.stop="handleSelect(scope.row)"
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
import { getUserInfoList } from '@/api/system/user'
import type { UserInfoListQuery } from '@/api/system/user/types'

interface Option { label: string, value: string | number }

// 属性
const props = withDefaults(
  defineProps<{
    modelValue: string | undefined | number
    placeholder?: string
    clearable?: boolean
    options?: Promise<Option[]> | Option[]
    exclude?: string[]
    readonly?: boolean
    status?: string
  }>(),
  {
    placeholder: '请选择',
    clearable: false,
    exclude: () => [],
    options: async () => {
      const { rows } = await getUserInfoList({ pageNum: 1, pageSize: 10 })
      return (rows ?? []).map(item => ({ label: item.userName, value: item.userId }))
    },
    readonly: false,
  },
)

// 事件
const emit = defineEmits(['update:modelValue', 'update:name', 'change', 'getRow'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance
// const { oa_education_type, oa_nation, sys_yes_no, oa_user_state } = toRefs(
//   proxy.useDict('oa_education_type', 'oa_nation', 'sys_yes_no', 'oa_user_state'),
// )

// 状态
const dialogVisible = ref(false)
const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const selected = ref()

// 引用
const queryFormRef = ref<FormInstance>()

// 参数
const queryParams: UserInfoListQuery = reactive({
  pageNum: 1,
  pageSize: 10,
  status: '0',
})

// 查询
async function getList() {
  loading.value = true
  if (props.status) {
    queryParams.status = props.status
  }
  const res = await getUserInfoList(queryParams)
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
async function handleSelect(row: any) {
  if (row.status === '5') {
    emit('update:modelValue', row.id)
    emit('change', row.id)
  }
  else {
    await proxy?.$modal.confirm('确认选择，选择之后不可进行更改！')
    emit('update:modelValue', row.userId)
    emit('change', row.userId)
  }
  emit('getRow', row)
  emit('update:name', row.userName)
  dialogVisible.value = false
}

// 清除
function handleClear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)
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
  const obj = {} as any
  if (props.readonly) {
    if (props.modelValue) {
      const { rows } = await getUserInfoList({ pageNum: 1, pageSize: 10 })
      console.log(rows, 'data')

      Object.assign(obj, rows[0])
    }
  }
  return obj
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
      if (props.status === '5') {
        selected.value = tableData.value.find(item => item.id === val)
      }
      else {
        const options = await getOptions()
        selected.value = options.find(item => item.value === val)
      }
    }
    else {
      selected.value = null
    }
  },
  { immediate: true },
)
</script>
