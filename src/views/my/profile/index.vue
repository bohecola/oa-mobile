<template>
  <NavBar />
  <van-divider>基本信息</van-divider>
  <van-field
    label="头像"
    label-class="font-bold"
    input-align="right"
    :center="true"
    :border="false"
    is-link
    readonly
  >
    <template #input>
      <ImageUploader>
        <van-image
          class="h-16 w-16"
          fit="cover"
          round
          :src="user.info?.avatar"
        />
      </ImageUploader>
    </template>
  </van-field>

  <van-field
    v-model="state.nickName"
    label="昵称"
    readonly
    label-class="font-bold"
    input-align="right"
    :center="true"
    :border="false"
    is-link
    to="/edit-nickName"
  />

  <van-field
    v-model="state.genderText"
    label="性别"
    readonly
    label-class="font-bold"
    input-align="right"
    :center="true"
    :border="false"
    is-link
    @click="genderPickerVisible = true"
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
    v-model="state.userName"
    label="用户名"
    readonly
    label-class="font-bold"
    input-align="right"
    :center="true"
    :border="false"
  />

  <van-field
    v-model="state.deptName"
    label="所属部门"
    readonly
    label-class="font-bold"
    input-align="right"
    :center="true"
    :border="false"
  />

  <van-field
    v-model="state.roleNames"
    label="所属角色"
    readonly
    label-class="font-bold"
    input-align="right"
    :center="true"
    :border="false"
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

  <!-- Gender Picker -->
  <van-popup v-model:show="genderPickerVisible" position="bottom" round>
    <van-picker
      v-model="state.gender"
      visible-option-num="3"
      :columns="genderOptions"
      @confirm="handleGender"
      @cancel="genderPickerVisible = false"
    />
  </van-popup>
</template>

<script setup lang='ts'>
import { type PickerConfirmEventParams, showSuccessToast } from 'vant'
import NavBar from '../components/NavBar.vue'
import ImageUploader from '../components/ImageUploader.vue'
import { genderOptions } from '../options'
import { useStore } from '@/store'
import { updateUserProfile } from '@/api/system/user'

// 状态类型
interface ProfileState {
  userName: string
  nickName: string
  gender?: string[]
  genderText?: string
  phonenumber?: string
  email?: string
  deptName?: string
  roleNames?: string
  createTime?: string
  [key: string]: any
}

// 用户状态
const { user } = useStore()

// 性别选择器
const genderPickerVisible = ref(false)

// 页面状态
const state = reactive<ProfileState>({
  userName: '',
  nickName: '',
  gender: ['0'], // -
  genderText: '', // -
  phonenumber: '',
  email: '',
  deptName: '', // -
  roleNames: '', // -
  createTime: '',
})

// 设置状态
function setState(state: ProfileState) {
  Object.keys(state)
    .forEach((key) => {
      if (key in user.info!) {
        state[key] = user.info![key]
      }
    })

  // set field text value.
  state.genderText = genderOptions.find(e => e.value === user.info?.sex)?.text as string
  state.deptName = user.info?.dept.deptName
  state.roleNames = user.info?.roles.map((e: any) => e.roleName).join(',')
  // set the pick seleted value.
  state.gender = [user.info?.sex as string ?? '0']
}

// 更新状态
function updateState(state: ProfileState, key: string, value: any) {
  state[key] = value
}

// 修改性别
async function handleGender({ selectedOptions }: PickerConfirmEventParams) {
  // 选中项
  const [option] = selectedOptions
  // 更新用户性别
  await updateUserProfile({ ...user.info, sex: option?.value as string })
  // 刷新用户信息
  await user.get()
  // 更新页面状态
  updateState(state, 'genderText', option?.text)
  // 收起选择器
  genderPickerVisible.value = false
  // 提示成功
  showSuccessToast('编辑成功')
}

// 挂载
onMounted(async () => {
  // 刷新用户信息
  await user.get()
  // 更新页面状态
  setState(state)
})
</script>
