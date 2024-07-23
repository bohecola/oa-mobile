<script setup lang='ts'>
import NavBar from './components/NavBar.vue'
import ImageUploader from './components/ImageUploader.vue'
import { useStore } from '@/store'

const { user } = useStore()
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
</template>
