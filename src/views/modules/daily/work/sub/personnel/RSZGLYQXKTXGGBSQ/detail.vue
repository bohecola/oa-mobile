<template>
  <!-- <van-field v-show-field="['h_userId', includeFields]" label="申请子管理员权限人员" name="h_userId" >
    <template #input>
      <UserSelect v-model="form.h_userId" :multiple="false" readonly />
    </template>
  </van-field> -->

  <van-field
    v-model="form.h_type"
    v-show-field="['h_type', includeFields]"
    label="调整类型"
    name="h_type"
  />

  <van-field
    v-model="form.h_content"
    v-show-field="['h_content', includeFields]"
    label="权限内容"
    name="h_content"
  />

  <van-field
    v-model="form.h_openingStatus"
    v-show-field="['h_openingStatus', includeFields]"
    label="开通情况"
    name="h_openingStatus"
  />

  <DateSelect
    v-model="form.h_effectiveDate"
    v-show-field="['h_effectiveDate', includeFields]"
    name="h_effectiveDate"
    label="生效日期"
    :columns-type="['year', 'month']"
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['h_userId', 'h_type', 'h_content', 'h_openingStatus', 'h_effectiveDate', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
