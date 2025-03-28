<template>
  <van-form
    ref="Form"
    v-loading="isLoading && showLoading"
    label-width="auto"
    label-align="top"
    input-align="left"
    required="auto"
    scroll-to-error
  >
    <DeptSelect
      v-model="form.parentId"
      v-show-field="['parentId', includeFields]"
      name="parentId"
      label="上级部门名称"
      placeholder="请选择上级部门"
      :rules="computedRules.parentId"
      with-default-root-node
      @node-click="getNode"
    />

    <van-field
      v-model.trim="form.deptName"
      v-show-field="['deptName', includeFields]"
      name="deptName"
      label="部门名称"
      :rules="computedRules.deptName"
    />

    <DictSelect
      v-model="form.type"
      v-show-field="['type', includeFields]"
      label="部门类型"
      name="type"
      dict-type="sys_dept_type"
      :rules="computedRules.type"
    />

    <DictSelect
      v-model="form.businessType"
      v-show-field="['businessType', includeFields]"
      label="业务类型"
      name="businessType"
      dict-type="oa_project_business_type"
      :rules="computedRules.businessType"
    />

    <van-field
      v-model="form.redFile"
      v-show-field="['redFile', includeFields]"
      name="redFile"
      label="红头文件"
      :rules="computedRules.redFile"
    >
      <template #input>
        <YesNoSwitch v-model="form.redFile" />
      </template>
    </van-field>

    <van-field
      v-model.trim="form.deptCategory"
      v-show-field="['deptCategory', includeFields]"
      name="deptCategory"
      label="类型编码"
      :rules="computedRules.deptCategory"
    />

    <van-field
      v-model="form.leader"
      v-show-field="['leader', includeFields]"
      name="leader"
      label="负责人"
      :rules="computedRules.leader"
      is-link
      @click="UserSelectRef?.open"
    >
      <template #input>
        <UserSelect ref="UserSelectRef" v-model="form.leader" :multiple="false" />
      </template>
    </van-field>

    <van-field
      v-if="form.type === '2'"
      v-model="form.specialCommercialInsurance"
      v-show-field="['specialCommercialInsurance', includeFields]"
      name="specialCommercialInsurance"
      label="购买商业保险"
      :rules="computedRules.specialCommercialInsurance"
    >
      <template #input>
        <YesNoSwitch v-model="form.specialCommercialInsurance" />
      </template>
    </van-field>

    <van-field-number
      v-if="form.specialCommercialInsurance === 'Y'"
      v-model.number="form.insuranceLimit"
      v-show-field="['insuranceLimit', includeFields]"
      name="insuranceLimit"
      label="保险额度"
      :rules="computedRules.insuranceLimit"
    />

    <van-field
      v-model="form.responsibility"
      v-show-field="['responsibility', includeFields]"
      label="部门职能"
      type="textarea"
      rows="1"
      autosize
      name="responsibility"
      :rules="computedRules.responsibility"
    />

    <van-field
      v-model="form.purview"
      v-show-field="['purview', includeFields]"
      label="部门权限"
      type="textarea"
      rows="1"
      autosize
      name="purview"
      :rules="computedRules.purview"
    />

    <van-field
      v-model="form.address"
      v-show-field="['address', includeFields]"
      label="地址"
      type="textarea"
      rows="1"
      autosize
      name="address"
      :rules="computedRules.address"
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
import { useForm } from './form'
import type { DeptForm, DeptVO } from '@/api/system/dept/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import UserSelect from '@/components/UserSelect/index.vue'

const props = withDefaults(
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

// 表单
const { Form, form, rules, isLoading, updateLoading, reset, submit, view, workflowSubmit, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<DeptForm>()

const UserSelectRef = ref<InstanceType<typeof UserSelect> | null>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<DeptForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }
  return newRules
})

// 选择部门获取当前节点的公司id
function getNode(node: DeptVO) {
  form.value.companyId = node.companyId
}

defineExpose({
  form,
  isLoading,
  updateLoading,
  reset,
  view,
  submit,
  workflowSubmit,
  workflowView,
})
</script>
