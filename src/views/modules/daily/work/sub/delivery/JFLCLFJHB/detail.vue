<template>
  <ProjectSelect
    v-model="form.zz_projectId"
    v-model:contract-no-str="form.zz_contractNo"
    v-show-field="['zz_projectId', includeFields]"
    name="zz_projectId"
    label="项目"
  />

  <van-field
    v-model="form.zz_contractNo"
    v-show-field="['zz_contractNo', includeFields]"
    name="zz_contractNo"
    label="合同编号"
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import ProjectSelect from '@/views/modules/business/components/ProjectSelect.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['zz_projectId', 'zz_contractNo', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
