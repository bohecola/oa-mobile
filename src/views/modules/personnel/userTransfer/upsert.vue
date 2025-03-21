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
    <van-field
      v-model="form.userId"
      v-show-field="['userId', includeFields]"
      name="userId"
      label="员工"
      :rules="computedRules.userId"
    >
      <template #input>
        <UserSelect v-model="form.userId" readonly />
      </template>
    </van-field>

    <DictSelect
      v-model="form.type"
      v-show-field="['type', includeFields]"
      label="类型"
      name="type"
      dict-type="oa_transfer_type"
      :rules="computedRules.type"
    />

    <van-field
      v-show-field="['oldCompanyId', includeFields]"
      name="oldCompanyId"
      label="原公司"
      :rules="computedRules.oldCompanyId"
    >
      <template #input>
        <CompanySelect v-model="form.oldCompanyId" />
      </template>
    </van-field>

    <van-field
      v-show-field="['oldDeptId', includeFields]"
      name="oldDeptId"
      label="原部门/项目部"
      :rules="computedRules.oldDeptId"
    >
      <template #input>
        <DeptCascader v-model="form.oldDeptId" :company-id="form.oldCompanyId" />
      </template>
    </van-field>

    <van-field
      v-show-field="['oldPostId', includeFields]"
      name="oldPostId"
      label="原岗位"
      :rules="computedRules.oldPostId"
    >
      <template #input>
        <PostSelect v-model="form.oldPostId" :dept-id="form.oldDeptId" multiple />
      </template>
    </van-field>

    <van-field
      v-show-field="['newCompanyId', includeFields]"
      name="newCompanyId"
      label="调入公司"
      :rules="computedRules.newCompanyId"
      @change="newCompanyChange"
    >
      <template #input>
        <CompanySelect v-model="form.newCompanyId" />
      </template>
    </van-field>

    <van-field
      v-show-field="['newDeptId', includeFields]"
      name="newDeptId"
      label="调入部门/项目部"
      :rules="computedRules.newDeptId"
      @node-click="newDeptChange"
    >
      <template #input>
        <DeptCascader v-model="form.newDeptId" :company-id="form.newCompanyId" />
      </template>
    </van-field>

    <van-field
      v-show-field="['newPostId', includeFields]"
      name="newPostId"
      label="调入岗位"
      :rules="computedRules.newPostId"
    >
      <template #input>
        <PostSelect v-model="form.newPostId" :dept-id="form.newDeptId" multiple />
      </template>
    </van-field>

    <DateSelect
      v-model="form.startDate"
      v-show-field="['startDate', includeFields]"
      name="startDate"
      label="生效日期"
      :rules="computedRules.startDate"
    />

    <DateSelect
      v-model="form.endDate"
      v-show-field="['endDate', includeFields]"
      name="endDate"
      label="截止日期"
      :rules="computedRules.endDate"
    />

    <van-field
      v-show-field="['iscommander', includeFields]"
      name="iscommander"
      label="是否具有主管权限"
      :rules="computedRules.iscommander"
      @change="iscommanderChange"
    >
      <template #input>
        <YesNoSwitch v-model="form.iscommander" />
      </template>
    </van-field>

    <van-field
      v-if="form.iscommander === 'Y'"
      v-model="form.commanderPowerHandover"
      v-show-field="['commanderPowerHandover', includeFields]"
      name="commanderPowerHandover"
      label="主管权限交接人"
      :rules="computedRules.commanderPowerHandover"
      is-link
      @click="CommanderPowerHandoverSelectRef?.open"
    >
      <template #input>
        <UserSelect ref="CommanderPowerHandoverSelectRef" v-model="form.commanderPowerHandover" />
      </template>
    </van-field>

    <van-field
      v-if="!isNil(form.oldSpecialCommercialInsurance) && form.oldDeptType === '2'"
      v-show-field="['oldSpecialCommercialInsurance', includeFields]"
      name="oldSpecialCommercialInsurance"
      label="原项目部是否有特殊商业保险"
      :rules="computedRules.oldSpecialCommercialInsurance"
    >
      <template #input>
        <YesNoSwitch v-model="form.oldSpecialCommercialInsurance" />
      </template>
    </van-field>

    <van-field
      v-if="!isNil(form.newSpecialCommercialInsurance) && form.newDeptType === '2'"
      v-show-field="['newSpecialCommercialInsurance', includeFields]"
      name="newSpecialCommercialInsurance"
      label="调入项目部是否有特殊商业保险"
      :rules="computedRules.newSpecialCommercialInsurance"
    >
      <template #input>
        <YesNoSwitch v-model="form.newSpecialCommercialInsurance" />
      </template>
    </van-field>

    <van-field
      v-model="form.reason"
      v-show-field="['reason', includeFields]"
      label="调用原因"
      type="textarea"
      rows="1"
      autosize
      name="reason"
      :rules="computedRules.reason"
    />

    <van-field
      v-model="form.remark"
      v-show-field="['remark', includeFields]"
      label="备注"
      type="textarea"
      rows="1"
      autosize
      name="remark"
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

<script setup name="userTransferDetail" lang="ts">
import { isNil } from 'lodash-es'
// import CompanySelect from '../components/CompanySelect.vue'
import DeptCascader from '../components/DeptCascader.vue'
import PostSelect from '../components/PostSelect.vue'
import { useForm } from './form'
import { getUserInfoAll } from '@/api/oa/personnel/userTransfer'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { UserTransferForm } from '@/api/oa/personnel/userTransfer/types'
// import { useDisabledDateFn } from '@/hooks'
import type { DeptVO } from '@/api/system/dept/types'
import { getDept } from '@/api/system/dept'
import UserSelect from '@/components/UserSelect/index.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: (keyof UserTransferForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof UserTransferForm)[]
    },
    showLoading: true,
  },
)

// 表单
const { Form, form, rules, isLoading, updateLoading, userInfo, reset, submit, view, workflowSubmit, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<UserTransferForm>()

const CommanderPowerHandoverSelectRef = ref<InstanceType<typeof UserSelect> | null>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<UserTransferForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }
  return newRules
})

// 结束日期不可选
// const { disabledDateFn } = useDisabledDateFn(() => form.value.startDate)

// 根据用户id获取原公司、 原部门、 原岗位
async function getUserAll(userId: string | number) {
  const res = await getUserInfoAll(userId)

  const { companyId, user, posts } = res.data
  const { deptId } = user

  // 原公司id
  form.value.oldCompanyId = companyId

  // 原部门
  form.value.oldDeptId = deptId

  const { data } = await getDept(form.value.oldDeptId)
  form.value.oldDeptType = data.type
  form.value.oldSpecialCommercialInsurance = data.specialCommercialInsurance

  // 处理原岗位
  if (posts?.length) {
    form.value.oldPostId = posts.length === 1 ? posts[0].postId : posts.map((item: any) => item.postId).join(',')
  }
}

// 新公司的change事件（清空新部门、新岗位、并且两个下拉框数据）
function newCompanyChange(value: string | number) {
  form.value.newDeptId = undefined
  form.value.newPostId = undefined
}

// 新部门的change事件（清空新岗位）
function newDeptChange(value: DeptVO) {
  form.value.newPostId = undefined
  form.value.newDeptType = value.type
  form.value.newSpecialCommercialInsurance = value.specialCommercialInsurance
}

// 是否具有主管权限人（清空交接人）
function iscommanderChange() {
  form.value.commanderPowerHandover = undefined
}

onMounted(() => {
  form.value.userId = userInfo.info.userId
  getUserAll(userInfo.info.userId)
})

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
