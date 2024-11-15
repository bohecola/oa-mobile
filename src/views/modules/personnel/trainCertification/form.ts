import { cloneDeep } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { TrainCertificateForm, UserCertificateBo, UserTrainBoForm } from '@/api/oa/personnel/trainCertification/types'
// import { getUserCertificate } from '@/api/oa/personnel/trainCertification'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions = Options<string | number>
export type ViewOptions = Options

type _UserTrainBoForm = Override<UserTrainBoForm, { trainDate: string[] }>

export type _TrainCertificateForm = Override<TrainCertificateForm, { categories: string[], amout: number }>
// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 引用
  const Form = ref<FormInstance>()

  const userCertificateBo: UserCertificateBo = {
    id: undefined,
    userId: undefined,
    userName: undefined,
    type: undefined,
    name: undefined,
    speciality: undefined,
    no: undefined,
    issuanceDate: undefined,
    startDate: undefined,
    endDate: undefined,
    remark: undefined,
    status: undefined,
    certificateStatus: undefined,
    trainId: undefined,
  }

  // 初始数据
  const initFormData: _TrainCertificateForm = {
    id: undefined,
    batchId: undefined,
    userCertificateBo: [{ ...userCertificateBo }], // 持证
    userTrainBo: { amout: 0 } as UserTrainBoForm, // 培训
    categories: ['0', '1'], // 外部培训,持有证件状态
    amout: undefined, // 费用
    ossIdList: [],
  }

  const userTrainBo: _UserTrainBoForm = {
    id: undefined,
    type: undefined,
    userId: undefined,
    commander: undefined,
    trainDate: undefined,
    startDate: undefined,
    endDate: undefined,
    content: undefined,
    isCertificate: undefined,
    amout: 0,
    status: undefined,
    result: undefined,
    remark: undefined,
  }

  // 表单数据
  const data = reactive<Omit<PageData<_TrainCertificateForm, object>, 'queryParams'>>({
    form: { ...cloneDeep(initFormData) },
    rules: {
      'userTrainBo.userId': [{ required: true, message: '员工不能为空', trigger: 'onChange' }],
      'userTrainBo.commander': [{ required: true, message: '负责人不能为空', trigger: 'onChange' }],
      'userTrainBo.trainDate': [{ required: true, message: '培训日期不能为空', trigger: 'onChange' }],
      'userTrainBo.result': [{ required: true, message: '培训结果不能为空', trigger: 'onChange' }],
      'userTrainBo.content': [{ required: true, message: '培训内容不能为空', trigger: 'onBlur' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 表单重置
  const reset = () => {
    form.value = { ...cloneDeep(initFormData) }
    Form.value?.resetValidation()
  }

  // 回显加载
  const isLoading = ref(false)

  // 更新加载
  const updateLoading = ref(false)

  // 回显
  // const view = async (id: string | number) => {
  //   isLoading.value = true
  //   reset()
  //   const res = await getUserCertificate(id)
  //   Object.assign(form.value, res.data)
  //   isLoading.value = false
  // }

  // 工作流中回显
  function workflowView(entity: any, options?: ViewOptions) {
    const { success, fail } = options ?? {}
    try {
      reset()
      // 移动端userTrainBo?.userId需要转成数组才可以回显    还有负责人是一样的
      entity.userTrainBo.userId = entity.userTrainBo?.userId.split(',')
      entity.userTrainBo.commander = entity.userTrainBo?.commander.split(',')
      nextTick(async () => {
        Object.assign(form.value, {
          ...entity,
        })
      })
    }
    catch (err) {
      console.error(err)
      fail?.(err)
    }
    success?.(entity)
  }
  return {
    Form,
    form,
    rules,
    isLoading,
    updateLoading,
    userTrainBo,
    userCertificateBo,
    reset,
    // view,
    // submit,
    // workflowSubmit,
    workflowView,
  }
}
