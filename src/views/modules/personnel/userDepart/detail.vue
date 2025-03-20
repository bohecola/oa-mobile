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
    <van-field
      v-show-field="['userId', includeFields]"
      name="userId"
      label="员工"
    >
      <template #input>
        <UserSelect
          v-model="form.userId"
          readonly
        />
      </template>
    </van-field>

    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      name="deptId"
      label="部门"
    />

    <van-field
      v-show-field="['postId', includeFields]"
      name="postId"
      label="岗位"
    >
      <template #input>
        <PostSelect
          v-model="form.postId"
          :dept-id="form.deptId"
          multiple
          readonly
        />
      </template>
    </van-field>

    <DictSelect
      v-if="userTypeVisible"
      v-model="form.userType"
      v-show-field="['userType', includeFields]"
      label="人员类别"
      name="userType"
      dict-type="oa_user_type"
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
    />

    <van-field
      v-if="form.deptType === '2'"
      v-show-field="['specialCommercialInsurance', includeFields]"
      name="specialCommercialInsurance"
      label="购买特殊商业保险"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.specialCommercialInsurance"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-if="form.deptType === '2'"
      v-show-field="['isLoginCompanyEmail', includeFields]"
      name="isLoginCompanyEmail"
      label="是否登录过项目部公司邮箱"
    >
      <template #input>
        <YesNoSwitch
          v-model="form.isLoginCompanyEmail"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-show-field="['handoverPerson', includeFields]"
      name="handoverPerson"
      label="交接人"
    >
      <template #input>
        <UserSelect
          v-model="form.handoverPerson"
          readonly
        />
      </template>
    </van-field>

    <DateSelect
      v-if="form.departDate"
      v-model="form.departDate"
      v-show-field="['departDate', includeFields]"
      name="departDate"
      label="实际离职日期"
    />

    <van-field
      v-show-field="['reason', includeFields]"
      name="reason"
      label="离职原因"
    >
      <template #input>
        <TextareaView :value="form.reason" />
      </template>
    </van-field>

    <van-field
      v-if="form.handoverContent"
      v-show-field="['handoverContent', includeFields]"
      name="handoverContent"
      label="交接内容"
    >
      <template #input>
        <TextareaView :value="form.handoverContent" />
      </template>
    </van-field>

    <van-field
      v-if="form.documentContent"
      v-show-field="['documentContent', includeFields]"
      name="documentContent"
      label="归档内容"
    >
      <template #input>
        <TextareaView :value="form.documentContent" />
      </template>
    </van-field>

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

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash-es'
import PostSelect from '../components/PostSelect.vue'
import { useForm } from './form'
import type { UserDepartForm } from '@/api/oa/personnel/userDepart/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
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

const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserDepartForm>()

const taskDefinitionKey = inject<Ref<string>>('taskDefinitionKey')
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

defineExpose({
  view,
  reset,
  workflowView,
})
</script>
