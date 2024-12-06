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
          {{ selectedList[0].name }}
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
              {{ selectedList[0].name }}
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
        <div class="w-full border border-solid border-[var(--el-border-color)] hover:border-[var(--el-border-color-hover)]" @click="open">
          <div class="pl-2 flex items-center min-h-8 hover:cursor-text group">
            <template v-if="!isEmpty(selectedList)">
              <div v-if="!multiple" class="text-truncate">
                {{ selectedList[0].name }}
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
      <el-dialog v-model="dialogVisible" title="项目选择" width="70%" append-to-body>
        <el-form ref="queryFormRef" :model="queryParams" :inline="true">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model.trim="queryParams.name" placeholder="请输入项目名称" clearable @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <dict-select v-model="queryParams.status" dict-type="oa_project_status" />
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

        <el-table v-loading="loading" :data="tableData">
          <el-table-column label="项目名称" align="center" prop="name" />
          <el-table-column label="业务类型" align="center" prop="businessType">
            <template #default="scope">
              <dict-tag :options="oa_project_business_type" :value="scope.row.businessType" />
            </template>
          </el-table-column>
          <el-table-column label="部门" align="center" prop="deptName" />
          <el-table-column label="负责人" align="center" prop="projectLeaderName" />
          <el-table-column label="计划开始日期" align="center" prop="planStartDate" width="110">
            <template #default="scope">
              <span>{{ parseTime(scope.row.planStartDate, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划结束日期" align="center" prop="planEndDate" width="110">
            <template #default="scope">
              <span>{{ parseTime(scope.row.planEndDate, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目完成日期" align="center" prop="finishDate" width="110">
            <template #default="scope">
              <span>{{ parseTime(scope.row.finishDate, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" prop="status" width="80px">
            <template #default="scope">
              <dict-select v-model="scope.row.status" dict-type="oa_project_status" readonly />
            </template>
          </el-table-column>
          <el-table-column label="选择" align="center" class-name="small-padding fixed-width" width="80px">
            <template #default="scope">
              <el-button
                circle
                icon="Select"
                :type="`${selectedIdList.includes(scope.row.id) ? 'primary' : ''}`"
                :disabled="exclude.includes(scope.row.id)"
                @click.stop="handleSelectClick(scope.row)"
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
import { listProject } from '@/api/oa/business/project'
import type { ProjectQuery, ProjectVO } from '@/api/oa/business/project/types'

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
const emit = defineEmits(['update:modelValue', 'update:businessType', 'update:contractNoStr', 'change'])

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_project_business_type } = toRefs(proxy.useDict('oa_project_business_type'))

// 状态
const dialogVisible = ref(false)
const loading = ref(false)
const tableData = ref<ProjectVO[]>([])
const total = ref(0)
const viewLoading = ref(false)

const selectedList = ref<ProjectVO[]>([])
const selectedIdList = computed(() => selectedList.value?.map(item => item.id) ?? [])
const selectedIdsStr = computed(() => selectedIdList.value.join(','))
const businessTypeList = computed(() => selectedList.value?.map(item => item.businessType))
const contractNoStr = computed(() => selectedList.value?.map(item => item.contractNo).join(','))

// 引用
const queryFormRef = ref<FormInstance>()

// 参数
const queryParams: ProjectQuery = reactive({
  pageNum: 1,
  pageSize: 10,
  no: undefined,
  name: undefined,
  businessType: undefined,
  status: undefined,
  statusList: [2, 3, 4, 5],
  params: {},
})

// 查询
async function getList() {
  loading.value = true
  const res = await listProject(queryParams)
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

// 打开
function open() {
  if (props.disabled) {
    return
  }
  dialogVisible.value = true
}

// 选择
function handleSelectClick(row: ProjectVO) {
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
    const isSameBusinessType = businessTypeList.value.every(e => e === businessTypeList.value[0])

    if (!isSameBusinessType) {
      return proxy?.$modal.msgWarning('请选择同一业务类型项目')
    }

    if (!isNil(props.limit)) {
      if (selectedList.value.length > props.limit) {
        return proxy?.$modal.msgWarning(`最多只能选择${props.limit}个项目`)
      }
    }
  }

  const payload = selectedIdsStr.value
  emit('update:modelValue', payload)
  emit('change', payload)

  emit('update:businessType', businessTypeList.value[0])
  emit('update:contractNoStr', contractNoStr.value)
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
function remove(item: ProjectVO) {
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
  emit('update:businessType', undefined)
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
    const { rows } = await listProject({
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
      emit('update:businessType', businessTypeList.value[0])
    }
    else {
      selectedList.value = []
      emit('update:businessType', undefined)
    }
  },
  {
    immediate: true,
  },
)
</script>
