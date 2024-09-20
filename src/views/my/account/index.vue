<template>
  <NavBar />
  <van-field
    v-model="state.userName"
    label="用户名"
    readonly
    label-class="font-bold"
    input-align="right"
    :center="true"
    :border="false"
  />

  <van-field
    v-model="state.phonenumber"
    label="手机号码"
    readonly
    label-class="font-bold"
    input-align="right"
    :center="true"
    :border="false"
    is-link
    to="/edit-phone-number"
  />

  <van-field
    v-model="state.email"
    label="邮箱"
    readonly
    label-class="font-bold"
    input-align="right"
    :center="true"
    :border="false"
    is-link
    to="/edit-email"
  />

  <van-field
    label="修改登录密码"
    readonly
    label-class="font-bold"
    input-align="right"
    :center="true"
    :border="false"
    is-link
    to="/change-password"
  />

  <van-field
    v-model="state.createTime"
    label="创建日期"
    readonly
    label-class="font-bold"
    input-align="right"
    :center="true"
    :border="false"
  />

  <van-cell
    title="人员选择"
    title-class="font-bold"
    is-link
    value-class="!flex-[3]"
    @click="UserSelectRef?.open"
  >
    <template #value>
      <UserSelect ref="UserSelectRef" v-model="userId" :multiple="false" />
    </template>
  </van-cell>
</template>

<script setup lang='ts'>
import { useStore } from '@/store'
import UserSelect from '@/components/UserSelect/index.vue'

const { user } = useStore()
const UserSelectRef = ref<InstanceType<typeof UserSelect> | null>()

const userId = ref('1767026837160038402')

// 状态类型
interface AccountState {
  userName: string
  phonenumber?: string
  email?: string
  createTime?: string
  [key: string]: any
}

// 页面状态
const state = reactive<AccountState>({
  userName: '',
  phonenumber: '',
  email: '',
  createTime: '',
})

// 设置状态
function setState(state: AccountState) {
  Object.keys(state)
    .forEach((key) => {
      if (key in user.info!) {
        state[key] = user.info![key]
      }
    })
}

// 刷新
async function refresh() {
  // 刷新用户信息
  // await user.get()
  // 更新页面状态
  setState(state)
}

// 挂载
onMounted(async () => {
  await refresh()
})
</script>
