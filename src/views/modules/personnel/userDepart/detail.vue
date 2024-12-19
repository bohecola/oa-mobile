<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="8em">
    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['userId', includeFields]" name="userId" label="员工" input-align="right">
        <template #input>
          <UserSelect v-model="form.userId" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['deptId', includeFields]" name="deptId" label="部门名称" input-align="right">
        <template #input>
          <DeptSelect v-model="form.deptId" readonly />
        </template>
      </van-field>

      <van-field v-model="form.postName" v-show-field="['postName', includeFields]" name="postName" label="岗位名称" input-align="right" />

      <van-field v-model="form.entryCompanyDate" v-show-field="['entryCompanyDate', includeFields]" name="entryCompanyDate" label="入职时间">
        <template #input>
          {{ parseTime(form.entryCompanyDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-show-field="['entryCompanyDate', includeFields]" name="entryCompanyDate" label="购买特殊商业保险">
        <template #input>
          <YesNoSwitch v-model="form.specialCommercialInsurance" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['isLoginCompanyEmail', includeFields]" name="isLoginCompanyEmail" label="是否登录过项目部公司邮箱">
        <template #input>
          <YesNoSwitch v-model="form.isLoginCompanyEmail" readonly />
        </template>
      </van-field>

      <van-field v-model="form.handoverPerson" name="handoverPerson" label="交接人" input-align="right">
        <template #input>
          <UserSelect v-model="form.handoverPerson" readonly />
        </template>
      </van-field>

      <van-field v-model="form.departDate" v-show-field="['departDate', includeFields]" name="departDate" label="实际离职日期">
        <template #input>
          {{ parseTime(form.departDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.reason" v-show-field="['reason', includeFields]" name="reason" label="离职原因" input-align="right">
        <template #input>
          <TextareaView :value="form.reason" />
        </template>
      </van-field>

      <van-field v-model="form.handoverContent" v-show-field="['handoverContent', includeFields]" name="handoverContent" label="交接内容" input-align="right">
        <template #input>
          <TextareaView :value="form.handoverContent" />
        </template>
      </van-field>

      <van-field v-model="form.documentContent" v-show-field="['documentContent', includeFields]" name="documentContent" label="归档内容" input-align="right">
        <template #input>
          <TextareaView :value="form.documentContent" />
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
import type { UserDepartForm } from '@/api/oa/personnel/userDepart/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: (keyof UserDepartForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof UserDepartForm)[]
    },
    showLoading: true,
  },
)

const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserDepartForm>()

defineExpose({
  view,
  reset,
  workflowView,
})
</script>
