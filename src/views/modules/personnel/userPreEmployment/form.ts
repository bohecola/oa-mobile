import type { FormInstance } from 'vant'
import { getUserPreEmployment } from '@/api/oa/personnel/userPreEmployment'
import type { UserPreEmploymentEvaluateBo, UserPreEmploymentForm } from '@/api/oa/personnel/userPreEmployment/types'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions = Options<string | number>
export type ViewOptions = Options

// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 引用
  const Form = ref<FormInstance>()

  // 初始数据
  const initFormData: UserPreEmploymentForm = {
    id: undefined,
    recruitPostId: undefined,
    deptId: undefined,
    postId: undefined,
    name: undefined,
    sex: undefined,
    phonenumber: undefined,
    certificates: undefined,
    interviewWay: undefined,
    interviewDate: undefined,
    isOwnerInterview: undefined,
    isProbation: undefined,
    probationCycle: undefined,
    status: undefined,
    userPreEmploymentEvaluateBoList: [] as UserPreEmploymentEvaluateBo[],
    userPreEmploymentEvaluateVoList: [] as UserPreEmploymentEvaluateBo[],
    ossIdList: undefined,
  }

  // 表单数据
  const data = reactive<Omit<PageData<UserPreEmploymentForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      deptId: [{ required: true, message: '部门不能为空', trigger: 'onBlur' }],
      recruitNo: [{ required: true, message: '招聘申请不能为空', trigger: 'onBlur' }],
      postName: [{ required: true, message: '岗位不能为空', trigger: 'onBlur' }],
      name: [{ required: true, message: '姓名不能为空', trigger: 'onBlur' }],
      sex: [{ required: true, message: '用户性别不能为空', trigger: 'onChange' }],
      phonenumber: [{ required: true, pattern: /^1[3-9|]\d{9}$/, message: '请输入正确的手机号码', trigger: 'onBlur' }],
      interviewWay: [{ required: true, message: '面试形式不能为空', trigger: 'onChange' }],
      interviewDate: [{ required: true, message: '面试日期不能为空', trigger: 'onBlur' }],
      isOwnerInterview: [{ required: true, message: '是否需要业主面试不能为空', trigger: 'onBlur' }],
      isProbation: [{ required: true, message: '是否有试用期不能为空', trigger: 'onBlur' }],
      probationCycle: [{ required: true, message: '试用期时长(月)不能为空', trigger: 'onBlur' }],
      status: [{ required: true, message: '状态不能为空', trigger: 'onChange' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 表单重置
  const reset = () => {
    form.value = { ...initFormData }
    form.value.isOwnerInterview = 'N'
    form.value.isProbation = 'Y'
    form.value.probationCycle = 3
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
    const res = await getUserPreEmployment(id)
    Object.assign(form.value, res.data)
    // 回显返回的Vo给Bo
    form.value.userPreEmploymentEvaluateBoList = form.value.userPreEmploymentEvaluateVoList
    isLoading.value = false
  }

  // const checkstatus = ref<boolean>(false);
  // const childTableCheck = (list: any[]) => {
  //   // some方法找到这个空的就会直接跳出循环
  //   checkstatus.value = false;
  //   list.some((item: any) => {
  //     for (const key in item) {
  //       if (key === 'result') {
  //         if (item[key] === null || item[key] === '' || item[key] === undefined) {
  //           proxy?.$modal.alertWarning('评价结果不能为空');
  //           checkstatus.value = true;
  //           return true;
  //         }
  //       }
  //     }
  //     return false;
  //   });
  //   return !checkstatus.value;
  // };
  // 提交
  // const submit = (options: SubmitOptions) => {
  //   const { success, fail } = options ?? {};

  //   let res: AxiosResponse<UserPreEmploymentForm['id']>;
  //   const valid = Form.value?.validate(async (valid: boolean) => {
  //     try {
  //       // 持证没有校验，如果没有值报错，有值再赋值
  //       let certificates = '';
  //       if (form.value.certificates) {
  //         certificates = form.value.certificates.join(',');
  //       }
  //       // 数据
  //       const data: UserPreEmploymentForm = {
  //         ...form.value,
  //         certificates: certificates
  //       };
  //       // 请求
  //       if (valid) {
  //         if (childTableCheck(form.value.userPreEmploymentEvaluateBoList)) {
  //           updateLoading.value = true;
  //           if (form.value.id) {
  //             res = await updateUserPreEmployment(data).finally(() => (updateLoading.value = false));
  //           } else {
  //             res = await addUserPreEmployment(data).finally(() => (updateLoading.value = false));
  //             form.value.id = res.data;
  //           }
  //         }
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       fail && fail(err);
  //     }
  //     success && success(res.data);
  //   });

  //   return valid;
  // };

  // 工作流中提交表单
  // async function workflowSubmit(options?: SubmitOptions) {
  //   const { success } = options ?? {};

  //   let data: UserPreEmploymentForm;

  //   const valid = await Form.value?.validate(async (valid: boolean) => {
  //     // 持证没有校验，如果没有值报错，有值再赋值
  //     let certificates = '';
  //     if (form.value.certificates) {
  //       certificates = form.value.certificates.join(',');
  //     }
  //     data = {
  //       ...form.value,
  //       certificates: certificates
  //     };
  //     if (valid) {
  //       success && success();
  //     }
  //   });

  //   return {
  //     valid,
  //     data
  //   };
  // }

  // 工作流中回显
  function workflowView(entity: any, options?: ViewOptions) {
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
