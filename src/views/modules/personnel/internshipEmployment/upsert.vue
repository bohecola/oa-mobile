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
    <UserInfoSelect
      v-model="form.userInfoId"
      v-show-field="['userInfoId', includeFields]"
      name="userInfoId"
      label="员工"
      :rules="computedRules.userInfoId"
      clearable
      :params="{ status: '-1' }"
      :filter-post="true"
      @get-row="confirmUserInfo"
    />

    <DeptSelect
      v-model="form.oldDeptId"
      v-show-field="['oldDeptId', includeFields]"
      name="oldDeptId"
      label="见习部门"
      :rules="computedRules.oldDeptId"
    />

    <PostSelect
      v-model="form.oldPostId"
      v-show-field="['oldPostId', includeFields]"
      name="oldPostId"
      label="岗位"
      multiple
      :dept-id="form.oldDeptId"
      :rules="computedRules.oldPostId"
    />

    <DictSelect
      v-model="form.sex"
      v-show-field="['sex', includeFields]"
      label="性别"
      name="sex"
      dict-type="sys_user_sex"
      :rules="computedRules.sex"
    />

    <van-field
      v-model.trim="form.age"
      v-show-field="['age', includeFields]"
      name="age"
      label="年龄"
      :rules="computedRules.age"
    />

    <DictSelect
      v-model="form.nation"
      v-show-field="['nation', includeFields]"
      label="民族"
      name="nation"
      dict-type="oa_nation"
      :rules="computedRules.nation"
    />

    <DictSelect
      v-model="form.education"
      v-show-field="['education', includeFields]"
      label="学历"
      name="education"
      dict-type="oa_education_type"
      :rules="computedRules.education"
    />

    <van-field
      v-show-field="['specialCommercialInsurance', includeFields]"
      name="specialCommercialInsurance"
      label="购买商业保险"
      :rules="computedRules.specialCommercialInsurance"
    >
      <template #input>
        <YesNoSwitch v-model="form.specialCommercialInsurance" />
      </template>
    </van-field>

    <van-field
      v-show-field="['isProbation', includeFields]"
      name="isProbation"
      label="是否有试用期"
      :rules="computedRules.isProbation"
      @change="onIsProbationChange"
    >
      <template #input>
        <YesNoSwitch v-model="form.isProbation" />
      </template>
    </van-field>

    <DateSelect
      v-if="form.isProbation === 'Y'"
      v-model="form.startDate"
      v-show-field="['startDate', includeFields]"
      name="startDate"
      label="开始日期"
      :rules="computedRules.startDate"
    />

    <DateSelect
      v-if="form.isProbation === 'Y'"
      v-model="form.endDate"
      v-show-field="['endDate', includeFields]"
      name="endDate"
      label="结束日期"
      :rules="computedRules.endDate"
      @change="endDateChange"
    />

    <van-field-number
      v-model.number="form.probationPeriod"
      v-show-field="['probationPeriod', includeFields]"
      name="probationPeriod"
      label="试用期时长(月)"
      :rules="computedRules.probationPeriod"
    />

    <van-field-number
      v-model.number="form.probationPeriod"
      v-show-field="['probationWagesRate', includeFields]"
      name="probationWagesRate"
      label="试用期薪资发放标准"
      :rules="computedRules.probationWagesRate"
    />

    <van-field-number
      v-model.number="form.wages"
      v-show-field="['wages', includeFields]"
      name="wages"
      label="工资"
      :rules="computedRules.wages"
      @change="wagesChange"
    />

    <van-field-number
      v-model.number="form.baseWages"
      v-show-field="['baseWages', includeFields]"
      name="baseWages"
      label="基本工资"
      :rules="computedRules.baseWages"
      @change="manualWagesChange"
    />

    <van-field-number
      v-model.number="form.postWages"
      v-show-field="['postWages', includeFields]"
      name="postWages"
      label="岗位工资"
      :rules="computedRules.postWages"
      @change="manualWagesChange"
    />

    <van-field-number
      v-model.number="form.performanceWages"
      v-show-field="['performanceWages', includeFields]"
      name="performanceWages"
      label="绩效工资"
      :rules="computedRules.performanceWages"
      @change="manualWagesChange"
    />

    <DictSelect
      v-model="form.certificates"
      v-show-field="['certificates', includeFields]"
      label="持证情况"
      name="certificates"
      dict-type="oa_document_type"
      multiple
      :rules="computedRules.certificates"
    />

    <van-field
      v-if="!isNil(form.certificates) && form.certificates.includes('9')"
      v-model="form.otherCertificates"
      v-show-field="['otherCertificates', includeFields]"
      label="其他证书"
      type="textarea"
      rows="1"
      autosize
      name="otherCertificates"
      :rules="computedRules.otherCertificates"
    />

    <DateSelect
      v-model="form.formalDate"
      v-show-field="['formalDate', includeFields]"
      name="formalDate"
      label="转正生效日期"
      :rules="computedRules.formalDate"
    />

    <!-- <van-field v-show-field="['newDeptId', includeFields]" name="newDeptId" label="见习部门" :rules="computedRules.sex">
        <template #input>
          <DeptSelect v-model="form.newDeptId"  />
        </template>
      </van-field>

      <van-field v-show-field="['newPostId', includeFields]" name="newPostId" label="见习岗位" :rules="computedRules.sex">
        <template #input>
          <PostSelect v-model="form.newPostId" :dept-id="form.newDeptId" multiple  />
        </template>
      </van-field> -->

    <van-field
      v-show-field="['humanResourcesOpinion', includeFields]"
      name="humanResourcesOpinion"
      label="人力资源部意见"
      :rules="computedRules.sex"
    >
      <template #input>
        <TextareaView :value="form.humanResourcesOpinion" />
      </template>
    </van-field>

    <van-field
      v-model="form.remark"
      v-show-field="['remark', includeFields]"
      label="其他"
      type="textarea"
      rows="1"
      autosize
      name="remark"
      :rules="computedRules.remark"
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
        <UploadFile
          v-model="form.ossIdList"
          value-type="array"
        />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import UserInfoSelect from '../components/UserInfoSelect.vue'
import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { InternshipEmploymentForm } from '@/api/oa/personnel/internshipEmployment/types'
import { getPreUserEmployment } from '@/api/oa/personnel/internshipEmployment'
import { getUserEmployment } from '@/api/oa/personnel/userEmployment'
import { getDept } from '@/api/system/dept'
import { getMonthDifference } from '@/utils/yearDiff'

const props = withDefaults(
  defineProps<{
    includeFields?: (keyof InternshipEmploymentForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof InternshipEmploymentForm)[]
    },
    showLoading: true,
  },
)

// 表单
const { Form, form, rules, isLoading, updateLoading, reset, submit, view, workflowSubmit, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<InternshipEmploymentForm>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<InternshipEmploymentForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }
  return newRules
})

async function confirmUserInfo(row: any) {
  form.value.userId = row.userId
  form.value.education = row.education
  form.value.nation = row.nation
  form.value.probationPeriod = row.probationPeriod
  // 带出入职数据
  const res = await getUserEmployment(row.employmentId)
  // 带出面试评价数据
  const { data } = await getPreUserEmployment(row.userId)
  form.value.wages = res.data.wages
  form.value.baseWages = res.data.baseWages
  form.value.postWages = res.data.postWages
  form.value.performanceWages = res.data.performanceWages
  form.value.probationWagesRate = res.data.probationWagesRate
  form.value.oldDeptId = data.deptId
  form.value.oldPostId = data.postId
  // 获取部门购买商业保险和类型的
  const res1 = await getDept(form.value.oldDeptId)
  form.value.deptType = res1.data.type
  form.value.specialCommercialInsurance = res1.data.specialCommercialInsurance
  form.value.sex = data.sex
  form.value.age = data.age
  // form.value.probationCycle = data.probationCycle;
  form.value.certificates = data.certificates
  form.value.otherCertificates = data.otherCertificates
}

function endDateChange(value: any) {
  form.value.probationPeriod = getMonthDifference(form.value.startDate, value)
}

function onIsProbationChange() {
  form.value.startDate = undefined
  form.value.endDate = undefined
  form.value.probationPeriod = undefined
  form.value.probationWagesRate = undefined
}

// 初始工资
const originalWages = ref<number>()
function wagesChange(value: number) {
  if (!originalWages.value) {
    originalWages.value = value
  }
  form.value.baseWages = value * 0.4
  form.value.postWages = value * 0.4
  form.value.performanceWages = value * 0.2
}

// 手动修改基本工资、岗位工资、绩效工资、需要重新计算总工资
function manualWagesChange() {
  form.value.wages = form.value.baseWages + form.value.postWages + form.value.performanceWages
  originalWages.value = form.value.wages
}

defineExpose({
  isLoading,
  updateLoading,
  reset,
  view,
  submit,
  workflowSubmit,
  workflowView,
})
</script>
