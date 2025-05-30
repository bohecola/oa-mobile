import Big from 'big.js'
import { cloneDeep, isNil } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { ProjectSubjectForm } from '@/api/oa/finance/projectSubject/types'
import { addProjectSubject, getProjectSubject, getProjectSubjectByLoginUser, updateProjectSubject } from '@/api/oa/finance/projectSubject'
import { getLastLevelNodes } from '@/utils'

export type SubmitOptions<T = string> = {
  updateDataStatus?: (data: ProjectSubjectForm) => void
} & BaseOptions<T>

// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance
  const { oa_finance_project_subject_is_overspend } = toRefs<any>(proxy?.useDict('oa_finance_project_subject_is_overspend'))

  // 引用
  const Form = ref<FormInstance>()

  // 初始数据
  const initFormData: ProjectSubjectForm = {
    id: undefined,
    type: 'project',
    projectIds: undefined,
    deptId: undefined,
    contractNo: undefined,
    businessType: undefined,
    startDate: undefined,
    endDate: undefined,
    status: undefined,
    xmbSubjectFeeType: '2,4,5,7',
    itemList: [],
    ossIdList: undefined,
  }

  // 表单数据
  const data = reactive<Omit<PageData<ProjectSubjectForm, any>, 'queryParams'>>({
    form: cloneDeep(initFormData),
    rules: {
      type: [{ required: true, message: '预算类型不能为空', trigger: 'onBlur' }],
      projectIds: [{ required: true, message: '项目不能为空', trigger: 'onBlur' }],
      deptId: [{ required: true, message: '部门不能为空', trigger: 'onBlur' }],
      startDate: [{ required: true, message: '开始日期不能为空', trigger: 'onBlur' }],
      endDate: [{ required: true, message: '截至日期不能为空', trigger: 'onBlur' }],
      xmbSubjectFeeType: [{ required: true, message: '项目部可用费用类型不能为空', trigger: 'onChange' }],
      status: [{ required: true, message: '状态不能为空', trigger: 'onChange' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 回显加载
  const isLoading = ref(false)

  // 更新加载
  const updateLoading = ref(false)

  // 表单重置
  function reset(cb?: () => void) {
    form.value = cloneDeep(initFormData)
    Form.value?.resetValidation()
    cb?.()
  }

  // 表单字段重置
  function resetFields(names: KeysOfArray<ProjectSubjectForm>) {
    const obj = cloneDeep(initFormData)

    Form.value?.resetValidation(names)
    for (const key of names as string[]) {
      form.value[key] = obj[key]
    }
  }

  // 回显
  async function view(id: string, cb?: (value: ProjectSubjectForm) => void | Promise<void>) {
    isLoading.value = true
    reset()

    const { data } = await getProjectSubject(id)
    data.itemList = proxy?.handleTree(data.itemList, 'uuid')

    Object.assign(form.value, data)
    await cb?.(form.value)
    isLoading.value = false
  }

  // 根据部门回显
  async function viewByDept(id: string | number) {
    isLoading.value = true
    reset()

    const { data } = await getProjectSubjectByLoginUser(id)
    data.itemList = proxy?.handleTree(data.itemList, 'uuid')

    Object.assign(form.value, data)
    isLoading.value = false
  }

  // 定时器
  let timer = null
  // 提交
  function submit(options: SubmitOptions = {}) {
    const { updateDataStatus, success, fail } = options
    clearTimeout(timer)

    // 获取所有叶子节点
    const lastLevelNodes = getLastLevelNodes(form.value.itemList).filter(e => e.treeType === 'item')
    // 部门是否选择完成
    const isDeptSelected = lastLevelNodes.every((e) => {
      if (e.deptId && e.deptName) {
        return true
      }
      else {
        const deptRef = e.deptRef
        deptRef?.focus()
        deptRef.className = 'flash-box'
        timer = setTimeout(() => {
          deptRef.className = ''
        }, 1000)
        return false
      }
    })

    // 部门未选择提示
    if (!isDeptSelected) {
      return proxy.$modal.msgError('部门未选择完成')
    }

    if (!isNil(oa_finance_project_subject_is_overspend.value) && oa_finance_project_subject_is_overspend.value[0]?.value === 'Y') {
      console.warn('当前是期初支出金额不能超过预算金额减去支出金额校验---未生效模式')
    }
    else {
      for (const node of lastLevelNodes) {
        if (node.editable) {
          node.amountRef?.focus()
          return proxy.$modal.msgWarning('请完成先保存预算金额')
        }
        // 新增时校验期初支出金额不能超过剩余金额且不能为空
        if (!isNil(node.amount) && !isNil(node.beginAmount)) {
          if (Big(node.beginAmount).gt(Big(node.amount).minus(Big(node.expendAmount ?? 0)))) {
            node.beginAmountRef?.focus()
            return proxy.$modal.msgWarning('期初支出金额不能超过预算金额减去支出金额')
          }
        }
      }
    }

    // 数据
    const data: ProjectSubjectForm = {
      ...form.value,
      itemList: lastLevelNodes,
    }

    const submitResult = Form.value?.validate()
      .then(async () => {
        updateLoading.value = true
        // 更新预算编制状态
        updateDataStatus?.(data)
        // 更新
        if (form.value.id) {
          await updateProjectSubject(data)
        }
        else {
        // 新增
          await addProjectSubject(data)
        }
        success?.()
      })
      .catch(fail)
      .finally(() => (updateLoading.value = false))

    return submitResult
  }

  // 流程提交
  async function workflowSubmit(options: SubmitOptions<ProjectSubjectForm> = {}) {
    const { success, fail } = options

    await Form.value?.validate()
      .then(() => {
        success?.(form.value)
      })
      .catch(fail)
  }

  // 流程回显
  function workflowView(entity: any, options: ViewOptions = {}) {
    const { success, fail } = options
    try {
      reset()
      Object.assign(form.value, entity)
    }
    catch (err) {
      console.error(err)
      fail?.(err)
    }
    success?.(entity)
  }

  return {
    proxy,
    Form,
    form,
    rules,
    isLoading,
    updateLoading,
    reset,
    resetFields,
    submit,
    view,
    viewByDept,
    workflowSubmit,
    workflowView,
  }
}
