<script setup lang='ts'>
import type { FieldProps, FormInstance } from 'vant'

// 类型
export interface FieldItem extends WithRequiredProperty<Partial<FieldProps>, 'name'> {
  initialFieldValue: any
}
// 参数
const props = defineProps<{
  items: FieldItem[]
}>()
// 自定义事件
const emit = defineEmits(['submit'])

// 类型
type EditForm = Record<string, any>
// 表单引用
const formRef = ref<FormInstance>()
// 表单数据
const form = reactive<EditForm>(
  props.items.reduce<EditForm>((prev, curr) => {
    prev[curr.name] = curr.initialFieldValue
    return prev
  }, {}),
)

// 提交修改
async function handleSubmit(values: EditForm) {
  // 发送事件
  emit('submit', values)
}

// Expose Instance Property
defineExpose({
  formRef,
})
</script>

<template>
  <div>
    <NavBar>
      <template #right>
        <span @click="formRef?.submit">保存</span>
      </template>
    </NavBar>

    <van-form ref="formRef" @submit="handleSubmit">
      <van-field
        v-for="item in items"
        :key="item.name"
        v-model="form[item.name]"
        v-bind="item"
        :placeholder="item.placeholder ?? `请输入${item.label}`"
        :rules="[
          { required: true, message: `请输入${item.label}`, trigger: 'onChange' },
          ...(item.rules ?? []),
        ]"
        class="mt-4"
      />
    </van-form>

    <slot name="default" />
  </div>
</template>
