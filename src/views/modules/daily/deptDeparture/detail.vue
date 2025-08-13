<template>
  <van-form
    ref="Form"
    v-loading="isLoading && showLoading"
    class="reset-label"
    label-width="auto"
    label-align="top"
    input-align="left"
    readonly
  >
    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      label="部门/项目部"
      name="deptId"
    />

    <DateSelect
      v-model="form.departureDate"
      v-show-field="['departureDate', includeFields]"
      label="撤场日期"
      name="departureDate"
      clearable
    />

    <van-field
      v-model="form.reason"
      v-show-field="['reason', includeFields]"
      name="reason"
      label="撤场说明"
      type="textarea"
      rows="1"
      autosize
    />

    <van-field
      v-show-field="['isAssign', includeFields]"
      label="委托他人提交资料"
      name="isAssign"
    >
      <template #input>
        <YesNoSwitch v-model="form.isAssign" readonly />
      </template>
    </van-field>

    <van-field
      v-if="form.isAssign === 'Y'"
      v-show-field="['assignUser', includeFields]"
      label="指派人"
      name="assignUser"
    >
      <template #input>
        <UserSelect v-model="form.assignUser" />
      </template>
    </van-field>

    <van-field
      v-show-field="['ossIdList', includeFields]"
      label="附件"
      name="ossIdList"
    >
      <template #input>
        <UploadFile
          v-model="form.ossIdList"
          value-type="array"
          readonly
        />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import { useForm } from './form'
import type { DeptDepartureForm } from '@/api/oa/daily/deptDeparture/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: KeysOfArray<DeptDepartureForm>
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as KeysOfArray<DeptDepartureForm>
    },
    showLoading: true,
  },
)

const { Form, form, isLoading, reset, view, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<DeptDepartureForm>()

defineExpose({
  Form,
  reset,
  view,
  workflowView,
})
</script>
