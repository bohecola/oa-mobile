import Big from 'big.js'
import { showFailToast } from 'vant'
import { cloneDeep, isNil } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { ContractForm } from '@/api/oa/business/contract/types'
import { getContract } from '@/api/oa/business/contract'

export type _ContractForm = Override<ContractForm, { taxRate: { amount?: number, taxRate?: number }[] }>
export type ContractMode = 'two' | 'three' | 'four'
export interface Options<T = any> {
  success?: (data?: T) => void
  fail?: (err?: any) => void
}
export type SubmitOptions<T = string | number> = Options<T>
export type ViewOptions = Options
export interface SuccessData {
  id: ContractForm['id']
  no?: ContractForm['no']
}

// 合同模式
export function useContractMode() {
  const contractMode = ref<ContractMode>('two')
  function setContractMode(val: ContractMode) {
    contractMode.value = val
  }
  return {
    contractMode,
    setContractMode,
  }
}

export function useForm() {
  // 合同模式
  const { contractMode, setContractMode } = useContractMode()

  // 引用
  const Form = ref<FormInstance>()

  // 初始数据
  const initFormData: _ContractForm = {
    id: undefined,
    no: undefined,
    name: undefined,
    partyA: undefined,
    partyB: undefined,
    partyC: undefined,
    partyD: undefined,
    type: undefined,
    category: undefined,
    startDate: undefined,
    endDate: undefined,
    signDate: undefined,
    description: undefined,
    amount: undefined,
    invoiceType: undefined,
    taxRate: [{ amount: undefined, taxRate: undefined }],
    paymentWay: undefined,
    reviewWay: undefined,
    customizeApprover: undefined,
    originalFile: undefined,
    noAmountFile: undefined,
    deptId: undefined,
    projectId: undefined,
    projectName: undefined,
    status: undefined,
    isUseSeal: undefined,
    fileUseType: undefined,
    sealUseType: undefined,
    remark: undefined,
    ossIdList: undefined,
    purchaseIds: [],
  }

  // 数据
  const data = reactive<Omit<PageData<_ContractForm, any>, 'queryParams'>>({
    form: cloneDeep(initFormData),
    rules: {
      no: [{ required: true, message: '编号不能为空', trigger: 'onBlur' }],
      name: [{ required: true, message: '名称不能为空', trigger: 'onBlur' }],
      partyA: [{ required: true, message: '甲方不能为空', trigger: 'onBlur' }],
      partyB: [{ required: true, message: '乙方不能为空', trigger: 'onBlur' }],
      partyC: [{ required: true, message: '丙方不能为空', trigger: 'onBlur' }],
      partyD: [{ required: true, message: '丁方不能为空', trigger: 'onBlur' }],
      type: [{ required: true, message: '合同类型不能为空', trigger: 'onChange' }],
      category: [{ required: true, message: '合同类别不能为空', trigger: 'onChange' }],
      reviewWay: [{ required: true, message: '合同评审方式不能为空', trigger: 'onChange' }],
      customizeApprover: [{ required: true, message: '自定义审批人不能为空', trigger: 'onChange' }],
      startDate: [{ required: true, message: '合同开始日期不能为空', trigger: 'onChange' }],
      endDate: [{ required: true, message: '合同结束日期不能为空', trigger: 'onChange' }],
      description: [{ required: true, message: '合同描述不能为空', trigger: 'onBlur' }],
      amount: [{ required: true, message: '合同金额不能为空', trigger: 'onBlur' }],
      invoiceType: [{ required: true, message: '发票类型不能为空', trigger: 'onChange' }],
      status: [{ required: true, message: '状态不能为空', trigger: 'onChange' }],
      taxRate: [{ required: true, message: '金额/增值税率不能为空', trigger: 'onBlur' }],
      paymentWay: [{ required: true, message: '付款方式不能为空', trigger: 'onBlur' }],
      deptId: [{ required: true, message: '需求部门不能为空', trigger: 'onBlur' }],
      originalFile: [{ required: true, message: '合同原件不能为空', trigger: 'onBlur' }],
      noAmountFile: [{ required: true, message: '无价合同不能为空', trigger: 'onBlur' }],
      isUseSeal: [{ required: true, message: '是否用印不能为空', trigger: 'onBlur' }],
      fileUseType: [{ required: true, message: '用印方式不能为空', trigger: 'onChange' }],
      sealUseType: [{ required: true, message: '用印类型不能为空', trigger: 'onChange' }],
    },
  })

  // 响应式解构
  const { form, rules } = toRefs(data)

  // 加载
  const isLoading = ref(false)

  // 更新加载
  const updateLoading = ref(false)

  // 表单重置
  const reset = () => {
    form.value = cloneDeep(initFormData)
    Form.value?.resetValidation()
    setContractMode('two')
  }

  // 回显
  async function view(id: string | number) {
    isLoading.value = true
    reset()
    const { data } = await getContract(id)
    setContractMode(data.partyD ? 'four' : data.partyC ? 'three' : 'two')
    nextTick(() => {
      Object.assign(form.value, { ...data, amount: Number(data.amount), taxRate: JSON.parse(data.taxRate) })
      isLoading.value = false
    })
  }

  // // 提交表单
  // async function submit(options?: SubmitOptions<SuccessData>) {
  //   const { success, fail } = options ?? {};

  //   const valid = await Form.value?.validate(async (valid: boolean) => {
  //     try {
  //       if (valid) {
  //         updateLoading.value = true;

  //         const taxRate = JSON.stringify(form.value.taxRate) !== '[{}]' ? JSON.stringify(form.value.taxRate) : undefined;
  //         const data: ContractForm = {
  //           ...form.value,
  //           taxRate
  //         };

  //         if (form.value.id) {
  //           await updateContract(data).finally(() => (updateLoading.value = false));
  //         } else {
  //           // 生成编号
  //           const { msg } = (await getGenerateCode(BusinessCodeEnum.HTCODE, 'oa_contract')) ?? {};
  //           data.no = form.value.no = msg;
  //           // 新增
  //           const { data: id } = (await addContract(data).finally(() => (updateLoading.value = false))) ?? {};
  //           form.value.id = id;
  //         }
  //         success?.({
  //           id: form.value.id,
  //           no: form.value.no
  //         });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       fail?.(err);
  //     }
  //   });

  //   return valid;
  // }

  // // 工作流中提交表单
  // async function workflowSubmit(options?: SubmitOptions) {
  //   const { success } = options ?? {};

  //   let data: ContractForm;

  //   const valid = await Form.value?.validate(async (valid: boolean) => {
  //     const taxRate = JSON.stringify(form.value.taxRate) !== '[{}]' ? JSON.stringify(form.value.taxRate) : undefined;
  //     data = {
  //       ...form.value,
  //       taxRate
  //     };
  //     if (valid) {
  //       success?.();
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
      setContractMode(entity.partyD ? 'four' : entity.partyC ? 'three' : 'two')
      nextTick(() => {
        Object.assign(form.value, {
          ...entity,
          amount: entity.amount === undefined ? undefined : Number(entity.amount),
          taxRate: entity.taxRate === undefined ? undefined : JSON.parse(entity.taxRate),
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
    contractMode,
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
