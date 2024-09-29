<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="8em">
    <van-field v-show-field="['parentId', includeFields]" name="parentId" label="上级部门名称：">
      <template #input>
        <DeptSelect v-model="form.parentId" readonly />
      </template>
    </van-field>

    <van-field v-show-field="['deptId', includeFields]" name="deptId" label="部门名称：">
      <template #input>
        <DeptSelect v-model="form.deptId" readonly />
      </template>
    </van-field>

    <van-field v-model="form.type" v-show-field="['type', includeFields]" name="type" label="部门类型：">
      <template #input>
        <dict-tag :options="sys_dept_type" :value="form.type" />
      </template>
    </van-field>

    <van-field v-model="form.deptCategory" v-show-field="['deptCategory', includeFields]" name="deptCategory" label="类型编码：" />

    <van-field v-show-field="['leader', includeFields]" name="leader" label="负责人：">
      <template #input>
        <UserSelect v-model="form.leader" readonly />
      </template>
    </van-field>

    <van-field v-model="form.redFile" v-show-field="['redFile', includeFields]" name="redFile" label="红头文件：">
      <template #input>
        <dict-tag :options="sys_yes_no" :value="form.redFile" />
      </template>
    </van-field>

    <van-field v-model="form.responsibility" v-show-field="['responsibility', includeFields]" name="responsibility" label="部门职能">
      <template #input>
        <TextareaView :value="form.responsibility" />
      </template>
    </van-field>

    <van-field v-model="form.purview" v-show-field="['purview', includeFields]" name="purview" label="部门权限">
      <template #input>
        <TextareaView :value="form.purview" />
      </template>
    </van-field>

    <van-field v-model="form.adress" v-show-field="['adress', includeFields]" name="adress" label="地址">
      <template #input>
        <TextareaView :value="form.adress" />
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
// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { sys_dept_type, sys_yes_no } = toRefs<any>(proxy?.useDict('sys_dept_type', 'sys_yes_no'))

const { Form, form, isLoading, view, reset, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<DeptForm>()

defineExpose({
  view,
  reset,
  workflowView,
})
</script>
