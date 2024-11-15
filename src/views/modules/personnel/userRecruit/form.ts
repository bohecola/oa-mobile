import type { FormInstance } from 'vant'
import type { UserRecruitForm, UserRecruitPostBo } from '@/api/oa/personnel/userRecruit/types'
import { getUserRecruit } from '@/api/oa/personnel/userRecruit'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options

export function useForm() {
  // 实例
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance) ?? {}

  // 引用
  const Form = ref<FormInstance>()

  // 初始数据
  const initFormData: UserRecruitForm = {
    id: undefined,
    no: undefined,
    deptId: undefined,
    hopeArriveDate: undefined,
    applyReason: undefined,
    recruitStartDate: undefined,
    recruitEndDate: undefined,
    remark: undefined,
    status: undefined,
    userRecruitPostBoList: [] as UserRecruitPostBo[],
    ossIdList: undefined,
  }

  // 数据
  const data = reactive<Omit<PageData<UserRecruitForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      no: [{ required: true, message: '编号不能为空', trigger: 'onChange' }],
      deptId: [{ required: true, message: '部门不能为空', trigger: 'onBlur' }],
      hopeArriveDate: [{ required: true, message: '期望到达日期不能为空', trigger: 'onBlur' }],
      recruitStartDate: [{ required: true, message: '招聘开始日期不能为空', trigger: 'onBlur' }],
      recruitEndDate: [{ required: true, message: '招聘完成日期不能为空', trigger: 'onBlur' }],
      status: [{ required: true, message: '状态不能为空', trigger: 'onChange' }],
      applyReason: [{ required: true, message: '申请原因不能为空', trigger: 'onBlur' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 表单重置
  const reset = () => {
    form.value = { ...initFormData }
    form.value.userRecruitPostBoList = []
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
    const res = await getUserRecruit(id)
    Object.assign(form.value, res.data)
    // form.value.userRecruitPostBoList = res.data.userRecruitPostVoList
    isLoading.value = false
  }

  // const checkstatus = ref<boolean>(false)
  // // 校验子表招聘岗位的空值
  // async function postRequired(list: any[]) {
  //   checkstatus.value = false
  //   list.forEach((item: any) => {
  //     for (const key in item) {
  //       if (
  //         key === 'postId'
  //         || key === 'userNum'
  //         || key === 'subsidyAmount'
  //         || key === 'ridingStandards'
  //         || key === 'transportationFeeStandard'
  //         || key === 'responsibility'
  //         || key === 'demand'
  //       ) {
  //         if (item[key] === null || item[key] === '' || item[key] === undefined) {
  //           let fieldName = ''
  //           switch (key) {
  //             case 'postId':
  //               fieldName = '岗位名称'
  //               break
  //             case 'userNum':
  //               fieldName = '招聘人数'
  //               break
  //             case 'subsidyAmount':
  //               fieldName = '驻勤补助标准'
  //               break
  //             case 'ridingStandards':
  //               fieldName = '乘坐标准'
  //               break
  //             case 'transportationFeeStandard':
  //               fieldName = '交通费标准'
  //               break
  //             case 'responsibility':
  //               fieldName = '岗位职责'
  //               break
  //             case 'demand':
  //               fieldName = '任职要求'
  //               break
  //             default:
  //               fieldName = '招聘岗位'
  //           }
  //           proxy?.$modal.alertWarning(`${fieldName}不能为空`)
  //           checkstatus.value = true
  //           break
  //         }
  //       }
  //     }
  //     if (checkstatus.value) {

  //     }
  //   })
  //   return !checkstatus.value
  // }

  // 数组中有没有重复的岗位id,有的话就会提示
  // function hasDuplicates(list: any, key: any) {
  //   return list.filter((item: any, index: number, self: any) => self.findIndex((t: any) => t[key] === item[key]) !== index).length > 0
  // }

  // interface successRes {
  //   id: string
  //   no: string
  // }
  // 提交
  // async function submit(options: SubmitOptions<successRes>) {
  //   const { success, fail } = options ?? {}

  //   let res: AxiosResponse<UserRecruitForm['id']>

  //   const valid = await Form.value?.validate(async (valid: boolean) => {
  //     try {
  //       // 数据
  //       const data: UserRecruitForm = {
  //         ...form.value,
  //       }
  //       // 请求
  //       if (valid) {
  //         // 招聘岗位必须得数据
  //         if (form.value.userRecruitPostBoList.length == 0) {
  //           proxy.$modal.alertWarning('请新增招聘岗位！')
  //         }
  //         else {
  //           // 校验招聘岗位有没有重复的
  //           if (hasDuplicates(form.value.userRecruitPostBoList, 'postId')) {
  //             proxy.$modal.msgWarning('招聘岗位不可以重复！')
  //             return
  //           }
  //           // 校验表格中的属性有没有空值的提示
  //           if (await postRequired(form.value.userRecruitPostBoList)) {
  //             updateLoading.value = true
  //             const successRes = {
  //               id: undefined,
  //               no: undefined,
  //             }
  //             if (form.value.id) {
  //               res = await updateUserRecruit(data).finally(() => (updateLoading.value = false))
  //               successRes.id = res.data
  //             }
  //             else {
  //               const msgNo = await getGenerateCode(BusinessCodeEnum.ZPCODE, 'oa_user_recruit')
  //               data.no = msgNo.msg
  //               res = await addUserRecruit(data).finally(() => (updateLoading.value = false))
  //               form.value.id = res.data
  //               successRes.id = res.data
  //               successRes.no = msgNo.msg
  //             }
  //             success && success(successRes)
  //           }
  //         }
  //       }
  //     }
  //     catch (err) {
  //       console.error(err)
  //       fail && fail(err)
  //     }
  //   })
  //   return valid
  // }
  // 工作流中提交表单
  // async function workflowSubmit(options?: SubmitOptions) {
  //   const { success } = options ?? {}

  //   let data: UserRecruitForm

  //   const valid = await Form.value?.validate(async (valid: boolean) => {
  //     data = {
  //       ...form.value,
  //     }
  //     if (valid) {
  //       success && success()
  //     }
  //   })

  //   return {
  //     valid,
  //     data,
  //   }
  // }

  // 工作流中回显
  async function workflowView(entity: any, options?: ViewOptions) {
    const { success, fail } = options ?? {}
    try {
      reset()
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
    success?.(entity)
  }

  return {
    Form,
    form,
    rules,
    isLoading,
    updateLoading,
    reset,
    view,
    // submit,
    // workflowSubmit,
    workflowView,
  }
}
