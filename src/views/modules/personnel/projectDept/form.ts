import type { FormInstance } from 'vant'
import { getDept } from '@/api/system/dept'
import type { DeptForm } from '@/api/system/dept/types'

export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
type SubmitOptions = Options<string | number>
export type ViewOptions = Options

// 表单
export function useForm() {
  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 引用
  const Form = ref<FormInstance>()

  // 初始数据
  const initFormData: DeptForm = {
    deptId: undefined,
    parentId: undefined,
    deptName: undefined,
    deptCategory: undefined,
    responsibility: undefined, // 部门职能
    purview: undefined, // 部门权限
    address: undefined, // 地址
    orderNum: 0,
    leader: undefined,
    phone: undefined,
    email: undefined,
    status: undefined,
    redFile: undefined,
    ossIdList: undefined,
  }

  // 表单数据  Omit是类型工具Omit<Type, Keys>,用来从对象类型Type中，删除指定的属性Keys，组成一个新的对象类型返回。
  const data = reactive<Omit<PageData<DeptForm, object>, 'queryParams'>>({
    form: { ...initFormData },
    rules: {
      parentId: [{ required: true, message: '上级部门不能为空', trigger: 'onBlur' }],
      deptName: [{ required: true, message: '部门名称不能为空', trigger: 'onBlur' }],
      type: [{ required: true, message: '部门类型不能为空', trigger: 'onBlur' }],
      deptCategory: [{ required: true, message: '类别编号不能为空', trigger: 'onBlur' }],
      // leader: [{ required: true, message: '负责人不能为空', trigger: 'onBlur' }],
      redFile: [{ required: true, message: '是否发布红头文件不能为空', trigger: 'onBlur' }],
      responsibility: [{ required: true, message: '部门职能不能为空', trigger: 'onBlur' }],
      purview: [{ required: true, message: '部门权限不能为空', trigger: 'onBlur' }],
      orderNum: [{ required: true, message: '显示排序不能为空', trigger: 'onBlur' }],
      // email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['onBlur', 'onChange'] }],
      phone: [{ pattern: /^1[3-9|]\d{9}$/, message: '请输入正确的手机号码', trigger: 'onBlur' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 表单重置
  const reset = () => {
    form.value = { ...initFormData }
    form.value.status = '0'
    form.value.redFile = 'Y'
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
    const res = await getDept(id)
    Object.assign(form.value, res.data)
    // form.value.id = form.value.deptId
    isLoading.value = false
  }

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
    workflowView,
  }
}
