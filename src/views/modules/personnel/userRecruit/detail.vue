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
    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      name="deptId"
      label="部门名称"
    />

    <DictSelect
      v-model="form.status"
      v-show-field="['status', includeFields]"
      label="状态"
      name="status"
      dict-type="oa_recruit_status"
    />

    <DateSelect
      v-model="form.recruitStartDate"
      v-show-field="['recruitStartDate', includeFields]"
      name="recruitStartDate"
      label="招聘开始时间"
    />

    <DateSelect
      v-model="form.recruitEndDate"
      v-show-field="['recruitEndDate', includeFields]"
      name="recruitEndDate"
      label="招聘完成日期"
    />

    <van-field v-model="form.projectDeptNumber" v-show-field="['projectDeptNumber', includeFields]" name="projectDeptNumber" label="项目部定员人数" input-align="left" />

    <DateSelect
      v-model="form.hopeArriveDate"
      v-show-field="['hopeArriveDate', includeFields]"
      name="hopeArriveDate"
      label="期望到岗日期"
    />

    <van-field
      v-if="!isNil(form.no)"
      v-model="form.no"
      v-show-field="['no', includeFields]"
      name="no"
      label="招聘编号"
    />

    <van-field
      v-model="form.applyReason"
      v-show-field="['applyReason', includeFields]"
      name="applyReason"
      label="申请原因"
    >
      <template #input>
        <TextareaView :value="form.applyReason" />
      </template>
    </van-field>

    <van-field
      v-if="form.deptType === '2' && !isNil(form.address)"
      v-model="form.address"
      v-show-field="['address', includeFields]"
      name="address"
      label="项目部地址"
    >
      <template #input>
        <TextareaView :value="form.address" />
      </template>
    </van-field>

    <van-field v-show-field="['userRecruitPostBoList', includeFields]" label="招聘岗位">
      <template #input>
        <CoolCardList accordion active-on-register>
          <CoolCard
            v-for="(item, index) in form.userRecruitPostBoList"
            :key="index"
            :title="item.postName"
          >
            <PostSelect
              v-model="item.postId"
              :name="`itemList.${index}.postId`"
              label="岗位名称"
              :dept-id="form.deptId"
              readonly
            />

            <van-field
              v-model="item.userNum"
              :name="`itemList.${index}.userNum`"
              label="招聘人数"
            />

            <van-field
              v-model="item.ageRequire"
              :name="`itemList.${index}.ageRequire`"
              label="年龄要求"
            />

            <van-field
              v-model="item.educationalRequire"
              :name="`itemList.${index}.educationalRequire`"
              label="学历要求"
            />

            <van-field
              v-model="item.speciality"
              :name="`itemList.${index}.speciality`"
              label="专业"
            />

            <van-field
              v-model="item.suggestSalary"
              :name="`itemList.${index}.suggestSalary`"
              label="建议薪资(元/月)"
            />

            <van-field
              v-model="item.workExperience"
              :name="`itemList.${index}.workExperience`"
              label="工作经验"
            >
              <template #input>
                <TextareaView :value="item.workExperience" />
              </template>
            </van-field>

            <van-field
              v-model="item.demand"
              :name="`itemList.${index}.demand`"
              label="岗位职责"
            >
              <template #input>
                <TextareaView :value="item.demand" />
              </template>
            </van-field>

            <van-field
              v-model="item.responsibility"
              :name="`itemList.${index}.responsibility`"
              label="任职资格"
            >
              <template #input>
                <TextareaView :value="item.responsibility" />
              </template>
            </van-field>

            <van-field
              v-model="item.otherRequire"
              :name="`itemList.${index}.otherRequire`"
              label="其他要求"
            >
              <template #input>
                <TextareaView :value="item.otherRequire" />
              </template>
            </van-field>
          </CoolCard>
        </CoolCardList>
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

<script setup lang='ts'>
import { isNil } from 'lodash-es'
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

const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserRecruitForm>()

defineExpose({
  view,
  reset,
  workflowView,
})
</script>
