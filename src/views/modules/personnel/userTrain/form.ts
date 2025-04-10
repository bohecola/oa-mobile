import type { FormInstance } from 'vant'
import { addUserTrain, getUserTrain, updateUserTrain } from '@/api/oa/personnel/userTrain'
import type { OssMessageAllBo, UserTrainForm } from '@/api/oa/personnel/userTrain/types'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options
export interface SuccessData {
  id: UserTrainForm['id']
  ossMessageAllBoList: UserTrainForm['ossMessageAllBoList']
}
// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const { oa_train_oss_type } = toRefs<any>(proxy?.useDict('oa_train_oss_type'))

  // 引用
  const Form = ref<FormInstance>()

  // 0人员清单附件,培训内容,培训费用发票模板,对公付款信息(培训费)
  const initOssMessageList: OssMessageAllBo[] = [
    { type: '0', files: undefined },
    { type: '1', files: undefined },
    { type: '2', files: undefined },
    { type: '3', files: undefined },
    { type: '4', files: undefined },
  ]

  // 初始数据
  const initFormData: UserTrainForm = {
    id: undefined,
    applicationType: undefined,
    userId: undefined,
    commander: undefined,
    type: '1',
    trainType: undefined,
    result: undefined,
    attendNumber: 0,
    additionalAmountDescription: undefined,
    averageAdditionalAmount: 0,
    averageAmount: 0,
    totalAmount: 0,
    trainInvoicingType: undefined,
    certificateType: undefined,
    content: undefined,
    trainAddress: undefined,
    startDate: undefined,
    endDate: undefined,
    isCertificate: 'N',
    isProduceCost: 'N',
    status: undefined,
    remark: undefined,
    ossMessageAllBoList: [...initOssMessageList],
    ossIdList: undefined,
  }

  // 表单数据
  const data = reactive<Omit<PageData<UserTrainForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      userId: [{ required: true, message: '员工不能为空', trigger: 'onChange' }],
      commander: [{ required: true, message: '负责人不能为空', trigger: 'onChange' }],
      type: [{ required: true, message: '培训类型不能为空', trigger: 'onChange' }],
      content: [{ required: true, message: '培训内容不能为空', trigger: 'onBlur' }],
      applicationType: [{ required: true, message: '申请类型不能为空', trigger: 'onBlur' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 表单重置
  const reset = () => {
    form.value = { ...initFormData }
    Form.value?.resetValidation()
  }

  // 回显加载
  const isLoading = ref(false)

  // 更新加载
  const updateLoading = ref(false)

  // 回显
  const view = async (id: string | number) => {
    isLoading.value = true
    reset()
    const res = await getUserTrain(id)
    Object.assign(form.value, res.data)
    // 如果申请类型是培训，附件列表的子表展示五条类型
    if (form.value.applicationType === '0') {
      form.value.ossMessageAllBoList = oa_train_oss_type.value.map((e) => {
        return {
          type: e.value,
          files: res.data.ossMessageAllVoList
            .filter(file => file.type === e.value)
            .map(file => file.files)
            .join(','),
        }
      })
    }
    else {
      // 如果申请类型是考试和报名，附件列表的子表展示两条条类型
      form.value.ossMessageAllBoList = [initOssMessageList[0], initOssMessageList[initOssMessageList.length - 1]].map((e) => {
        return {
          type: e.type,
          files: res.data.ossMessageAllVoList
            .filter(file => file.type === e.type)
            .map(file => file.files)
            .join(','),
        }
      })
    }
    isLoading.value = false
  }

  // 提交表单
  async function submit(options: SubmitOptions<SuccessData> = {}) {
    const { success, fail } = options

    await Form.value?.validate()
      .then(async () => {
        updateLoading.value = true

        if (form.value.id) {
          const { data } = await updateUserTrain(form.value)
          form.value.ossMessageAllBoList = (data.ossMessageAllBoList || []).map((item: OssMessageAllBo) => ({ ...item }))
        }
        else {
          const { data } = await addUserTrain(form.value)
          form.value.id = data.id
          form.value.ossMessageAllBoList = (data.ossMessageAllBoList || []).map((item: OssMessageAllBo) => ({ ...item }))
        }
        success?.({
          id: form.value.id,
          ossMessageAllBoList: form.value.ossMessageAllBoList,
        })
      })
      .catch(fail)
      .finally(() => (updateLoading.value = false))
  }

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<UserTrainForm> = {}) {
    const { success, fail } = options
    await Form.value?.validate()
      .then(() => {
        success?.({ ...form.value })
      }).catch(fail)
  }

  // 工作流中回显
  function workflowView(entity: any, options: ViewOptions = {}) {
    const { success, fail } = options
    try {
      reset()
      nextTick(() => {
        Object.assign(form.value, {
          ...entity,
        })
      })
      success?.(entity)
    }
    catch (err) {
      console.error(err)
      fail?.(err)
    }
  }

  return {
    Form,
    form,
    rules,
    isLoading,
    updateLoading,
    initOssMessageList,
    reset,
    view,
    submit,
    workflowSubmit,
    workflowView,
  }
}
