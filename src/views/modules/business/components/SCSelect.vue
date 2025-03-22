<template>
  <div class="w-full">
    <van-field
      :model-value="modelValue"
      placeholder="请选择"
      readonly
      autosize
      :is-link="!isReadonly"
      v-bind="attrs"
      @click="onFieldClick"
    >
      <template v-for="(_, name) in slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>

      <template v-if="clearable && !isReadonly && !isNil(modelValue)" #right-icon>
        <van-icon name="clear" @click.stop="onClear" />
      </template>

      <template v-if="!isNil(modelValue)" #input>
        <!-- 回显列表 -->
        <div class="flex flex-wrap gap-2">
          <van-tag
            v-for="e in selectedList"
            :key="e.id"
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
      safe-area-inset-top
      safe-area-inset-bottom
      @open="onOpen"
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
          @search="handleQuery"
          @clear="onSearchClear"
        >
          <template #action>
            <div @click="handleQuery">
              搜索
            </div>
          </template>
        </van-search>
      </van-form>

      <van-list
        v-model:loading="loading"
        finished-text="没有更多了"
        class="search-list overflow-y-auto px-2"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.id"
          :title="item.name"
          :class="{ '!text-white !bg-[--van-primary-color]': selectedIdList.includes(item.id) }"
          @click="onCellClick(item)"
        >
          <template #label>
            <div class="grid grid-cols-1 text-gray-400">
              <div class="flex">
                类型：<dict-tag :options="oa_supplier_customer_type" :value="item.type.split(',')" />
              </div>
              <div v-if="!isNil(item.contacts)">
                联系人：{{ item.contacts }}
              </div>
              <div v-if="!isNil(item.contactPhone)">
                电话：{{ item.contactPhone }}
              </div>
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
              size="medium"
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
import { isEmpty, isNil, isNumber } from 'lodash-es'
import { useParentForm, usePopup } from '@/hooks'
import type { SupplierCustomerQuery, SupplierCustomerVO } from '@/api/oa/business/supplierCustomer/types'
import { listSupplierCustomer } from '@/api/oa/business/supplierCustomer'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    multiple?: boolean
    readonly?: boolean
    clearable?: boolean
    exclude?: (string | number)[]
    limit?: number
    params?: Partial<SupplierCustomerQuery>
  }>(),
  {
    exclude: () => [],
  },
)

const emit = defineEmits(['update:modelValue', 'confirm', 'clear'])

const attrs = useAttrs()
const slots = useSlots()

const parentForm = useParentForm()

const { visible, openPopup, closePopup } = usePopup()

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_supplier_customer_type } = toRefs(proxy.useDict('oa_supplier_customer_type'))

// 搜索词
const searchText = ref('')

// 状态
const loading = ref(false)
const finished = ref(false)
const list = ref<SupplierCustomerVO[]>([])
const total = ref(0)

const viewLoading = ref(false)

const selectedList = ref<SupplierCustomerVO[]>([])
const selectedIdList = computed(() => selectedList.value.map(e => e.id))

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
  loading.value = true

  if (!isNil(props.params)) {
    Object.assign(queryParams, props.params)
  }

  const res = await listSupplierCustomer(queryParams)
  list.value = res.rows
  total.value = res.total
  loading.value = false
}

// 清空点击
function onClear() {
  emit('update:modelValue', undefined)
  emit('clear')
}

// 选项点击
function onFieldClick() {
  openPopup()
}

// 输入清空
function onSearchClear() {
  queryParams.name = searchText.value
}

// 搜索
function handleQuery() {
  queryParams.name = searchText.value
  queryParams.pageNum = 1
  getList()
}

// 触底加载
async function onLoad() {
  if (!isNil(props.params)) {
    Object.assign(queryParams, props.params)
  }
  const { rows } = await listSupplierCustomer(queryParams)

  list.value.push(...rows)

  loading.value = false

  if (rows.length < queryParams.pageSize) {
    finished.value = true
  }
  else {
    queryParams.pageNum++
  }
}

// 打开
function onOpen() {

}

// 单元格点击
function onCellClick(item: SupplierCustomerVO) {
  const { exclude, modelValue } = props

  // 已排除的不可选中
  if (exclude.includes(item.id) && !String(modelValue).includes(item.id)) {
    return false
  }

  // 是否已选中
  const index = selectedList.value.findIndex(e => e.id === item.id)
  const isChecked = index !== -1

  // 单选
  if (!props.multiple) {
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
  selectedList.value = selectedList.value = await getEchoList()

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

  // 超出提示
  if (multiple && isNumber(limit) && selectedList.value.length > limit) {
    return proxy.$modal.msg(`最多只能选择${limit}个`)
  }

  const payload = !isEmpty(selectedIdList.value) ? selectedIdList.value.join(',') : undefined
  emit('update:modelValue', payload)
  emit('confirm', payload)

  closePopup()
}

// 反查回显列表
async function getEchoList() {
  if (props.modelValue) {
    viewLoading.value = true
    const { rows } = await listSupplierCustomer({
      ids: (props.modelValue as string).split(','),
    }).finally(() => (viewLoading.value = false))

    return rows
  }

  return []
}

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

<style lang="scss" scoped>
$topHeight: calc(var(--van-nav-bar-height) + var(--van-search-input-height) + 20px + env(safe-area-inset-top));
$bottomHeight: theme('spacing.14');

.search-list {
  height: calc(100vh - $topHeight - $bottomHeight);
}

:deep(.van-field__body) {
  align-items: start;
}
</style>
