<template>
  <van-form
    ref="Form"
    v-loading="isLoading"
    label-width="auto"
    label-align="top"
    input-align="left"
    required="auto"
    scroll-to-error
  >
    <UserInfoSelect
      v-model="form.userId"
      v-show-field="['userId', includeFields]"
      name="userId"
      label="员工"
      :rules="computedRules.userId"
      clearable
      @confirm="confirmUserId"
    />

    <div v-if="form.id">
      <DeptSelect
        v-model="form.deptId"
        v-show-field="['deptId', includeFields]"
        name="deptId"
        label="部门名称"
      />

      <van-field
        v-model="form.postName"
        v-show-field="['postName', includeFields]"
        name="postName"
        label="岗位名称"
      />

      <DateSelect
        v-model="form.entryCompanyDate"
        v-show-field="['entryCompanyDate', includeFields]"
        name="entryCompanyDate"
        label="入职日期"
        readonly
      />

      <van-field-number
        v-model.number="form.probationPeriod"
        v-show-field="['probationPeriod', includeFields]"
        name="probationPeriod"
        label="试用期时长(月)"
        readonly
      />
    </div>

    <DateSelect
      v-model="form.formalDate"
      v-show-field="['formalDate', includeFields]"
      name="formalDate"
      label="转正日期"
      :rules="computedRules.formalDate"
    />

    <DictSelect
      v-model="form.formalType"
      v-show-field="['formalType', includeFields]"
      label="用人单位意见"
      name="formalType"
      dict-type="oa_formal_type"
      :rules="computedRules.formalType"
    />

    <van-field
      v-model="form.description"
      v-show-field="['description', includeFields]"
      label="原因说明"
      type="textarea"
      rows="1"
      autosize
      name="description"
      :rules="form.formalType === '0' ? computedRules.description : computedRules.entryCompanyDate"
    />

    <!-- 附件列表 -->
    <van-field
      v-show-field="['ossIdList', includeFields]"
      name="ossIdList"
      label="附件列表"
      placeholder="请选择"
      :rules="computedRules.ossIdList"
    >
      <template #input>
        <UploadFile v-model="form.ossIdList" value-type="array" />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import UserInfoSelect from '../components/UserInfoSelect.vue'
import { useForm } from './form'
import type { UserInfoVo } from '@/api/system/user/types'
import { getUserMessageAll } from '@/api/oa/personnel/user/index'
import { getDept } from '@/api/system/dept'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { UserRegularizationForm } from '@/api/oa/personnel/userRegularization/types'

const props = withDefaults(
  defineProps<{
    includeFields?: (keyof UserRegularizationForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof UserRegularizationForm)[]
    },
    showLoading: true,
  },
)

// 表单
const { Form, form, rules, isLoading, reset, workflowSubmit, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<UserRegularizationForm>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<UserRegularizationForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }
  return newRules
})

async function confirmUserId(userId: UserInfoVo) {
  const { data } = await getUserMessageAll(userId as string)
  form.value.id = data.userInfoVo?.id
  // 年月日
  form.value.entryCompanyDate = data.userInfoVo?.entryCompanyDate.split(' ')[0]
  form.value.probationPeriod = data.userInfoVo?.probationPeriod
  form.value.userName = data.user?.nickName
  form.value.deptId = data.userVo.user?.deptId
  form.value.postId = data.userVo.postIds?.join(',')
  form.value.postName = data.userVo.posts?.map(item => item.postName).join('、')
  form.value.level = data.postVo?.level
  getDeptType(form.value.deptId)
}

// 获取部门类型(公司、部门、项目部)
async function getDeptType(deptId: string | number) {
  const res = await getDept(deptId)
  form.value.deptType = res.data.type
}

defineExpose({
  isLoading,
  reset,
  workflowSubmit,
  workflowView,
})
</script>
