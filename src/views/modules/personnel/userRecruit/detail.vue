<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="8em">
    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['deptId', includeFields]" name="deptId" label="部门名称" input-align="right">
        <template #input>
          <DeptSelect v-model="form.deptId" readonly />
        </template>
      </van-field>
      <van-field v-model="form.status" v-show-field="['status', includeFields]" name="status" label="状态" input-align="right">
        <template #input>
          <dict-tag :options="oa_recruit_status" :value="form.status" />
        </template>
      </van-field>

      <van-field v-model="form.recruitStartDate" v-show-field="['recruitStartDate', includeFields]" name="recruitStartDate" label="招聘开始时间" input-align="right">
        <template #input>
          {{ parseTime(form.recruitStartDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.recruitEndDate" v-show-field="['recruitEndDate', includeFields]" name="recruitEndDate" label="招聘完成日期" input-align="right">
        <template #input>
          {{ parseTime(form.recruitEndDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.hopeArriveDate" v-show-field="['hopeArriveDate', includeFields]" name="hopeArriveDate" label="期望到岗日期" input-align="right">
        <template #input>
          {{ parseTime(form.hopeArriveDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.no" v-show-field="['no', includeFields]" name="no" label="招聘编号" input-align="right" />

      <van-field v-model="form.applyReason" v-show-field="['applyReason', includeFields]" name="applyReason" label="申请原因" input-align="right">
        <template #input>
          <TextareaView :value="form.applyReason" />
        </template>
      </van-field>

      <van-field v-if="form.deptType === '2'" v-model="form.address" v-show-field="['address', includeFields]" name="address" label="项目部地址" input-align="right">
        <template #input>
          <TextareaView :value="form.address" />
        </template>
      </van-field>
    </van-cell-group>

    <div class="px-4 py-2 text-sm text-[--van-cell-group-title-color]">
      招聘岗位
    </div>
    <TableCard v-for="(item, index) in form.userRecruitPostBoList" :key="index" v-show-field="['userRecruitPostBoList', includeFields]" :title="item.postName" class="mx-4 mb-2" :default-collapse="true">
      <van-field :name="`itemList.${index}.postId`" label="岗位名称" input-align="right">
        <template #input>
          <PostSelect v-model="item.postId" :dept-id="form.deptId" multiple readonly />
        </template>
      </van-field>

      <van-field v-model="item.userNum" :name="`itemList.${index}.userNum`" label="招聘人数" input-align="right" />

      <van-field v-model="item.ageRequire" :name="`itemList.${index}.ageRequire`" label="年龄要求" input-align="right" />

      <van-field v-model="item.educationalRequire" :name="`itemList.${index}.educationalRequire`" label="学历要求" input-align="right" />

      <van-field v-model="item.suggestSalary" :name="`itemList.${index}.suggestSalary`" label="建议薪资(元/月)" input-align="right" />

      <van-field v-model="item.speciality" :name="`itemList.${index}.speciality`" label="专业" input-align="right" />

      <van-field v-model="item.workExperience" :name="`itemList.${index}.workExperience`" label="工作经验" input-align="right">
        <template #input>
          <TextareaView :value="item.workExperience" />
        </template>
      </van-field>

      <van-field v-model="item.otherRequire" :name="`itemList.${index}.otherRequire`" label="其他要求" input-align="right">
        <template #input>
          <TextareaView :value="item.otherRequire" />
        </template>
      </van-field>

      <van-field v-model="item.demand" :name="`itemList.${index}.demand`" label="任职条件" input-align="right">
        <template #input>
          <TextareaView :value="item.demand" />
        </template>
      </van-field>

      <van-field v-model="item.responsibility" :name="`itemList.${index}.responsibility`" label="任职资格" input-align="right">
        <template #input>
          <TextareaView :value="item.responsibility" />
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
import PostSelect from '../components/PostSelect.vue'
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
