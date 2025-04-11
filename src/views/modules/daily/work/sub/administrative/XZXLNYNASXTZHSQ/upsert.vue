<template>
  <DeptSelect
    v-model="form.rr_deptId"
    name="rr_permission"
    label="所在部门"
    readonly
  />

  <van-field v-show-field="['rr_userId', includeFields]" name="rr_userId" label="姓名">
    <template #input>
      <UserSelect v-model="form.rr_userId" readonly />
    </template>
  </van-field>

  <DictSelect
    v-model="form.rr_permission"
    name="rr_permission"
    label="权限"
    dict-type="oa_daily_work_xzxlnynasxtzhsq_permission"
    :rules="computedRules.rr_permission"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { useUserStore } from '@/store/user'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['rr_deptId', 'rr_userId', 'rr_permission', 'reason', 'ossIdList'],
  },
)

const userStore = useUserStore()

const form = inject<Ref<DailyWorkForm>>('form')

form.value.rr_deptId = userStore.info.deptId
form.value.rr_userId = userStore.info.userId
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)
</script>
