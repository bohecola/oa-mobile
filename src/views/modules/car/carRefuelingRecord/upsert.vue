<template>
  <div>
    <NavBar />
    <div class="py-2 content overflow-y-auto">
      <van-form
        ref="Form"
        v-loading="loading"
        label-width="auto"
        label-align="top"
        input-align="left"
        required="auto"
        scroll-to-error
      >
        <van-cell-group inset>
          <DictSelect
            v-model="(form.deptId as string)"
            label="所属部门"
            name="deptId"
            :rules="rules.deptId"
            :options="deptOptions"
            :readonly="deptReadonly"
            @change="onDeptChange"
          />

          <DictSelect
            v-model="form.isDeptCar"
            label="本部门/项目部车辆"
            name="isDeptCar"
            component="radio"
            :rules="rules.isDeptCar"
            :options="sys_yes_no"
            @change="onIsDeptCarChange"
          />

          <DictSelect
            v-if="form.isDeptCar === 'Y'"
            v-model="form.carNumber"
            label="车牌号"
            name="carNumber"
            :rules="rules.carNumber"
            :options="carNumberOptions"
            clearable
            @update:items="onCarNumberItemsChange"
          />

          <LicensePlateInput
            v-if="form.isDeptCar === 'N'"
            v-model="form.carNumber"
            label="车牌号"
            name="carNumber"
            :rules="rules.carNumber"
            clearable
          />

          <DictSelect
            v-if="form.payWay === '1'"
            v-model="form.cardNumber"
            label="油卡"
            name="cardNumber"
            :rules="rules.cardNumber"
            :options="cardNumberOptions"
            clearable
          />

          <DateSelect
            v-model="form.refuelingDate"
            label="加油日期"
            name="refuelingDate"
            :rules="rules.refuelingDate"
            clearable
          />

          <van-field-number
            v-model="form.amount"
            label="总金额（元）"
            name="amount"
            placeholder="单价 * 油量（自动计算）"
            disabled
          />

          <van-field-number
            v-model="form.unitPrice"
            label="单价（元）"
            name="unitPrice"
            :rules="rules.unitPrice"
            clearable
            @change="onUnitPriceChange"
          />

          <van-field-number
            v-model="form.refuelingQuantity"
            label="油量（L）"
            name="refuelingQuantity"
            :rules="rules.refuelingQuantity"
            clearable
            @change="onRefuelingQuantityChange"
          />

          <DictSelect
            v-model="form.fuelLabel"
            label="油号"
            name="fuelLabel"
            :rules="rules.fuelLabel"
            :options="fuelLabelOptions"
            :empty-text="fuelLabelEmptyText"
            clearable
          />

          <van-field-number
            v-model="form.mileage"
            value-type="integer"
            label="里程数（km）"
            name="mileage"
            :rules="[{ required: form.isDeptCar === 'Y', message: '请输入里程数', trigger: 'onBlur' }]"
            clearable
          />

          <template v-if="!isNil(form.isDeptCar)">
            <van-field
              name="invoiceFile"
              :label="invoiceFileLabel"
              :rules="rules.invoiceFile"
            >
              <template #input>
                <UploadFile
                  v-model="form.invoiceFile"
                  :limit="1"
                  capture="camera"
                  accept="image/*"
                  @update:model-value="(value) => {
                    if (isNil(value)) {
                      form.address = undefined
                      form.coordinate = undefined
                    }
                  }"
                  @after-upload="onAfterUpload"
                />
              </template>
            </van-field>

            <van-field
              v-model="form.address"
              name="address"
              type="textarea"
              rows="1"
              placeholder="拍照后会自动获取定位地址"
              autosize
              disabled
            />
          </template>

          <van-field
            v-model="form.remark"
            label="备注"
            name="remark"
            type="textarea"
            placeholder="请输入"
            rows="1"
            autosize
            clearable
          />
        </van-cell-group>
      </van-form>

      <BottomLine />
    </div>

    <div class="op-bottom-base">
      <van-button type="primary" class="flex-[4]" @click="submit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { IUnionGetLocationResult } from 'dingtalk-jsapi/api/union/getLocation'
import { isNil } from 'lodash-es'
import LicensePlateInput from './components/LicensePlateInput/index.vue'
import { useForm } from './form'
import { useStore } from '@/store'
import { getDept } from '@/api/system/dept'
import { dd } from '@/plugins/dingTalk'
import { retry } from '@/utils'
import { useCarNumberOptions, useCardNumberOptions, useUserDeptOptions } from '@/hooks'

const { user } = useStore()

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { sys_yes_no } = toRefs(proxy.useDict('sys_yes_no'))

const { Form, form, rules, loading, fuelLabelOptions, isAdd, isOilcardFuel, isCashFuel, invoiceFileLabel, sumAmount, submit } = useForm()

const { options: carNumberOptions, fetch: fetchCarNumberOptions } = useCarNumberOptions({ initQuery: { deptId: user.info.deptId } })

const { options: cardNumberOptions, fetch: fetchCardNumberOptions } = useCardNumberOptions({ initQuery: { deptId: user.info.deptId } })

const { deptOptions, deptReadonly } = useUserDeptOptions()

const fuelLabelEmptyText = computed(() => {
  if (isNil(form.value.isDeptCar)) {
    return '请先选择是否为部门/项目部车辆'
  }
  if (form.value.isDeptCar === 'Y') {
    return '请先选择车牌号'
  }
  return '暂无数据'
})

// 选择部门 => 加载车牌号和油卡
function onDeptChange(deptId: string) {
  form.value.carNumber = undefined
  form.value.cardNumber = undefined
  form.value.fuelType = undefined
  form.value.fuelLabel = undefined
  carNumberOptions.value = []
  cardNumberOptions.value = []

  if (!isNil(deptId)) {
    fetchCarNumberOptions({ deptId })
    fetchCardNumberOptions({ deptId })
  }
}

// 是否为部门/项目部车辆修改
function onIsDeptCarChange() {
  // 清空车牌号、油号
  form.value.carNumber = undefined
  form.value.fuelType = undefined
  form.value.fuelLabel = undefined
}

// 车牌号修改
function onCarNumberItemsChange(items: DictDataOption[]) {
  // 获取车辆
  const [car] = items
  // 设置燃油类型
  form.value.fuelType = car?.fuelType
  // 清空油号
  form.value.fuelLabel = undefined
}

// 单价修改
function onUnitPriceChange() {
  sumAmount()
}

// 加油量修改
function onRefuelingQuantityChange() {
  sumAmount()
}

// 文件上传后获取地址
function onAfterUpload() {
  const { msg, alert, loading, closeLoading } = proxy.$modal

  if (dd.env.platform === 'notInDingTalk') {
    return msg('当前运行环境不在钉钉中，无法获取钉钉定位信息')
  }

  dd.ready(async () => {
    try {
      loading('正在从钉钉获取定位信息，请稍后...')

      const maxRetries = 3
      const delay = 1000

      const data = await retry<IUnionGetLocationResult>(() => dd.getLocation({
        type: 1,
        useCache: false,
        coordinate: '1',
        cacheTimeout: 20,
        withReGeocode: true,
        targetAccuracy: '200',
      }), maxRetries, delay)

      form.value.address = data.address
      form.value.coordinate = `${data.latitude},${data.longitude}`
    }
    catch (error: any) {
      alert(error.errorMessage)
    }
    finally {
      closeLoading()
    }
  })
}

onMounted(async () => {
  if (isAdd) {
    const { data: dept } = await getDept(user.info.deptId)
    form.value.companyId = String(dept.companyId)
    form.value.deptId = String(user.info.deptId)

    // 油卡加油
    if (isOilcardFuel) {
      // 设置支付方式为油卡
      form.value.payWay = '1'
    }

    // 现金加油
    if (isCashFuel) {
      // 设置支付方式为现金
      form.value.payWay = '2'
    }
  }
})
</script>

<style lang="scss" scoped>
$topHeight: calc(var(--van-nav-bar-height) + env(safe-area-inset-top));
$bottomHeight: calc(var(--van-button-default-height) + env(safe-area-inset-bottom) + theme('spacing.2') * 2);

.content {
  height: calc(100vh - $topHeight - $bottomHeight);
}
</style>
