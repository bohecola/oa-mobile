<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" class="reset-label" label-width="auto" label-align="top" readonly>
    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['userId', includeFields]" name="userId" label="员工" input-align="left">
        <template #input>
          <UserSelect v-model="form.userId" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['type', includeFields]" name="type" label="类型" input-align="left">
        <template #input>
          <DictSelect v-model="form.type" dict-type="oa_transfer_type" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['oldCompanyId', includeFields]" name="oldCompanyId" label="原公司" input-align="left">
        <template #input>
          <CompanySelect v-model="form.oldCompanyId" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['oldDeptId', includeFields]" name="oldDeptId" label="原部门/项目部" input-align="left">
        <template #input>
          <DeptCascader v-model="form.oldDeptId" :company-id="form.oldCompanyId" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['oldPostId', includeFields]" name="oldPostId" label="原岗位" input-align="left">
        <template #input>
          <PostSelect v-model="form.oldPostId" :dept-id="form.oldDeptId" multiple readonly />
        </template>
      </van-field>

      <van-field v-show-field="['newCompanyId', includeFields]" name="newCompanyId" label="新公司" input-align="left">
        <template #input>
          <CompanySelect v-model="form.newCompanyId" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['newDeptId', includeFields]" name="newDeptId" label="新部门/项目部" input-align="left">
        <template #input>
          <DeptCascader v-model="form.newDeptId" :company-id="form.newCompanyId" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['newPostId', includeFields]" name="newPostId" label="新岗位" input-align="left">
        <template #input>
          <PostSelect v-model="form.newPostId" :dept-id="form.newDeptId" multiple readonly />
        </template>
      </van-field>

      <van-field v-model="form.startDate" v-show-field="['startDate', includeFields]" name="startDate" label="生效日期" input-align="left">
        <template #input>
          {{ parseTime(form.startDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.endDate" v-show-field="['endDate', includeFields]" name="endDate" label="截止日期" input-align="left">
        <template #input>
          {{ parseTime(form.endDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-show-field="['iscommander', includeFields]" name="iscommander" label="是否具有主管权限" input-align="left">
        <template #input>
          <YesNoSwitch v-model="form.iscommander" readonly />
        </template>
      </van-field>

      <van-field v-if="form.iscommander === 'Y'" v-show-field="['commanderPowerHandover', includeFields]" name="commanderPowerHandover" label="主管权限交接人" input-align="left">
        <template #input>
          <UserSelect v-model="form.commanderPowerHandover" readonly />
        </template>
      </van-field>

      <van-field v-if="!isNil(form.oldSpecialCommercialInsurance) && form.oldDeptType === '2'" v-show-field="['oldSpecialCommercialInsurance', includeFields]" name="oldSpecialCommercialInsurance" label="原部门购买特殊商业保险" input-align="left">
        <template #input>
          <YesNoSwitch v-model="form.oldSpecialCommercialInsurance" readonly />
        </template>
      </van-field>

      <van-field v-if="!isNil(form.newSpecialCommercialInsurance) && form.newDeptType === '2'" v-show-field="['newSpecialCommercialInsurance', includeFields]" name="newSpecialCommercialInsurance" label="新部门购买特殊商业保险" input-align="left">
        <template #input>
          <YesNoSwitch v-model="form.newSpecialCommercialInsurance" readonly />
        </template>
      </van-field>

      <van-field v-model="form.reason" v-show-field="['reason', includeFields]" name="reason" label="调用原因" input-align="left">
        <template #input>
          <TextareaView :value="form.reason" />
        </template>
      </van-field>

      <van-field v-model="form.remark" v-show-field="['remark', includeFields]" name="remark" label="备注" input-align="left">
        <template #input>
          <TextareaView :value="form.remark" />
        </template>
      </van-field>
    </van-cell-group>

    <TableCard v-show-field="['ossIdList', includeFields]" title="附件列表" class="mx-4" :is-empty="isEmpty(form.ossIdList)">
      <UploadFile v-model="form.ossIdList" readonly :card-size="60" />
    </TableCard>
  </van-form>
</template>

<script setup name="userTransferDetail" lang="ts">
import { isEmpty, isNil } from 'lodash-es'
import CompanySelect from '../components/ComanySelect.vue'
import DeptCascader from '../components/DeptCascader.vue'
import PostSelect from '../components/PostSelect.vue'
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
// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserTransferForm>()

defineExpose({
  view,
  reset,
  workflowView,
})
</script>
