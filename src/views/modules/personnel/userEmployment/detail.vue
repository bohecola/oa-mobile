<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="auto">
    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['preEmploymentId', includeFields]" name="preEmploymentId" label="员工" input-align="right">
        <template #input>
          <PreUserSelect v-model="form.preEmploymentId" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['deptId', includeFields]" name="deptId" label="部门" input-align="right">
        <template #input>
          <DeptSelect v-model="form.deptId" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['postId', includeFields]" name="postId" label="岗位" input-align="right">
        <template #input>
          <PostSelect v-model="form.postId" :dept-id="form.deptId" multiple readonly />
        </template>
      </van-field>

      <van-field v-show-field="['sex', includeFields]" name="sex" label="性别" input-align="right">
        <template #input>
          <DictSelect v-model="form.sex" dict-type="sys_user_sex" readonly />
        </template>
      </van-field>

      <van-field v-model="form.phonenumber" v-show-field="['phonenumber', includeFields]" name="phonenumber" label="手机号" input-align="right" />

      <van-field v-model="form.age" v-show-field="['age', includeFields]" name="age" label="年龄" input-align="right" />

      <van-field v-show-field="['hopeDate', includeFields]" name="hopeDate" label="预计到岗时间" input-align="right">
        <template #input>
          {{ parseTime(form.hopeDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-show-field="['nation', includeFields]" name="nation" label="民族" input-align="right">
        <template #input>
          <DictSelect v-model="form.nation" dict-type="oa_nation" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['education', includeFields]" name="education" label="学历" input-align="right">
        <template #input>
          <DictSelect v-model="form.education" dict-type="oa_education_type" readonly />
        </template>
      </van-field>

      <van-field v-model="form.wages" v-show-field="['wages', includeFields]" name="wages" label="工资" input-align="right">
        <template #input>
          <span class="mr-3">{{ formatCurrency(form.wages) }} </span>
        </template>
      </van-field>

      <van-field v-model="form.baseWages" v-show-field="['baseWages', includeFields]" name="baseWages" label="基本工资" input-align="right">
        <template #input>
          <span class="mr-3">{{ formatCurrency(form.baseWages) }} </span>
        </template>
      </van-field>

      <van-field v-model="form.postWages" v-show-field="['postWages', includeFields]" name="postWages" label="岗位工资" input-align="right">
        <template #input>
          <span class="mr-3">{{ formatCurrency(form.postWages) }} </span>
        </template>
      </van-field>

      <van-field v-model="form.performanceWages" v-show-field="['performanceWages', includeFields]" name="performanceWages" label="绩效工资" input-align="right">
        <template #input>
          <span class="mr-3">{{ formatCurrency(form.performanceWages) }} </span>
        </template>
      </van-field>

      <van-field v-show-field="['interviewDate', includeFields]" name="interviewDate" label="面试日期" input-align="right">
        <template #input>
          {{ parseTime(form.interviewDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-show-field="['interviewWay', includeFields]" name="interviewWay" label="面试形式" input-align="right">
        <template #input>
          <DictSelect v-model="form.interviewWay" dict-type="oa_interview" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['isOwnerInterview', includeFields]" name="isOwnerInterview" label="是否需要业主面试" input-align="right">
        <template #input>
          <YesNoSwitch v-model="form.isOwnerInterview" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['isIntern', includeFields]" name="isIntern" label="是否实习生" input-align="right">
        <template #input>
          <YesNoSwitch v-model="form.isIntern" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['isProbation', includeFields]" name="isProbation" :label="form.isIntern !== 'Y' ? '是否有试用期' : '是否有实习期'" input-align="right">
        <template #input>
          <YesNoSwitch v-model="form.isProbation" readonly />
        </template>
      </van-field>

      <van-field v-model="form.probationCycle" v-show-field="['probationCycle', includeFields]" name="probationCycle" :label="form.isIntern !== 'Y' ? '试用期时长(月)' : '实习期时长(月)'" input-align="right" />

      <van-field v-show-field="['probationWagesRate', includeFields]" name="probationWagesRate" label="试用期薪资发放标准" input-align="right">
        <template #input>
          <span>{{ form.probationWagesRate }}%</span>
        </template>
      </van-field>

      <van-field v-show-field="['realDate', includeFields]" name="realDate" label="实际到岗日期" input-align="right">
        <template #input>
          {{ parseTime(form.realDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.userAccount" v-show-field="['userAccount', includeFields]" name="userAccount" label="系统账号" input-align="right" />

      <van-field v-show-field="['isRecommend', includeFields]" name="isRecommend" label="是否推荐" input-align="right">
        <template #input>
          <YesNoSwitch v-model="form.isRecommend" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['certificates', includeFields]" name="certificates" label="持证情况" input-align="right">
        <template #input>
          <DictSelect v-model="form.certificates" dict-type="oa_document_type" multiple readonly />
        </template>
      </van-field>

      <van-field v-if="form.isRecommend === 'Y'" v-show-field="['reference', includeFields]" name="reference" label="推荐来源" input-align="right">
        <template #input>
          <TextareaView :value="form.reference" />
        </template>
      </van-field>

      <van-field v-if="!isNil(form.certificates) && form.certificates.includes('其他证书')" v-show-field="['otherCertificates', includeFields]" name="otherCertificates" label="其他证书" input-align="right">
        <template #input>
          <TextareaView :value="form.otherCertificates" />
        </template>
      </van-field>

      <van-field v-if="form.level >= 38" v-show-field="['employmentEvaluate', includeFields]" name="employmentEvaluate" label="面试评价" input-align="right">
        <template #input>
          <TextareaView :value="form.employmentEvaluate" />
        </template>
      </van-field>

      <van-field v-show-field="['description', includeFields]" name="description" label="其他" input-align="right">
        <template #input>
          <TextareaView :value="form.description" />
        </template>
      </van-field>

      <van-field v-show-field="['remark', includeFields]" name="remark" label="备注" input-align="right">
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
import PreUserSelect from './workflow/components/PreUserSelect.vue'
import { useForm } from './form'
import type { UserEmploymentForm } from '@/api/oa/personnel/userEmployment/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
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

// 表单
const { Form, form, isLoading, rules, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserEmploymentForm>()

defineExpose({
  reset,
  view,
  workflowView,
})
</script>
