<script setup lang='ts'>
import type { FormInstance } from 'vant'
import NavBar from './NavBar.vue'

const props = defineProps<{
  field: string
  label: string
  initialFieldValue: any
}>()

const emits = defineEmits(['submit'])

// 类型
interface EditEmaileForm {
  [key: string]: any
}

// 引用
const formRef = ref<FormInstance>()

// 表单
const form = reactive<EditEmaileForm>({
  [props.field]: props.initialFieldValue,
})

// 提交修改
async function handleSubmit(values: EditEmaileForm) {
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
      v-model="form[field]"
      :name="field"
      :placeholder="`请输入${label}`"
      :rules="[{ required: true, message: `请输入${label}` }]"
      class="mt-4"
    />
  </van-form>
</template>
