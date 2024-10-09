<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="10em">
    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['deptId', includeFields]" name="deptId" label="部门名称：" input-align="right">
        <template #input>
          <DeptSelect v-model="form.deptId" readonly />
        </template>
      </van-field>
      <van-field v-model="form.recruitNo" v-show-field="['recruitNo', includeFields]" name="recruitNo" label="招聘申请：" input-align="right" />
      <van-field v-model="form.postName" v-show-field="['postName', includeFields]" name="postName" label="岗位名称：" input-align="right" />
      <van-field v-model="form.name" v-show-field="['name', includeFields]" name="name" label="姓名：" input-align="right" />
      <van-field v-model="form.sex" v-show-field="['sex', includeFields]" name="sex" label="用户性别：" input-align="right">
        <template #input>
          <dict-tag :options="sys_user_sex" :value="form.sex" />
        </template>
      </van-field>
      <van-field v-model="form.phonenumber" v-show-field="['phonenumber', includeFields]" name="phonenumber" label="手机号码：" input-align="right" />

      <van-field v-model="form.interviewWay" v-show-field="['interviewWay', includeFields]" name="interviewWay" label="面试形式：" input-align="right">
        <template #input>
          <dict-tag :options="oa_interview" :value="form.interviewWay" />
        </template>
      </van-field>

      <van-field v-model="form.interviewDate" v-show-field="['interviewDate', includeFields]" name="interviewDate" label="面试日期：" input-align="right">
        <template #input>
          {{ parseTime(form.interviewDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.status" v-show-field="['status', includeFields]" name="status" label="状态：" input-align="right">
        <template #input>
          <dict-tag :options="oa_employment_status" :value="form.status" />
        </template>
      </van-field>

      <van-field v-model="form.isOwnerInterview" v-show-field="['isOwnerInterview', includeFields]" name="isOwnerInterview" label="是否需要业主面试：" input-align="right">
        <template #input>
          <dict-tag :options="sys_yes_no" :value="form.isOwnerInterview" />
        </template>
      </van-field>

      <van-field v-model="form.isProbation" v-show-field="['isProbation', includeFields]" name="isProbation" label="是否有试用期：" input-align="right">
        <template #input>
          <dict-tag :options="sys_yes_no" :value="form.isProbation" />
        </template>
      </van-field>

      <van-field v-model="form.probationCycle" v-show-field="['probationCycle', includeFields]" name="probationCycle" label="试用期时长(月)：" input-align="right" />

      <div class="pt-2 pl-4 text-sm">
        <h4>持证情况：</h4>
        <van-checkbox-group v-model="form.certificates" icon-size="14px">
          <van-checkbox v-for="item in oa_document_type" :key="item.value" :name="item.value" class="m-2" disabled>
            {{ item.label }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </van-cell-group>
    <div class="px-6 py-2 text-sm text-gray-500">
      面试评价项
    </div>
    <TableCard v-for="(item, index) in form.userPreEmploymentEvaluateBoList" :key="index" v-show-field="['userPreEmploymentEvaluateBoList', includeFields]" :title="`面试评价${index + 1}`" class="mx-4 mb-2" :default-collapse="true">
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

    <!-- 附件列表 -->
    <TableCard v-show-field="['ossIdList', includeFields]" title="附件列表" class="mx-4">
      <UploadFile v-if="form.ossIdList" v-model="form.ossIdList" readonly :card-size="60" />
      <van-empty v-else image-size="80" description="数据为空" />
    </TableCard>
  </van-form>
</template>

<script setup lang='ts'>
import { useForm } from './form'
import type { UserPreEmploymentForm } from '@/api/oa/personnel/userPreEmployment/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

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
// const checkboxRefs = ref([])
// function toggle(index) {
//   checkboxRefs.value[index].toggle()
// }
defineExpose({
  view,
  reset,
  workflowView,
})
</script>
