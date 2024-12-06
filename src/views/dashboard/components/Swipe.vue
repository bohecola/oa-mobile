<template>
  <van-swipe class="my-swipe rounded" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item, index) of items" :key="index">
      <img class="w-full h-[130px] object-cover" :src="item.url" alt="banner">
    </van-swipe-item>
  </van-swipe>
</template>

<script setup lang='ts'>
import banner1 from '@/assets/images/banner-1.webp'
import banner2 from '@/assets/images/banner-2.png'

const items = [
  { url: banner1 },
  { url: banner2 },
]
</script>
