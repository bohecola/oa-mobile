<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="8em">
    <van-cell-group inset class="!my-3">
      <van-field v-model="form.no" v-show-field="['no', includeFields]" name="no" label="编号：" input-align="right" />

      <van-field v-show-field="['deptId', includeFields]" name="deptId" label="部门名称：" input-align="right">
        <template #input>
          <DeptSelect v-model="form.deptId" readonly />
        </template>
      </van-field>
      <van-field v-model="form.status" v-show-field="['status', includeFields]" name="status" label="状态：" input-align="right">
        <template #input>
          <dict-tag :options="oa_recruit_status" :value="form.status" />
        </template>
      </van-field>

      <van-field v-model="form.recruitStartDate" v-show-field="['recruitStartDate', includeFields]" name="recruitStartDate" label="招聘开始时间：" input-align="right">
        <template #input>
          {{ parseTime(form.recruitStartDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.recruitEndDate" v-show-field="['recruitEndDate', includeFields]" name="recruitEndDate" label="招聘完成日期：" input-align="right">
        <template #input>
          {{ parseTime(form.recruitEndDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.hopeArriveDate" v-show-field="['hopeArriveDate', includeFields]" name="hopeArriveDate" label="期望到达日期：" input-align="right">
        <template #input>
          {{ parseTime(form.hopeArriveDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.applyReason" v-show-field="['applyReason', includeFields]" name="applyReason" label="申请原因：" input-align="right">
        <template #input>
          <TextareaView :value="form.applyReason" />
        </template>
      </van-field>
    </van-cell-group>

    <div class="px-6 py-2 text-sm text-gray-500">
      招聘岗位
    </div>
    <TableCard v-for="(item, index) in form.userRecruitPostBoList" :key="index" v-show-field="['userRecruitPostBoList', includeFields]" :title="item.postName" class="mx-4 mb-2" :default-collapse="true">
      <van-field
        v-model="item.postName"
        :name="`itemList.${index}.postName`"
        label="岗位名称"
        input-align="right"
      />
      <van-field
        v-model="item.userNum"
        :name="`itemList.${index}.userNum`"
        label="招聘人数"
        input-align="right"
      />
      <van-field
        v-model="item.subsidyAmount"
        :name="`itemList.${index}.subsidyAmount`"
        label="驻勤补助标准"
        input-align="right"
      />
      <van-field
        v-model="item.ridingStandards"
        :name="`itemList.${index}.ridingStandards`"
        label="乘坐标准"
        input-align="right"
      />
      <van-field
        v-model="item.transportationFeeStandard"
        :name="`itemList.${index}.transportationFeeStandard`"
        label="交通费标准"
        input-align="right"
      />
      <van-field
        v-model="item.responsibility"
        :name="`itemList.${index}.responsibility`"
        label="岗位职责"
        input-align="right"
      >
        <template #input>
          <TextareaView :value="item.responsibility" />
        </template>
      </van-field>
      <van-field
        v-model="item.demand"
        :name="`itemList.${index}.demand`"
        label="任职要求"
        input-align="right"
      >
        <template #input>
          <TextareaView :value="item.demand" />
        </template>
      </van-field>
    </TableCard>

    <!-- 附件列表 -->
    <TableCard v-show-field="['ossIdList', includeFields]" title="附件列表" class="mx-4" :is-empty="isEmpty(form.ossIdList)">
      <UploadFile v-model="form.ossIdList" readonly :card-size="60" />
    </TableCard>
  </van-form>
</template>

<script setup lang='ts'>
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
const { oa_recruit_status } = toRefs<any>(proxy?.useDict('oa_recruit_status'))

const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserRecruitForm>()

defineExpose({
  view,
  reset,
  workflowView,
})
</script>
