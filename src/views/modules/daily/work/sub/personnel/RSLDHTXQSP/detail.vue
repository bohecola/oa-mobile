<template>
  <van-field v-show-field="['b_userId', includeFields]" label="员工" name="b_userId">
    <template #input>
      <UserSelect v-model="form.b_userId" readonly />
    </template>
  </van-field>

  <DeptSelect
    v-model="form.b_deptId"
    v-show-field="['b_deptId', includeFields]"
    name="b_deptId"
    label="部门/项目部"
  />

  <van-field v-show-field="['b_postIds', includeFields]" label="岗位" name="b_postIds">
    <template #input>
      <PostSelect v-model="form.b_postIds" :dept-id="form.b_deptId" multiple readonly />
    </template>
  </van-field>

  <DictSelect
    v-model="form.b_sex"
    v-show-field="['b_sex', includeFields]"
    label="性别"
    name="b_sex"
    dict-type="sys_user_sex"
  />

  <!-- <el-row :gutter="20">
    <el-col v-show-field="['b_age', includeFields]" :span="24">
      <el-form-item prop="b_age" label="年龄">
        {{ form.b_age }}
      </el-form-item>
    </el-col>
  </el-row> -->

  <DateSelect
    v-model="form.b_contractEndTime"
    v-show-field="['b_contractEndTime', includeFields]"
    name="b_contractEndTime"
    label="合同到期时间"
  />

  <DictSelect
    v-model="form.b_contractType"
    v-show-field="['b_contractType', includeFields]"
    label="合同类型"
    name="b_contractType"
    component="radio"
    dict-type="oa_daily_work_rsldhtxqsp_contract_type"
  />

  <BaseDetail :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseDetail from '../../../../components/BaseDetail.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import PostSelect from '@/views/modules/personnel/components/PostSelect.vue'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['b_userId', 'b_deptId', 'b_postIds', 'b_sex', 'b_age', 'b_contractEndTime', 'b_contractType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>(form)
</script>
