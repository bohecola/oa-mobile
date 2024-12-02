import Big from 'big.js'
import { cloneDeep, isNil } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { ProjectSubjectForm } from '@/api/oa/finance/projectSubject/types'
import { addProjectSubject, getProjectSubject, getProjectSubjectByLoginUser, updateProjectSubject } from '@/api/oa/finance/projectSubject'
import { getLastLevelNodes } from '@/utils'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export interface SubmitOptions {
  updateDataStatus?: (data: ProjectSubjectForm) => void
  success?: () => void
}
export type ViewOptions = Options

// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 引用
  const Form = ref<FormInstance>()

  // 初始数据
  const initFormData: ProjectSubjectForm = {
    id: undefined,
    type: 'project',
    projectId: undefined,
    deptId: undefined,
    contractNo: undefined,
    startDate: undefined,
    endDate: undefined,
    status: undefined,
    itemList: [],
  }

  // 表单数据
  const data = reactive<Omit<PageData<ProjectSubjectForm, any>, 'queryParams'>>({
    form: cloneDeep(initFormData),
    rules: {
      type: [{ required: true, message: '预算类型不能为空', trigger: 'onBlur' }],
      projectId: [{ required: true, message: '项目不能为空', trigger: 'onBlur' }],
      deptId: [{ required: true, message: '部门不能为空', trigger: 'onBlur' }],
      startDate: [{ required: true, message: '开始日期不能为空', trigger: 'onBlur' }],
      endDate: [{ required: true, message: '截至日期不能为空', trigger: 'onBlur' }],
      status: [{ required: true, message: '状态不能为空', trigger: 'onChange' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 表单重置
  const reset = (cb?: () => void) => {
    form.value = cloneDeep(initFormData)
    Form.value?.resetValidation()
    cb?.()
  }

  // 回显加载
  const isLoading = ref(false)

  // 更新加载
  const updateLoading = ref(false)

  // 回显
  const view = async (id: string | number, cb?: (value: ProjectSubjectForm) => void | Promise<void>) => {
    isLoading.value = true
    reset()

    const { data } = await getProjectSubject(id)
    data.itemList = proxy?.handleTree(data.itemList, 'uuid')

    Object.assign(form.value, data)
    await cb?.(form.value)
    isLoading.value = false
  }

  // 根据部门回显
  const viewByDept = async (id: string | number) => {
    isLoading.value = true
    reset()

    const { data } = await getProjectSubjectByLoginUser(id)
    data.itemList = proxy?.handleTree(data.itemList, 'uuid')

    Object.assign(form.value, data)
    isLoading.value = false
  }

  // // 提交
  // const submit = (options: SubmitOptions) => {
  //   const submitResult = Form.value?.validate(async (valid: boolean) => {
  //     // 获取所有叶子节点
  //     const lastLevelNodes = getLastLevelNodes(form.value.itemList).filter(e => e.treeType === 'item')
  //     // 部门是否选择完成
  //     const isDeptSelected = lastLevelNodes.every((e) => {
  //       if (e.deptId && e.deptName) {
  //         return true
  //       }
  //       else {
  //         const deptRef = e.deptRef
  //         deptRef?.focus()
  //         deptRef.className = 'flash-box'
  //         setTimeout(() => {
  //           deptRef.className = ''
  //         }, 1000)
  //         return false
  //       }
  //     })

  //     // 部门未选择提示
  //     if (!isDeptSelected) {
  //       return proxy.$modal.msgError('部门未选择完成')
  //     }

  //     for (const node of lastLevelNodes) {
  //       if (node.editable) {
  //         node.amountRef?.focus()
  //         return proxy.$modal.msgWarning('请完成先保存预算金额')
  //       }

  //       // 新增时校验期初金额不能超过剩余金额且不能为空
  //       if (!isNil(node.amount) && !isNil(node.beginAmount)) {
  //         if (Big(node.beginAmount).gt(Big(node.amount).minus(node.expendAmount))) {
  //           node.beginAmountRef?.focus()
  //           return proxy.$modal.msgWarning('期初金额不能超过预算金额减去支出金额')
  //         }
  //       }
  //     }

  //     // 数据
  //     const data: ProjectSubjectForm = {
  //       ...form.value,
  //       itemList: lastLevelNodes,
  //     }

  //     // 请求
  //     if (valid) {
  //       updateLoading.value = true
  //       // 更新预算编制状态
  //       options?.updateDataStatus(data)
  //       // 更新/新增数据
  //       if (form.value.id) {
  //         await updateProjectSubject(data).finally(() => (updateLoading.value = false))
  //       }
  //       else {
  //         await addProjectSubject(data).finally(() => (updateLoading.value = false))
  //       }
  //       options?.success()
  //     }
  //   })

  //   return submitResult
  // }

  // 流程回显
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
    proxy,
    Form,
    form,
    rules,
    isLoading,
    updateLoading,
    reset,
    // submit,
    view,
    viewByDept,
    workflowView,
  }
}
