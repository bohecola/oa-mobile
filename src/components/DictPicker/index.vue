<template>
  <div class="clearfix">
    <van-field
      v-model="text"
      :required="required"
      readonly
      :is-link="component === 'picker'"
      :class="readonly ? 'dict-select-readonly' : ''"
      :autocomplete="component !== 'picker' ? 'off' : 'on'"
      :type="multiple ? 'textarea' : 'text'"
      :autosize="multiple"
      rows="1"
      :label-width="labelWidth"
      :label="label"
      :colon="colon"
      :rules="rules"
      :placeholder="placeholder"
      :disabled="disabled"
      @click="showComponentTypePicker"
    />
    <!-- 不弹窗单选 -->
    <van-radio-group v-if="!multiple && component === 'radio'" v-model="realValue" class="ml-3" icon-size="18px" direction="horizontal">
      <van-radio v-for="item in dataList" :key="item.value" :name="item.value">
        <span class=" text-[14px]">{{ item.text }}</span>
      </van-radio>
    </van-radio-group>

    <!-- 不弹窗多选 -->
    <van-checkbox-group v-if="multiple && component === 'checkbox'" v-model="checkedList" class="ml-3" icon-size="18px" direction="horizontal">
      <van-checkbox v-for="item in dataList" :key="item.value" :name="item.value">
        <span>{{ item.text }}</span>
      </van-checkbox>
    </van-checkbox-group>

    <!-- 弹窗多选 -->
    <van-popup
      v-if="component === 'picker'"
      v-model:show="showPicker"
      round
      position="bottom"
      style="height: 300px"
      :close-on-click-overlay="false"
      :lazy-render="false"
    >
      <template v-if="multiple">
        <!-- 多选弹出层 -->
        <div class="flex justify-between px-3">
          <div
            class="mb-4 mt-3 text-[#969799] cursor-pointer text-center"
            @click="onDictSelectCancel"
          >
            取消
          </div>
          <div
            class="mb-4 mt-3 text-[#576b95] cursor-pointer text-center"
            @click="onDictMultipleSelectConfirm"
          >
            确定
          </div>
        </div>
        <van-checkbox-group v-model="checkedList">
          <van-cell-group>
            <van-cell
              v-for="(element, index) in dataList"
              :key="element.value"
              class="px-0"
              clickable
              :title="element.text"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox :name="JSON.stringify(element)" @click.stop />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </template>

      <template v-else>
        <!-- 单选弹出层 -->
        <van-picker
          v-model="realValuePickerList"
          show-toolbar
          :columns="dataList"
          @confirm="onDictSelectConfirm"
          @cancel="onDictSelectCancel"
        />
      </template>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dictType: {
    type: String,
    default: '',
  },
  dictDataList: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: 'label',
  },
  labelWidth: {
    type: Number,
    default: 100,
  },
  colon: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  rules: {
    type: Array,
    default: () => [],
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    required: false,
  },
  component: {
    type: String,
    default: 'picker',
  },
})

const emit = defineEmits(['update:modelValue', 'changeData'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const dictRefs = toRefs(proxy.useDict(props.dictType)) || ref({})

const showPicker = ref(false)
const text = ref('')
const realValue = ref('')
const realValuePickerList = ref([])
const dataList = ref([])
const checkedList = ref([])

function createDictData(data) {
  if (dictRefs[data] || dictRefs[data].value) {
    dataList.value = dictRefs[data].value.map(item => ({
      text: item.label,
      value: item.value,
    }))
  }

  reloadData()
}

function reloadData() {
  if (realValue.value) {
    const realValueList = realValue.value.split(',')
    checkedList.value = []
    text.value = ''
    realValueList.forEach((value) => {
      const currentItem = dataList.value.find(item => item.value === value)
      if (currentItem) {
        if (props.multiple) {
          checkedList.value.push(JSON.stringify({
            text: currentItem.text,
            value,
          }))
        }
        else {
          realValuePickerList.value.push(value)
        }
        if (text.value === '') {
          text.value = currentItem.text
        }
        else {
          text.value += `、${currentItem.text}`
        }
      }
    })
  }
}

function showComponentTypePicker() {
  reloadData()
  showPicker.value = true
}

function onDictSelectCancel() {
  showPicker.value = false
}

function onDictSelectConfirm({ selectedOptions }) {
  if (selectedOptions[0]) {
    text.value = selectedOptions[0].text.toString()
    realValue.value = selectedOptions[0].value.toString()
    realValuePickerList.value = [realValue.value]
    emit('update:modelValue', realValue.value)
    emit('changeData', selectedOptions[0])
    showPicker.value = false
  }
}

function onDictMultipleSelectConfirm() {
  const temTextArray = []
  const temValueArray = []
  checkedList.value.forEach((item) => {
    const parsedItem = JSON.parse(item)
    temTextArray.push(parsedItem.text)
    temValueArray.push(parsedItem.value)
  })
  text.value = temTextArray.join(',')
  realValue.value = temValueArray.join(',')
  emit('update:modelValue', realValue.value)
  emit('changeData', { text: text.value, value: realValue.value })
  showPicker.value = false
}

function toggle(index) {
  checkedList.value[index] = !checkedList.value[index]
}

watch(() => props.modelValue, (newValue) => {
  if (typeof newValue === 'string' || typeof newValue === 'number') {
    realValue.value = newValue.toString()
    reloadData()
  }
  else {
    realValue.value = ''
  }
}, { immediate: true })

watch(() => props.dictDataList, (newData) => {
  if (newData && newData.length > 0) {
    createDictData(newData)
  }
}, { immediate: true })

watch(() => dictRefs[props.dictType]?.value, (newValue) => {
  if (newValue && newValue.length > 0) {
    createDictData(props.dictType)
  }
})

const component = computed(() => {
  return props.component
})
</script>

<style scoped>
.dict-select-readonly {
  pointer-events: none;
}
.van-cell--required::before {
  position: absolute;
  left: -3px;
  color: #ee0a24;
  font-size: 14px;
  content: '*';
}
</style>
