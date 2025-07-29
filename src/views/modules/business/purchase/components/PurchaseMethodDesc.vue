<template>
  <div class="px-4 py-2 text-sm">
    <div class="flex flex-col gap-2">
      <div>
        1. 物品类别为
        <span class="text-red-400">生活用品、办公用品</span>
        时，将自动设置采购方式为
        <span class="text-red-400">自行采购</span>
        并且禁止修改
      </div>
      <div>
        2. 预算类型为部门预算且
        <span class="text-red-400">非生活用品、办公用品</span>
        时，将自动设置采购方式为
        <span class="text-red-400">公司采购</span>
        并且禁止修改
      </div>
      <div>
        3. 预算类型为项目预算时，自动匹配业务类别中对应的自行采购金额上限，若
        <span class="text-red-400">含税总金额</span>
        超过该业务类别对应的自行采购金额上限，则将自动设置采购方式为
        <span class="text-red-400">公司采购</span>
        并且禁止修改
      </div>
    </div>

    <div class="mt-2 mb-1 font-bold">
      项目预算中业务类别对应的自行采购金额上限列表
    </div>

    <div v-for="item in options" :key="item.label" class="flex items-center gap-2">
      <div class="w-20">
        {{ item.label }}：
      </div>
      <div>{{ formatCurrency(item.remark as any) }} 元</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  options: DictDataOption[]
}>()
</script>
