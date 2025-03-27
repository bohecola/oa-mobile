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
    <van-field
      v-show-field="['userId', includeFields]"
      name="userId"
      label="员工"
    >
      <template #input>
        <UserSelect
          v-model="form.userId"
          readonly
        />
      </template>
    </van-field>

    <DictSelect
      v-model="form.type"
      v-show-field="['type', includeFields]"
      label="类型"
      name="type"
      dict-type="oa_transfer_type"
    />

    <CompanySelect
      v-model="form.oldCompanyId"
      v-show-field="['oldCompanyId', includeFields]"
      label="原公司"
      name="oldCompanyId"
    />

    <DeptSelect
      v-model="form.oldDeptId"
      v-show-field="['oldDeptId', includeFields]"
      name="oldDeptId"
      label="原部门/项目部"
    />

    <PostSelect
      v-model="form.oldPostId"
      v-show-field="['oldPostId', includeFields]"
      name="oldPostId"
      label="原岗位"
      multiple
      :dept-id="form.oldDeptId"
    />

    <CompanySelect
      v-model="form.newCompanyId"
      v-show-field="['newCompanyId', includeFields]"
      label="调入公司"
      name="newCompanyId"
    />

    <DeptSelect
      v-model="form.newDeptId"
      v-show-field="['newDeptId', includeFields]"
      name="newDeptId"
      label="调入部门/项目部"
    />

    <PostSelect
      v-model="form.newPostId"
      v-show-field="['newPostId', includeFields]"
      name="newPostId"
      label="调入岗位"
      multiple
      :dept-id="form.newDeptId"
    />

    <DateSelect
      v-model="form.startDate"
      v-show-field="['startDate', includeFields]"
      name="startDate"
      label="生效日期"
    />

    <DateSelect
      v-model="form.endDate"
      v-show-field="['endDate', includeFields]"
      name="endDate"
      label="截止日期"
    />

    <van-field
      v-show-field="['iscommander', includeFields]"
      name="iscommander"
      label="是否具有主管权限"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.iscommander"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-if="form.iscommander === 'Y'"
      v-show-field="['commanderPowerHandover', includeFields]"
      name="commanderPowerHandover"
      label="主管权限交接人"
    >
      <template #input>
        <UserSelect
          v-model="form.commanderPowerHandover"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-if="!isNil(form.oldSpecialCommercialInsurance) && form.oldDeptType === '2'"
      v-show-field="['oldSpecialCommercialInsurance', includeFields]"
      name="oldSpecialCommercialInsurance"
      label="原部门购买特殊商业保险"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.oldSpecialCommercialInsurance"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-if="!isNil(form.newSpecialCommercialInsurance) && form.newDeptType === '2'"
      v-show-field="['newSpecialCommercialInsurance', includeFields]"
      name="newSpecialCommercialInsurance"
      label="新部门购买特殊商业保险"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.newSpecialCommercialInsurance"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-model="form.reason"
      v-show-field="['reason', includeFields]"
      name="reason"
      label="调用原因"
    >
      <template #input>
        <TextareaView :value="form.reason" />
      </template>
    </van-field>

    <van-field
      v-model="form.remark"
      v-show-field="['remark', includeFields]"
      name="remark"
      label="备注"
    >
      <template #input>
        <TextareaView :value="form.remark" />
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

<script setup name="userTransferDetail" lang="ts">
import { isNil } from 'lodash-es'
import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { UserTransferForm } from '@/api/oa/personnel/userTransfer/types'

withDefaults(
  defineProps<{
    includeFields?: (keyof UserTransferForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof UserTransferForm)[]
    },
    showLoading: true,
  },
)

const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserTransferForm>()

defineExpose({
  view,
  reset,
  workflowView,
})
</script>
