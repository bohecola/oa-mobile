<script setup lang='ts'>
import type { FieldRule } from 'vant'
import { showLoadingToast, showSuccessToast } from 'vant'
import type { FieldItem } from '@/components/EditField/index.vue'
import EditField from '@/components/EditField/index.vue'
import { service } from '@/service'
import { useStore } from '@/store'

const { user } = useStore()

// 引用
const EFRef = ref<InstanceType<typeof EditField> | null>(null)

// 校验规则
const rules: FieldRule[] = [
  { pattern: /^.{6,20}$/, message: '长度在 6 到 20 个字符', trigger: 'onChange' },
]

// 表单项
const items: FieldItem[] = [
  {
    name: 'oldPassword',
    label: '旧密码',
    rules,
    type: 'password',
    initialFieldValue: '',
  },
  {
    name: 'newPassword',
    label: '新密码',
    rules,
    type: 'password',
    initialFieldValue: '',
  },
  {
    name: 'confirmPassword',
    label: '确认密码',
    rules: [
      ...rules,
      {
        validator: val => val === EFRef.value?.formRef?.getValues().newPassword,
        message: '两次输入的密码不一致',
        trigger: 'onChange',
      },
    ],
    type: 'password',
    initialFieldValue: '',
  },
]

// 提交表单
async function handleSubmit(values: any) {
  const { oldPassword, newPassword } = values
  // 提示加载
  const loadingToast = showLoadingToast({ duration: 0, message: '加载中' })
  // 更新字段
  await service.system.user.updateUserPwd(oldPassword, newPassword)
  // 关闭加载
  loadingToast.close()
  // 提示成功
  showSuccessToast('修改密码成功请重新登录')
  // 退出
  user.logout({ quiet: true })
}
</script>

<template>
  <EditField
    ref="EFRef"
    :items="items"
    @submit="handleSubmit"
  >
    <div class="p-4 text-[var(--van-text-color-2)]">
      <p class="text-sm">
        密码长度在 6 到 20 个字符
      </p>
    </div>
  </EditField>
</template>
