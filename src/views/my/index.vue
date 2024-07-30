<script setup lang='ts'>
import { useStore } from '@/store'

// 用户
const { user } = useStore()

// 头像
const avatar = user.info?.avatar ?? 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'

// 封面
const getCoverBg = computed(() => {
  return {
    backgroundImage: `url(${avatar})`,
  }
})

// Action Sheet Control
const showLogoutAction = ref(false)

// Actions
const logoutActions = [
  {
    name: '退出登录',
    color: '#ee0a24',
    callback: () => {
      user.logout()
    },
  },
]
</script>

<template>
  <!-- Cover -->
  <div :style="getCoverBg" class="my-bg h-72" />

  <!-- Card -->
  <div
    class="
      mx-6 relative -top-16
      flex flex-col items-center
      rounded-md shadow-xl
      backdrop-blur bg-white/70 dark:bg-black/30
    "
  >
    <!-- Avatar -->
    <van-image
      class="h-20 w-20 border-2 !absolute -top-10"
      round
      fit="cover"
      :src="avatar"
    />

    <!-- Info -->
    <div class="mt-12 flex flex-col items-center">
      <div class="mb-2 text-xl font-black">
        {{ user.info?.nickName }}
      </div>
      <div class="text-base">
        {{ user.info?.roles.map((e) => e.roleName).join(',') }}
      </div>
    </div>

    <!-- Divider -->
    <van-divider class="w-full" />

    <!-- Cell -->
    <van-cell :border="false" title="个人信息" is-link to="/profile">
      <template #icon>
        <i class="i-mingcute-idcard-fill text-xl mr-2" />
      </template>
    </van-cell>
    <van-cell :border="false" title="账号与安全" is-link to="/account-settings">
      <template #icon>
        <i class="i-material-symbols-account-box text-xl mr-2" />
      </template>
    </van-cell>
    <van-cell :border="false" title="主题设置" is-link to="/theme-settings">
      <template #icon>
        <i class="i-material-symbols-palette text-xl mr-2" />
      </template>
    </van-cell>
    <van-cell :border="false" title="隐私政策" is-link>
      <template #icon>
        <i class="i-material-symbols-list-alt-rounded text-xl mr-2" />
      </template>
    </van-cell>
    <van-cell :border="false" title="退出登录" is-link @click="showLogoutAction = true">
      <template #icon>
        <i class="i-solar-logout-3-bold text-xl mr-2" />
      </template>
    </van-cell>
  </div>

  <!-- Action Sheet -->
  <van-action-sheet
    v-model:show="showLogoutAction"
    :actions="logoutActions"
    teleport="body"
    cancel-text="取消"
    description="确认退出登录"
    close-on-click-action
  />
</template>

<style lang="scss" scoped>
.my-bg {
  clip-path: inset(0 -55% 0 -55% round 0 0 100% 100%);
  background-size: cover;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), #000);
    opacity: 0.9;
  }
}

.van-cell {
  align-items: center;
  background: transparent;

  &:active {
    background-color: var(--van-cell-active-color);
  }
}
</style>
