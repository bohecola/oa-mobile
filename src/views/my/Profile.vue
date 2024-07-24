<script setup lang='ts'>
import { type PickerConfirmEventParams, showSuccessToast } from 'vant'
import NavBar from './components/NavBar.vue'
import ImageUploader from './components/ImageUploader.vue'
import { genderOptions } from './options'
import { useStore } from '@/store'
import { updateUserProfile } from '@/api/system/user'

interface ProfileState {
  nickName: string
  gender: string[]
  genderText: string
  [key: string]: any
}

// 用户状态
const { user } = useStore()

// 性别选择器
const genderPickerVisible = ref(false)

// 页面状态
const state = reactive<ProfileState>({
  nickName: user.info?.nickName as string,
  gender: ['0'],
  genderText: genderOptions.find(e => e.value === user.info?.sex)?.text as string,
})

// 更新状态
function updateState(state: ProfileState, key: string, value: any) {
  state[key] = value
}

// 修改性别
async function handleGender({ selectedOptions }: PickerConfirmEventParams) {
  // 选中项
  const [option] = selectedOptions
  // 更新用户性别
  await updateUserProfile({ sex: option?.value as string })
  // 刷新用户信息
  await user.get()
  // 更新页面状态
  updateState(state, 'genderText', option?.text)
  // 提示成功
  showSuccessToast('编辑成功')
  // 收起选择器
  genderPickerVisible.value = false
}
</script>

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
    to="/edit-nickname"
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
