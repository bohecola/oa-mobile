<template>
  <van-form
    ref="Form"
    v-loading="isLoading && showLoading"
    class="reset-label"
    label-width="auto"
    label-align="top"
    readonly
  >
    <van-field
      v-show-field="['userInfoId', includeFields]"
      name="userInfoId"
      label="员工"
    >
      <template #input>
        <UserInfoSelect
          v-model="form.userInfoId"
          v-model:user-id="form.userId"
          v-model:user-name="form.userName"
          status="-1"
          readonly
        />
      </template>
    </van-field>

    <DeptSelect
      v-model="form.oldDeptId"
      v-show-field="['oldDeptId', includeFields]"
      name="oldDeptId"
      label="见习部门"
    />

    <PostSelect
      v-model="form.oldPostId"
      v-show-field="['oldPostId', includeFields]"
      name="oldPostId"
      label="岗位"
      multiple
      :dept-id="form.oldDeptId"
      readonly
    />

    <DictSelect
      v-model="form.sex"
      v-show-field="['sex', includeFields]"
      label="性别"
      name="sex"
      dict-type="sys_user_sex"
    />

    <van-field
      v-model="form.age"
      v-show-field="['age', includeFields]"
      name="age"
      label="年龄"
    />

    <DictSelect
      v-model="form.nation"
      v-show-field="['nation', includeFields]"
      label="民族"
      name="nation"
      dict-type="oa_nation"
    />

    <DictSelect
      v-model="form.education"
      v-show-field="['education', includeFields]"
      label="学历"
      name="education"
      dict-type="oa_education_type"
    />

    <van-field
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
      v-show-field="['isProbation', includeFields]"
      name="isProbation"
      label="是否有试用期"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.isProbation"
          readonly
        />
      </template>
    </van-field>

    <DateSelect
      v-if="form.isProbation === 'Y'"
      v-model="form.startDate"
      v-show-field="['startDate', includeFields]"
      name="startDate"
      label="开始日期"
    />

    <DateSelect
      v-if="form.isProbation === 'Y'"
      v-model="form.endDate"
      v-show-field="['endDate', includeFields]"
      name="endDate"
      label="结束日期"
    />

    <van-field
      v-model="form.probationPeriod"
      v-show-field="['probationPeriod', includeFields]"
      name="probationPeriod"
      label="试用期时长(月)"
    />

    <van-field
      v-show-field="['probationWagesRate', includeFields]"
      name="probationWagesRate"
      label="试用期薪资发放标准"
    >
      <template #input>
        <span>{{ form.probationWagesRate }}%</span>
      </template>
    </van-field>

    <van-field
      v-model="form.wages"
      v-show-field="['wages', includeFields]"
      name="wages"
      label="工资"
    >
      <template #input>
        <span class="mr-3">{{ formatCurrency(form.wages) }} </span>
      </template>
    </van-field>

    <van-field
      v-model="form.baseWages"
      v-show-field="['baseWages', includeFields]"
      name="baseWages"
      label="基本工资"
    >
      <template #input>
        <span class="mr-3">{{ formatCurrency(form.baseWages) }} </span>
      </template>
    </van-field>

    <van-field
      v-model="form.postWages"
      v-show-field="['postWages', includeFields]"
      name="postWages"
      label="岗位工资"
    >
      <template #input>
        <span class="mr-3">{{ formatCurrency(form.postWages) }} </span>
      </template>
    </van-field>

    <van-field
      v-model="form.performanceWages"
      v-show-field="['performanceWages', includeFields]"
      name="performanceWages"
      label="绩效工资"
    >
      <template #input>
        <span class="mr-3">{{ formatCurrency(form.performanceWages) }} </span>
      </template>
    </van-field>

    <van-field
      v-show-field="['certificates', includeFields]"
      name="certificates"
      label="持证情况"
    >
      <template #input>
        <DictSelect
          v-model="form.certificates"
          dict-type="oa_document_type"
          multiple
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-if="!isNil(form.certificates) && form.certificates.includes('9')"
      v-show-field="['otherCertificates', includeFields]"
      name="otherCertificates"
      label="其他证书"
    >
      <template #input>
        <TextareaView :value="form.otherCertificates" />
      </template>
    </van-field>

    <van-field
      v-show-field="['formalDate', includeFields]"
      name="formalDate"
      label="转正生效日期"
    >
      <template #input>
        {{ parseTime(form.formalDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>

    <!-- <van-field v-show-field="['newDeptId', includeFields]" name="newDeptId" label="见习部门" >
      <template #input>
        <DeptSelect v-model="form.newDeptId" readonly />
      </template>
    </van-field>

    <van-field v-show-field="['newPostId', includeFields]" name="newPostId" label="见习岗位" >
      <template #input>
        <PostSelect v-model="form.newPostId" :dept-id="form.newDeptId" multiple readonly />
      </template>
    </van-field> -->

    <van-field
      v-show-field="['humanResourcesOpinion', includeFields]"
      name="humanResourcesOpinion"
      label="人力资源部意见"
    >
      <template #input>
        <TextareaView
          :value="form.humanResourcesOpinion"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-show-field="['remark', includeFields]"
      name="remark"
      label="其他"
    >
      <template #input>
        <TextareaView
          :value="form.remark"
          readonly
        />
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
import { isNil } from 'lodash-es'
import UserInfoSelect from '../components/UserInfoSelect.vue'

import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { InternshipEmploymentForm } from '@/api/oa/personnel/internshipEmployment/types'

withDefaults(
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

const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 表单
const { Form, form, isLoading, rules, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<InternshipEmploymentForm>()

defineExpose({
  reset,
  view,
  workflowView,
})
</script>
