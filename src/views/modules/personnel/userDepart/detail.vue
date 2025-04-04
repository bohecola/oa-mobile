<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" class="reset-label" label-width="auto" label-align="top" readonly>
    <van-field v-show-field="['userId', includeFields]" name="userId" label="员工" input-align="left">
      <template #input>
        <UserSelect v-model="form.userId" readonly />
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

    <van-field v-if="userTypeVisible" v-show-field="['userType', includeFields]" name="userType" label="人员类别" input-align="left">
      <template #input>
        <DictSelect v-model="form.userType" dict-type="oa_user_type" readonly />
      </template>
    </van-field>

    <van-field v-show-field="['entryCompanyDate', includeFields]" name="entryCompanyDate" label="入职时间" input-align="left">
      <template #input>
        {{ parseTime(form.entryCompanyDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>

    <van-field v-show-field="['departPreDate', includeFields]" name="departPreDate" label="预计离职时间" input-align="left">
      <template #input>
        {{ parseTime(form.departPreDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>

    <van-field v-if="form.deptType === '2'" v-show-field="['specialCommercialInsurance', includeFields]" name="specialCommercialInsurance" label="购买特殊商业保险" input-align="left">
      <template #input>
        <YesNoSwitch v-model="form.specialCommercialInsurance" readonly />
      </template>
    </van-field>

    <van-field v-if="form.deptType === '2'" v-show-field="['isLoginCompanyEmail', includeFields]" name="isLoginCompanyEmail" label="是否登录过项目部公司邮箱" input-align="left">
      <template #input>
        <YesNoSwitch v-model="form.isLoginCompanyEmail" readonly />
      </template>
    </van-field>

    <van-field v-show-field="['handoverPerson', includeFields]" name="handoverPerson" label="交接人" input-align="left">
      <template #input>
        <UserSelect v-model="form.handoverPerson" readonly />
      </template>
    </van-field>

    <van-field v-if="form.departDate" v-show-field="['departDate', includeFields]" name="departDate" label="实际离职日期" input-align="left">
      <template #input>
        {{ parseTime(form.departDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>

    <van-field v-show-field="['reason', includeFields]" name="reason" label="离职原因" input-align="left">
      <template #input>
        <TextareaView :value="form.reason" />
      </template>
    </van-field>

    <van-field v-if="form.handoverContent" v-show-field="['handoverContent', includeFields]" name="handoverContent" label="交接内容" input-align="left">
      <template #input>
        <TextareaView :value="form.handoverContent" />
      </template>
    </van-field>

    <van-field v-if="form.documentContent" v-show-field="['documentContent', includeFields]" name="documentContent" label="归档内容" input-align="left">
      <template #input>
        <TextareaView :value="form.documentContent" />
      </template>
    </van-field>

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
