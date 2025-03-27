<template>
  <div class="w-full">
    <van-field
      :model-value="selectedLabel"
      :is-link="!isReadonly"
      placeholder="请选择"
      type="textarea"
      rows="1"
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
    </van-field>

    <!-- http://github.com/youzan/vant/issues/2310 -->
    <van-field class="!hidden" readonly />

    <van-popup
      v-if="!isReadonly"
      v-model:show="visible"
      class="h-full"
      position="bottom"
      teleport="body"
      round
      destroy-on-close
      safe-area-inset-bottom
      @click-overlay="onCancel"
    >
      <PickerToolbar
        :title="`${attrs.label}（${multiple ? '多选' : '单选'}）`"
        @cancel="onCancel"
        @confirm="onConfirm(ids)"
      />
      <div class="py-2 px-4 h-[calc(100vh-var(--van-picker-toolbar-height)-env(safe-area-inset-bottom))] overflow-y-auto">
        <BaseTree
          ref="BaseTreeRef"
          v-model="treeData"
          text-key="label"
          class="mtl-tree"
          tree-line
          :default-open="false"
          :stat-handler="statHandler"
          @click:node="onNodeClick"
        >
          <template #default="{ node, stat }">
            <OpenIcon
              v-if="stat.children.length"
              :open="stat.open"
              class="mtl-mr [&>svg]:w-6"
              @click.stop="stat.open = !stat.open"
            />

            <div
              v-if="multiple && !isEmpty(node.children)"
              class="w-full text-lg"
            >
              {{ node.label }}
            </div>

            <van-checkbox
              v-else
              :model-value="stat.customChecked"
              :name="node.id"
              shape="square"
              icon-size="20"
              class="w-full"
            >
              <template v-if="stat.checked === 0" #icon>
                <div class="w-3 h-3 bg-[--van-primary-color] flex items-center justify-center">
                  <span class="w-[6px] h-[2px] !bg-[--white]" />
                </div>
              </template>

              <div class="w-full text-lg">
                {{ node.label }}
              </div>
            </van-checkbox>
          </template>
        </BaseTree>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { isArray, isEmpty, isNil, isNumber } from 'lodash-es'
import { BaseTree, OpenIcon } from '@he-tree/vue'
import PickerToolbar from 'vant/es/picker/PickerToolbar'
import type { Stat } from 'node_modules/@he-tree/vue/dist/v3/components/TreeProcessorVue'
import type { DeptQuery, DeptVO } from '@/api/system/dept/types'
import { listDept } from '@/api/system/dept'
import { useParentForm, usePopup } from '@/hooks'

type DeptTreeSelectValue = string | number | (string | number)[]
type _DeptVO = Partial<DeptVO> & { id: DeptVO['deptId'], label: DeptVO['deptName'], disabled?: boolean }

interface DataConfig {
  disabledKey: string
  disabledValue: string
  enabled: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    placeholder?: string
    readonly?: boolean
    clearable?: boolean
    multiple?: boolean
    checkStrictly?: boolean
    withDefaultRootNode?: boolean
    defaultExpandedKeys?: Array<string | number>
    dataConfig?: DataConfig
    params?: Partial<DeptQuery>
    disabled?: boolean
  }>(),
  {
    placeholder: '请选择',
    checkStrictly: undefined,
  },
)

const emit = defineEmits(['update:modelValue', 'update:value', 'change', 'nodeClick'])

const attrs = useAttrs()
const slots = useSlots()

const route = useRoute()

const parentForm = useParentForm()

const { visible, openPopup, closePopup } = usePopup()

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const BaseTreeRef = ref()

// 节点数据加载状态
const isLoading = ref(false)

const ids = ref<DeptTreeSelectValue>(deserialize(props.modelValue))

// 原始数据
const rawData = ref<_DeptVO[]>([])

// 参数
const queryParams: DeptQuery = reactive({
  pageNum: 1,
  pageSize: 10,
  deptName: undefined,
  deptCategory: undefined,
  status: '0',
  type: undefined,
})

// 是否只读
const isReadonly = computed(() => props.readonly || parentForm.props.readonly)

// 树形数据
const treeData = computed(() => {
  const dataConfig = props.dataConfig
  const raw = rawData.value

  const data = dataConfig
    ? raw.map(e => ({
        ...e,
        disabled: e[dataConfig.disabledKey] === dataConfig.disabledValue ? dataConfig.enabled : e.disabled,
      }))
    : raw

  const options = proxy?.handleTree<_DeptVO>(data)

  return options
})

// 选中文字
const selectedLabel = computed(() => {
  if (props.modelValue) {
    const nodes = rawData.value.filter(e => (isArray(ids.value) ? ids.value.includes(e.id) : e.id === ids.value))

    return nodes
      .map((e) => {
        if (e.type === '2') {
          return computedLabel(e.id)
        }
        return e.label
      })
      .join('、')
  }
  return ''
})

// 计算回显 Label
function computedLabel(id: string | number) {
  if (isEmpty(rawData.value)) {
    return ''
  }

  const node = rawData.value.find(e => e.id === id)

  // 项目部回显 => 上级部门/项目部
  if (node.type === '2') {
    const parentNode = rawData.value.find(e => e.id === node.parentId)
    return `${parentNode.deptName} / ${node.deptName}`
  }
  return node.deptName
}

// 数据初始时处理每一个 stat（钩子函数）
function statHandler(stat: Stat<_DeptVO>) {
  stat = { ...stat, customChecked: false }

  // 默认展开第一级
  if (stat.level === 1) {
    return {
      ...stat,
      open: true,
    }
  }

  return stat
}

// 清空点击
function onClear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)
}

// 选项点击
function onFieldClick() {
  if (isReadonly.value) {
    return
  }

  openPopup()

  // 回显选中效果
  nextTick(() => {
    const { statsFlat, openNodeAndParents } = BaseTreeRef.value
    statsFlat.forEach((e: Stat<_DeptVO>) => {
      const { id } = e.data
      const isChecked = isArray(ids.value) ? ids.value.includes(id) : id === ids.value

      if (isChecked) {
        e.customChecked = true
        openNodeAndParents(e)
      }
    })
  })
}

// 节点点击
function onNodeClick(stat: Stat<_DeptVO>) {
  const { statsFlat } = BaseTreeRef.value

  // 单选
  if (!props.multiple) {
    statsFlat.forEach((e: Stat<_DeptVO>) => {
      const isCurrent = e.data.id === stat.data.id

      if (isCurrent) {
        e.customChecked = !e.customChecked
      }
      else {
        e.customChecked = false
      }
    })

    ids.value = stat.customChecked ? stat.data.id : undefined
  }
  // 多选
  else {
    // 不是叶子节点，不修改状态
    if (!isEmpty(stat.data.children)) {
      stat.open = !stat.open
      return
    }

    stat.customChecked = !stat.customChecked

    const checkedStats = statsFlat.filter((e: Stat<_DeptVO>) => e.customChecked)

    ids.value = checkedStats.map((e: Stat<_DeptVO>) => e.data.id)
  }
}

// 取消
function onCancel() {
  ids.value = deserialize(props.modelValue)
  closePopup()
}

// 确认
function onConfirm(value: DeptTreeSelectValue) {
  const payload = serialize(value)

  emit('update:modelValue', payload)
  emit('change', payload)

  emit('update:value', payload)

  // 单选 nodeClick 事件
  if (!props.multiple) {
    const deptVO = rawData.value.find(e => e.id === value)
    emit('nodeClick', deptVO)
  }

  closePopup()
}

// 获取部门数据
async function getData() {
  isLoading.value = true

  if (props.readonly) {
    queryParams.status = undefined // 回显时示全部状态的部门
  }

  if (!isNil(props.params)) {
    Object.assign(queryParams, props.params)
  }

  if (route && route.query && route.query.isInternal) {
    queryParams.isInternal = route.query.isInternal as string
  }

  const { data } = await listDept(queryParams).finally(() => (isLoading.value = false))

  const rootNode = { label: '根节点', deptId: '0', deptName: '根节点', type: -1 } as any

  function formatFormData(item: Partial<DeptVO>): _DeptVO {
    return {
      ...item,
      id: !isNil(item.deptId) ? String(item.deptId) : item.deptId,
      label: item.deptName,
    }
  }

  rawData.value = props.withDefaultRootNode ? [rootNode, ...data].map(formatFormData) : data.map(formatFormData)
}

function serialize(value: DeptTreeSelectValue) {
  if (!isEmpty(value) || isNumber(value)) {
    if (props.multiple) {
      return (value as string[]).join(',')
    }
    else {
      return value as string
    }
  }
  else {
    return undefined
  }
}

function deserialize(value: string | number) {
  if (!isNil(value)) {
    value = isNumber(value) ? String(value) : value
    if (props.multiple) {
      return (value as string).split(',')
    }
    else {
      return value
    }
  }
  else {
    return undefined
  }
}

watch(
  () => props.modelValue,
  (val) => {
    ids.value = deserialize(val)
  },
)

onMounted(() => {
  getData()
})

defineExpose({
  isLoading,
  data: treeData,
  selectedLabel,
})
</script>
