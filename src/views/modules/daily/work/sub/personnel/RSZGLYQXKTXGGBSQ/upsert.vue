<template>
  <!-- <van-field v-show-field="['h_userId', includeFields]" label="申请子管理员权限人员" name="h_userId" input-align="left">
      <template #input>
        <UserSelect v-model="form.h_userId" :multiple="false"  />
      </template>
    </van-field> -->

  <van-field
    v-model.trim="form.h_type"
    v-show-field="['h_type', includeFields]"
    label="调整类型"
    placeholder="请输入开通权限、修改权限、关闭权限"
    name="h_type"
    :rules="computedRules.h_type"
    clearable
  />

  <van-field
    v-model.trim="form.h_content"
    v-show-field="['h_content', includeFields]"
    label="权限内容"
    placeholder="请输入"
    name="h_content"
    :rules="computedRules.h_content"
  />

  <van-field
    v-model="form.h_openingStatus"
    v-show-field="['h_openingStatus', includeFields]"
    label="开通情况"
    placeholder="请输入临时开通、长期开通"
    name="h_openingStatus"
    :rules="computedRules.h_openingStatus"
  />

  <DateSelect
    v-model="form.h_effectiveDate"
    v-show-field="['h_effectiveDate', includeFields]"
    name="h_effectiveDate"
    label="生效日期"
    :rules="computedRules.h_effectiveDate"
    :columns-type="['year', 'month']"
    clearable
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
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
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 附件必选
const updateRuleRequired = inject<UpdateRuleRequiredFn>('updateRuleRequired')
updateRuleRequired('ossIdList', true)
</script>
