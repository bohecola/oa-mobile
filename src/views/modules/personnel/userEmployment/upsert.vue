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
    <div>
      <van-field
        name="checked"
        label="面试评价"
      >
        <template #input>
          <van-switch v-model="form.checked" size="18px" @change="checkedChange" />
        </template>
      </van-field>

      <UserEmploymentSelect
        v-if="form.checked"
        v-model="form.preEmploymentId"
        v-show-field="['preEmploymentId', includeFields]"
        name="preEmploymentId"
        label="员工"
        :rules="computedRules.preEmploymentId"
        @confirm="getPreUser"
      />

      <van-field
        v-else
        v-model="form.name"
        v-show-field="['name', includeFields]"
        name="name"
        label="员工"
        placeholder="请输入"
        :rules="computedRules.name"
      />
    </div>

    <!-- 面试评价true -->
    <van-form
      v-if="form.checked"
      label-align="top"
      input-align="left"
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
        name="phonenumber"
        type="tel"
        maxlegth="11"
        label="手机号"
      />

      <van-field-number
        v-model.number="form.age"
        v-show-field="['age', includeFields]"
        name="age"
        type="digit"
        label="年龄"
      />
    </van-form>

    <!-- 面试评价false -->
    <van-form
      v-else
      label-align="top"
      input-align="left"
      required="auto"
      scroll-to-error
    >
      <DeptSelect
        v-model="form.deptId"
        v-show-field="['deptId', includeFields]"
        name="deptId"
        label="部门"
        :rules="computedRules.deptId"
        @change="deptChange"
      />

      <PostSelect
        v-model="form.postId"
        v-show-field="['postId', includeFields]"
        name="postId"
        label="岗位"
        :dept-id="form.deptId"
        :rules="computedRules.postId"
        @change="postChange"
      />

      <DictSelect
        v-model="form.sex"
        v-show-field="['sex', includeFields]"
        label="性别"
        name="sex"
        dict-type="sys_user_sex"
        :rules="computedRules.sex"
      />

      <van-field-number
        v-model.number="form.phonenumber"
        v-show-field="['phonenumber', includeFields]"
        type="tel"
        maxlength="11"
        label="手机号"
        placeholder="请输入"
        name="phonenumber"
        :rules="computedRules.phonenumber"
        @change="phonenumberChange"
      />

      <van-field-number
        v-model.number="form.age"
        v-show-field="['age', includeFields]"
        name="age"
        type="digit"
        label="年龄"
        :rules="computedRules.age"
      />
    </van-form>

    <DateSelect
      v-model="form.hopeDate"
      v-show-field="['hopeDate', includeFields]"
      name="hopeDate"
      label="预计到岗时间"
      :rules="computedRules.hopeDate"
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

    <van-field-number
      v-model.number="form.wages"
      v-show-field="['wages', includeFields]"
      label="工资"
      name="wages"
      :rules="computedRules.wages"
      @update:model-value="wagesChange"
    />

    <van-field-number
      v-model.number="form.baseWages"
      v-show-field="['baseWages', includeFields]"
      name="baseWages"
      label="基本工资"
      :rules="computedRules.baseWages"
      @update:model-value="manualWagesChange"
    />

    <van-field-number
      v-model.number="form.postWages"
      v-show-field="['postWages', includeFields]"
      name="postWages"
      label="岗位工资"
      :rules="computedRules.postWages"
      @update:model-value="manualWagesChange"
    />

    <van-field-number
      v-model.number="form.performanceWages"
      v-show-field="['performanceWages', includeFields]"
      name="performanceWages"
      label="绩效工资"
      :rules="computedRules.performanceWages"
      @update:model-value="manualWagesChange"
    />

    <div v-if="form.level >= 38">
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
        v-show-field="['isOwnerInterview', includeFields]"
        name="isOwnerInterview"
        label="是否需要业主面试"
        :rules="computedRules.isOwnerInterview"
      >
        <template #input>
          <YesNoSwitch v-model="form.isOwnerInterview" />
        </template>
      </van-field>
    </div>

    <van-field
      v-show-field="['isOutsource', includeFields]"
      name="isOutsource"
      label="是否为外包人员"
      :rules="computedRules.isOutsource"
    >
      <template #input>
        <YesNoSwitch v-model="form.isOutsource" />
      </template>
    </van-field>

    <!-- 面试评价true -->
    <van-form
      v-if="form.checked"
      label-align="top"
      input-align="left"
      readonly
    >
      <van-field
        v-if="form.postCode !== 'JXYWRY'"
        v-show-field="['isIntern', includeFields]"
        name="isIntern"
        label="是否实习生"
        :rules="computedRules.isIntern"
      >
        <template #input>
          <YesNoSwitch v-model="form.isIntern" readonly />
        </template>
      </van-field>

      <van-field
        v-if="form.postCode !== 'JXYWRY'"
        v-show-field="['isProbation', includeFields]"
        name="isProbation"
        :label="form.isIntern !== 'Y' ? '是否有试用期' : '是否有实习期'"
        :rules="computedRules.isProbation"
        @change="isProbationChange"
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

      <van-field-number
        v-if="form.isIntern === 'N' && form.isProbation === 'Y'"
        v-model.number="form.probationCycle"
        v-show-field="['probationCycle', includeFields]"
        name="probationCycle"
        label="试用期时长(月)"
      />
    </van-form>

    <!-- 面试评价false -->
    <van-form
      v-else
      label-align="top"
      input-align="left"
      required="auto"
      scroll-to-error
    >
      <van-field
        v-if="form.postCode !== 'JXYWRY'"
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
        v-if="form.postCode !== 'JXYWRY'"
        v-show-field="['isProbation', includeFields]"
        name="isProbation"
        :label="form.isIntern !== 'Y' ? '是否有试用期' : '是否有实习期'"
        :rules="computedRules.isProbation"
        @change="isProbationChange"
      >
        <template #input>
          <YesNoSwitch v-model="form.isProbation" />
        </template>
      </van-field>

      <van-field
        v-if="form.isIntern === 'Y' && form.isProbation === 'Y'"
        v-model="form.internshipExplain"
        v-show-field="['internshipExplain', includeFields]"
        name="internshipExplain"
        label="实习期时长说明"
        placeholder="请输入"
        :rules="computedRules.internshipExplain"
      />

      <van-field
        v-if="form.isIntern === 'N' && form.isProbation === 'Y'"
        v-model="form.probationCycle"
        v-show-field="['probationCycle', includeFields]"
        name="probationCycle"
        label="试用期时长(月)"
        placeholder="请输入"
        :rules="computedRules.probationCycle"
      />
    </van-form>

    <van-field-number
      v-if="form.isProbation === 'Y'"
      v-model="form.probationWagesRate"
      v-show-field="['probationWagesRate', includeFields]"
      name="probationWagesRate"
      label="试用期薪资发放标准"
      placeholder="请输入"
      :rules="computedRules.probationWagesRate"
    >
      <template #extra>
        <span class="absolute top-[38px] left-16">%</span>
      </template>
    </van-field-number>

    <!-- 面试评价true -->
    <van-form
      v-if="form.checked"
      label-align="top"
      input-align="left"
      readonly
    >
      <van-field
        v-show-field="['isRecommend', includeFields]"
        name="isRecommend"
        label="是否推荐"
      >
        <template #input>
          <YesNoSwitch v-model="form.isRecommend" readonly />
        </template>
      </van-field>

      <van-field
        v-if="form.isRecommend === 'Y'"
        v-model="form.reference"
        v-show-field="['reference', includeFields]"
        name="reference"
        label="推荐来源"
      />
    </van-form>

    <van-form
      v-else
      label-align="top"
      input-align="left"
      required="auto"
    >
      <van-field
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
        name="reference"
        label="推荐来源"
        placeholder="请输入"
        :rules="computedRules.reference"
      />
    </van-form>

    <DateSelect
      v-model="form.realDate"
      v-show-field="['realDate', includeFields]"
      name="realDate"
      label="实际到岗日期"
      :rules="computedRules.realDate"
    />

    <van-field
      v-model.trim="form.userAccount"
      v-show-field="['userAccount', includeFields]"
      name="userAccount"
      label="系统账号"
      :rules="computedRules.userAccount"
      @change="userAccountChange"
    />

    <DictSelect
      v-if="form.level >= 38"
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
      placeholder="请输入"
      type="textarea"
      rows="1"
      autosize
      name="otherCertificates"
      :rules="computedRules.otherCertificates"
    />

    <van-field
      v-if="form.level >= 38"
      v-model="form.employmentEvaluate"
      v-show-field="['employmentEvaluate', includeFields]"
      label="面试评价"
      placeholder="请输入"
      type="textarea"
      rows="1"
      autosize
      name="employmentEvaluate"
      :rules="computedRules.employmentEvaluate"
    />

    <van-field
      v-model="form.description"
      v-show-field="['description', includeFields]"
      label="其他"
      placeholder="请输入"
      type="textarea"
      rows="1"
      autosize
      name="description"
      :rules="computedRules.description"
    />

    <van-field
      v-model="form.remark"
      v-show-field="['remark', includeFields]"
      name="remark"
      type="textarea"
      rows="1"
      autosize
      label="备注"
      placeholder="请输入"
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
        <UploadFile v-model="form.ossIdList" value-type="array" />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import { isNil } from 'lodash-es'
import UserEmploymentSelect from '../components/UserEmploymentSelect.vue'
import { useForm } from './form'
import { checkPhoneUnique, checkUserNameUnique } from '@/api/system/user'
import type { UserEmploymentForm } from '@/api/oa/personnel/userEmployment/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import { getPost } from '@/api/system/post'
import { checkPrePhoneUnique } from '@/api/oa/personnel/userPreEmployment'
import type { UserPreEmploymentVO } from '@/api/oa/personnel/userPreEmployment/types'

const props = withDefaults(
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

// 表单
const { Form, form, rules, isLoading, updateLoading, reset, submit, view, workflowSubmit, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<UserEmploymentForm>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<UserEmploymentForm> = {}
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

// TODO 选择预入职的员工
// 获取选择的预入职的员工row和岗位级别
function getPreUser(value: string, selectedList: UserPreEmploymentVO[]) {
  const row = selectedList[0]
  // TODO 表单的值赋值一部分
  form.value = { ...row, checked: true, preEmploymentId: row.id, id: undefined }
  form.value.interviewDate = row.interviewDate.split(' ')[0]
  form.value.isOutsource = 'N'
  // 获取岗位级别
  getPostLevel(row.postId)
}

// 是否通过面试入职的复选框 清空部门、岗位、性别、试用期、手机号
function checkedChange() {
  // TODO 清空表单一部分
  form.value.preEmploymentId = undefined
  form.value.name = undefined
  form.value.deptId = undefined
  form.value.postId = undefined
  form.value.sex = undefined
  form.value.phonenumber = undefined
  form.value.probationCycle = undefined
  form.value.isRecommend = 'N'
  form.value.reference = undefined
  form.value.employmentEvaluate = undefined
}

// 部门change事件
function deptChange() {
  form.value.postId = undefined
  form.value.level = undefined
}

// 获取岗位级别
async function getPostLevel(postId: string | number) {
  if (postId) {
    const res = await getPost(postId)
    form.value.level = Number(res.data.level)
    form.value.postCode = res.data.postCode
  }
}

async function postChange(postId: string | number) {
  await getPostLevel(postId)

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

  // 清空面试日期、面试形式、是否业主面、是否实习生、是否试用期、是否推荐、持证情况
  form.value.interviewWay = undefined
  form.value.interviewDate = undefined
  form.value.isOwnerInterview = 'N'
  form.value.isRecommend = 'N'
  form.value.certificates = undefined
  form.value.employmentEvaluate = undefined
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

// 是否有试用期的change
function isProbationChange(value: string) {
  if (value === 'Y') {
    form.value.probationCycle = 3
  }
  else {
    form.value.probationCycle = undefined
    form.value.probationWagesRate = undefined
  }
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
