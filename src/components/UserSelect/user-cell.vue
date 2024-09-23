<template>
  <van-cell
    title-class="w-full"
    :class="[{ '!bg-[var(--van-primary-color)]': isActive }]"
  >
    <template #title>
      <div :class="`flex items-center ${isActive ? 'text-white' : ''}`">
        <span class="w-[12ch] truncate">
          {{ user.nickName }}
        </span>
        <span class="text-xs opacity-60 truncate">{{ user.deptName }}</span>
      </div>
    </template>
  </van-cell>
</template>

<script setup lang='ts'>
import type { SysUserMobileVO } from '@/api/system/user/types'

withDefaults(
  defineProps<{
    user: SysUserMobileVO
    isActive: boolean
  }>(),
  {
    isActive: false,
  },
)
</script>
