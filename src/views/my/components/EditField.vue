<script setup lang='ts'>
import type { FormInstance } from 'vant'
import NavBar from './NavBar.vue'

// 类型
interface Item {
  field: string
  label: string
  initialFieldValue: any
}

// 参数
const props = defineProps<{
  items: Item[]
}>()

// 自定义事件
const emits = defineEmits(['submit'])

// 类型
type EditEmaileForm = Record<string, any>

// 表单引用
const formRef = ref<FormInstance>()

// 表单数据
const form = reactive<EditEmaileForm>(
  props.items.reduce<EditEmaileForm>((prev, curr) => {
    prev[curr.field] = curr.initialFieldValue
    return prev
  }, {}),
)

// 提交修改
async function handleSubmit(values: EditEmaileForm) {
  // 发送事件
  emits('submit', values)
}
</script>

<template>
  <NavBar>
    <template #right>
      <span @click="formRef?.submit">保存</span>
    </template>
  </NavBar>

  <van-form ref="formRef" @submit="handleSubmit">
    <van-field
      v-for="item in items"
      :key="item.field"
      v-model="form[item.field]"
      :name="item.field"
      :placeholder="`请输入${item.label}`"
      :rules="[{ required: true, message: `请输入${item.label}` }]"
      class="mt-4"
    />
  </van-form>
</template>
