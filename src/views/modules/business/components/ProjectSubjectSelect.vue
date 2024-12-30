<template>
  <div class="w-full min-h-8">
    <!-- 禁用状态 -->
    <div
      v-if="disabled"
      class="pl-2 h-full w-full border border-solid border-gray-6/20 cursor-not-allowed bg-[var(--el-fill-color-light)] opacity-60 text-truncate"
    >
      <template v-if="!isEmpty(selectedList)">
        <!-- 单选回显 -->
        <div v-if="!multiple">
          <span>{{ selectedList[0].name }}</span>
          <span>{{ `（${parseTime(selectedList[0].startDate, '{y}-{m}-{d}')} ~ ${parseTime(selectedList[0].endDate, '{y}-{m}-{d}')}）` }}</span>
        </div>

        <!-- 多选回显 -->
        <template v-else>
          <div class="py-1 flex flex-wrap gap-1">
            <SelectTag v-for="(selected, index) in selectedList" :key="selected.id" readonly>
              <span>{{ selected.name }}</span>
              <span>{{ index === selectedList.length - 1 ? '' : '、' }}</span>
            </SelectTag>
          </div>
        </template>
      </template>
    </div>

    <!-- 可选择状态 -->
    <template v-else>
      <template v-if="readonly">
        <div class="w-full">
          <template v-if="selectedList.length > 0">
            <!-- 单选回显 -->
            <div v-if="!multiple">
              <span>{{ selectedList[0].name }}</span>
              <span>{{ `（${parseTime(selectedList[0].startDate, '{y}-{m}-{d}')} ~ ${parseTime(selectedList[0].endDate, '{y}-{m}-{d}')}）` }}</span>
            </div>

            <!-- 多选回显 -->
            <template v-else>
              <div class="py-1 flex flex-wrap gap-1">
                <SelectTag v-for="(selected, index) in selectedList" :key="selected.id" readonly>
                  <span>{{ selected.name }}</span>
                  <span>{{ index === selectedList.length - 1 ? '' : '、' }}</span>
                </SelectTag>
              </div>
            </template>
          </template>
        </div>
      </template>

      <!-- <template v-else>
        <div class="w-full border border-solid border-[var(--van-border-color)] hover:border-[var(--van-border-color-hover)]" @click="open">
          <div class="pl-2 flex items-center min-h-8 hover:cursor-text group">
            <template v-if="!isEmpty(selectedList)">
              <div v-if="!multiple" class="text-truncate">
                <span>{{ selectedList[0].name }}</span>
                <span>{{ `（${parseTime(selectedList[0].startDate, '{y}-{m}-{d}')} ~ ${parseTime(selectedList[0].endDate, '{y}-{m}-{d}')}）` }}</span>
              </div>

              <template v-else>
                <div class="py-1 flex flex-wrap gap-1">
                  <SelectTag v-for="item in selectedList" :key="item.id" closeable @close="remove(item)">
                    {{ item.name }}
                  </SelectTag>
                </div>
              </template>

              <span class="flex-1" />
              <span v-if="clearable" class="hidden group-hover:flex mr-2 cursor-pointer opacity-30 hover:opacity-100" @click.stop="clear">
                <el-icon><Close /></el-icon>
              </span>
            </template>
            <input v-else :placeholder="placeholder" class="el-input__inner" readonly>
            <span class="flex mr-1 opacity-30">
              <el-icon><Search /></el-icon>
            </span>
          </div>
        </div>
      </template>
      <el-dialog v-model="dialogVisible" title="项目/部门预算选择" width="70%" append-to-body>
        <el-form ref="queryFormRef" :model="queryParams" :inline="true">
          <el-form-item label="名称" prop="keyword">
            <el-input v-model.trim="queryParams.keyword" placeholder="请输入" clearable />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery({ projectDeptId: undefined })">
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
          <el-table-column label="名称" align="left" prop="name" width="460" show-overflow-tooltip>
            <template #default="scope">
              <span>{{ scope.row.name }}</span>
              <span>（{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }} ~ {{ parseTime(scope.row.endDate, '{y}-{m}-{d}') }}）</span>
            </template>
          </el-table-column>
          <el-table-column label="合同编号" align="center" prop="contractNo" />
          <el-table-column label="状态" align="center" prop="status" width="80">
            <template #default="scope">
              <dict-tag :options="oa_project_subject_status" :value="scope.row.status" />
            </template>
          </el-table-column>
          <el-table-column label="选择" align="center" class-name="small-padding fixed-width" width="80px">
            <template #default="scope">
              <el-button
                circle
                icon="Select"
                :type="`${selectedIdList.includes(scope.row.id) ? 'primary' : ''}`"
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
      </el-dialog> -->
    </template>
  </div>
</template>

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash-es'
import type { FormInstance } from 'vant'
import SelectTag from './SelectTag.vue'
import { listProjectSubject } from '@/api/oa/finance/projectSubject'
import type { ProjectSubjectQuery, ProjectSubjectVO } from '@/api/oa/finance/projectSubject/types'

// 属性
const props = withDefaults(
  defineProps<{
    modelValue: string | number | undefined
    placeholder?: string
    clearable?: boolean
    exclude?: string[]
    multiple?: boolean
    readonly?: boolean
    disabled?: boolean
    limit?: number
    params?: Partial<ProjectSubjectQuery>
  }>(),
  {
    placeholder: '请选择',
    clearable: false,
    multiple: false,
    readonly: false,
    disabled: false,
    exclude: () => [],
  },
)

// 事件
const emit = defineEmits(['update:modelValue', 'change'])

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
// 预算状态
const { oa_project_subject_status } = toRefs(proxy.useDict('oa_project_subject_status'))

// 状态
const dialogVisible = ref(false)
const loading = ref(false)
const tableData = ref<ProjectSubjectVO[]>([])
const total = ref(0)
const viewLoading = ref(false)

const selectedList = ref<ProjectSubjectVO[]>([])
const selectedIdList = computed(() => selectedList.value?.map(item => item.id) ?? [])
const selectedIdsStr = computed(() => selectedIdList.value.join(','))

// 引用
const queryFormRef = ref<FormInstance>()

// 参数
const queryParams: ProjectSubjectQuery = reactive({
  pageNum: 1,
  pageSize: 10,
  startDate: undefined,
  endDate: undefined,
  type: undefined,
  deptId: undefined,
  projectDeptId: undefined,
  status: undefined,
  keyword: undefined,
  params: {},
})

// 查询
async function getList(query?: Partial<ProjectSubjectQuery>) {
  loading.value = true

  if (!isNil(props.params)) {
    Object.assign(queryParams, props.params)
  }

  if (!isNil(query)) {
    Object.assign(queryParams, query)
  }

  const res = await listProjectSubject(queryParams)
  tableData.value = res.rows
  total.value = res.total
  loading.value = false
}

// 搜索
function handleQuery(query?: Partial<ProjectSubjectQuery>) {
  queryParams.pageNum = 1
  getList(query)
}

// 重置
function resetQuery() {
  queryFormRef.value?.resetValidation()
  handleQuery()
}

// 打开
function open() {
  if (props.disabled) {
    return
  }
  dialogVisible.value = true
}

// 选择
function handleSelect(row: ProjectSubjectVO) {
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
        return proxy?.$modal.msgWarning(`最多只能选择${props.limit}个预算`)
      }
    }
  }

  const payload = selectedIdsStr.value
  emit('update:modelValue', payload)
  emit('change', payload)
  dialogVisible.value = false
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

// 删除
function remove(item: ProjectSubjectVO) {
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
  emit('update:modelValue', undefined)
  emit('change', undefined)
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
    viewLoading.value = true
    const { rows } = await listProjectSubject({
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
</script>
