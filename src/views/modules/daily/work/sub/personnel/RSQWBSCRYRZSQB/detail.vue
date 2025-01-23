<template>
  <van-field v-show-field="['ff_userId', includeFields]" label="员工" name="ff_deptId" input-align="right">
    <template #input>
      <PreUserSelect v-model="form.ff_userId" readonly />
    </template>
  </van-field>
  <van-field v-show-field="['ff_deptId', includeFields]" label="项目部" name="ff_deptId" input-align="right">
    <template #input>
      <DeptSelect v-model="form.ff_deptId" readonly />
    </template>
  </van-field>

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import PreUserSelect from '@/views/modules/personnel/userEmployment/workflow/components/PreUserSelect.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['ff_deptId', 'ff_userId', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()
</script>
