import { cloneDeep } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { PurchaseChangeForm } from '@/api/oa/business/purchaseChange/types'
import { addPurchaseChange, getPurchaseChange, updatePurchaseChange } from '@/api/oa/business/purchaseChange'
import { useWorkflowHelper } from '@/hooks'

export interface SuccessData {
  id: PurchaseChangeForm['id']
  changeItemList: PurchaseChangeForm['changeItemList']
}

export function useForm() {
  const { isDraft } = useWorkflowHelper()

  const Form = ref<FormInstance>()

  const initFormData: PurchaseChangeForm = {
    id: undefined,
    deptId: undefined,
    purchaseId: undefined,
    amount: undefined,
    newAmount: undefined,
    releaseAmount: undefined,
    status: undefined,
    remark: undefined,
    changeItemList: [],
    ossIdList: [],
    purchaseVo: undefined,
  }

  const form = ref(cloneDeep(initFormData))

  const rules = ref<FormRules<PurchaseChangeForm>>({
    purchaseId: [{ required: true, message: '采购申请不能为空', trigger: 'onChange' }],
    status: [{ required: true, message: '状态', trigger: 'onChange' }],
    remark: [{ required: false, message: '申请事由不能为空', trigger: 'onBlur' }],
    ossIdList: [{ required: false, message: '附件列表不能为空', trigger: 'onChange' }],
  })

  const isLoading = ref(false)
  const updateLoading = ref(false)

  // 不能删除的文件主键数组
  const excludeOssIdList = ref([])

  function reset(options: ResetOptions<PurchaseChangeForm> = {}) {
    const { success } = options

    form.value = cloneDeep(initFormData)
    Form.value?.resetValidation()

    excludeOssIdList.value = []

    success?.(form.value)
  }

  // 表单字段重置
  function resetFields(names: KeysOfArray<PurchaseChangeForm>) {
    const obj = cloneDeep(initFormData)

    Form.value?.resetValidation(names)
    for (const key of names as string[]) {
      form.value[key] = obj[key]
    }
  }

  async function view(id: string) {
    isLoading.value = true

    reset()

    const { data } = await getPurchaseChange(id)
    Object.assign(form.value, data)

    excludeOssIdList.value = data.ossIdList

    isLoading.value = false
  }

  async function submit(options: SubmitOptions<SuccessData> = {}) {
    const { success, fail } = options

    return await Form.value?.validate()
      .then(async () => {
        updateLoading.value = true

        if (form.value.id) {
          await updatePurchaseChange(form.value)
        }
        else {
          const { data } = await addPurchaseChange(form.value)
          form.value.id = data.id
          form.value.changeItemList = data.changeItemList
        }

        success?.({
          id: form.value.id,
          changeItemList: form.value.changeItemList,
        })
      })
      .catch(fail)
      .finally(() => updateLoading.value = false)
  }

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<PurchaseChangeForm> = {}) {
    const { success, fail } = options

    return await Form.value?.validate()
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

      // 非草稿状态时 => 已上传的附件不能删除
      if (!isDraft.value) {
        excludeOssIdList.value = entity.ossIdList
      }

      success?.(entity)
    }
    catch (err) {
      fail?.(err)
    }
  }

  return {
    initFormData,
    Form,
    form,
    rules,
    isLoading,
    updateLoading,
    excludeOssIdList,
    reset,
    resetFields,
    view,
    submit,
    workflowSubmit,
    workflowView,
  }
}
