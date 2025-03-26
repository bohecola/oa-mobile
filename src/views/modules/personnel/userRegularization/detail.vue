<template>
  <van-form
    ref="Form"
    v-loading="isLoading"
    class="reset-label"
    label-width="auto"
    label-align="top"
    input-align="left"
    readonly
  >
    <UserRegularizationSelect
      v-model="form.userId"
      v-show-field="['userId', includeFields]"
      name="userId"
      label="员工"
    />

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
    />

    <van-field
      v-model="form.probationPeriod"
      v-show-field="['probationPeriod', includeFields]"
      name="probationPeriod"
      label="试用期时长(月)"
    />

    <DateSelect
      v-model="form.formalDate"
      v-show-field="['formalDate', includeFields]"
      name="formalDate"
      label="转正日期"
    />

    <DictSelect
      v-model="form.formalType"
      v-show-field="['formalType', includeFields]"
      label="用人单位意见"
      name="formalType"
      dict-type="oa_formal_type"
    />

    <van-field
      v-model="form.description"
      v-show-field="['description', includeFields]"
      name="description"
      label="原因说明"
    >
      <template #input>
        <TextareaView :value="form.description" />
      </template>
    </van-field>

    <van-field
      v-show-field="['ossIdList', includeFields]"
      name="ossIdList"
      label="附件列表"
    >
      <template #input>
        <UploadFile
          v-model="form.ossIdList"
          readonly
        />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import UserRegularizationSelect from '../components/UserInfoSelect.vue'
import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { UserRegularizationForm } from '@/api/oa/personnel/userRegularization/types'

withDefaults(
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
// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { Form, form, isLoading, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserRegularizationForm>()

defineExpose({
  reset,
  workflowView,
})
</script>
