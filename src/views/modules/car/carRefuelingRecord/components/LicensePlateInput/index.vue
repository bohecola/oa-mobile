<template>
  <div class="w-full">
    <van-field
      :model-value="licensePlate"
      v-bind="{ ...attrs, ...props }"
      autosize
      readonly
      :is-link="!isReadonly"
      @click="onFieldClick"
    >
      <template v-for="(_, name) in slots" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>

      <template v-if="clearable && !isReadonly && !disabled && !isNil(modelValue)" #right-icon>
        <van-icon name="clear" class="text-[--van-field-clear-icon-color]" @click.stop="onClear" />
      </template>
    </van-field>

    <van-field class="!hidden" readonly />

    <van-popup
      v-model:show="visible"
      position="bottom"
      round
      destroy-on-close
      safe-area-inset-bottom
    >
      <div class="p-2">
        <van-radio-group
          v-model="isNEV"
          direction="horizontal"
          icon-size="16"
        >
          <van-radio :name="false">
            普通车牌
          </van-radio>
          <van-radio :name="true">
            新能源车牌
          </van-radio>
        </van-radio-group>

        <div class="flex items-center gap-1 mt-2">
          <template
            v-for="i in LICENSE_LENGTH"
            :key="i"
          >
            <div v-if="i === 3" class="h-1 w-1 mx-2 bg-[--van-primary-color] rounded-full" />
            <div
              class="w-8 h-8 flex items-center justify-center rounded-md border"
              :class="{
                'border-[--van-primary-color]': licensePlate.length === i - 1,
              }"
            >
              <span
                v-if="licensePlate.length === i - 1"
                class="inline-block w-[2px] h-3 bg-[--van-primary-color] animate-blink"
              />
              {{ licensePlate.charAt(i - 1) }}
            </div>
          </template>
        </div>

        <div class="grid grid-cols-9 gap-1 mt-3 mb-6">
          <van-button
            v-for="item in KEYBOARD_KEY_LIST"
            :key="item"
            type="default"
            size="small"
            plain
            @click="onKeyboardItemClick(item)"
          >
            {{ item }}
          </van-button>
        </div>

        <div class="flex justify-between gap-1">
          <van-button
            type="default"
            size="small"
            @click="closePopup"
          >
            取消
          </van-button>
          <div>
            <van-button
              type="danger"
              size="small"
              @click="onDelete"
            >
              删除
            </van-button>
            <van-button
              type="primary"
              size="small"
              class="ml-1"
              @click="onConfirm(licensePlate)"
            >
              完成
            </van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
import { fieldProps } from 'vant/es/field/field'
import { isEmpty, isNil } from 'lodash-es'
import { LETTER_LIST, LICENSE_PLATE_LENGTH, LICENSE_PLATE_RULE, NUMBER_LIST, PROVINCE_LIST } from './helper'
import { useParentForm, usePopup } from '@/hooks'

const props = defineProps({
  ...fieldProps,
  modelValue: {
    type: String,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: '请输入',
  },
})

const emit = defineEmits(['update:modelValue', 'change', 'clear'])

const attrs = useAttrs()
const slots = useSlots()

const parentForm = useParentForm()

const { visible, openPopup, closePopup } = usePopup()

const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 车牌号
const licensePlate = ref(props.modelValue ?? '')

const isNEV = ref(false)

// 车牌号长度
const LICENSE_LENGTH = computed(() => {
  if (isNEV.value) {
    return LICENSE_PLATE_LENGTH.NEV
  }
  return LICENSE_PLATE_LENGTH.ICE
})

// 按键列表
const KEYBOARD_KEY_LIST = computed(() => {
  if (isEmpty(licensePlate.value)) {
    return PROVINCE_LIST
  }

  return [...NUMBER_LIST, ...LETTER_LIST]
})

// 是否只读
const isReadonly = computed(() => props.readonly || parentForm.props.readonly)

// 选项点击
function onFieldClick() {
  if (isReadonly.value) {
    return
  }

  if (props.disabled) {
    return
  }

  openPopup()
}

// 按键点击
function onKeyboardItemClick(val: string) {
  if (
    (isNEV.value && licensePlate.value.length < LICENSE_PLATE_LENGTH.NEV)
    || (!isNEV.value && licensePlate.value.length < LICENSE_PLATE_LENGTH.ICE)
  ) {
    licensePlate.value += val
  }
}

// 删除
function onDelete() {
  licensePlate.value = licensePlate.value.slice(0, -1)
}

// 清空
function onClear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)
  emit('clear')
}

// 确认
function onConfirm(value: string) {
  if (!LICENSE_PLATE_RULE.test(value)) {
    return proxy.$modal.msg('请输入有效的车牌号')
  }

  emit('update:modelValue', value)
  emit('change', value)

  closePopup()
}

watch(
  () => props.modelValue,
  (val) => {
    licensePlate.value = val ?? ''
  },
)
</script>
