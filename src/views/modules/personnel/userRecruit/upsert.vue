<template>
  <van-form
    ref="Form"
    v-loading="isLoading && showLoading"
    label-width="auto"
    label-align="top"
    input-align="left"
    required="auto"
    scroll-to-error
  >
    <DeptSelect
      v-model="form.deptId"
      v-show-field="['deptId', includeFields]"
      name="deptId"
      label="部门名称"
      :rules="computedRules.deptId"
      @change="deptChange"
      @node-click="getDeptNode"
    />

    <DictSelect
      v-model="form.status"
      v-show-field="['status', includeFields]"
      label="状态"
      name="status"
      dict-type="oa_recruit_status"
      :rules="computedRules.status"
    />

    <DateSelect
      v-model="form.recruitStartDate"
      v-show-field="['recruitStartDate', includeFields]"
      name="recruitStartDate"
      label="招聘开始时间"
      :rules="computedRules.recruitStartDate"
    />

    <DateSelect
      v-model="form.recruitEndDate"
      v-show-field="['recruitEndDate', includeFields]"
      name="recruitEndDate"
      label="招聘完成日期"
      :rules="computedRules.recruitEndDate"
    />

    <DateSelect
      v-model="form.hopeArriveDate"
      v-show-field="['hopeArriveDate', includeFields]"
      name="hopeArriveDate"
      label="期望到岗日期"
      :rules="computedRules.hopeArriveDate"
    />

    <van-field-number
      v-model.trim="form.projectDeptNumber"
      v-show-field="['projectDeptNumber', includeFields]"
      name="projectDeptNumber"
      type="digit"
      label="项目部定员人数"
      readonly
    />

    <van-field
      v-model.trim="form.no"
      v-show-field="['no', includeFields]"
      name="no"
      label="招聘编号"
      placeholder="请输入"
      :rules="computedRules.no"
    />

    <van-field
      v-model="form.applyReason"
      v-show-field="['applyReason', includeFields]"
      label="申请原因"
      placeholder="请输入"
      type="textarea"
      rows="1"
      autosize
      name="applyReason"
      :rules="computedRules.applyReason"
    />

    <van-field
      v-if="form.deptType === '2' && !isNil(form.address)"
      v-model="form.address"
      v-show-field="['address', includeFields]"
      label="项目部地址"
      name="address"
    >
      <template #input>
        <TextareaView :value="form.address" />
      </template>
    </van-field>

    <van-field v-show-field="['userRecruitPostBoList', includeFields]">
      <template #label>
        <span class=" text-red-400 mr-1">*</span>
        <span>招聘岗位</span>
      </template>

      <template #input>
        <CoolCardList accordion active-on-register>
          <CoolCard
            v-for="(item, index) in form.userRecruitPostBoList"
            :key="index"
            :title="item.postName"
          >
            <PostSelect
              v-model="item.postId"
              v-model:post-name="item.postName"
              :name="`itemList.${index}.postId`"
              label="岗位名称"
              :dept-id="form.deptId"
              :rules="[{ required: true, message: '不能为空', trigger: 'onChange' }]"
            />

            <van-field-number
              v-model.number="item.userNum"
              :name="`itemList.${index}.userNum`"
              label="招聘人数"
              placeholder="请输入"
              :min="1"
              type="digit"
              :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
            />

            <van-field
              v-model.trim="item.ageRequire"
              :name="`itemList.${index}.ageRequire`"
              label="年龄要求"
              placeholder="请输入"
              :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
            />

            <van-field
              v-model.trim="item.educationalRequire"
              :name="`itemList.${index}.educationalRequire`"
              label="学历要求"
              placeholder="请输入"
              :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
            />

            <van-field
              v-model.trim="item.speciality"
              :name="`itemList.${index}.speciality`"
              label="专业"
              placeholder="请输入"
              :rules="[{ required: true, message: '不能为空', trigger: 'onBlur' }]"
            />

            <van-field
              v-model.trim="item.suggestSalary"
              :name="`itemList.${index}.suggestSalary`"
              label="建议薪资(元/月)"
              placeholder="请输入"
            />

            <van-field
              v-model="item.workExperience"
              :name="`itemList.${index}.workExperience`"
              label="工作经验"
              placeholder="请输入"
              type="textarea"
              rows="1"
              autosize
            />

            <van-field
              v-model="item.demand"
              :name="`itemList.${index}.demand`"
              label="岗位职责"
              placeholder="请输入"
              type="textarea"
              rows="1"
              autosize
            />

            <van-field
              v-model="item.responsibility"
              :name="`itemList.${index}.responsibility`"
              label="任职资格"
              placeholder="请输入"
              type="textarea"
              rows="1"
              autosize
            />

            <van-field
              v-model="item.otherRequire"
              :name="`itemList.${index}.otherRequire`"
              label="其他要求"
              placeholder="请输入"
              type="textarea"
              rows="1"
              autosize
            />
            <template #footer>
              <div class="text-right">
                <van-button
                  v-if="form.userRecruitPostBoList.length - 1 === index"
                  type="primary"
                  icon="plus"
                  size="small"
                  @click=" form.userRecruitPostBoList.push({
                    id: undefined,
                    postId: undefined,
                    postName: undefined,
                    userNum: 1,
                    ageRequire: undefined,
                    speciality: undefined,
                    responsibility: undefined,
                    demand: undefined,
                    educationalRequire: undefined,
                    suggestSalary: undefined,
                    workExperience: undefined,
                    otherRequire: undefined,
                  })"
                />
                <van-button
                  class="ml-2"
                  type="danger"
                  icon="delete"
                  size="small"
                  :disabled="form.userRecruitPostBoList.length === 1"
                  @click="handleRemove(item, index)"
                />
              </div>
            </template>
          </CoolCard>
        </CoolCardList>
      </template>
    </van-field>

    <!-- 附件列表 -->
    <van-field
      v-show-field="['ossIdList', includeFields]"
      name="ossIdList"
      label="附件列表"
      placeholder="请选择"
      :rules="computedRules.ossIdList"
    >
      <template #input>
        <UploadFile v-model="form.ossIdList" value-type="array" />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang='ts'>
import { isNil } from 'lodash-es'
import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { UserRecruitForm } from '@/api/oa/personnel/userRecruit/types'
import type { DeptVO } from '@/api/system/dept/types'

const props = withDefaults(
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

const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 实例
// const { proxy } = getCurrentInstance() as ComponentInternalInstance
// const { oa_recruit_status } = toRefs(proxy?.useDict('oa_recruit_status'))

// 表单
const { Form, form, rules, isLoading, updateLoading, initRecruitPostForm, reset, submit, view, workflowSubmit, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<UserRecruitForm>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<UserRecruitForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }
  return newRules
})

// 部门change事件，获取岗位下拉数据
async function deptChange() {
  resetPS()
}

// 选择部门获取当前节点数据
function getDeptNode(node: DeptVO) {
  if (isNil(node)) {
    form.value.deptType = undefined
    form.value.address = undefined
    return
  }

  // 获取部门类型
  form.value.deptType = node.type
  if (form.value.deptType === '2') {
    // 给项目部地址附默认值
    form.value.address = node.address
  }
}

// 子表删除
function handleRemove(_: any, index: number) {
  const { confirm } = proxy.$modal

  confirm('是否删除这条数据？')
    .then(() => {
      form.value.userRecruitPostBoList.splice(index, 1)
    })
    .catch(() => {})
}

// 重新计算字典
// const recruitStatus = computed(() => {
//   return oa_recruit_status.value.filter(item => ['3', '4'].includes(item.value))
// })

function setItemList(obj) {
  form.value.userRecruitPostBoList.forEach((item) => {
    for (const [key, value] of Object.entries(obj)) {
      item[key] = value
    }
  })
}

function resetPS() {
  form.value.userRecruitPostBoList = [{ ...initRecruitPostForm }]
  setItemList({
    postId: undefined,
    postName: undefined,
    userNum: 1,
    ageRequire: undefined,
    speciality: undefined,
    responsibility: undefined,
    demand: undefined,
    educationalRequire: undefined,
    suggestSalary: undefined,
    workExperience: undefined,
    otherRequire: undefined,
  })
}

watch(
  () => form.value.userRecruitPostBoList,
  () => {
    const userNumList = form.value.userRecruitPostBoList.map(e => e.userNum)
    form.value.projectDeptNumber = userNumList.reduce((acc, value) => acc + value, 0)
  },
  {
    immediate: true,
    deep: true,
  },
)

defineExpose({
  isLoading,
  updateLoading,
  reset,
  view,
  submit,
  workflowSubmit,
  workflowView,
})
</script>
