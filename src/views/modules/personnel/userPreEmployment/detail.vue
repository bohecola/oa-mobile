<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="10em">
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

    <!-- 单元格形式，一行展示多列 -->
    <!-- <div v-show-field="['userPreEmploymentEvaluateBoList', includeFields]" class="mb-6">
      <van-cell-group title="面试评价">
        <div class="py-2 px-4">
          <div v-for="(item, index) in form.userPreEmploymentEvaluateBoList" :key="index">
            <div class="text-sm flex gap-6 opacity-60">
              <span>描述：{{ item.evaluateItemName }}</span>
              <span>评价结果：{{ item.result }}</span>
            </div>
          </div>
        </div>
      </van-cell-group>
    </div> -->
    <!-- 卡片表格，一行展示一列 -->
    <div class="p-2 flex flex-col gap-2 text-sm">
      <table-card v-for="(item, index) in form.userPreEmploymentEvaluateBoList" :key="index" :title="`面试评价${index + 1}`">
        <card-cell label="描述：" :value="item.evaluateItemName" />
        <card-cell label="评价结果：" :value="item.result" />
      </table-card>
    </div>
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
