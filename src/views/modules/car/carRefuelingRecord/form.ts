import Big from 'big.js'
import { cloneDeep, isNil } from 'lodash-es'
import type { FormInstance } from 'vant'
import type { CarRefuelingRecordForm } from '@/api/oa/car/carRefuelingRecord/types'
import { addCarRefuelingRecord, getCarRefuelingRecord, updateCarRefuelingRecord } from '@/api/oa/car/carRefuelingRecord'
import { useFormHelper } from '@/hooks'

export function useHelper() {
  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  // 车辆加油
  const isOilcardFuel = proxy.$route.path.includes('/fuel-oilcard')

  // 零星加油
  const isCashFuel = proxy.$route.path.includes('/fuel-cash')

  return {
    isOilcardFuel,
    isCashFuel,
  }
}

export function useForm() {
  const { isAdd, isEdit } = useFormHelper()

  const { isOilcardFuel, isCashFuel } = useHelper()

  const { proxy } = getCurrentInstance() as ComponentInternalInstance

  const { oa_car_fuel_label_qy, oa_car_fuel_label_cy } = toRefs(proxy.useDict('oa_car_fuel_label_qy', 'oa_car_fuel_label_cy'))

  const Form = ref<FormInstance>()

  const loading = ref(false)

  const initFormData: CarRefuelingRecordForm = {
    id: undefined,
    type: undefined,
    wfBusinessKey: undefined,
    isDeptCar: undefined,
    payWay: undefined,
    companyId: undefined,
    deptId: undefined,
    carNumber: undefined,
    cardNumber: undefined,
    refuelingDate: undefined,
    mileage: undefined,
    mileageFile: undefined,
    fuelType: undefined,
    fuelLabel: undefined,
    unitPrice: undefined,
    refuelingQuantity: undefined,
    amount: undefined,
    invoiceFile: undefined,
    remark: undefined,
  }

  const form = ref(cloneDeep(initFormData))

  const rules = ref<FormRules<CarRefuelingRecordForm>>({
    companyId: [{ required: true, message: '请选择所属公司' }],
    type: [{ required: true, message: '请选择类型' }],
    wfBusinessKey: [{ required: true, message: '请选择流程' }],
    isDeptCar: [{ required: true, message: '请选择是否为部门/项目部车辆' }],
    payWay: [{ required: true, message: '请选择支付方式' }],
    deptId: [{ required: true, message: '请选择所属部门/项目' }],
    carNumber: [{ required: true, message: '请输入车牌号' }],
    cardNumber: [{ required: true, message: '请输入油卡卡号' }],
    refuelingDate: [{ required: true, message: '请选择加油日期' }],
    mileageFile: [{ required: true, message: '请上传里程数图片' }],
    fuelLabel: [{ required: true, message: '请选择油号' }],
    unitPrice: [{ required: true, message: '请输入单价' }],
    refuelingQuantity: [{ required: true, message: '请输入加油量' }],
    amount: [{ required: true, message: '请输入加油金额' }],
    invoiceFile: [{ required: true, message: '请上传照片' }],
  })

  // 油号选项
  const fuelLabelOptions = computed(() => {
    if (form.value.fuelType === '1') {
      return oa_car_fuel_label_qy.value
    }

    if (form.value.fuelType === '2') {
      return oa_car_fuel_label_cy.value
    }

    if (form.value.isDeptCar === 'N') {
      return [...oa_car_fuel_label_qy.value, ...oa_car_fuel_label_cy.value]
    }

    return []
  })

  // 发票图片标签
  const invoiceFileLabel = computed(() => {
    if (form.value.isDeptCar === 'Y') {
      return '加油小票与车辆里程表合照'
    }

    if (form.value.isDeptCar === 'N') {
      return '加油过程照片'
    }

    return ''
  })

  // 计算加油金额
  function sumAmount() {
    const isInvalidUnitPrice = isNil(form.value.unitPrice) || (form.value.unitPrice as any) === ''
    const isInvalidRefuelingQuantity = isNil(form.value.refuelingQuantity) || (form.value.refuelingQuantity as any) === ''

    if (isInvalidUnitPrice || isInvalidRefuelingQuantity) {
      form.value.amount = undefined
      return
    }

    form.value.amount = Number(Big(form.value.unitPrice).times(form.value.refuelingQuantity).toNumber().toFixed(2))
  }

  // 回显
  async function view(id: string) {
    loading.value = true

    const { data } = await getCarRefuelingRecord(id)

    form.value = data

    loading.value = false
  }

  // 提交
  function submit(options: SubmitOptions<CarRefuelingRecordForm> = {}) {
    const { success, fail } = options
    const { msgSuccess, loading, confirm } = proxy.$modal

    Form.value.validate()
      .then(() => {
        confirm('请仔细核对信息，确认无误后提交')
          .then(async () => {
            loading()

            if (form.value.id) {
              const { msg } = await updateCarRefuelingRecord(form.value)
              msgSuccess(msg)
            }
            else {
              const { msg } = await addCarRefuelingRecord(form.value)
              msgSuccess(msg)
            }

            success?.(form.value)
            proxy.$router.back()
          })
      })
      .catch(fail)
  }

  return {
    Form,
    form,
    rules,
    loading,
    isAdd,
    isEdit,
    isOilcardFuel,
    isCashFuel,
    invoiceFileLabel,
    fuelLabelOptions,
    sumAmount,
    view,
    submit,
  }
}
