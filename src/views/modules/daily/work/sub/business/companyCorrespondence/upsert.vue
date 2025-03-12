<template>
  <van-field v-show-field="['needDepts', includeFields]" name="needDepts" label="需求部门" input-align="left">
    <template #input>
      <DeptSelect v-model="form.needDepts" multiple />
    </template>
  </van-field>

  <van-field v-show-field="['isYwlProject', includeFields]" label="是否运维类项目" name="isYwlProject" input-align="left" label-width="120">
    <template #input>
      <YesNoSwitch v-model="form.isYwlProject" />
    </template>
  </van-field>

  <van-field v-show-field="['isPersonnelTransfer', includeFields]" label-width="170" label="是否涉及人员任命、调整" name="isPersonnelTransfer" input-align="left">
    <template #input>
      <YesNoSwitch v-model="form.isPersonnelTransfer" />
    </template>
  </van-field>

  <van-field v-model="form.ll_letterType" v-show-field="['ll_letterType', includeFields]" label="函件类型" placeholder="请输入" name="ll_letterType" input-align="left" />

  <van-field v-model="form.ll_fileType" v-show-field="['ll_fileType', includeFields]" label="文件类型" placeholder="请输入" name="ll_fileType" input-align="left" />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'

import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['isYwlProject', 'isPersonnelTransfer', 'll_letterType', 'll_fileType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
