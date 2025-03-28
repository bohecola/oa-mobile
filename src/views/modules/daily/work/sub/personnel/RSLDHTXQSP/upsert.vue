<template>
  <van-field
    v-model="form.b_userId"
    v-show-field="['b_userId', includeFields]"
    label="员工"
    name="b_userId"
    :rules="computedRules.b_userId"
    is-link
    @click="UserSelectRef?.open"
  >
    <template #input>
      <UserSelect
        ref="UserSelectRef"
        v-model="form.b_userId"
        @confirm="onUserSelectValueChange"
      />
    </template>
  </van-field>

  <DeptSelect
    v-model="form.b_deptId"
    v-show-field="['b_deptId', includeFields]"
    name="b_deptId"
    label="部门/项目部"
    readonly
  />

  <PostSelect
    v-model="form.b_postIds"
    v-show-field="['b_postIds', includeFields]"
    name="b_postIds"
    label="岗位"
    multiple
    :dept-id="form.b_deptId"
    readonly
  />

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
    :rules="computedRules.b_contractEndTime"
  />

  <DictSelect
    v-model="form.b_contractType"
    v-show-field="['b_contractType', includeFields]"
    label="合同类型"
    name="b_contractType"
    component="radio"
    dict-type="oa_daily_work_rsldhtxqsp_contract_type"
    :rules="computedRules.b_contractType"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import type { UserVO } from '@/api/system/user/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import UserSelect from '@/components/UserSelect/index.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => ['b_userId', 'b_deptId', 'b_postIds', 'b_sex', 'b_age', 'b_contractEndTime', 'b_contractType', 'reason', 'ossIdList'],
  },
)

const form = inject<Ref<DailyWorkForm>>('form')
// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

const computedRules = inject<Ref<FormRules<DailyWorkForm>>>('computedRules')

const UserSelectRef = ref<InstanceType<typeof UserSelect> | null>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

function onUserSelectValueChange(val: UserVO, selectedList: UserVO[]) {
  form.value.needDepts = selectedList[0].deptId as string
  form.value.maxPostLevel = selectedList[0].maxPostLevel

  form.value.b_deptId = selectedList[0].deptId
  form.value.b_sex = selectedList[0].sex
  form.value.b_postIds = selectedList[0].postIdStr
}
</script>
