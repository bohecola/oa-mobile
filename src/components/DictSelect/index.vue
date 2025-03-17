<template>
  <div class="w-full">
    <van-field v-if="readonly">
      <template #input>
        <dict-tag :options="options" :value="ids" />
      </template>
    </van-field>

    <van-field
      v-else
      :model-value="presentText"
      placeholder="请选择"
      is-link
      v-bind="attrs"
      value-class=""
      @click="onFieldClick"
    >
      <template v-for="(_, name) in slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </van-field>

    <!-- 弹出层 -->
    <van-popup
      v-model:show="visible"
      position="bottom"
      round
      destroy-on-close
      safe-area-inset-bottom
    >
      <!-- 多选 -->
      <template v-if="multiple">
        <div>
          <PickerToolbar
            :title="`${attrs.label}`"
            @confirm="onCustomPickerConfirm(ids)"
            @cancel="onPickerCancel"
          />

          <div class="h-72 overflow-y-auto">
            <!-- @vue-ignore -->
            <van-checkbox-group
              v-model="ids"
            >
              <van-cell-group>
                <van-cell
                  v-for="(item, index) in options"
                  :key="item.value"
                  :title="item.label"
                  clickable
                  @click="() => checkboxRefs[index]?.toggle()"
                >
                  <template #right-icon>
                    <van-checkbox
                      :ref="(el) => checkboxRefs[index] = (el as CheckboxInstance)"
                      :name="item.value"
                      @click.stop
                    />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
          </div>
        </div>
      </template>

      <!-- 单选 -->
      <template v-else>
        <van-picker
          :title="`${attrs.label}`"
          :model-value="pickerValue"
          :columns="columns"
          @confirm="onPickerConfirm"
          @cancel="onPickerCancel"
        />
      </template>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { isArray, isEmpty, isNil, isNumber } from 'lodash-es'
import type { CheckboxInstance } from 'vant'
import PickerToolbar from 'vant/es/picker/PickerToolbar'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    readonly?: boolean
    multiple?: boolean
    dictType?: string
    options?: DictDataOption[]
    isFilterUseSeal?: boolean
    filterFn?: (value: DictDataOption, index: number, array: DictDataOption[]) => unknown
  }>(),
  {
    modelValue: undefined,
    readonly: false,
    multiple: false,
    isFilterUseSeal: true,
  },
)

const emit = defineEmits(['update:modelValue', 'change'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const checkboxRefs = ref<CheckboxInstance[]>([])

const attrs = useAttrs()
const slots = useSlots()

// 显示
const visible = ref(false)

// 字典
const dictRefs = toRefs(!isNil(props.dictType) ? proxy.useDict(props.dictType) : reactive<Record<string, DictDataOption[]>>({}))
// 选中值
const ids = ref<string | string[]>(deserialize(props.modelValue))

// Picker 回显
const pickerValue = computed(() => isArray(ids.value) ? ids.value : [ids.value])

// 选项数据
const options = computed(() => {
  if (!isNil(props.options)) {
    return props.options
  }
  // oa_seal_use_type 特殊处理
  if (props.isFilterUseSeal && props.dictType === 'oa_seal_use_type') {
    return dictRefs[props.dictType].value.filter(e => e.value !== '5')
  }

  if (!isNil(props.filterFn)) {
    return dictRefs[props.dictType].value.filter(props.filterFn)
  }
  return dictRefs[props.dictType].value
})

// 选项数据转换为符合 van-picker 组件的 columns 属性的数据
const columns = computed(() => {
  return options.value.map((e) => {
    return {
      ...e,
      text: e.label,
    }
  })
})

// 当前文字
const presentText = computed(() => {
  if (isEmpty(ids)) {
    return undefined
  }
  const idsArr = isArray(ids.value) ? ids.value : [ids.value]
  const currentOptions = options.value.filter(e => idsArr.includes(e.value))

  return currentOptions
    .map(e => e.label)
    .join('、')
})

// 取消
function onPickerCancel() {
  closePopup()
}

// 多选确认
function onCustomPickerConfirm(val: string | string[]) {
  const payload = serialize(val)

  emit('update:modelValue', payload)
  emit('change', payload)
  closePopup()
}

// 单选确认
function onPickerConfirm({ selectedValues }) {
  const [value] = selectedValues

  emit('update:modelValue', value)
  emit('change', value)
  closePopup()
}

// 点击
function onFieldClick() {
  openPopup()
}

// 打开
function openPopup() {
  visible.value = true
}

// 关闭
function closePopup() {
  visible.value = false
}

function serialize(value?: string | string[]) {
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

function deserialize(value?: string) {
  if (value) {
    if (props.multiple) {
      return value.split(',')
    }
    else {
      return value
    }
  }
  else {
    return undefined
  }
}

// 回显
watch(
  () => props.modelValue,
  (val) => {
    ids.value = deserialize(val)
  },
)
</script>
