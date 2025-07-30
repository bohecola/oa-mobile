import dayjs from 'dayjs'
import { cloneDeep, isNil } from 'lodash-es'
import type { FieldRule, FormInstance } from 'vant'
import type { ProductTaskRecordResultVo, ProductTaskRecordVo } from '@/api/ptms/task/productTaskUpdate/types'
import { getProjectDayTaskList, getTaskRecordByRecordId, productTaskDeal } from '@/api/ptms/task/productTask'
import { transformYnToBoolean } from '@/utils'
import { useFormHelper } from '@/hooks'

export function useForm() {
  const { isAdd, isEdit } = useFormHelper()

  // 实例
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 引用
  const Form = ref<FormInstance>()

  // 部门列表
  const deptList = ref<DictDataOption[]>([])

  // 表单数组
  const formList = ref<ProductTaskRecordVo[]>([])

  const loading = ref(false)

  // 初始值
  const initFormData: ProductTaskRecordVo = {
    id: undefined,
    taskId: undefined,
    padNo: undefined,
    deptId: undefined,
    deptName: undefined,
    psId: undefined,
    psname: undefined,
    operator: undefined,
    operateDate: undefined,
    starttime: undefined,
    endtime: undefined,
    status: undefined,
    description: undefined,
    remark: undefined,
    recordResultList: [],
  }

  // 表单数据
  const form = ref<ProductTaskRecordVo>(cloneDeep(initFormData))

  // 校验规则
  const rules = ref<FormRules<ProductTaskRecordVo>>({
    deptId: [{ required: true, message: '不能为空' }],
    operateDate: [{ required: true, message: '不能为空' }],
  })

  function getItemRules(item: ProductTaskRecordResultVo): FieldRule[] {
    return [{ required: transformYnToBoolean(item.required), message: '不能为空' }]
  }

  // 处理下拉框选项数据
  function transformOptions(value: string) {
    if (isNil(value)) {
      return []
    }

    return value.split('/').map(e => ({ label: e, value: e }))
  }

  // 设置项目部选项
  function setDeptList(data: ProductTaskRecordVo[]) {
    deptList.value = data.map((e) => {
      return {
        label: e.deptName,
        value: e.deptId,
      }
    })
  }

  // 获取表单集合数据
  async function getForms() {
    loading.value = true

    // 集合数据
    const { data } = await getProjectDayTaskList({ isEdit: (isEdit || isAdd) ? 'Y' : 'N' })

    // 设置项目部选项
    setDeptList(data)

    // 设置表单集合
    formList.value = data

    loading.value = false
  }

  // 设置表单
  function setCurrentForm(value: ProductTaskRecordVo) {
    if (!isNil(value) && isNil(value.operateDate)) {
      value.operateDate = dayjs().format('YYYY-MM-DD')
    }

    // 设置表单数据
    form.value = cloneDeep(value ?? initFormData)
  }

  // 查看
  async function view(id: string) {
    loading.value = true

    // 详情
    const { data } = await getTaskRecordByRecordId(id)

    // 赋值
    form.value = data

    loading.value = false
  }

  // 提交
  function submit(options: SubmitOptions<ProductTaskRecordVo> = {}) {
    const { success, fail } = options
    const { msgSuccess, loading } = proxy.$modal
    // 校验
    Form.value.validate()
      .then(async () => {
        loading()

        // 处理任务
        const { msg } = await productTaskDeal(form.value)

        msgSuccess(msg)

        success?.(form.value)

        proxy.$router.back()
      })
      .catch(fail)
  }

  return {
    isEdit,
    Form,
    form,
    rules,
    formList,
    deptList,
    loading,
    transformOptions,
    getItemRules,
    getForms,
    setCurrentForm,
    submit,
    view,
  }
}
