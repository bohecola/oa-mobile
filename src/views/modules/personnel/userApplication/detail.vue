<template>
  <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="10em">
    <van-cell-group inset class="!my-3">
      <van-field v-model="form.name" name="name" label="姓名" input-align="right" />

      <van-field v-show-field="['deptId', includeFields]" name="deptId" label="部门名称" input-align="right">
        <template #input>
          <DeptSelect v-model="form.deptId" readonly />
        </template>
      </van-field>

      <van-field v-model="form.postId" v-show-field="['postId', includeFields]" name="postId" label="岗位名称" input-align="right">
        <template #input>
          <PostSelect v-model="form.postId" :dept-id="form.deptId" readonly />
        </template>
      </van-field>

      <van-field v-model="form.sex" v-show-field="['sex', includeFields]" name="sex" label="性别" input-align="right">
        <template #input>
          <DictSelect v-model="form.sex" dict-type="sys_user_sex" readonly />
        </template>
      </van-field>

      <van-field v-model="form.phonenumber" v-show-field="['phonenumber', includeFields]" name="phonenumber" label="手机号" input-align="right" />

      <van-field v-model="form.isProbation" v-show-field="['isProbation', includeFields]" name="isProbation" label="是否有试用期" input-align="right">
        <template #input>
          <DictSelect v-model="form.isProbation" dict-type="sys_yes_no" readonly />
        </template>
      </van-field>

      <van-field v-if="form.probationCycle" v-model="form.probationCycle" v-show-field="['probationCycle', includeFields]" name="probationCycle" label="试用期时长(月)" input-align="right" />

      <van-field v-model="form.nation" v-show-field="['nation', includeFields]" name="nation" label="民族" input-align="right">
        <template #input>
          <DictSelect v-model="form.nation" dict-type="oa_nation" readonly />
        </template>
      </van-field>

      <van-field v-model="form.education" v-show-field="['education', includeFields]" name="education" label="学历" input-align="right">
        <template #input>
          <DictSelect v-model="form.education" dict-type="oa_education_type" readonly />
        </template>
      </van-field>

      <van-field v-model="form.hopeDate" v-show-field="['hopeDate', includeFields]" name="hopeDate" label="预计到岗日期" input-align="right">
        <template #input>
          {{ parseTime(form.hopeDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.wages" v-show-field="['wages', includeFields]" name="wages" label="工资" input-align="right">
        <template #input>
          <span class="mr-3">{{ formatCurrency(form.wages) }} </span>
        </template>
      </van-field>

      <van-field v-model="form.baseWages" v-show-field="['baseWages', includeFields]" name="baseWages" label="基本工资" input-align="right">
        <template #input>
          <span class="mr-3">{{ formatCurrency(form.baseWages) }} </span>
        </template>
      </van-field>

      <van-field v-model="form.postWages" v-show-field="['postWages', includeFields]" name="postWages" label="岗位工资" input-align="right">
        <template #input>
          <span class="mr-3">{{ formatCurrency(form.postWages) }} </span>
        </template>
      </van-field>

      <van-field v-model="form.performanceWages" v-show-field="['performanceWages', includeFields]" name="performanceWages" label="绩效工资" input-align="right">
        <template #input>
          <span class="mr-3">{{ formatCurrency(form.performanceWages) }} </span>
        </template>
      </van-field>

      <van-field v-model="form.probationWagesRate" v-show-field="['probationWagesRate', includeFields]" name="probationWagesRate" label="试用期薪资发放标准" input-align="right" />

      <van-field v-model="form.realDate" v-show-field="['realDate', includeFields]" name="realDate" label="实际到岗日期" input-align="right">
        <template #input>
          {{ parseTime(form.realDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.userAccount" v-show-field="['userAccount', includeFields]" name="userAccount" label="系统账号" input-align="right" />

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
import PostSelect from '../components/PostSelect.vue'
import { useForm } from './form'
import type { UserEmploymentForm } from '@/api/oa/personnel/userApplication/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
  defineProps<{
    includeFields?: (keyof UserEmploymentForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof UserEmploymentForm)[]
    },
    showLoading: true,
  },
)
const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 表单
const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserEmploymentForm>()

defineExpose({
  reset,
  view,
  workflowView,
})
</script>
