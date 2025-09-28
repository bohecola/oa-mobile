<template>
  <van-popup
    v-model:show="visible"
    class="h-full"
    position="bottom"
    destroy-on-close
    safe-area-inset-bottom
  >
    <NavBar
      :title="title"
      :is-left-click-back="false"
      @click-left="closePopup"
    />

    <ComplexTabs :form="Detail?.form">
      <detail ref="Detail" />
    </ComplexTabs>
  </van-popup>
</template>

<script setup lang="ts">
import detail from '../detail.vue'
import { usePopup } from '@/hooks'

const Detail = ref<InstanceType<typeof detail>>()

const { title, visible, openPopup, closePopup } = usePopup({ title: '合同执行阶段详情' })

function open(id: string) {
  openPopup()

  nextTick(() => {
    Detail.value?.view(id)
  })
}

defineExpose({
  open,
})
</script>
