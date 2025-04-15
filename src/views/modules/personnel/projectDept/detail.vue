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
      v-model="form.parentId"
      v-show-field="['parentId', includeFields]"
      name="parentId"
      label="上级部门名称"
      with-default-root-node
    />

    <van-field
      v-model.trim="form.deptName"
      v-show-field="['deptName', includeFields]"
      name="deptName"
      label="部门名称"
    />

    <DictSelect
      v-model="form.type"
      v-show-field="['type', includeFields]"
      label="部门类型"
      name="type"
      dict-type="sys_dept_type"
    />

    <DictSelect
      v-model="form.businessType"
      v-show-field="['businessType', includeFields]"
      label="业务类型"
      name="businessType"
      dict-type="oa_project_business_type"
    />

    <van-field
      v-model="form.redFile"
      v-show-field="['redFile', includeFields]"
      name="redFile"
      label="红头文件"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.redFile"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-model.trim="form.deptCategory"
      v-show-field="['deptCategory', includeFields]"
      name="deptCategory"
      label="类型编码"
    />

    <van-field
      v-model="form.leader"
      v-show-field="['leader', includeFields]"
      name="leader"
      label="负责人"
    >
      <template #input>
        <UserSelect
          v-model="form.leader"
          :multiple="false"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-if="form.type === '2'"
      v-model="form.specialCommercialInsurance"
      v-show-field="['specialCommercialInsurance', includeFields]"
      name="specialCommercialInsurance"
      label="购买商业保险"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.specialCommercialInsurance"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-if="form.specialCommercialInsurance === 'Y'"
      v-model="form.insuranceLimit"
      v-show-field="['insuranceLimit', includeFields]"
      name="insuranceLimit"
      label="保险额度"
    />

    <van-field
      v-model="form.responsibility"
      v-show-field="['responsibility', includeFields]"
      name="responsibility"
      label="部门职能"
    >
      <template #input>
        <TextareaView :value="form.responsibility" />
      </template>
    </van-field>

    <van-field
      v-model="form.purview"
      v-show-field="['purview', includeFields]"
      name="purview"
      label="部门权限"
    >
      <template #input>
        <TextareaView :value="form.purview" />
      </template>
    </van-field>

    <van-field
      v-model="form.address"
      v-show-field="['address', includeFields]"
      name="address"
      label="地址"
    >
      <template #input>
        <TextareaView :value="form.address" />
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
import { useForm } from './form'
import UserSelect from '@/components/UserSelect/index.vue'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { DeptForm } from '@/api/system/dept/types'

withDefaults(
  defineProps<{
    includeFields?: (keyof DeptForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof DeptForm)[]
    },
    showLoading: true,
  },
)

const { Form, form, isLoading, view, reset, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<DeptForm>()

defineExpose({
  view,
  reset,
  workflowView,
})
</script>
