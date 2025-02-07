<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="auto">
    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['userInfoId', includeFields]" name="userInfoId" label="员工" input-align="right">
        <template #input>
          <UserInfoSelect v-model="form.userInfoId" v-model:user-id="form.userId" v-model:user-name="form.userName" status="-1" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['oldDeptId', includeFields]" name="oldDeptId" label="见习部门" input-align="right">
        <template #input>
          <DeptSelect v-model="form.oldDeptId" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['oldPostId', includeFields]" name="oldPostId" label="见习岗位" input-align="right">
        <template #input>
          <PostSelect v-model="form.oldPostId" :dept-id="form.oldDeptId" multiple readonly />
        </template>
      </van-field>

      <van-field v-show-field="['sex', includeFields]" name="sex" label="性别" input-align="right">
        <template #input>
          <DictSelect v-model="form.sex" dict-type="sys_user_sex" readonly />
        </template>
      </van-field>

      <van-field v-model="form.age" v-show-field="['age', includeFields]" name="age" label="年龄" input-align="right" />

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

      <van-field v-show-field="['specialCommercialInsurance', includeFields]" name="specialCommercialInsurance" label="购买商业保险" input-align="right">
        <template #input>
          <YesNoSwitch v-model="form.specialCommercialInsurance" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['isProbation', includeFields]" name="isProbation" label="是否有试用期" input-align="right">
        <template #input>
          <YesNoSwitch v-model="form.isProbation" readonly />
        </template>
      </van-field>

      <van-field v-if="form.isProbation === 'Y'" v-show-field="['startDate', includeFields]" name="startDate" label="开始日期" input-align="right">
        <template #input>
          {{ parseTime(form.startDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>
      <van-field v-if="form.isProbation === 'Y'" v-show-field="['endDate', includeFields]" name="endDate" label="结束日期" input-align="right">
        <template #input>
          {{ parseTime(form.endDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.probationPeriod" v-show-field="['probationPeriod', includeFields]" name="probationPeriod" label="试用期时长(月)" input-align="right" />

      <van-field v-show-field="['probationWagesRate', includeFields]" name="probationWagesRate" label="试用期薪资发放标准" input-align="right">
        <template #input>
          <span>{{ form.probationWagesRate }}%</span>
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

      <van-field v-show-field="['certificates', includeFields]" name="certificates" label="持证情况" input-align="right">
        <template #input>
          <DictSelect v-model="form.certificates" dict-type="oa_document_type" multiple readonly />
        </template>
      </van-field>

      <van-field v-if="!isNil(form.certificates) && form.certificates.includes('9')" v-show-field="['otherCertificates', includeFields]" name="otherCertificates" label="其他证书" input-align="right">
        <template #input>
          <TextareaView :value="form.otherCertificates" />
        </template>
      </van-field>

      <van-field v-show-field="['formalDate', includeFields]" name="formalDate" label="转正生效日期" input-align="right">
        <template #input>
          {{ parseTime(form.formalDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <!-- <van-field v-show-field="['newDeptId', includeFields]" name="newDeptId" label="见习部门" input-align="right">
      <template #input>
        <DeptSelect v-model="form.newDeptId" readonly />
      </template>
    </van-field>

    <van-field v-show-field="['newPostId', includeFields]" name="newPostId" label="见习岗位" input-align="right">
      <template #input>
        <PostSelect v-model="form.newPostId" :dept-id="form.newDeptId" multiple readonly />
      </template>
    </van-field> -->

      <van-field v-show-field="['humanResourcesOpinion', includeFields]" name="humanResourcesOpinion" label="人力资源部意见" input-align="right">
        <template #input>
          <TextareaView :value="form.humanResourcesOpinion" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['remark', includeFields]" name="remark" label="其他" input-align="right">
        <template #input>
          <TextareaView :value="form.remark" readonly />
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
