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
    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      name="deptId"
      label="部门名称"
      :rules="computedRules.deptId"
      @change="deptChange"
    />
    <!--
    <van-field
      v-model="form.recruitNo"
      v-show-field="['recruitNo', includeFields]"
      name="recruitNo"
      label="招聘申请"
    /> -->

    <PostSelect
      v-model="form.postId"
      v-show-field="['postId', includeFields]"
      name="postId"
      label="岗位名称"
      :dept-id="form.deptId"
      :rules="computedRules.postId"
      @change="onPostSelectChange"
    />

    <van-field
      v-model.trim="form.name"
      v-show-field="['name', includeFields]"
      name="name"
      label="姓名"
      placeholder="请输入"
      :rules="computedRules.name"
    />

    <DictSelect
      v-model="form.sex"
      v-show-field="['sex', includeFields]"
      label="用户性别"
      name="sex"
      dict-type="sys_user_sex"
      :rules="computedRules.sex"
    />

    <van-field-number
      v-model.number="form.age"
      v-show-field="['age', includeFields]"
      type="digit"
      name="age"
      label="年龄"
      :rules="computedRules.age"
    />

    <van-field-number
      v-model.number="form.phonenumber"
      v-show-field="['phonenumber', includeFields]"
      name="phonenumber"
      type="tel"
      maxlength="11"
      label="手机号"
      :rules="computedRules.sex"
      @change="phonenumberChange"
    />

    <DictSelect
      v-model="form.status"
      v-show-field="['status', includeFields]"
      label="录用情况"
      name="status"
      dict-type="oa_employment_status"
      :filter-fn="(e) => ['2', '3'].includes(e.value)"
      :rules="computedRules.status"
      @change="statusChange"
    />

    <DateSelect
      v-model="form.interviewDate"
      v-show-field="['interviewDate', includeFields]"
      name="interviewDate"
      label="面试日期"
      :rules="computedRules.interviewDate"
    />

    <DictSelect
      v-model="form.interviewWay"
      v-show-field="['interviewWay', includeFields]"
      label="面试形式"
      name="interviewWay"
      dict-type="oa_interview"
      :rules="computedRules.interviewWay"
    />

    <van-field
      v-if="form.status === '3'"
      v-model="form.isOwnerInterview"
      v-show-field="['isOwnerInterview', includeFields]"
      name="isOwnerInterview"
      label="是否需要业主面试"
      :rules="computedRules.isOwnerInterview"
    >
      <template #input>
        <YesNoSwitch v-model="form.isOwnerInterview" />
      </template>
    </van-field>

    <!-- 录用状态为录用3，岗位编码不是见习运维人员JXYWRY -->
    <div v-if="form.status === '3' && form.postCode !== 'JXYWRY'">
      <van-field
        v-model="form.isIntern"
        v-show-field="['isIntern', includeFields]"
        name="isIntern"
        label="是否实习生"
        :rules="computedRules.isIntern"
      >
        <template #input>
          <YesNoSwitch v-model="form.isIntern" />
        </template>
      </van-field>

      <van-field
        v-model="form.isProbation"
        v-show-field="['isProbation', includeFields]"
        name="isProbation"
        :label="form.isIntern !== 'Y' ? '是否有试用期' : '是否有实习期'"
        :rules="computedRules.isProbation"
      >
        <template #input>
          <YesNoSwitch v-model="form.isProbation" @change="changeIsProbation" />
        </template>
      </van-field>

      <van-field
        v-if="form.isIntern === 'Y' && form.isProbation === 'Y'"
        v-model.trim="form.internshipExplain" v-show-field="['internshipExplain', includeFields]"
        name="internshipExplain"
        label="实习期时长说明"
        placeholder="请输入"
        :rules="computedRules.internshipExplain"
      />

      <van-field-number
        v-if="form.isIntern === 'N' && form.isProbation === 'Y'"
        v-model.number="form.probationCycle" v-show-field="['probationCycle', includeFields]"
        name="probationCycle"
        label="试用期时长(月)"
        :rules="computedRules.probationCycle"
      />
    </div>

    <van-field
      v-model="form.isRecommend"
      v-show-field="['isRecommend', includeFields]"
      name="isRecommend"
      label="是否推荐"
      :rules="computedRules.isRecommend"
    >
      <template #input>
        <YesNoSwitch v-model="form.isRecommend" />
      </template>
    </van-field>

    <van-field
      v-if="form.isRecommend === 'Y'"
      v-model="form.reference"
      v-show-field="['reference', includeFields]"
      label="推荐来源"
      placeholder="请输入"
      type="textarea"
      rows="1"
      autosize
      name="reference"
      :rules="computedRules.reference"
    />

    <DictSelect
      v-model="form.certificates"
      v-show-field="['certificates', includeFields]"
      label="持证情况"
      name="certificates"
      multiple
      dict-type="oa_document_type"
      :rules="computedRules.certificates"
    />

    <van-field
      v-if="!isNil(form.certificates) && form.certificates.includes('9')"
      v-model="form.otherCertificates"
      v-show-field="['otherCertificates', includeFields]"
      label="其他证书"
      placeholder="请输入"
      type="textarea"
      rows="1"
      autosize
      name="otherCertificates"
      :rules="computedRules.otherCertificates"
    />

    <van-field
      v-model="form.transactorOpinion"
      v-show-field="['transactorOpinion', includeFields]"
      label="办理人意见"
      type="textarea"
      rows="1"
      autosize
      name="transactorOpinion"
      :rules="computedRules.transactorOpinion"
    />

    <van-field v-show-field="['userPreEmploymentEvaluateBoList', includeFields]">
      <template #label>
        <div class="flex justify-between w-full">
          <span>面试评价项</span>
        </div>
      </template>

      <template v-if="!isEmpty(form.userPreEmploymentEvaluateBoList)" #input>
        <div class="w-full flex flex-col gap-2">
          <TableCard v-for="(item, index) in form.userPreEmploymentEvaluateBoList" :key="index" :title="`# ${index + 1}`" class="reset-label">
            <van-field
              v-model="item.evaluateItemName"
              :name="`userPreEmploymentEvaluateBoList.${index}.evaluateItemName`"
              label="描述"
            >
              <template #input>
                <TextareaView :value="item.evaluateItemName" />
              </template>
            </van-field>

            <van-field
              v-model="item.result"
              :name="`userPreEmploymentEvaluateBoList.${index}.result`"
              label="评价结果"
              type="textarea"
              rows="1"
              autosize
              :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
            />
          </TableCard>
        </div>
      </template>
      <template v-else #input>
        <div class="w-full flex justify-center">
          <van-empty description="暂无数据" class="emptySize" />
        </div>
      </template>
    </van-field>

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

<script setup lang='ts'>
import { isEmpty, isNil } from 'lodash-es'
import { useForm } from './form'
import type { UserPreEmploymentForm } from '@/api/oa/personnel/userPreEmployment/types'
import { checkPhoneUnique } from '@/api/system/user'
import { checkPrePhoneUnique } from '@/api/oa/personnel/userPreEmployment/index'
import { listPostLevelEvaluate } from '@/api/oa/personnel/postLevelEvaluate'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { getDept } from '@/api/system/dept'
import { getPost } from '@/api/system/post'

const props = withDefaults(
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

// 表单
const { Form, form, rules, isLoading, updateLoading, reset, submit, view, workflowSubmit, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<UserPreEmploymentForm>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<UserPreEmploymentForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }
  return newRules
})

// 部门changge事件 带出招聘编号，根据招聘编号获取招聘申请列表，选择招聘编号，获取该招聘岗位下拉数据
async function deptChange(deptId: string) {
  form.value.recruitPostId = undefined
  form.value.postId = undefined
  form.value.recruitNo = undefined
  form.value.postName = undefined
  form.value.userPreEmploymentEvaluateBoList = []
  if (deptId) {
    // 获取部门类型
    getDeptType(deptId)
  }
}

// 根据部门id获取部门类型
async function getDeptType(deptId: string | number) {
  const res = await getDept(deptId)
  form.value.deptType = res.data.type
}

// 获面试评价项列表
async function getPostLevelList(postLevel, postName: string) {
  const res = await listPostLevelEvaluate({ level: postLevel })
  const list = []
  // 过滤出当前岗位的评价项
  res.rows.forEach((item: any) => {
    // 包含岗位名称
    if (item.name.includes(postName)) {
      delete item.id
      item.evaluateItemName = item.description
      item.result = ''
      list.push(item)
    }
  })
  form.value.userPreEmploymentEvaluateBoList = list
}

// 获取岗位级别
async function getPostLevel(postId: string | number) {
  const { data } = await getPost(postId)
  form.value.postName = data.postName
  form.value.level = Number(data.level)
  form.value.postCode = data.postCode
}

// 新部门的change事件
async function phonenumberChange(value: string) {
  try {
    await checkPhoneUnique({ phonenumber: value })

    await checkPrePhoneUnique({ phonenumber: value })
  }
  catch (error) {
    // 重复手机号清空重新填写
    form.value.phonenumber = ''
  }
}

// 录用情况change事件
function statusChange(value: string) {
  // 状态3录用
  if (value === '3') {
    if (form.value.postCode === 'JXYWRY') {
      form.value.isIntern = 'Y'
      form.value.isProbation = 'N'
    }
    else {
      form.value.isProbation = 'Y'
    }
  }
  else {
    // 如果不录用清空是否业主面试、是否试用期、试用期时长，
    form.value.isOwnerInterview = 'N'
    form.value.isIntern = 'N'
    form.value.isProbation = 'N'
    form.value.probationCycle = undefined
    form.value.internshipExplain = undefined
  }
}

// 是否有试用期的change事件
function changeIsProbation(value: string) {
  if (value === 'Y') {
    form.value.probationCycle = 3
  }
  else {
    form.value.probationCycle = undefined
    form.value.internshipExplain = undefined
  }
}

async function onPostSelectChange(value: string | number) {
  form.value.userPreEmploymentEvaluateBoList = []
  if (!isNil(value)) {
    // 岗位级别
    await getPostLevel(value)

    // 如果选择的岗位是见习运维人员
    if (form.value.postCode === 'JXYWRY') {
      form.value.isIntern = 'Y'
      form.value.isProbation = 'N'
      form.value.probationCycle = undefined
    }
    else {
      form.value.isIntern = 'N'
      form.value.isProbation = 'Y'
      form.value.probationCycle = 3
    }

    // 面试评价项列表
    await getPostLevelList(form.value.level, form.value.postName)
  }
  else {
    form.value.level = undefined
  }
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

<style scoped lang="scss">
.emptySize{
  padding: 0;
}
:deep(.emptySize .van-empty__image){
  width: 50px;
  height: 60px;
}
:deep(.emptySize .van-empty__description){
  margin-top: -10px;
  padding: 0;
}
</style>
