<template>
  <van-form ref="Form" v-loading="isLoading" readonly label-width="8em">
    <van-field v-show-field="['userId', includeFields]" name="userId" label="员工：">
      <template #input>
        <UserSelect v-model="form.userId" />
      </template>
    </van-field>

    <van-field v-model="form.deptName" v-show-field="['deptName', includeFields]" name="deptName" label="部门名称：" />
    <van-field v-model="form.postName" v-show-field="['postName', includeFields]" name="postName" label="岗位名称：" />

    <van-field v-model="form.handoverPerson" name="handoverPerson" label="交接人：">
      <template #input>
        <UserSelect v-model="form.handoverPerson" />
      </template>
    </van-field>

    <!-- <van-field v-model="form.departDate" v-show-field="['departDate', includeFields]" name="departDate" label="实际离职日期：">
      <template #input>
        {{ parseTime(form.departDate, '{y}-{m}-{d}') }}
      </template>
    </van-field> -->

    <van-field v-model="form.reason" v-show-field="['reason', includeFields]" name="reason" label="离职原因：">
      <template #input>
        <TextareaView :value="form.reason" />
      </template>
    </van-field>
    <van-field v-model="form.handoverContent" v-show-field="['handoverContent', includeFields]" name="handoverContent" label="交接内容：">
      <template #input>
        <TextareaView :value="form.handoverContent" />
      </template>
    </van-field>
    <van-field v-model="form.documentContent" v-show-field="['documentContent', includeFields]" name="documentContent" label="归档内容：">
      <template #input>
        <TextareaView :value="form.documentContent" />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
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
