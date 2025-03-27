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
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      name="deptId"
      label="部门名称"
    />

    <van-field
      v-if="form.recruitNo"
      v-model="form.recruitNo"
      v-show-field="['recruitNo', includeFields]"
      name="recruitNo"
      label="招聘申请"
    />

    <PostSelect
      v-model="form.postId"
      v-show-field="['postId', includeFields]"
      name="postId"
      label="岗位名称"
      multiple
      :dept-id="form.deptId"
      readonly
    />

    <van-field
      v-model="form.name"
      v-show-field="['name', includeFields]"
      name="name"
      label="姓名"
    />

    <DictSelect
      v-model="form.sex"
      v-show-field="['sex', includeFields]"
      label="用户性别"
      name="sex"
      dict-type="sys_user_sex"
    />

    <van-field
      v-model="form.age"
      v-show-field="['age', includeFields]"
      name="age"
      label="年龄"
    />

    <van-field
      v-model="form.phonenumber"
      v-show-field="['phonenumber', includeFields]"
      name="phonenumber"
      label="手机号码"
    />

    <DictSelect
      v-model="form.status"
      v-show-field="['status', includeFields]"
      label="录用情况"
      name="status"
      dict-type="oa_employment_status"
    />

    <DictSelect
      v-model="form.interviewWay"
      v-show-field="['interviewWay', includeFields]"
      label="面试形式"
      name="interviewWay"
      dict-type="oa_interview"
    />

    <DateSelect
      v-model="form.interviewDate"
      v-show-field="['interviewDate', includeFields]"
      name="interviewDate"
      label="面试日期"
    />

    <DictSelect
      v-if="form.status === '3'"
      v-model="form.isOwnerInterview"
      v-show-field="['isOwnerInterview', includeFields]"
      label="是否需要业主面试"
      name="isOwnerInterview"
      dict-type="sys_yes_no"
    />

    <div v-if="form.status === '3' && form.postCode !== 'JXYWRY'">
      <van-field
        v-model="form.isIntern"
        v-show-field="['isIntern', includeFields]"
        name="isIntern"
        label="是否实习生"
      >
        <template #input>
          <YesNoSwitch
            v-model="form.isIntern"
            readonly
          />
        </template>
      </van-field>

      <van-field
        v-model="form.isProbation"
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
    </div>

    <van-field
      v-model="form.isRecommend"
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

    <van-field
      v-if="form.isRecommend === 'Y'"
      v-model="form.reference"
      v-show-field="['reference', includeFields]"
      name="reference"
      label="推荐来源"
    >
      <template #input>
        <TextareaView :value="form.reference" />
      </template>
    </van-field>

    <DictSelect
      v-model="form.certificates"
      v-show-field="['certificates', includeFields]"
      label="持证情况"
      name="certificates"
      dict-type="oa_document_type"
    />

    <van-field
      v-if="!isNil(form.certificates) && form.certificates.includes('9')"
      v-model="form.otherCertificates"
      v-show-field="['otherCertificates', includeFields]"
      name="otherCertificates"
      label="其他证书"
    >
      <template #input>
        <TextareaView :value="form.otherCertificates" />
      </template>
    </van-field>

    <van-field
      v-show-field="['transactorOpinion', includeFields]"
      name="transactorOpinion"
      label="办理人意见"
    >
      <template #input>
        <TextareaView :value="form.transactorOpinion" />
      </template>
    </van-field>

    <div v-show-field="['userPreEmploymentEvaluateBoList', includeFields]">
      <div class="px-6 py-2 text-sm text-[--van-cell-group-title-color]">
        面试评价项
      </div>
      <TableCard
        v-for="(item, index) in form.userPreEmploymentEvaluateBoList"
        :key="index"
        :title="`面试评价${index + 1}`"
        class="mx-4 mb-2"
        :default-collapse="true"
      >
        <van-field
          v-model="item.evaluateItemName"
          :name="`itemList.${index}.evaluateItemName`"
          label="岗位职责"
        >
          <template #input>
            <TextareaView :value="item.evaluateItemName" />
          </template>
        </van-field>
        <van-field
          v-model="item.result"
          :name="`itemList.${index}.result`"
          label="任职要求"
        >
          <template #input>
            <TextareaView :value="item.result" />
          </template>
        </van-field>
      </TableCard>
    </div>

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

<script setup lang='ts'>
import { isNil } from 'lodash-es'
import { useForm } from './form'
import type { UserPreEmploymentForm } from '@/api/oa/personnel/userPreEmployment/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: (keyof UserPreEmploymentForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof UserPreEmploymentForm)[]
    },
    showLoading: true,
  },
)

const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserPreEmploymentForm>()

defineExpose({
  view,
  reset,
  workflowView,
})
</script>
