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
      is-link
      @click="UserSelectRef?.open"
    >
      <template #input>
        <UserSelect ref="UserSelectRef" v-model="form.userId" />
      </template>
    </van-field>

    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      name="deptId"
      label="部门"
      :rules="computedRules.deptId"
    />

    <van-field v-show-field="['postId', includeFields]" name="postId" label="岗位" :rules="computedRules.postId">
      <template #input>
        <PostSelect v-model="form.postId" :dept-id="form.deptId" multiple />
      </template>
    </van-field>

    <DictSelect
      v-if="userTypeVisible"
      v-model="form.userType"
      v-show-field="['userType', includeFields]"
      label="人员类别"
      name="userType"
      dict-type="oa_user_type"
      :rules="computedRules.userType"
    />

    <DateSelect
      v-model="form.entryCompanyDate"
      v-show-field="['entryCompanyDate', includeFields]"
      name="entryCompanyDate"
      label="入职时间"
    />

    <DateSelect
      v-model="form.departPreDate"
      v-show-field="['departPreDate', includeFields]"
      name="departPreDate"
      label="预计离职时间"
      :rules="computedRules.departPreDate"
    />

    <div v-if="form.deptType === '2'">
      <van-field
        v-show-field="['specialCommercialInsurance', includeFields]"
        name="specialCommercialInsurance"
        label="购买特殊商业保险"
        :rules="computedRules.specialCommercialInsurance"
      >
        <template #input>
          <YesNoSwitch v-model="form.specialCommercialInsurance" readonly />
        </template>
      </van-field>

      <van-field
        v-show-field="['isLoginCompanyEmail', includeFields]"
        name="isLoginCompanyEmail"
        label="是否登录过项目部公司邮箱"
        :rules="computedRules.isLoginCompanyEmail"
      >
        <template #input>
          <YesNoSwitch v-model="form.isLoginCompanyEmail" />
        </template>
      </van-field>
    </div>

    <van-field
      v-model="form.handoverPerson"
      v-show-field="['handoverPerson', includeFields]"
      name="handoverPerson"
      label="交接人"
      :rules="computedRules.handoverPerson"
      is-link
      @click="HandoverPersonSelectRef?.open"
    >
      <template #input>
        <UserSelect ref="HandoverPersonSelectRef" v-model="form.handoverPerson" />
      </template>
    </van-field>

    <DateSelect
      v-if="form.departDate"
      v-model="form.departDate"
      v-show-field="['departDate', includeFields]"
      name="departDate"
      label="实际离职日期"
      :rules="computedRules.departDate"
    />

    <van-field
      v-model="form.reason"
      v-show-field="['reason', includeFields]"
      label="离职原因"
      type="textarea"
      rows="1"
      autosize
      name="reason"
      :rules="computedRules.reason"
    />

    <van-field
      v-if="form.handoverContent"
      v-model="form.handoverContent"
      v-show-field="['handoverContent', includeFields]"
      label="交接内容"
      type="textarea"
      rows="1"
      autosize
      name="handoverContent"
      :rules="computedRules.handoverContent"
    />

    <van-field
      v-if="form.documentContent"
      v-model="form.documentContent"
      v-show-field="['documentContent', includeFields]"
      label="归档内容"
      type="textarea"
      rows="1"
      autosize
      name="documentContent"
      :rules="computedRules.documentContent"
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
import PostSelect from '../components/PostSelect.vue'
import { useForm } from './form'
import { getDept } from '@/api/system/dept'
import type { UserDepartForm } from '@/api/oa/personnel/userDepart/types'
import { getUserInfo } from '@/api/oa/personnel/user/index'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import UserSelect from '@/components/UserSelect/index.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: (keyof UserDepartForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof UserDepartForm)[]
    },
    showLoading: true,
  },
)

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 表单
const { Form, form, rules, isLoading, updateLoading, user, reset, submit, view, workflowSubmit, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<UserDepartForm>()

const taskDefinitionKey = inject<Ref<string>>('taskDefinitionKey')

const UserSelectRef = ref<InstanceType<typeof UserSelect> | null>()
const HandoverPersonSelectRef = ref<InstanceType<typeof UserSelect> | null>()

const shouldUserTypeEdit = ref(false)
const userTypeVisible = computed(() => {
  if (taskDefinitionKey.value === 'Activity_0jjf8i3') {
    return true
  }
  else if (!isNil(form.value.userType) && taskDefinitionKey.value !== 'Activity_0jjf8i3') {
    return true
  }
  else {
    return false
  }
})

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<UserDepartForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }
  return newRules
})

// 校验离职人和交接人不能是同一个
function handoverPersonChange(id: string | number) {
  if (form.value.userId === id) {
    form.value.handoverPerson = null
    proxy.$modal.msgWarning('交接人不可以和离职人一致,请重新选择！')
  }
}

async function init() {
  // 默认当前登录用户
  form.value.userId = user.info.userId
  form.value.deptId = user.info.deptId
  form.value.postId = user.info.postIdStr

  // 获取入职时间
  const userRes = await getUserInfo(form.value.userId)
  form.value.entryCompanyDate = userRes.data.entryCompanyDate.split(' ')[0]

  // 获取部门类型
  const deptRes = await getDept(form.value.deptId)
  form.value.deptType = deptRes.data.type
  form.value.specialCommercialInsurance = deptRes.data.specialCommercialInsurance
}

onMounted(() => {
  init()

  // 人力扣款节点必选
  if (taskDefinitionKey.value === 'Activity_0jjf8i3') {
    (rules.value.userType as any).forEach((e: any) => {
      e.required = true
    })

    if (isNil(form.value.userType)) {
      shouldUserTypeEdit.value = true
    }
  }
})

defineExpose({
  isLoading,
  updateLoading,
  user,
  reset,
  view,
  submit,
  workflowSubmit,
  workflowView,
})
</script>
