<template>
  <div class="w-full">
    <van-field
      v-if="isReadonly"
      v-bind="attrs"
    >
      <template #input>
        <dict-tag :options="options" :value="ids" />
      </template>
    </van-field>

    <van-field
      v-else
      :model-value="presentText"
      :is-link="component === 'combine'"
      type="textarea"
      rows="1"
      placeholder="请选择"
      readonly
      autosize
      v-bind="attrs"
      @click="onFieldClick"
    >
      <template v-for="(_, name) in slots" #[name]="scope" :key="name">
        <slot v-bind="scope" :key="name" :name="name" />
      </template>

      <template v-if="clearable && !isReadonly && !attrs?.disabled && !isNil(modelValue)" #right-icon>
        <van-icon name="clear" class="text-[--van-field-clear-icon-color]" @click.stop="onClear" />
      </template>

      <template v-if="component === 'radio' || component === 'checkbox'" #input>
        <van-radio-group
          v-if="!multiple && component === 'radio' "
          v-model="ids"
          :class="cn('gap-1', props.groupClass)"
          :icon-size="iconSize"
          :direction="direction"
          :disabled="(attrs.disabled as boolean)"
          @change="onChange"
        >
          <van-radio
            v-for="(item) in options"
            :key="item.value"
            :name="item.value"
            @click="onRadioClick"
          >
            {{ item.label }}
          </van-radio>
        </van-radio-group>

        <!-- @vue-ignore -->
        <van-checkbox-group
          v-if="multiple && component === 'checkbox'"
          v-model="ids"
          :class="cn('gap-1', props.groupClass)"
          :icon-size="iconSize"
          :direction="direction"
          :disabled="(attrs.disabled as boolean)"
          @click="onCheckboxClick"
          @change="onChange"
        >
          <van-checkbox
            v-for="(item) in options"
            :key="item.value"
            :name="item.value"
          >
            {{ item.label }}
          </van-checkbox>
        </van-checkbox-group>
      </template>
    </van-field>

    <!-- http://github.com/youzan/vant/issues/2310 -->
    <van-field class="!hidden" readonly />

    <!-- 弹出层 -->
    <van-popup
      v-if="component === 'combine'"
      v-model:show="visible"
      position="bottom"
      round
      destroy-on-close
      safe-area-inset-bottom
      @click-overlay="onCancel"
    >
      <!-- 多选 -->
      <template v-if="multiple">
        <div>
          <PickerToolbar
            :title="`${attrs.label}`"
            @confirm="onCheckboxPickerConfirm(checked)"
            @cancel="onCancel"
          />

          <div class="h-72 overflow-y-auto">
            <!-- @vue-ignore -->
            <van-checkbox-group v-model="checked">
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
                      @click.stop="onCheckboxClick"
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
          @cancel="onCancel"
        />
      </template>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import PickerToolbar from 'vant/es/picker/PickerToolbar'
import type { CheckboxInstance } from 'vant'
import { isArray, isEmpty, isNil } from 'lodash-es'
import { useParentForm, usePopup, useSerializer } from '@/hooks'
import { cn } from '@/utils'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    multiple?: boolean
    readonly?: boolean
    clearable?: boolean
    dictType?: string
    options?: DictDataOption[]
    component?: 'combine' | 'radio' | 'checkbox'
    direction?: 'horizontal' | 'vertical'
    iconSize?: string | number
    separator?: string
    isFilterUseSeal?: boolean
    groupClass?: string
    filterFn?: (value: DictDataOption, index: number, array: DictDataOption[]) => unknown
  }>(),
  {
    readonly: undefined,
    component: 'combine',
    direction: 'horizontal',
    iconSize: '16',
    separator: ',',
    isFilterUseSeal: true,
  },
)

const emit = defineEmits(['update:modelValue', 'change', 'radio-click', 'checkbox-click'])

const attrs = useAttrs()
const slots = useSlots()

const parentForm = useParentForm()

const { visible, openPopup, closePopup } = usePopup()

const { deserialize, serialize } = useSerializer({ multiple: () => props.multiple, separator: props.separator })

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const checkboxRefs = ref<CheckboxInstance[]>([])

// 字典
const dictRefs = toRefs(
  !isNil(props.dictType)
    ? proxy.useDict(props.dictType)
    : reactive<Record<string, DictDataOption[]>>({}),
)

// 选中值
const ids = ref<string | string[]>(deserialize(props.modelValue))

// 多选绑定值
const checked = ref<string[]>([])

// 是否只读
const isReadonly = computed(() => props.readonly || parentForm?.props.readonly)

// 单选 Picker 回显
const pickerValue = computed(() => isArray(ids.value) ? ids.value : [ids.value])

// 选项数据
const options = computed(() => {
  const { options, dictType, isFilterUseSeal, filterFn } = props

  if (!isNil(options)) {
    return options
  }

  // oa_seal_use_type 特殊处理
  if (isFilterUseSeal && dictType === 'oa_seal_use_type') {
    return dictRefs[dictType].value.filter(e => e.value !== '5')
  }

  if (!isNil(filterFn)) {
    return dictRefs[dictType].value.filter(filterFn)
  }

  return dictRefs[dictType].value
})

// 选项数据转换为符合 van-picker 组件中 columns 属性的数据
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

// 清空点击
function onClear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)
}

// RadioGroup / CheckboxGroup 选择
function onChange(val: string | string[]) {
  const payload = serialize(val)

  emit('update:modelValue', payload)
  emit('change', payload)

  closePopup()
}

// Radio 点击
function onRadioClick(event: MouseEvent) {
  emit('radio-click', event)
}

// checkbox 点击
function onCheckboxClick(event: MouseEvent) {
  emit('checkbox-click', event)
}

// 取消
function onCancel() {
  if (props.multiple) {
    checked.value = ids.value as string[]
  }

  closePopup()
}

// 单选确认
function onPickerConfirm({ selectedValues }) {
  const [value] = selectedValues

  emit('update:modelValue', value)
  emit('change', value)

  closePopup()
}

// 多选确认
function onCheckboxPickerConfirm(values: string[]) {
  const payload = serialize(values)

  emit('update:modelValue', payload)
  emit('change', payload)

  closePopup()
}

// 选项点击
function onFieldClick() {
  if (attrs?.disabled) {
    return
  }

  openPopup()
}

// 回显
watch(
  () => props.modelValue,
  (val) => {
    ids.value = deserialize(val)

    if (props.multiple) {
      checked.value = ids.value as string[]
    }
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
:deep(.van-field__body) {
  align-items: start;
}
</style>
