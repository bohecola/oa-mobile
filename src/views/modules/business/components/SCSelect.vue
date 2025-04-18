<template>
  <div class="w-full">
    <van-field
      :model-value="modelValue"
      :is-link="!isReadonly"
      placeholder="请选择"
      readonly
      autosize
      v-bind="attrs"
      @click="onFieldClick"
    >
      <template v-for="(_, name) in slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>

      <template v-if="clearable && !isReadonly && !isNil(modelValue)" #right-icon>
        <van-icon name="clear" class="text-[--van-field-clear-icon-color]" @click.stop="onClear" />
      </template>

      <!-- 回显项 -->
      <template v-if="!isNil(modelValue)" #input>
        <div class="flex flex-wrap gap-2">
          <van-tag
            v-for="e in selectedList"
            :key="e.id"
            size="large"
            type="primary"
          >
            {{ e.name }}
          </van-tag>
        </div>
      </template>
    </van-field>

    <van-field class="!hidden" readonly />

    <van-popup
      v-model:show="visible"
      class="h-full"
      position="bottom"
      round
      destroy-on-close
      safe-area-inset-bottom
    >
      <NavBar
        :title="`${attrs.label}`"
        :is-left-click-back="false"
        @click-left="onCancel"
      />

      <van-form input-align="left" action="/">
        <van-search
          v-model.trim="searchText"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @clear="onSearchClear"
        >
          <template #action>
            <div @click="onSearch">
              搜索
            </div>
          </template>
        </van-search>
      </van-form>

      <van-list
        v-model:loading="loading"
        v-model:error="error"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        class="search-list overflow-y-auto px-2"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.id"
          :title="item.name"
          :class="[
            { '!text-white !bg-[--van-primary-color]': selectedIdList.includes(item.id) },
            { 'opacity-50': exclude.includes(item.id) && !modelValue?.includes(item.id) },
          ]"
          @click="onCellClick(item)"
        >
          <template #label>
            <div class="grid grid-cols-1 text-gray-400">
              <CellLabelItem
                v-for="d in labelDescriptors"
                :key="d.key"
                :descriptor="d"
                :item="item"
              />
            </div>
          </template>
        </van-cell>
      </van-list>

      <div class="px-3 h-14 flex items-center whitespace-nowrap border-t">
        <div class="w-full flex items-center justify-between gap-2">
          <div class="text-sm">
            已选择 {{ selectedList.length }}
          </div>

          <div class="flex-1 flex gap-2 overflow-x-auto">
            <van-tag
              v-for="e in selectedList"
              :key="e.id"
              type="primary"
              closeable
              @close="onItemRemove(e)"
            >
              {{ e.name }}
            </van-tag>
          </div>

          <van-button
            type="primary"
            size="small"
            @click="onConfirm"
          >
            确定
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
import { isArray, isEmpty, isNil, isNumber } from 'lodash-es'
import { useParentForm, usePopup, useSCSelect, useSerializer } from '@/hooks'
import type { SupplierCustomerQuery, SupplierCustomerVO } from '@/api/oa/business/supplierCustomer/types'
import { listSupplierCustomer } from '@/api/oa/business/supplierCustomer'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    multiple?: boolean
    readonly?: boolean
    clearable?: boolean
    exclude?: string[]
    limit?: number
    params?: Partial<SupplierCustomerQuery>
  }>(),
  {
    exclude: () => [],
  },
)

const emit = defineEmits(['update:modelValue', 'confirm', 'clear', 'change'])

const attrs = useAttrs()
const slots = useSlots()

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 表单
const parentForm = useParentForm()

// 弹窗
const { visible, openPopup, closePopup } = usePopup()

// 反序列化
const { deserialize } = useSerializer({ multiple: props.multiple })

// 状态
const { searchText, loading, error, finished, list, total, viewLoading, selectedList, labelDescriptors } = useSCSelect()

const selectedIdList = computed(() => selectedList.value.map(e => e.id))
const listOfIds = computed(() => list.value.map(e => e.id))

// 查询参数
const queryParams: SupplierCustomerQuery = reactive({
  pageNum: 1,
  pageSize: 10,
  type: undefined,
  name: undefined,
  contacts: undefined,
  contactPhone: undefined,
  status: undefined,
  params: {},
})

// 是否只读
const isReadonly = computed(() => props.readonly || parentForm.props.readonly)

// 查询
async function getList() {
  const { params } = props

  loading.value = true

  if (!isNil(params)) {
    Object.assign(queryParams, params)
  }

  const res = await listSupplierCustomer(queryParams)
  list.value = res.rows
  total.value = res.total
  loading.value = false
}

// 清空点击
function onClear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)
  emit('clear')
}

// 选项点击
function onFieldClick() {
  if (isReadonly.value) {
    return
  }

  if (attrs?.disabled) {
    return
  }

  openPopup()
}

// 输入清空
function onSearchClear() {
  queryParams.name = searchText.value
}

// 搜索
function onSearch() {
  queryParams.name = searchText.value
  queryParams.pageNum = 1
  getList()
}

// 触底加载
async function onLoad() {
  try {
    const { params } = props

    if (!isNil(params)) {
      Object.assign(queryParams, params)
    }

    const { rows } = await listSupplierCustomer(queryParams)

    list.value.push(...rows)

    if (rows.length < queryParams.pageSize) {
      finished.value = true
    }
    else {
      queryParams.pageNum++
    }
  }
  catch {
    error.value = true
  }
  finally {
    loading.value = false
  }
}

// 单元格点击
function onCellClick(item: SupplierCustomerVO) {
  const { modelValue, multiple, exclude } = props

  // 已排除的不可选中
  if (exclude.includes(item.id) && !modelValue?.includes(item.id)) {
    return false
  }

  // 是否已选中
  const index = selectedList.value.findIndex(e => e.id === item.id)
  const isChecked = index !== -1

  // 单选
  if (!multiple) {
    selectedList.value = [item]
  }
  // 多选
  else {
    if (isChecked) {
      selectedList.value.splice(index, 1)
    }
    else {
      selectedList.value.push(item)
    }
  }
}

// 取消
async function onCancel() {
  const { modelValue } = props

  selectedList.value = await getViewList(modelValue)

  closePopup()
}

// 移除
function onItemRemove(item: SupplierCustomerVO) {
  const index = selectedList.value.findIndex(e => e.id === item.id)
  const isChecked = index !== -1

  if (isChecked) {
    selectedList.value.splice(index, 1)
  }
}

// 确认
function onConfirm() {
  const { multiple, limit } = props
  const { msg } = proxy.$modal

  // 校验
  if (multiple) {
    if (isNumber(limit) && selectedList.value.length > limit) {
      return msg(`最多只能选择${limit}个`)
    }
  }

  const payload = !isEmpty(selectedIdList.value)
    ? selectedIdList.value.join(',')
    : undefined
  emit('update:modelValue', payload)
  emit('change', payload)
  emit('confirm', payload)

  closePopup()
}

// 反查回显列表
async function getViewList(value: string) {
  if (isNil(value)) {
    return []
  }

  const d = deserialize(value)
  const viewIds = (isArray(d) ? d : [d])

  // 是否存在本地完整数据
  const isLocalData = viewIds.every(e => listOfIds.value.includes(e as string))

  // 存在本地完整数据取本地数据
  if (isLocalData) {
    return list.value.filter(e => viewIds.includes(e.id))
  }

  // 没有本地完整数据请求接口
  viewLoading.value = true
  const { rows } = await listSupplierCustomer({ ids: viewIds as string[] })
    .finally(() => (viewLoading.value = false))

  return rows
}

// 回显
watch(
  () => props.modelValue,
  async (value) => {
    selectedList.value = await getViewList(value)
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
$topHeight: calc(var(--van-nav-bar-height) + var(--van-search-input-height) + 20px + env(safe-area-inset-top));
$bottomHeight: calc(theme('spacing.14') + env(safe-area-inset-bottom));

.search-list {
  height: calc(100vh - $topHeight - $bottomHeight);
}

:deep(.van-field__body) {
  align-items: start;
}
</style>
