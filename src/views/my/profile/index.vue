<template>
  <div>
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
            :src="user.info?.avatar ?? defaultAvatar"
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
      class="!items-baseline"
      label-class="font-bold"
      input-align="right"
      :center="true"
      :border="false"
    >
      <template #input>
        <TextareaView :value="state.roleNames.replace(/,/g, '、')" />
      </template>
    </van-field>

    <!-- Gender Picker -->
    <van-popup
      v-model:show="genderPickerVisible"
      position="bottom"
      round
      safe-area-inset-bottom
    >
      <van-picker
        v-model="state.gender"
        visible-option-num="3"
        :columns="genderOptions"
        @confirm="handleGender"
        @cancel="genderPickerVisible = false"
      />
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
import { type PickerConfirmEventParams, showLoadingToast } from 'vant'
import ImageUploader from '../components/ImageUploader.vue'
import { genderOptions } from '../options'
import { useStore } from '@/store'
import { service } from '@/service'
import defaultAvatar from '@/assets/images/user-avatar.png'

// 状态类型
interface ProfileState {
  nickName: string
  gender?: string[]
  genderText?: string
  deptName?: string
  roleNames?: string
  [key: string]: any
}

// 用户状态
const { user } = useStore()

// 性别选择器
const genderPickerVisible = ref(false)

// 页面状态
const state = reactive<ProfileState>({
  nickName: '',
  gender: ['0'], // -
  genderText: '', // -
  deptName: '', // -
  roleNames: '', // -
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
  state.deptName = user.info?.deptName
  state.roleNames = user.info?.roles.map((e: any) => e.roleName).join(',')
  // set the pick seleted value.
  state.gender = [user.info?.sex as string ?? '0']
}

// 修改性别
async function handleGender({ selectedOptions }: PickerConfirmEventParams) {
  // 开启加载
  const loadingToast = showLoadingToast({ duration: 0, message: '加载中' })
  // 选中项
  const [option] = selectedOptions
  // 更新用户性别
  await service.system.user.updateUserProfile({ ...user.info, sex: option?.value as string })
  // 刷新
  await refresh()
  // 关闭加载
  loadingToast.close()
  // 收起选择器
  genderPickerVisible.value = false
}

// 刷新
async function refresh() {
  // 刷新用户信息
  await user.get()
  // 更新页面状态
  setState(state)
}

// 挂载
onMounted(async () => {
  await refresh()
})
</script>
