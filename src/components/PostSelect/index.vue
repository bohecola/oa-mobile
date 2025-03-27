<template>
  <div class="w-full">
    <van-field
      v-if="isReadonly"
      v-bind="attrs"
    >
      <template #input>
        <span>{{ presentText }}</span>
      </template>
    </van-field>

    <van-field
      v-else
      :model-value="presentText"
      type="textarea"
      rows="1"
      placeholder="请选择"
      readonly
      autosize
      is-link
      v-bind="attrs"
      @click="onFieldClick"
    >
      <template v-for="(_, name) in slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>

      <template v-if="clearable && !isReadonly && !isNil(modelValue)" #right-icon>
        <van-icon name="clear" @click.stop="onClear" />
      </template>
    </van-field>

    <!-- http://github.com/youzan/vant/issues/2310 -->
    <van-field class="!hidden" readonly />

    <!-- 弹出层 -->
    <van-popup
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
                  v-for="(item, index) in data"
                  :key="item.value"
                  :title="item.text"
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
          :columns="data"
          @confirm="onPickerConfirm"
          @cancel="onCancel"
        />
      </template>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import type { CheckboxInstance } from 'vant'
import { isArray, isEmpty, isNil, isNumber } from 'lodash-es'
import PickerToolbar from 'vant/es/picker/PickerToolbar'
import { useParentForm, usePopup } from '@/hooks'
import { listSysDeptPost } from '@/api/system/deptPost'
import type { SysDeptPostVO } from '@/api/system/deptPost/types'

type PostSelectValue = string | number | (string | number)[]

type _SysDeptPostVO = SysDeptPostVO & { text: string, value: string, label: string }

const props = defineProps<{
  modelValue?: string | number
  multiple?: boolean
  readonly?: boolean
  deptId?: string | number
  clearable?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'change'])

const attrs = useAttrs()
const slots = useSlots()

const parentForm = useParentForm()

const { visible, openPopup, closePopup } = usePopup()

// const { proxy } = getCurrentInstance() as ComponentInternalInstance
const checkboxRefs = ref<CheckboxInstance[]>([])

// 选中值
const ids = ref<PostSelectValue>(deserialize(props.modelValue))

// 多选绑定值
const checked = ref<string[]>([])

// 是否只读
const isReadonly = computed(() => props.readonly || parentForm.props.readonly)

// 单选 Picker 回显
const pickerValue = computed(() => isArray(ids.value) ? ids.value : [ids.value])

const data = ref<_SysDeptPostVO[]>([])

// 选项数据
async function getOptions() {
  if (props.deptId) {
    const { rows } = await listSysDeptPost({ deptId: props.deptId, pageNum: 1, pageSize: 1000 })
    data.value = rows.map(e => ({ ...e, text: e.postName, label: e.postName, value: String(e.postId) }))
  }
  else {
    closePopup()
  }
}

// 当前文字
const presentText = computed(() => {
  if (isEmpty(ids)) {
    return undefined
  }
  const idsArr = isArray(ids.value) ? ids.value : [ids.value]
  const currentOptions = data.value.filter(e => idsArr.includes(e.value))

  return currentOptions
    .map(e => e.text)
    .join('、')
})

// 清空点击
function onClear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)
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
  openPopup()
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

function deserialize(value: string | number) {
  if (!isNil(value)) {
    value = isNumber(value) ? String(value) : value
    if (props.multiple) {
      return (value as string).split(',').map(e => e)
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
    console.log(val, 'val')

    ids.value = deserialize(val)

    console.log(ids.value, 'ids.value')

    if (props.multiple) {
      checked.value = ids.value as string[]
    }
  },
  {
    immediate: true,
  },
)

watch(
  () => props.deptId,
  (val) => {
    if (!isNil(val)) {
      getOptions()
    }
  },
  {
    immediate: true,
  },
)
</script>
