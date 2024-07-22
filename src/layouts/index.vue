<script setup lang='ts'>
import { otherRoutes } from '@/router'

// 路由
const route = useRoute()

// 导航标题
const navbarTitle = computed(() => route.meta.title as string)

// 菜单
const menus = otherRoutes.filter(item => !item.meta?.innerPage)
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- 导航条 -->
    <van-nav-bar
      :title="navbarTitle"
      fixed
      placeholder
    />

    <!-- 视图 -->
    <div class="flex-1">
      <router-view />
    </div>

    <!-- 底部菜单 -->
    <van-tabbar
      :fixed="false"
      route
    >
      <van-tabbar-item
        v-for="menu in menus"
        :key="menu.path"
        :to="menu.path"
        replace
      >
        <!-- 菜单图标 -->
        <template #icon>
          <i :class="menu.meta?.icon" />
        </template>
        <!-- 菜单标题 -->
        {{ menu.meta?.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
