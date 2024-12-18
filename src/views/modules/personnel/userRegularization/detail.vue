<template>
  <van-form ref="Form" v-loading="isLoading" readonly label-width="8em">
    <van-cell-group inset class="!my-3">
      <van-field v-model="form.userName" v-show-field="['userId', includeFields]" name="userName" label="员工" input-align="right" />

      <van-field v-show-field="['deptId', includeFields]" name="deptId" label="部门名称" input-align="right">
        <template #input>
          <DeptSelect v-model="form.deptId" readonly />
        </template>
      </van-field>

      <van-field v-model="form.postName" v-show-field="['postName', includeFields]" name="postName" label="岗位名称" input-align="right" />

      <van-field v-model="form.entryCompanyDate" v-show-field="['entryCompanyDate', includeFields]" name="entryCompanyDate" label="入职日期" input-align="right">
        <template #input>
          {{ parseTime(form.entryCompanyDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.probationPeriod" v-show-field="['probationPeriod', includeFields]" name="probationPeriod" label="试用期时长(月)" input-align="right" />

      <van-field v-model="form.formalDate" v-show-field="['formalDate', includeFields]" name="formalDate" label="转正日期" input-align="right">
        <template #input>
          {{ parseTime(form.formalDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.formalType" v-show-field="['formalType', includeFields]" name="formalType" label="用人单位意见" input-align="right">
        <template #input>
          <DictSelect v-model="form.formalType" dict-type="oa_formal_type" readonly />
        </template>
      </van-field>

      <van-cell v-show-field="['files', includeFields]" title="附件" input-align="right">
        <template #value>
          <UploadFile v-model="form.files" readonly :card-size="60" />
        </template>
      </van-cell>

      <van-field v-model="form.description" v-show-field="['description', includeFields]" name="description" label="原因说明" input-align="right">
        <template #input>
          <TextareaView :value="form.description" />
        </template>
      </van-field>
    </van-cell-group>
    <!-- 附件列表 -->
    <TableCard v-show-field="['ossIdList', includeFields]" title="附件列表" class="mx-4" :is-empty="isEmpty(form.ossIdList)">
      <UploadFile v-model="form.ossIdList" readonly :card-size="60" />
    </TableCard>
  </van-form>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es'
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
