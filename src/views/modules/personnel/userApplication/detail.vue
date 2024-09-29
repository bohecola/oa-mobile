<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="10em">
    <van-field v-if="form.name" v-model="form.name" v-show-field="['name', includeFields]" name="name" label="姓名：" />
    <van-field v-else v-model="form.preEmploymentId" v-show-field="['preEmploymentId', includeFields]" name="preEmploymentId" label="姓名：">
      <template #input>
        <dict-tag :options="preOptions" :value="form.preEmploymentId" />
      </template>
    </van-field>

    <van-field v-model="form.deptName" v-show-field="['deptName', includeFields]" name="deptName" label="部门名称：" />
    <van-field v-model="form.postName" v-show-field="['postName', includeFields]" name="postName" label="岗位名称：" />
    <van-field v-model="form.sex" v-show-field="['sex', includeFields]" name="sex" label="性别">
      <template #input>
        <dict-tag :options="sys_user_sex" :value="form.sex" />
      </template>
    </van-field>
    <van-field v-model="form.phonenumber" v-show-field="['phonenumber', includeFields]" name="phonenumber" label="手机号：" />
    <van-field v-model="form.isProbation" v-show-field="['isProbation', includeFields]" name="isProbation" label="是否有试用期">
      <template #input>
        <dict-tag :options="sys_yes_no" :value="form.isProbation" />
      </template>
    </van-field>
    <van-field v-model="form.probationCycle" v-show-field="['probationCycle', includeFields]" name="probationCycle" label="试用期时长(月):" />
    <van-field v-model="form.nation" v-show-field="['nation', includeFields]" name="nation" label="民族：">
      <template #input>
        <dict-tag :options="oa_nation" :value="form.nation" />
      </template>
    </van-field>
    <van-field v-model="form.education" v-show-field="['education', includeFields]" name="education" label="学历：">
      <template #input>
        <dict-tag :options="oa_education_type" :value="form.education" />
      </template>
    </van-field>

    <van-field v-model="form.hopeDate" v-show-field="['hopeDate', includeFields]" name="hopeDate" label="预计到岗日期：">
      <template #input>
        {{ parseTime(form.hopeDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>

    <van-field v-model="form.wages" v-show-field="['wages', includeFields]" name="wages" label="工资：" />
    <van-field v-model="form.baseWages" v-show-field="['baseWages', includeFields]" name="baseWages" label="基本工资：" />
    <van-field v-model="form.postWages" v-show-field="['postWages', includeFields]" name="postWages" label="岗位工资：" />
    <van-field v-model="form.performanceWages" v-show-field="['performanceWages', includeFields]" name="performanceWages" label="绩效工资:" />
    <van-field v-model="form.probationWagesRate" v-show-field="['probationWagesRate', includeFields]" name="probationWagesRate" label="试用期薪资发放标准:" />

    <van-field v-model="form.realDate" v-show-field="['realDate', includeFields]" name="realDate" label="实际到岗日期：">
      <template #input>
        {{ parseTime(form.realDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>

    <van-field v-model="form.userAccount" v-show-field="['userAccount', includeFields]" name="userAccount" label="系统账号:" />
    <van-field v-model="form.description" v-show-field="['description', includeFields]" name="description" label="描述：">
      <template #input>
        <TextareaView :value="form.description" />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import { useForm } from './form'
// import PreUserSelect from './workflow/components/PreUserSelect.vue'
import type { UserEmploymentForm } from '@/api/oa/personnel/userApplication/types'
import { listUserPreEmployment } from '@/api/oa/personnel/userPreEmployment'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

const props = withDefaults(
  defineProps<{
    includeFields?: (keyof UserEmploymentForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof UserEmploymentForm)[]
    },
    showLoading: true,
  },
)
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_education_type, oa_nation, sys_user_sex, sys_yes_no } = toRefs<any>(
  proxy?.useDict('oa_education_type', 'oa_nation', 'sys_user_sex', 'sys_yes_no'),
)

// 表单
const { Form, form, isLoading, rules, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserEmploymentForm>()

// 预入职员工选项数据
const preOptions = ref<DictDataOption[]>([])
async function getPREOptions() {
  const res = await listUserPreEmployment()
  preOptions.value = res.rows.map(item => ({ label: item.name, value: item.id }))
}
onMounted(async () => {
  await getPREOptions()
})
defineExpose({
  reset,
  view,
  workflowView,
})
</script>
