<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="10em">
    <van-cell-group inset class="!my-3">
      <van-field v-model="form.name" name="name" label="姓名：" input-align="right" />

      <van-field v-model="form.deptName" v-show-field="['deptName', includeFields]" name="deptName" label="部门名称：" input-align="right" />
      <van-field v-model="form.postName" v-show-field="['postName', includeFields]" name="postName" label="岗位名称：" input-align="right" />
      <van-field v-model="form.sex" v-show-field="['sex', includeFields]" name="sex" label="性别：" input-align="right">
        <template #input>
          <dict-tag :options="sys_user_sex" :value="form.sex" />
        </template>
      </van-field>
      <van-field v-model="form.phonenumber" v-show-field="['phonenumber', includeFields]" name="phonenumber" label="手机号：" input-align="right" />
      <van-field v-model="form.isProbation" v-show-field="['isProbation', includeFields]" name="isProbation" label="是否有试用期：" input-align="right">
        <template #input>
          <dict-tag :options="sys_yes_no" :value="form.isProbation" />
        </template>
      </van-field>
      <van-field v-if="form.probationCycle" v-model="form.probationCycle" v-show-field="['probationCycle', includeFields]" name="probationCycle" label="试用期时长(月)：" input-align="right" />
      <van-field v-model="form.nation" v-show-field="['nation', includeFields]" name="nation" label="民族：" input-align="right">
        <template #input>
          <dict-tag :options="oa_nation" :value="form.nation" />
        </template>
      </van-field>
      <van-field v-model="form.education" v-show-field="['education', includeFields]" name="education" label="学历：" input-align="right">
        <template #input>
          <dict-tag :options="oa_education_type" :value="form.education" />
        </template>
      </van-field>

      <van-field v-model="form.hopeDate" v-show-field="['hopeDate', includeFields]" name="hopeDate" label="预计到岗日期：" input-align="right">
        <template #input>
          {{ parseTime(form.hopeDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.wages" v-show-field="['wages', includeFields]" name="wages" label="工资：" input-align="right" />
      <van-field v-model="form.baseWages" v-show-field="['baseWages', includeFields]" name="baseWages" label="基本工资：" input-align="right" />
      <van-field v-model="form.postWages" v-show-field="['postWages', includeFields]" name="postWages" label="岗位工资：" input-align="right" />
      <van-field v-model="form.performanceWages" v-show-field="['performanceWages', includeFields]" name="performanceWages" label="绩效工资：" input-align="right" />
      <van-field v-model="form.probationWagesRate" v-show-field="['probationWagesRate', includeFields]" name="probationWagesRate" label="试用期薪资发放标准：" input-align="right" />

      <van-field v-model="form.realDate" v-show-field="['realDate', includeFields]" name="realDate" label="实际到岗日期：" input-align="right">
        <template #input>
          {{ parseTime(form.realDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.userAccount" v-show-field="['userAccount', includeFields]" name="userAccount" label="系统账号：" input-align="right" />
      <van-field v-model="form.description" v-show-field="['description', includeFields]" name="description" label="描述：" input-align="right">
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
// import PreUserSelect from './workflow/components/PreUserSelect.vue'
import type { UserEmploymentForm } from '@/api/oa/personnel/userApplication/types'
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
const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserEmploymentForm>()

defineExpose({
  reset,
  view,
  workflowView,
})
</script>
