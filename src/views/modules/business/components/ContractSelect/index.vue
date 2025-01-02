<template>
  <div class="w-full">
    <template v-if="readonly">
      <div v-if="showType === 'input'" class="w-full">
        <template v-if="!isEmpty(selectedList)">
          <!-- 单选回显 -->
          <span v-if="!multiple">{{ selectedList[0]?.[previewField] }}</span>

          <!-- 多选回显 -->
          <template v-else>
            <template v-for="(item, index) in selectedList" :key="item.id">
              <span>{{ item?.[previewField] }}</span>
              <span>{{ index === selectedList.length - 1 ? '' : '、' }}</span>
            </template>
          </template>
        </template>
      </div>

      <div v-if="showType === 'table'" class="mb-6">
        <span class="flex justify-between mb-3">
          <span class="text-base font-bold">合同列表</span>
        </span>
        <TableView :loading="ContractSelectCoreRef?.viewLoading" :data="selectedList" readonly />
      </div>
    </template>

    <!-- <template v-else>
      <div
        v-if="showType === 'input'"
        class="w-full border border-solid border-[var(--el-border-color)] hover:border-[var(--el-border-color-hover)]"
        @click="ContractSelectCoreRef?.open"
      >
        <div class="pl-2 flex items-center min-h-8 hover:cursor-text group">
          <template v-if="!isEmpty(selectedList)">
            <div v-if="!multiple" class="text-truncate">
              {{ selectedList[0]?.[previewField] }}
            </div>

            <template v-else>
              <div class="py-1 flex flex-wrap gap-1">
                <SelectTag v-for="item in selectedList" :key="item.id" closeable @close="ContractSelectCoreRef?.remove(item)">
                  {{ item?.[previewField] }}
                </SelectTag>
              </div>
            </template>

            <span class="flex-1" />
            <span
              v-if="clearable"
              class="hidden group-hover:flex mr-2 cursor-pointer opacity-30 hover:opacity-100"
              @click.stop="ContractSelectCoreRef?.clear"
            >
              <el-icon><Close /></el-icon>
            </span>
          </template>
          <input v-else :placeholder="placeholder" class="el-input__inner" readonly>
          <span class="flex mr-1 opacity-30">
            <el-icon><Search /></el-icon>
          </span>
        </div>
      </div>
      <div v-if="showType === 'table'" class="mb-6">
        <span class="flex justify-between">
          <span class="text-base font-bold">合同列表</span>
          <el-button type="primary" class="mb-2 ml-auto" icon="Plus" plain @click="ContractSelectCoreRef?.open"> 新增 </el-button>
        </span>
        <TableView :loading="ContractSelectCoreRef?.viewLoading" :data="selectedList" @remove="ContractSelectCoreRef?.remove" />
      </div>
    </template> -->

    <ContractSelectCore
      ref="ContractSelectCoreRef"
      v-model="idsStr"
      :multiple="multiple"
      :exclude="exclude"
      :params="params"
      :related-project-id="relatedProjectId"
      :is-no-rel-list="isNoRelList"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import SelectTag from '../SelectTag.vue'
import ContractSelectCore from './core.vue'
import TableView from './table.vue'
import type { ContractQuery, ContractVO } from '@/api/oa/business/contract/types'

// 属性
const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    placeholder?: string
    clearable?: boolean
    multiple?: boolean
    readonly?: boolean
    exclude?: string[]
    params?: Partial<ContractQuery>
    relatedProjectId?: boolean
    isNoRelList?: boolean
    showType?: 'input' | 'table'
    previewField?: 'name' | 'no'
  }>(),
  {
    placeholder: '请选择',
    clearable: false,
    multiple: false,
    readonly: false,
    exclude: () => [],
    params: () => ({}),
    relatedProjectId: false,
    isNoRelList: false,
    showType: 'input',
    previewField: 'name',
  },
)

const emit = defineEmits(['update:modelValue', 'update:selectedValue', 'change'])

const ContractSelectCoreRef = ref<InstanceType<typeof ContractSelectCore> | null>()

const selectedList = computed(() => ContractSelectCoreRef.value?.selectedList ?? [])

const idsStr = ref<ContractVO['id']>(props.modelValue)

function onChange(val?: string) {
  emit('update:modelValue', val)
  emit('change', val)

  emit('update:selectedValue', props.multiple ? selectedList.value : selectedList.value[0])
}

watch(
  () => props.modelValue,
  (val) => {
    idsStr.value = val
  },
  {
    immediate: true,
  },
)
</script>
