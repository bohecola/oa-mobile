<template>
  <van-form ref="Form" v-loading="isLoading" readonly label-width="8em">
    <van-cell-group inset class="!my-3">
      <van-field v-model="form.userName" v-show-field="['userId', includeFields]" name="userName" label="员工" input-align="right" />

      <van-field v-show-field="['deptId', includeFields]" name="deptId" label="部门名称" input-align="right">
        <template #input>
          <DeptSelect v-model="form.deptId" readonly />
        </template>
      </van-field>

      <van-field v-model="form.postName" v-show-field="['postName', includeFields]" name="postName" label="岗位名称" input-align="right" />

      <van-field v-show-field="['type', includeFields]" name="type" label="提前转正" input-align="right">
        <template #input>
          <dict-tag :options="sysYesNo" :value="form.type" />
        </template>
      </van-field>

      <van-cell v-show-field="['files', includeFields]" title="附件" input-align="right">
        <template #value>
          <UploadFile v-model="form.files" readonly :card-size="60" />
        </template>
      </van-cell>

      <van-field v-model="form.description" v-show-field="['description', includeFields]" name="description" label="描述" input-align="right">
        <template #input>
          <TextareaView :value="form.description" />
        </template>
      </van-field>
    </van-cell-group>
    <!-- 附件列表 -->
    <TableCard v-show-field="['ossIdList', includeFields]" title="附件列表" class="mx-4" :is-empty="isEmpty(form.ossIdList)">
      <UploadFile v-model="form.ossIdList" readonly :card-size="60" />
    </TableCard>
  </van-form>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { UserRecruitForm } from '@/api/oa/personnel/userRecruit/types'

withDefaults(
  defineProps<{
    includeFields?: (keyof UserRecruitForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof UserRecruitForm)[]
    },
    showLoading: true,
  },
)
// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { sys_yes_no } = toRefs<any>(proxy?.useDict('sys_yes_no'))

const { Form, form, isLoading, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserRecruitForm>()

const sysYesNo = computed(() => {
  return sys_yes_no.value.map((item: any) => {
    return {
      label: item.label,
      value: item.value === 'Y' ? '1' : '0',
    }
  })
})

defineExpose({
  reset,
  workflowView,
})
</script>
