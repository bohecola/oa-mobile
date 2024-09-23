<template>
  <div class="h-full flex flex-col justify-center">
    <div class="text-center">
      <img class="w-[350px]" src="~@/assets/icons/exception/404.svg" alt="">
    </div>
    <div class="text-center">
      <p class="m-4 text-base">
        抱歉，你访问的页面不存在
      </p>
      <van-button type="primary" @click="goHome">
        回到首页
      </van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()

function goHome() {
  router.push('/')
}
</script>
