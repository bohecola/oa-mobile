import { cloneDeep } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { DeptDepartureForm } from '@/api/oa/daily/deptDeparture/types'
import { addDeptDeparture, getDeptDeparture, updateDeptDeparture } from '@/api/oa/daily/deptDeparture'

export function useForm() {
  const Form = ref<FormInstance>()

  const initFormData: DeptDepartureForm = {
    id: undefined,
    deptId: undefined,
    departureDate: undefined,
    reason: undefined,
    status: undefined,
    ossIdList: [],
    isAssign: undefined,
    assignUser: undefined,
  }

  const form = ref(cloneDeep(initFormData))

  const rules = ref<FormRules<DeptDepartureForm>>({
    deptId: [{ required: true, message: '部门/项目部不能为空', trigger: 'onChange' }],
    departureDate: [{ required: true, message: '撤场日期不能为空', trigger: 'onChange' }],
    reason: [{ required: true, message: '撤场说明不能为空', trigger: 'onBlur' }],
    assignUser: [{ required: true, message: '指派人不能为空', trigger: 'onChange' }],
    ossIdList: [{ required: true, message: '附件不能为空', trigger: 'onBlur' }],
  })

  const isLoading = ref(false)
  const updateLoading = ref(false)

  function reset(options: ResetOptions = {}) {
    const { success } = options

    Form.value?.resetValidation()
    form.value = cloneDeep(initFormData)

    success?.(form.value)
  }

  // 表单字段重置
  function resetFields(names: KeysOfArray<DeptDepartureForm>) {
    const obj = cloneDeep(initFormData)

    Form.value?.resetValidation(names)
    for (const key of names as string[]) {
      form.value[key] = obj[key]
    }
  }

  async function view(id: string) {
    isLoading.value = true
    reset()
    const { data } = await getDeptDeparture(id)
    Object.assign(form.value, data)
    isLoading.value = false
  }

  async function submit(options: SubmitOptions<{ id: string }> = {}) {
    const { success, fail } = options

    await Form.value?.validate()
      .then(async () => {
        updateLoading.value = true

        if (form.value.id) {
          await updateDeptDeparture(form.value)
        }
        else {
          const { data } = await addDeptDeparture(form.value)
          form.value.id = data
        }

        success?.({ id: form.value.id })
      })
      .catch(fail)
      .finally(() => updateLoading.value = false)
  }

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<DeptDepartureForm> = {}) {
    const { success, fail } = options

    await Form.value?.validate()
      .then(() => {
        success?.(form.value)
      })
      .catch(fail)
  }

  // 工作流中回显
  function workflowView(entity: any, options: ViewOptions = {}) {
    const { success, fail } = options
    try {
      reset()
      Object.assign(form.value, entity)
      success?.(entity)
    }
    catch (err) {
      fail?.(err)
    }
  }

  return {
    Form,
    form,
    rules,
    isLoading,
    updateLoading,
    reset,
    resetFields,
    view,
    submit,
    workflowSubmit,
    workflowView,
  }
}
