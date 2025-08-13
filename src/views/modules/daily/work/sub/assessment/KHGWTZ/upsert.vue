<template>
  <van-field
    v-show-field="['vv_userId', includeFields]"
    label="员工"
    name="vv_userId"
    is-link
    @click="UserSelectRef?.open"
  >
    <template #input>
      <UserSelect
        ref="UserSelectRef"
        v-model="form.vv_userId"
        @confirm="onUserConfirm"
      />
    </template>
  </van-field>

  <DeptSelect
    v-model="form.vv_deptId"
    v-show-field="['vv_deptId', includeFields]"
    label="部门/项目部"
    name="vv_deptId"
    readonly
  />

  <PostSelect
    v-model="form.vv_oldPostId"
    v-show-field="['vv_oldPostId', includeFields]"
    label="原岗位"
    name="vv_oldPostId"
    :dept-id="form.vv_deptId"
    readonly
  />

  <PostSelect
    v-model="form.vv_newPostId"
    v-show-field="['vv_newPostId', includeFields]"
    :dept-id="form.vv_deptId"
    label="新岗位"
    name="vv_newPostId"
  />

  <BaseUpsert :include-fields="includeFields" />
</template>

<script setup lang="ts">
import BaseUpsert from '../../../../components/BaseUpsert.vue'
import type { UserVO } from '@/api/system/user/types'
import type { DailyWorkForm } from '@/api/oa/daily/work/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import UserSelect from '@/components/UserSelect/index.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DailyWorkForm>
  }>(),
  {
    includeFields: () => [
      'vv_userId',
      'vv_deptId',
      'vv_oldPostId',
      'vv_newPostId',
      'reason',
      'ossIdList',
    ],
  },
)

const UserSelectRef = ref<InstanceType<typeof UserSelect>>()

// 依赖收集
const trackFields = inject<TrackFieldsFn<DailyWorkForm>>('trackFields')
trackFields(props.includeFields)

// 表单
const form = inject<Ref<DailyWorkForm>>('form')

// 指令
const vShowField = createFieldVisibilityDirective<DailyWorkForm>()

function onUserConfirm(_: string, [user]: UserVO[]) {
  form.value.needDepts = user?.deptId
  form.value.vv_userName = user?.nickName
  form.value.vv_deptId = user?.deptId
  form.value.vv_oldPostId = user?.postIdStr
  form.value.vv_newPostId = undefined
}
</script>
