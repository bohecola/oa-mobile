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

  <!-- 调试使用、生产删除 -->
  <!-- <van-cell
    title="人员选择"
    title-class="font-bold"
    is-link
    value-class="!flex-[3]"
    :border="false"
    @click="UserSelectRef?.open"
  >
    <template #value>
      <UserSelect ref="UserSelectRef" v-model="userId" :multiple="true" />
    </template>
  </van-cell> -->

  <!-- 文件上传 -->
  <!-- <van-cell
    title="文件上传"
    title-class="font-bold"
    is-link
    value-class="!flex-[2]"
  >
    <template #value>
      <UploadFile v-model="ids" is-multiple :limit="8" :card-size="60" :is-show-tip="true" />
    </template>
  </van-cell> -->
</template>

<script setup lang='ts'>
import { useStore } from '@/store'
import type UserSelect from '@/components/UserSelect/index.vue'

const { user } = useStore()
const UserSelectRef = ref<InstanceType<typeof UserSelect> | null>()

const userId = ref(['1767026837160038402'])
const ids: any = '1838931766797766657,1838931827212521473,1838931827522899969,1838931827900387330'

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

// 刷新状态
function refreshState() {
  Object.keys(state)
    .forEach((key) => {
      if (key in user.info!) {
        state[key] = user.info![key]
      }
    })
}

watch(
  () => user.info,
  () => {
  // 更新页面状态
    refreshState()
  },
  {
    immediate: true,
  },
)
</script>
