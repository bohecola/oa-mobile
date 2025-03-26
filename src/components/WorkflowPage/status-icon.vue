<template>
  <img
    :src="imgObj[businessStatus]"
    alt="流程状态"
    class="absolute top-[10px] right-[32px] w-14 h-14 opacity-70"
  >
</template>

<script setup lang='ts'>
import pending from '@/assets/images/wf/pending.png'
import passed from '@/assets/images/wf/passed.png'
import revoked from '@/assets/images/wf/revoked.png'
import deleted from '@/assets/images/wf/deleted.png'
import returned from '@/assets/images/wf/returned.png'
import terminated from '@/assets/images/wf/terminated.png'
import invalid from '@/assets/images/wf/invalid.png'

defineProps<{
  businessStatus: string
}>()

const imgObj = {
  cancel: revoked,
  waiting: pending,
  finish: passed,
  invalid,
  back: returned,
  termination: terminated,
  delete: deleted,
}
</script>
