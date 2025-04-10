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
    <PendingUserEmploymentSelect
      v-model="form.employmentId"
      v-show-field="['employmentId', includeFields]"
      name="employmentId"
      label="员工"
      readonly
    />

    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      name="deptId"
      label="部门"
    />

    <PostSelect
      v-model="form.postId"
      v-show-field="['postId', includeFields]"
      name="postId"
      label="岗位"
      multiple
      :dept-id="form.deptId"
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
      v-model="form.phonenumber"
      v-show-field="['phonenumber', includeFields]"
      name="phonenumber"
      label="手机号"
    />

    <van-field
      v-model="form.age"
      v-show-field="['age', includeFields]"
      name="age"
      label="年龄"
    />

    <DateSelect
      v-model="form.hopeDate"
      v-show-field="['hopeDate', includeFields]"
      name="hopeDate"
      label="预计到岗时间"
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

    <DateSelect
      v-model="form.interviewDate"
      v-show-field="['interviewDate', includeFields]"
      name="interviewDate"
      label="面试日期"
    />

    <DictSelect
      v-model="form.interviewWay"
      v-show-field="['interviewWay', includeFields]"
      label="面试形式"
      name="interviewWay"
      dict-type="oa_interview"
    />

    <van-field
      v-show-field="['isOwnerInterview', includeFields]"
      name="isOwnerInterview"
      label="是否需要业主面试"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.isOwnerInterview" readonly
        />
      </template>
    </van-field>

    <div v-if="form.postCode !== 'JXYWRY'">
      <van-field
        v-show-field="['isIntern', includeFields]"
        name="isIntern"
        label="是否实习生"
      >
        <template #input>
          <YesNoSwitch
            v-model="form.isIntern" readonly
          />
        </template>
      </van-field>

      <van-field
        v-show-field="['isProbation', includeFields]"
        name="isProbation"
        :label="form.isIntern !== 'Y' ? '是否有试用期' : '是否有实习期'"
      >
        <template #input>
          <YesNoSwitch
            v-model="form.isProbation"
            readonly
          />
        </template>
      </van-field>

      <van-field
        v-if="form.isIntern === 'Y' && form.isProbation === 'Y'"
        v-model="form.internshipExplain"
        v-show-field="['internshipExplain', includeFields]"
        name="internshipExplain"
        label="实习期时长说明"
      />

      <van-field
        v-if="form.isIntern === 'N' && form.isProbation === 'Y'"
        v-model="form.probationCycle"
        v-show-field="['probationCycle', includeFields]"
        name="probationCycle"
        label="试用期时长(月)"
      />

      <van-field
        v-if="form.isProbation === 'Y'"
        v-show-field="['probationWagesRate', includeFields]"
        name="probationWagesRate"
        label="试用期薪资发放标准"
      >
        <template #input>
          <span>{{ form.probationWagesRate }}%</span>
        </template>
      </van-field>
    </div>

    <DateSelect
      v-model="form.realDate"
      v-show-field="['realDate', includeFields]"
      name="realDate"
      label="实际到岗日期"
    />

    <van-field
      v-model="form.userAccount"
      v-show-field="['userAccount', includeFields]"
      name="userAccount"
      label="系统账号"
    />

    <van-field
      v-show-field="['isRecommend', includeFields]"
      name="isRecommend"
      label="是否推荐"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.isRecommend"
          readonly
        />
      </template>
    </van-field>

    <DictSelect
      v-model="form.certificates"
      v-show-field="['certificates', includeFields]"
      label="持证情况"
      name="certificates"
      dict-type="oa_document_type"
      multiple
    />
    <van-field
      v-if="form.isRecommend === 'Y'"
      v-show-field="['reference', includeFields]"
      name="reference"
      label="推荐来源"
    >
      <template #input>
        <TextareaView :value="form.reference" />
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

    <!-- <van-field v-show-field="['employmentEvaluate', includeFields]" name="employmentEvaluate" label="面试评价" >
      <template #input>
        <TextareaView :value="form.employmentEvaluate" />
      </template>
    </van-field> -->

    <van-field
      v-show-field="['description', includeFields]"
      name="description"
      label="其他"
    >
      <template #input>
        <TextareaView :value="form.description" />
      </template>
    </van-field>

    <van-field
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

<script setup lang="ts">
import { isNil } from 'lodash-es'
import PendingUserEmploymentSelect from '../components/PendingUserEmploymentSelect.vue'
import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { UserPendingEmploymentForm } from '@/api/oa/personnel/pendingEmployment/types'

withDefaults(
  defineProps<{
    includeFields?: (keyof UserPendingEmploymentForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof UserPendingEmploymentForm)[]
    },
    showLoading: true,
  },
)

// 表单
const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserPendingEmploymentForm>()

defineExpose({
  reset,
  view,
  workflowView,
})
</script>
