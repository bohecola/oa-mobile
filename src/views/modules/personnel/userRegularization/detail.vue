<template>
  <van-form ref="Form" v-loading="isLoading" readonly label-width="8em">
    <van-field v-model="form.userName" name="userName" label="员工：" input-align="right" />

    <van-field name="deptId" label="部门名称：" input-align="right">
      <template #input>
        <DeptSelect v-model="form.deptId" readonly />
      </template>
    </van-field>
    <van-field v-model="form.postName" name="postName" label="岗位名称：" input-align="right" />

    <van-field name="type" label="提前转正：" input-align="right">
      <template #input>
        <dict-tag :options="sysYesNo" :value="form.type" />
      </template>
    </van-field>

    <van-cell title="附件：" input-align="right">
      <template #value>
        <UploadFile v-model="form.files" readonly :card-size="60" />
      </template>
    </van-cell>

    <van-field v-model="form.description" name="description" label="描述：" input-align="right">
      <template #input>
        <TextareaView :value="form.description" />
      </template>
    </van-field>
  </van-form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'vant'
// import UserInfoSelect from './components/UserInfoSelect.vue'
import type { UserMessageAllVo } from '@/api/oa/personnel/userRegularization/types'
import { useWorkflowViewData } from '@/hooks'

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
type SubmitOptions = Options<string | number>
export type ViewOptions = Options

const { sys_yes_no } = toRefs<any>(proxy?.useDict('sys_yes_no'))

const sysYesNo = computed(() => {
  return sys_yes_no.value.map((item: any) => {
    return {
      label: item.label,
      value: item.value === 'Y' ? '1' : '0',
    }
  })
})
// 引用
const Form = ref<FormInstance>()

// 初始数据
const initFormData: UserMessageAllVo = {
  id: undefined,
  type: undefined,
  level: undefined,
  deptType: undefined,
  files: undefined,
  ossIdList: undefined,
}

// 表单数据
const data = reactive<Omit<PageData<UserMessageAllVo, object>, 'queryParams' | 'rules'>>({
  form: { ...initFormData },
})

// 响应式解构
const { form } = toRefs(data)

// 表单重置
function reset() {
  form.value = { ...initFormData }
  Form.value?.resetValidation()
}

// 回显加载
const isLoading = ref(false)

// 更新加载
const updateLoading = ref(false)

// 工作流中回显
async function workflowView({ taskId, processInstanceId }: any, options?: ViewOptions) {
  const { success, fail } = options ?? {}
  let res: any

  try {
    reset()
    isLoading.value = true
    res = await useWorkflowViewData({ taskId, processInstanceId })
    const { entity } = res.data
    nextTick(() => {
      Object.assign(form.value, {
        ...entity,
      })
    })
  }
  catch (err) {
    console.error(err)
    fail?.(err)
  }
  finally {
    isLoading.value = false
  }
  success?.(res.data)
}

defineExpose({
  isLoading,
  updateLoading,
  reset,
  workflowView,
})
</script>
