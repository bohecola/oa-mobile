<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" class="reset-label" label-width="auto" label-align="top" readonly>
    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['employmentId', includeFields]" name="employmentId" label="员工" input-align="left">
        <template #input>
          <PendingUserEmploymentSelect v-model="form.employmentId" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['deptId', includeFields]" name="deptId" label="部门" input-align="left">
        <template #input>
          <DeptSelect v-model="form.deptId" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['postId', includeFields]" name="postId" label="岗位" input-align="left">
        <template #input>
          <PostSelect v-model="form.postId" :dept-id="form.deptId" multiple readonly />
        </template>
      </van-field>

      <van-field v-show-field="['sex', includeFields]" name="sex" label="性别" input-align="left">
        <template #input>
          <DictSelect v-model="form.sex" dict-type="sys_user_sex" readonly />
        </template>
      </van-field>

      <van-field v-model="form.phonenumber" v-show-field="['phonenumber', includeFields]" name="phonenumber" label="手机号" input-align="left" />

      <van-field v-model="form.age" v-show-field="['age', includeFields]" name="age" label="年龄" input-align="left" />

      <van-field v-show-field="['hopeDate', includeFields]" name="hopeDate" label="预计到岗时间" input-align="left">
        <template #input>
          {{ parseTime(form.hopeDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-show-field="['nation', includeFields]" name="nation" label="民族" input-align="left">
        <template #input>
          <DictSelect v-model="form.nation" dict-type="oa_nation" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['education', includeFields]" name="education" label="学历" input-align="left">
        <template #input>
          <DictSelect v-model="form.education" dict-type="oa_education_type" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['interviewDate', includeFields]" name="interviewDate" label="面试日期" input-align="left">
        <template #input>
          {{ parseTime(form.interviewDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-show-field="['interviewWay', includeFields]" name="interviewWay" label="面试形式" input-align="left">
        <template #input>
          <DictSelect v-model="form.interviewWay" dict-type="oa_interview" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['isOwnerInterview', includeFields]" name="isOwnerInterview" label="是否需要业主面试" input-align="left">
        <template #input>
          <YesNoSwitch v-model="form.isOwnerInterview" readonly />
        </template>
      </van-field>

      <div v-if="form.postCode !== 'JXYWRY'">
        <van-field v-show-field="['isIntern', includeFields]" name="isIntern" label="是否实习生" input-align="left">
          <template #input>
            <YesNoSwitch v-model="form.isIntern" readonly />
          </template>
        </van-field>

        <van-field v-show-field="['isProbation', includeFields]" name="isProbation" :label="form.isIntern !== 'Y' ? '是否有试用期' : '是否有实习期'" input-align="left">
          <template #input>
            <YesNoSwitch v-model="form.isProbation" readonly />
          </template>
        </van-field>

        <van-field v-if="form.isIntern === 'Y' && form.isProbation === 'Y'" v-model="form.internshipExplain" v-show-field="['internshipExplain', includeFields]" name="internshipExplain" label="实习期时长说明" input-align="left" />

        <van-field v-if="form.isIntern === 'N' && form.isProbation === 'Y'" v-model="form.probationCycle" v-show-field="['probationCycle', includeFields]" name="probationCycle" label="试用期时长(月)" input-align="left" />

        <van-field v-if="form.isProbation === 'Y'" v-show-field="['probationWagesRate', includeFields]" name="probationWagesRate" label="试用期薪资发放标准" input-align="left">
          <template #input>
            <span>{{ form.probationWagesRate }}%</span>
          </template>
        </van-field>
      </div>

      <van-field v-show-field="['realDate', includeFields]" name="realDate" label="实际到岗日期" input-align="left">
        <template #input>
          {{ parseTime(form.realDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.userAccount" v-show-field="['userAccount', includeFields]" name="userAccount" label="系统账号" input-align="left" />

      <van-field v-show-field="['isRecommend', includeFields]" name="isRecommend" label="是否推荐" input-align="left">
        <template #input>
          <YesNoSwitch v-model="form.isRecommend" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['certificates', includeFields]" name="certificates" label="持证情况" input-align="left">
        <template #input>
          <DictSelect v-model="form.certificates" dict-type="oa_document_type" multiple readonly />
        </template>
      </van-field>

      <van-field v-if="form.isRecommend === 'Y'" v-show-field="['reference', includeFields]" name="reference" label="推荐来源" input-align="left">
        <template #input>
          <TextareaView :value="form.reference" />
        </template>
      </van-field>

      <van-field v-if="!isNil(form.certificates) && form.certificates.includes('9')" v-show-field="['otherCertificates', includeFields]" name="otherCertificates" label="其他证书" input-align="left">
        <template #input>
          <TextareaView :value="form.otherCertificates" />
        </template>
      </van-field>

      <!-- <van-field v-show-field="['employmentEvaluate', includeFields]" name="employmentEvaluate" label="面试评价" input-align="left">
      <template #input>
        <TextareaView :value="form.employmentEvaluate" />
      </template>
    </van-field> -->

      <van-field v-show-field="['description', includeFields]" name="description" label="其他" input-align="left">
        <template #input>
          <TextareaView :value="form.description" />
        </template>
      </van-field>

      <van-field v-show-field="['remark', includeFields]" name="remark" label="备注" input-align="left">
        <template #input>
          <TextareaView :value="form.remark" />
        </template>
      </van-field>
    </van-cell-group>

    <!-- 附件列表 -->
    <Teleport to="#AFC" defer>
      <TableCard v-show-field="['ossIdList', includeFields]" title="附件列表" class="mx-4" :is-empty="isEmpty(form.ossIdList)">
        <UploadFile v-model="form.ossIdList" readonly :card-size="60" />
      </TableCard>
    </Teleport>
  </van-form>
</template>

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash-es'
import PostSelect from '../components/PostSelect.vue'
import { useForm } from './form'
import PendingUserEmploymentSelect from './components/PendingUserEmploymentSelect.vue'
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

const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 表单
const { Form, form, isLoading, rules, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserPendingEmploymentForm>()

defineExpose({
  reset,
  view,
  workflowView,
})
</script>
