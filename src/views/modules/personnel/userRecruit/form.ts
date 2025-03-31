import type { FormInstance } from 'vant'
import type { UserRecruitForm, UserRecruitPostBo } from '@/api/oa/personnel/userRecruit/types'
import { addUserRecruit, getUserRecruit, updateUserRecruit } from '@/api/oa/personnel/userRecruit'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options
export interface SuccessData {
  id: UserRecruitForm['id']
  userRecruitPostBoList: UserRecruitForm['userRecruitPostBoList']
}
export function useForm() {
  // 实例
  const { proxy } = (getCurrentInstance() as ComponentInternalInstance) ?? {}

  // 引用
  const Form = ref<FormInstance>()

  const initRecruitPostForm: UserRecruitPostBo = {
    id: undefined,
    postId: undefined,
    postName: undefined,
    userNum: 0,
    ageRequire: undefined,
    speciality: undefined,
    responsibility: undefined,
    demand: undefined,
    educationalRequire: undefined,
    suggestSalary: undefined,
    workExperience: undefined,
    otherRequire: undefined,
  }

  // 初始数据
  const initFormData: UserRecruitForm = {
    id: undefined,
    no: undefined,
    deptId: undefined,
    address: undefined,
    hopeArriveDate: undefined,
    applyReason: undefined,
    recruitStartDate: undefined,
    recruitEndDate: undefined,
    remark: undefined,
    status: undefined,
    userRecruitPostBoList: [{ ...initRecruitPostForm }],
    ossIdList: undefined,
  }

  // 数据
  const data = reactive<Omit<PageData<UserRecruitForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      no: [{ required: true, message: '招聘编号不能为空', trigger: 'onChange' }],
      deptId: [{ required: true, message: '部门不能为空', trigger: 'onBlur' }],
      hopeArriveDate: [{ required: true, message: '期望到岗日期不能为空', trigger: 'onBlur' }],
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
    form.value.userRecruitPostBoList = res.data.userRecruitPostVoList
    isLoading.value = false
  }

  // TODO 检查是否有重复的岗位名称
  function hasDuplicatePosts(data: UserRecruitPostBo[]): boolean {
    const seenPosts = new Set()
    const duplicates = data.some((item) => {
      if (seenPosts.has(item.postId)) {
        return true // 发现了重复
      }
      seenPosts.add(item.postId)
      return false
    })
    if (duplicates) {
      proxy.$modal.msgError('岗位名称不能重复')
      return true // 返回true表示有重复
    }
    return false // 返回false表示没有重复
  }

  // 提交
  async function submit(options: SubmitOptions<SuccessData> = {}) {
    const { success, fail } = options

    if (hasDuplicatePosts(form.value.userRecruitPostBoList)) {
      return false
    }

    await Form.value?.validate()
      .then(async () => {
        updateLoading.value = true

        if (form.value.id) {
          const { data } = await updateUserRecruit(form.value)
          form.value.userRecruitPostBoList = (data.userRecruitPostList || []).map((item: UserRecruitPostBo, index: number) => ({
            ...item,
            postName: form.value.userRecruitPostBoList[index].postName,
          }))
        }
        else {
          const { data } = await addUserRecruit(form.value)
          form.value.id = data.id
          form.value.userRecruitPostBoList = (data.userRecruitPostList || []).map((item: UserRecruitPostBo, index: number) => ({
            ...item,
            postName: form.value.userRecruitPostBoList[index].postName,
          }))
        }
        success?.({ id: form.value.id, userRecruitPostBoList: form.value.userRecruitPostBoList })
      })
      .catch(fail)
      .finally(() => (updateLoading.value = false))
  }

  // 工作流中提交表单
  async function workflowSubmit(options: SubmitOptions<UserRecruitForm> = {}) {
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
    initRecruitPostForm,
    reset,
    view,
    submit,
    workflowSubmit,
    workflowView,
  }
}
