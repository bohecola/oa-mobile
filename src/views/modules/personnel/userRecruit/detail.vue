<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="8em">
    <van-field v-model="form.no" v-show-field="['no', includeFields]" name="no" label="编号：" />

    <van-field v-show-field="['deptId', includeFields]" name="deptId" label="部门名称：">
      <template #input>
        <DeptSelect v-model="form.deptId" readonly />
      </template>
    </van-field>
    <van-field v-model="form.status" v-show-field="['status', includeFields]" name="status" label="状态：">
      <template #input>
        <dict-tag :options="oa_recruit_status" :value="form.status" />
      </template>
    </van-field>

    <van-field v-model="form.recruitStartDate" v-show-field="['recruitStartDate', includeFields]" name="recruitStartDate" label="招聘开始时间：">
      <template #input>
        {{ parseTime(form.recruitStartDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>

    <van-field v-model="form.recruitEndDate" v-show-field="['recruitEndDate', includeFields]" name="recruitEndDate" label="招聘完成日期：">
      <template #input>
        {{ parseTime(form.recruitEndDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>

    <van-field v-model="form.hopeArriveDate" v-show-field="['hopeArriveDate', includeFields]" name="hopeArriveDate" label="期望到达日期：">
      <template #input>
        {{ parseTime(form.hopeArriveDate, '{y}-{m}-{d}') }}
      </template>
    </van-field>

    <van-field v-model="form.applyReason" v-show-field="['applyReason', includeFields]" name="applyReason" label="申请原因：">
      <template #input>
        <TextareaView :value="form.applyReason" />
      </template>
    </van-field>

    <div v-show-field="['userRecruitPostBoList', includeFields]" class="p-2 flex flex-col gap-2">
      <table-card v-for="(item, index) in form.userRecruitPostBoList" :key="index" :title="`招聘岗位：${item.postName}`">
        <card-cell label="岗位名称" :value="item.postName" />
        <card-cell label="招聘人数" :value="item.userNum" />
        <card-cell label="驻勤补助标准" :value="item.subsidyAmount" />
        <card-cell label="乘坐标准" :value="item.ridingStandards" />
        <card-cell label="交通费标准" :value="item.transportationFeeStandard" />
        <card-cell label="岗位职责">
          <template #value>
            <TextareaView :value="item.responsibility" />
          </template>
        </card-cell>
        <card-cell label="任职要求" :value="item.demand">
          <template #value>
            <TextareaView :value="item.demand" />
          </template>
        </card-cell>
      </table-card>
    </div>
  </van-form>
</template>

<script setup lang='ts'>
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
const { oa_recruit_status } = toRefs<any>(proxy?.useDict('oa_recruit_status'))

const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserRecruitForm>()

defineExpose({
  view,
  reset,
  workflowView,
})
</script>
