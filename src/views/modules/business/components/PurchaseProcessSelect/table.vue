<template>
  <TableCard v-for="item in data" :key="item.id">
    <van-field
      label="流程ID"
      input-align="left"
    >
      <template #input>
        {{ item.id }}
      </template>
    </van-field>
    <van-field
      label="申请人"
      input-align="left"
    >
      <template #input>
        {{ item.createByName }}
      </template>
    </van-field>
    <van-field
      label="申请部门"
      input-align="left"
    >
      <template #input>
        {{ item.createDeptName }}
      </template>
    </van-field>
    <van-field
      label="申请人"
      input-align="left"
    >
      <template #input>
        {{ item.createByName }}
      </template>
    </van-field>
    <van-field
      label="采购类型"
      input-align="left"
    >
      <template #input>
        <dict-tag :options="oa_purchase_type" :value="item.type" />
      </template>
    </van-field>
    <van-field
      label="业务类别"
      input-align="left"
    >
      <template #input>
        <!-- 项目业务类型 -->
        <dict-tag v-if="item.subjectType === 'project'" :options="oa_project_business_type" :value="item.businessCategory" />
        <!-- 采购业务类型 -->
        <dict-tag v-else :options="oa_purchase_business_type" :value="item.businessCategory" />
      </template>
    </van-field>
    <van-field
      label="物品类别"
      input-align="left"
    >
      <template #input>
        <dict-tag :options="oa_purchase_object_category" :value="item.objectCategory" />
      </template>
    </van-field>
    <van-field
      label="金额"
      input-align="left"
    >
      <template #input>
        {{ formatCurrency(item.amount) }}
      </template>
    </van-field>
    <van-field
      label="实际金额"
      input-align="left"
    >
      <template #input>
        {{ formatCurrency(item.realAmount) }}
      </template>
    </van-field>
    <van-field
      label="采购说明"
      input-align="left"
    >
      <template #input>
        <TextareaView :value="item.description" />
      </template>
    </van-field>
    <van-field
      label="申请时间"
      input-align="left"
    >
      <template #input>
        <span>{{ parseTime(item.createTime, '{y}-{m}-{d}') }}</span>
      </template>
    </van-field>
    <van-field
      label="状态"
      input-align="left"
    >
      <template #input>
        <dict-tag :options="oa_purchase_status" :value="item.status" />
      </template>
    </van-field>
    <van-field label="操作" input-align="left">
      <template #input>
        <div class="flex gap-2">
          <span class="text-[--van-primary-color]" @click="handleView(item)">查看</span>
          <span v-if="!readonly" class="text-red-400" @click="hanldeRemove(item)">删除</span>
        </div>
      </template>
    </van-field>
  </TableCard>
</template>

<script setup lang="ts">
import type { PurchaseVO } from '@/api/oa/business/purchase/types'

withDefaults(
  defineProps<{
    data: PurchaseVO[]
    readonly?: boolean
    loading?: boolean
  }>(),
  {
    readonly: false,
    loading: false,
  },
)

const emit = defineEmits(['view', 'remove'])

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { oa_purchase_type } = toRefs(proxy.useDict('oa_purchase_type'))
const { oa_project_business_type } = toRefs(proxy.useDict('oa_project_business_type'))
const { oa_purchase_business_type } = toRefs(proxy.useDict('oa_purchase_business_type'))
const { oa_purchase_object_category } = toRefs(proxy.useDict('oa_purchase_object_category'))
const { oa_purchase_status } = toRefs(proxy.useDict('oa_purchase_status'))

function handleView(row: PurchaseVO) {
  emit('view', row)
}

function hanldeRemove(row: PurchaseVO) {
  emit('remove', row)
}
</script>
