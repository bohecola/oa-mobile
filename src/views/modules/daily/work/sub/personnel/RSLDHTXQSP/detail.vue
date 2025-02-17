<template>
  <van-field v-show-field="['b_userId', includeFields]" label="员工" name="b_userId" input-align="right">
    <template #input>
      <UserSelect v-model="form.b_userId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['b_deptId', includeFields]" label="部门/项目部" name="b_deptId" input-align="right">
    <template #input>
      <DeptSelect v-model="form.b_deptId" readonly />
    </template>
  </van-field>

  <van-field v-show-field="['b_postIds', includeFields]" label="岗位" name="b_postIds" input-align="right">
    <template #input>
      <PostSelect v-model="form.b_postIds" :dept-id="form.b_deptId" multiple readonly />
    </template>
  </van-field>

  <van-field v-show-field="['b_sex', includeFields]" label="性别" name="b_sex" input-align="right">
    <template #input>
      <DictSelect v-model="form.b_sex" dict-type="sys_user_sex" readonly />
    </template>
  </van-field>

  <!-- <el-row :gutter="20">
    <el-col v-show-field="['b_age', includeFields]" :span="24">
      <el-form-item prop="b_age" label="年龄">
        {{ form.b_age }}
      </el-form-item>
    </el-col>
  </el-row> -->

  <van-field v-show-field="['b_contractEndTime', includeFields]" label="合同到期时间" name="b_contractEndTime" input-align="right">
    <template #input>
      {{ parseTime(form.b_contractEndTime, '{y}-{m}-{d}') }}
    </template>
  </van-field>

  <van-field v-show-field="['b_contractType', includeFields]" label="合同类型" name="b_contractType" input-align="right">
    <template #input>
      <dict-select v-model="form.b_contractType" component="checkbox" dict-type="oa_daily_work_rsldhtxqsp_contract_type" multiple readonly />
    </template>
  </van-field>

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
