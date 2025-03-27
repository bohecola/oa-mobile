<template>
  <van-form
    ref="Form"
    v-loading="isLoading && showLoading"
    label-width="auto"
    input-align="left"
    label-align="top"
    required="auto"
    scroll-to-error
  >
    <PendingUserEmploymentSelect
      v-model="form.employmentId"
      v-show-field="['employmentId', includeFields]"
      name="employmentId"
      label="员工"
      :rules="computedRules.employmentId"
      clearable
      @confirm="employmentIdConfirm"
    />

    <van-form
      v-if="form.employmentId"
      input-align="left"
      label-align="top"
      required="auto"
    >
      <van-field
        v-model="form.userAccount"
        v-show-field="['userAccount', includeFields]"
        name="userAccount"
        label="系统账号"
        :rules="computedRules.userAccount"
        @change="userAccountChange"
      />

      <DateSelect
        v-model="form.realDate"
        v-show-field="['realDate', includeFields]"
        name="realDate"
        label="实际到岗日期"
        :rules="computedRules.realDate"
      />
    </van-form>

    <van-form
      v-if="form.employmentId"
      input-align="left"
      label-align="top"
      readonly
    >
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

      <van-field-number
        v-model.number="form.phonenumber"
        v-show-field="['phonenumber', includeFields]"
        label="手机号"
        type="tel"
        max="11"
        name="phonenumber"
      />

      <van-field-number
        v-model.number="form.age"
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
          <YesNoSwitch v-model="form.isOwnerInterview" readonly />
        </template>
      </van-field>

      <div v-if="form.postCode !== 'JXYWRY'">
        <van-field
          v-show-field="['isIntern', includeFields]"
          name="isIntern"
          label="是否实习生"
        >
          <template #input>
            <YesNoSwitch v-model="form.isIntern" readonly />
          </template>
        </van-field>

        <van-field
          v-show-field="['isProbation', includeFields]"
          name="isProbation"
          :label="form.isIntern !== 'Y' ? '是否有试用期' : '是否有实习期'"
        >
          <template #input>
            <YesNoSwitch v-model="form.isProbation" readonly />
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

        <van-field-number
          v-if="form.isProbation === 'Y'"
          v-model.number="form.probationWagesRate"
          v-show-field="['probationWagesRate', includeFields]"
          type="digit"
          name="probationWagesRate"
          label="试用期薪资发放标准(%)"
        />
      </div>

      <van-field
        v-show-field="['isRecommend', includeFields]"
        name="isRecommend"
        label="是否推荐"
      >
        <template #input>
          <YesNoSwitch v-model="form.isRecommend" readonly />
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
        v-model="form.reference"
        v-show-field="['reference', includeFields]"
        label="推荐来源"
        type="textarea"
        rows="1"
        autosize
        name="reference"
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
      />

      <!-- <van-field v-show-field="['employmentEvaluate', includeFields]" name="employmentEvaluate" label="面试评价" :rules="computedRules.userInfoId">
        <template #input>
          <TextareaView :value="form.employmentEvaluate" />
        </template>
      </van-field> -->

      <van-field
        v-model="form.description"
        v-show-field="['description', includeFields]"
        label="其他"
        type="textarea"
        rows="1"
        autosize
        name="description"
      />

      <van-field
        v-model="form.remark"
        v-show-field="['remark', includeFields]"
        label="备注"
        type="textarea"
        rows="1"
        autosize
        name="remark"
      />
    </van-form>

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
import { isNil } from 'lodash-es'
import PendingUserEmploymentSelect from '../components/PendingUserEmploymentSelect.vue'
import { useForm } from './form'
import { checkUserNameUnique } from '@/api/system/user'
import type { UserPendingEmploymentForm } from '@/api/oa/personnel/pendingEmployment/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { getPost } from '@/api/system/post'
import { queryByIdUserPreEmploymentAndEmployment } from '@/api/oa/personnel/pendingEmployment'

const props = withDefaults(
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
const { Form, form, rules, isLoading, updateLoading, reset, submit, view, workflowSubmit, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<UserPendingEmploymentForm>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<UserPendingEmploymentForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }
  return newRules
})

// 检验用户名的唯一
async function userAccountChange(value: string) {
  try {
    await checkUserNameUnique({ userName: value })
  }
  catch (err) {
    // 重复账号清空重新填写
    form.value.userAccount = undefined
  }
}

watch(
  () => form.value.postId,
  async (newVal) => {
    if (newVal) {
      const res = await getPost(newVal)
      form.value.postCode = res.data.postCode
    }
  },
)

async function employmentIdConfirm(value: string) {
  const { data } = await queryByIdUserPreEmploymentAndEmployment(value)
  form.value = data
  console.log(data, '222')
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
