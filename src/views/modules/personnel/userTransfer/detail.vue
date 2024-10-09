<template>
  <van-form ref="Form" v-loading="isLoading" readonly label-width="8em">
    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['userId', includeFields]" name="userId" label="员工：" input-align="right">
        <template #input>
          <UserSelect v-model="form.userId" />
        </template>
      </van-field>

      <van-field v-model="form.type" v-show-field="['type', includeFields]" name="type" label="类型：" input-align="right">
        <template #input>
          <dict-tag :options="oa_transfer_type" :value="form.type" />
        </template>
      </van-field>

      <van-field v-model="form.oldCompanyId" v-show-field="['oldCompanyId', includeFields]" name="oldCompanyId" label="原工作公司：" input-align="right">
        <template #input>
          <DeptSelect v-model="form.oldCompanyId" readonly />
        </template>
      </van-field>
      <van-field v-model="form.oldDeptId" v-show-field="['oldDeptId', includeFields]" name="oldDeptId" label="原工作部门：" input-align="right">
        <template #input>
          <DeptSelect v-model="form.oldDeptId" readonly />
        </template>
      </van-field>
      <van-field v-model="form.oldPostId" v-show-field="['oldPostId', includeFields]" name="oldPostId" label="原工作岗位：" input-align="right">
        <template #input>
          <span>{{ getPostNameById(form.oldPostId as string) }}
          </span>
        </template>
      </van-field>
      <van-field v-model="form.newCompanyId" v-show-field="['newCompanyId', includeFields]" name="newCompanyId" label="新工作公司：" input-align="right">
        <template #input>
          <DeptSelect v-model="form.newCompanyId" readonly />
        </template>
      </van-field>
      <van-field v-model="form.newDeptId" v-show-field="['newDeptId', includeFields]" name="newDeptId" label="新工作部门：" input-align="right">
        <template #input>
          <DeptSelect v-model="form.newDeptId" readonly />
        </template>
      </van-field>

      <van-field v-model="form.newPostId" v-show-field="['newPostId', includeFields]" name="newPostId" label="新工作岗位：" input-align="right">
        <template #input>
          <span>
            {{ getPostNames(form.newPostId as string) }}
          </span>
        </template>
      </van-field>

      <van-field v-model="form.startDate" v-show-field="['startDate', includeFields]" name="startDate" label="生效日期：" input-align="right">
        <template #input>
          {{ parseTime(form.startDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>
      <van-field v-model="form.endDate" v-show-field="['endDate', includeFields]" name="endDate" label="截止日期：" input-align="right">
        <template #input>
          {{ parseTime(form.endDate, '{y}-{m}-{d}') }}
        </template>
      </van-field>

      <van-field v-model="form.reason" v-show-field="['reason', includeFields]" name="reason" label="调用原因：" input-align="right">
        <template #input>
          <TextareaView :value="form.reason" />
        </template>
      </van-field>
      <van-field v-model="form.remark" v-show-field="['remark', includeFields]" name="remark" label="备注：" input-align="right">
        <template #input>
          <TextareaView :value="form.remark" />
        </template>
      </van-field>
    </van-cell-group>

    <TableCard v-show-field="['ossIdList', includeFields]" title="附件列表" class="mx-4">
      <UploadFile v-if="form.ossIdList" v-model="form.ossIdList" readonly :card-size="60" />
      <van-empty v-else image-size="80" description="数据为空" />
    </TableCard>
  </van-form>
</template>

<script setup name="userTransferDetail" lang="ts">
import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { UserTransferForm } from '@/api/oa/personnel/userTransfer/types'

withDefaults(
  defineProps<{
    includeFields?: (keyof UserTransferForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof UserTransferForm)[]
    },
    showLoading: true,
  },
)
// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
// 调动类型类别
const { oa_transfer_type } = toRefs<any>(proxy?.useDict('oa_transfer_type', 'oa_transfer_status'))

const { Form, form, isLoading, postList, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserTransferForm>()

// 获取旧岗位名称
function getPostNameById(postId: string | number) {
  const post = postList.value.find(post => post.postId === postId)
  return post ? post.postName : ''
}
// 获取新岗位名称
function getPostNames(postIds: string) {
  if (typeof postIds === 'string') {
    // 将字符串按逗号分割为数组
    const idArray = postIds.split(',')
    // 使用 map 通过 getPostNameById 获取每个 ID 对应的名称
    const postNames = idArray.map(id => getPostNameById(id.trim()))
    // 将名称用逗号连接成一个字符串返回
    return postNames.join(', ')
  }
  return ''
}

defineExpose({
  postList,
  view,
  reset,
  workflowView,
})
</script>
