import { cloneDeep } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { TrainCertificateForm, UserCertificateBo, UserTrainBoForm } from '@/api/oa/personnel/trainCertification/types'
// import { getUserCertificate } from '@/api/oa/personnel/trainCertification'
import { useWorkflowViewData } from '@/hooks'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions = Options<string | number>
export type ViewOptions = Options

type _UserTrainBoForm = Override<UserTrainBoForm, { trainDate: string[] }>

export type _TrainCertificateForm = Override<TrainCertificateForm, { outTrain: boolean, holdCertification: boolean, amout: number }>
// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 引用
  const Form = ref<FormInstance>()

  // 初始数据
  const initFormData: _TrainCertificateForm = {
    id: undefined,
    batchId: '',
    userCertificateBo: [], // 持证
    userTrainBo: {} as UserTrainBoForm, // 培训
    outTrain: true, // 外部培训状态
    holdCertification: true, // 持证状态
    amout: 0, // 培训的金额
  }

  const userTrainBo: _UserTrainBoForm = {
    id: 0,
    type: '',
    userId: '',
    commander: '',
    trainDate: [],
    startDate: '',
    endDate: '',
    content: '',
    isCertificate: undefined,
    amout: undefined,
    status: undefined,
    result: '',
    remark: undefined,
  }

  const userCertificateBo: UserCertificateBo = {
    id: 0,
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
    certificateStatus: '',
    trainId: undefined,
  }

  // 表单数据
  const data = reactive<Omit<PageData<_TrainCertificateForm, object>, 'queryParams'>>({
    form: { ...cloneDeep(initFormData) },
    rules: {
      userId: [{ required: true, message: '员工不能为空', trigger: 'onChange' }],
      commander: [{ required: true, message: '负责人不能为空', trigger: 'onChange' }],
      type: [{ required: true, message: '培训类型不能为空', trigger: 'onChange' }],
      trainDate: [{ required: true, message: '培训日期不能为空', trigger: 'onChange' }],
      Date: [{ required: true, message: '培训日期不能为空', trigger: 'onChange' }],
      content: [{ required: true, message: '培训内容不能为空', trigger: 'onBlur' }],
      result: [{ required: true, message: '培训结果不能为空', trigger: 'onChange' }],
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
  async function workflowView({ taskId, processInstanceId }: any, options?: ViewOptions) {
    const { success, fail } = options ?? {}
    let res: any

    try {
      reset()
      isLoading.value = true
      res = await useWorkflowViewData({ taskId, processInstanceId })
      const { entity } = res.data
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
    finally {
      isLoading.value = false
    }
    success?.(res.data)
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
