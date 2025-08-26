<template>
  <div>
    <NavBar />
    <div class="py-2 content overflow-y-auto">
      <van-form
        ref="Form"
        v-loading="loading"
        class="reset-label"
        label-width="auto"
        label-align="top"
        input-align="left"
        readonly
      >
        <van-cell-group inset>
          <van-field
            :model-value="form.deptName"
            label="所属部门"
            name="deptName"
          />

          <DictSelect
            v-model="form.isDeptCar"
            label="本部门/项目部车辆"
            name="isDeptCar"
            component="radio"
            :options="sys_yes_no"
          />

          <van-field
            :model-value="form.carNumber"
            label="车牌号"
            name="carNumber"
          />

          <van-field
            v-if="form.payWay === '1'"
            :model-value="form.cardNumber"
            label="油卡"
            name="cardNumber"
          />

          <DateSelect
            v-model="form.refuelingDate"
            label="加油日期"
            name="refuelingDate"
          />

          <van-field-number
            v-model="form.amount"
            label="总金额（元）"
            name="amount"
          />

          <van-field-number
            v-model="form.unitPrice"
            label="单价（元）"
            name="unitPrice"
          />

          <van-field-number
            v-model="form.refuelingQuantity"
            label="油量（L）"
            name="refuelingQuantity"
          />

          <DictSelect
            v-model="form.fuelLabel"
            label="油号"
            name="fuelLabel"
            :options="fuelLabelOptions"
          />

          <van-field-number
            v-model="form.mileage"
            value-type="integer"
            label="里程数（km）"
            name="mileage"
            placeholder="暂无数据"
          />

          <van-field
            name="invoiceFile"
            :label="invoiceFileLabel"
          >
            <template #input>
              <UploadFile
                v-model="form.invoiceFile"
                readonly
              />
            </template>
          </van-field>

          <van-field
            v-model="form.address"
            label="地址"
            name="address"
            type="textarea"
            placeholder="暂无数据"
            rows="1"
            autosize
          />

          <van-field
            v-model="form.remark"
            label="备注"
            name="remark"
            type="textarea"
            placeholder="暂无数据"
            rows="1"
            autosize
          />
        </van-cell-group>
      </van-form>

      <BottomLine />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useForm } from './form'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { sys_yes_no } = toRefs(proxy.useDict('sys_yes_no'))

const { Form, form, loading, fuelLabelOptions, invoiceFileLabel, view } = useForm()

onMounted(async () => {
  await view(proxy.$route.params.id as string)
})
</script>

<style lang="scss" scoped>
$topHeight: calc(var(--van-nav-bar-height) + env(safe-area-inset-top));

.content {
  height: calc(100vh - $topHeight);
}
</style>
