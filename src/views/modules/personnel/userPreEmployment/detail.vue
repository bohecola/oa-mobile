<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="10em">
    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['deptId', includeFields]" name="deptId" label="部门名称" input-align="right">
        <template #input>
          <DeptSelect v-model="form.deptId" readonly />
        </template>
      </van-field>
      <van-field v-if="form.recruitNo" v-model="form.recruitNo" v-show-field="['recruitNo', includeFields]" name="recruitNo" label="招聘申请" input-align="right" />

      <van-field v-show-field="['postId', includeFields]" name="postId" label="岗位名称" input-align="right">
        <template #input>
          <PostSelect v-model="form.postId" :dept-id="form.deptId" readonly />
        </template>
      </van-field>

      <van-field v-model="form.name" v-show-field="['name', includeFields]" name="name" label="姓名" input-align="right" />
      <van-field v-model="form.sex" v-show-field="['sex', includeFields]" name="sex" label="用户性别" input-align="right">
        <template #input>
          <dict-tag :options="sys_user_sex" :value="form.sex" />
        </template>
      </van-field>

      <van-field v-model="form.age" v-show-field="['age', includeFields]" name="age" label="年龄" input-align="right" />

      <van-field v-model="form.phonenumber" v-show-field="['phonenumber', includeFields]" name="phonenumber" label="手机号码" input-align="right" />

      <van-field v-model="form.status" v-show-field="['status', includeFields]" name="status" label="录用情况" input-align="right">
        <template #input>
          <dict-tag :options="oa_employment_status" :value="form.status" />
        </template>
      </van-field>

      <van-field v-model="form.interviewWay" v-show-field="['interviewWay', includeFields]" name="interviewWay" label="面试形式" input-align="right">
        <template #input>
          <dict-tag :options="oa_interview" :value="form.interviewWay" />
        </template>
      </van-field>

      <van-field v-model="form.interviewDate" v-show-field="['interviewDate', includeFields]" name="interviewDate" label="面试日期" input-align="right">
        <template #input>
          {{ parseTime(form.interviewDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-if="form.status === '3'" v-model="form.isOwnerInterview" v-show-field="['isOwnerInterview', includeFields]" name="isOwnerInterview" label="是否需要业主面试" input-align="right">
        <template #input>
          <dict-tag :options="sys_yes_no" :value="form.isOwnerInterview" />
        </template>
      </van-field>

      <div v-if="form.status === '3' && form.postCode !== 'JXYWRY'">
        <van-field v-model="form.isIntern" v-show-field="['isIntern', includeFields]" name="isIntern" label="是否实习生" input-align="right">
          <template #input>
            <YesNoSwitch v-model="form.isIntern" readonly />
          </template>
        </van-field>

        <van-field
          v-model="form.isProbation"
          v-show-field="['isProbation', includeFields]"
          name="isProbation"
          :label="form.isIntern !== 'Y' ? '是否有试用期' : '是否有实习期'"
          input-align="right"
        >
          <template #input>
            <dict-tag :options="sys_yes_no" :value="form.isProbation" />
          </template>
        </van-field>

        <van-field
          v-if="form.isIntern === 'Y' && form.isProbation === 'Y'"
          v-model="form.internshipExplain" v-show-field="['internshipExplain', includeFields]"
          name="internshipExplain"
          label="实习期时长说明"
          input-align="right"
        />

        <van-field
          v-if="form.isIntern === 'N' && form.isProbation === 'Y'"
          v-model="form.probationCycle" v-show-field="['probationCycle', includeFields]"
          name="probationCycle"
          label="试用期时长(月)"
          input-align="right"
        />
      </div>

      <van-field
        v-model="form.isRecommend"
        v-show-field="['isRecommend', includeFields]"
        name="isRecommend"
        label="是否推荐"
        input-align="right"
      >
        <template #input>
          <YesNoSwitch v-model="form.isRecommend" readonly />
        </template>
      </van-field>

      <van-field v-model="form.certificates" v-show-field="['certificates', includeFields]" name="certificates" label="持证情况" input-align="right">
        <template #input>
          <DictSelect v-model="form.certificates" dict-type="oa_document_type" readonly />
        </template>
      </van-field>

      <van-field v-if="form.isRecommend === 'Y'" v-model="form.reference" v-show-field="['reference', includeFields]" name="reference" label="推荐来源" input-align="right">
        <template #input>
          <TextareaView :value="form.reference" />
        </template>
      </van-field>

      <van-field v-if="!isNil(form.certificates) && form.certificates.includes('9')" v-model="form.otherCertificates" v-show-field="['otherCertificates', includeFields]" name="otherCertificates" label="其他证书" input-align="right">
        <template #input>
          <TextareaView :value="form.otherCertificates" />
        </template>
      </van-field>

      <van-field v-show-field="['transactorOpinion', includeFields]" name="transactorOpinion" label="办理人意见" input-align="right">
        <template #input>
          <TextareaView :value="form.transactorOpinion" />
        </template>
      </van-field>
    </van-cell-group>

    <div v-show-field="['userPreEmploymentEvaluateBoList', includeFields]">
      <div class="px-6 py-2 text-sm text-[--van-cell-group-title-color]">
        面试评价项
      </div>
      <TableCard v-for="(item, index) in form.userPreEmploymentEvaluateBoList" :key="index" :title="`面试评价${index + 1}`" class="mx-4 mb-2" :default-collapse="true">
        <van-field
          v-model="item.evaluateItemName"
          :name="`itemList.${index}.evaluateItemName`"
          label="岗位职责"
          input-align="right"
        >
          <template #input>
            <TextareaView :value="item.evaluateItemName" />
          </template>
        </van-field>
        <van-field
          v-model="item.result"
          :name="`itemList.${index}.result`"
          label="任职要求"
          input-align="right"
        >
          <template #input>
            <TextareaView :value="item.result" />
          </template>
        </van-field>
      </TableCard>
    </div>

    <!-- 附件列表 -->
    <TableCard v-show-field="['ossIdList', includeFields]" title="附件列表" class="mx-4" :is-empty="isEmpty(form.ossIdList)">
      <UploadFile v-model="form.ossIdList" readonly :card-size="60" />
    </TableCard>
  </van-form>
</template>

<script setup lang='ts'>
import { isEmpty, isNil } from 'lodash-es'
import PostSelect from '../components/PostSelect.vue'
import { useForm } from './form'
import type { UserPreEmploymentForm } from '@/api/oa/personnel/userPreEmployment/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { listPost } from '@/api/system/post'

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
// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_employment_status, oa_document_type, oa_interview, sys_user_sex, sys_yes_no } = toRefs<any>(
  proxy?.useDict('oa_employment_status', 'oa_document_type', 'oa_interview', 'sys_user_sex', 'sys_yes_no'),
)

const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserPreEmploymentForm>()

defineExpose({
  view,
  reset,
  workflowView,
})
</script>
