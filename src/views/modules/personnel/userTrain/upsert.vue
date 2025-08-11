<template>
  <van-form
    ref="Form"
    v-loading="isLoading"
    label-width="auto"
    label-align="top"
    input-align="left"
    required="auto"
    scroll-to-error
  >
    <DictSelect
      v-model="form.applicationType"
      v-show-field="['applicationType', includeFields]"
      label="申请类型"
      name="applicationType"
      dict-type="oa_train_application_type"
      :rules="computedRules.applicationType"
      @change="applicationTypeChange"
    />

    <van-field
      v-model="form.userId"
      v-show-field="['userId', includeFields]"
      name="userId"
      label="员工"
      :rules="computedRules.userId"
      is-link
      @click="UserSelectRef?.open"
    >
      <template #input>
        <UserSelect
          ref="UserSelectRef"
          v-model="form.userId"
          :multiple="true"
          @confirm="userConfirm"
        />
      </template>
    </van-field>

    <van-field
      v-model="form.commander"
      v-show-field="['commander', includeFields]"
      name="commander"
      label="负责人"
      :rules="computedRules.commander"
      is-link
      @click="CommanderSelectRef?.open"
    >
      <template #input>
        <UserSelect
          ref="CommanderSelectRef"
          v-model="form.commander"
          :multiple="true"
        />
      </template>
    </van-field>

    <!-- 培训类型 -->
    <div v-if="form.applicationType === '0'">
      <DictSelect
        v-model="form.type"
        v-show-field="['type', includeFields]"
        label="培训类型"
        name="type"
        dict-type="oa_training_type"
        :rules="computedRules.type"
      />

      <DictSelect
        v-model="form.trainType"
        v-show-field="['trainType', includeFields]"
        label="外部培训类型"
        name="trainType"
        dict-type="oa_train_type"
      />

      <DictSelect
        v-model="form.result"
        dict-type="task_pass"
        label="培训结果"
        name="result"
      />

      <DateSelect
        v-model="form.startDate"
        v-show-field="['startDate', includeFields]"
        name="startDate"
        label="培训开始日期"
      />

      <DateSelect
        v-model="form.endDate"
        v-show-field="['endDate', includeFields]"
        name="endDate"
        label="培训结束日期"
      />

      <van-field-number
        v-model.number="form.attendNumber"
        v-show-field="['attendNumber', includeFields]"
        name="attendNumber"
        label="参加人数"
        placeholder="自动计算"
        type="digit"
        readonly
      />

      <DictSelect
        v-model="form.trainInvoicingType"
        v-show-field="['trainInvoicingType', includeFields]"
        label="培训开票类型"
        name="trainInvoicingType"
        dict-type="oa_train_invoicing_type"
        :rules="computedRules.trainInvoicingType"
      />

      <van-field
        v-show-field="['isCertificate', includeFields]"
        name="isCertificate"
        label="是否取得证书"
      >
        <template #input>
          <YesNoSwitch v-model="form.isCertificate" />
        </template>
      </van-field>

      <DictSelect
        v-model="form.certificateType"
        v-show-field="['certificateType', includeFields]"
        label="取得证书类型"
        name="certificateType"
        dict-type="oa_train_certificate"
      />

      <van-field-number
        v-model.number="form.averageAmount"
        v-show-field="['averageAmount', includeFields]"
        name="averageAmount"
        label="人均费用"
        @update:model-value="updateTotalAmount"
      />

      <van-field-number
        v-model.number="form.averageAdditionalAmount"
        v-show-field="['averageAdditionalAmount', includeFields]"
        name="averageAdditionalAmount"
        label="人均附加费用"
        placeholder="请输入"
        @update:model-value="updateTotalAmount"
      />

      <van-field-number
        v-model.number="form.totalAmount"
        v-show-field="['totalAmount', includeFields]"
        name="totalAmount"
        label="费用总计"
        placeholder="自动计算"
        readonly
      />

      <van-field
        v-if="form.averageAdditionalAmount"
        v-model="form.additionalAmountDescription"
        v-show-field="['additionalAmountDescription', includeFields]"
        label="附加费用说明"
        placeholder="请输入"
        type="textarea"
        rows="1"
        autosize
        name="additionalAmountDescription"
        :rules="[{ required: form.averageAdditionalAmount !== 0 ? true : false, message: '请输入附加费用说明' }]"
      />

      <van-field
        v-model="form.content"
        v-show-field="['content', includeFields]"
        label="培训内容"
        placeholder="请输入"
        type="textarea"
        rows="1"
        autosize
        name="content"
        :rules="computedRules.content"
      />

      <van-field
        v-model="form.trainAddress"
        v-show-field="['trainAddress', includeFields]"
        label="培训地址"
        placeholder="请输入"
        type="textarea"
        rows="1"
        autosize
        name="trainAddress"
      />
    </div>

    <!-- 报名类型 -->
    <div v-if="form.applicationType === '1'">
      <DictSelect
        v-model="form.trainType"
        v-show-field="['trainType', includeFields]"
        label="报名类型"
        name="trainType"
        dict-type="oa_train_enroll_type"
        :rules="computedRules.trainType"
      />

      <DictSelect
        v-model="form.content"
        v-show-field="['content', includeFields]"
        label="名称"
        name="content"
        dict-type="oa_train_content_type"
        :rules="computedRules.content"
      />

      <van-field-number
        v-model.number="form.attendNumber"
        v-show-field="['attendNumber', includeFields]"
        name="attendNumber"
        label="参加人数"
      />

      <van-field
        v-show-field="['isProduceCost', includeFields]"
        name="isProduceCost"
        label="是否产生费用"
        :rules="computedRules.isProduceCost"
      >
        <template #input>
          <YesNoSwitch v-model="form.isProduceCost" />
        </template>
      </van-field>
    </div>

    <!-- 考试类型 -->
    <div v-if="form.applicationType === '2'">
      <DictSelect
        v-model="form.trainType"
        v-show-field="['trainType', includeFields]"
        label="考试类型"
        name="trainType"
        dict-type="oa_train_enroll_type"
        :rules="computedRules.trainType"
      />

      <DictSelect
        v-model="form.content"
        v-show-field="['content', includeFields]"
        label="名称"
        name="content"
        dict-type="oa_train_content_type"
        :rules="computedRules.content"
      />

      <van-field-number
        v-model.number="form.attendNumber"
        v-show-field="['attendNumber', includeFields]"
        name="attendNumber"
        label="参加人数"
      />
    </div>

    <van-field
      v-model.number="form.remark"
      v-show-field="['remark', includeFields]"
      label="备注"
      placeholder="请输入"
      type="textarea"
      rows="1"
      autosize
      name="remark"
      :rules="computedRules.remark"
    />

    <van-cell-group
      inset
      title="附件列表"
    >
      <van-field
        v-for="(item, index) in form.ossMessageAllBoList"
        :key="index"
        :name="item.type"
      >
        <template #label>
          <DictTag :options="oa_train_oss_type" :value="item.type" />
        </template>

        <template #input>
          <UploadFile v-model="item.files" />
        </template>
      </van-field>
    </van-cell-group>
  </van-form>
</template>

<script setup lang="ts">
import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { SysUserMobileVO } from '@/api/system/user/types'
import type { UserTrainForm } from '@/api/oa/personnel/userTrain/types'
import UserSelect from '@/components/UserSelect/index.vue'

const props = withDefaults(
  defineProps<{
    includeFields?: (keyof UserTrainForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof UserTrainForm)[]
    },
    showLoading: true,
  },
)

// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { oa_train_oss_type } = toRefs(proxy.useDict('oa_train_oss_type'))

// 表单
const { Form, form, rules, isLoading, updateLoading, initOssMessageList, reset, submit, view, workflowSubmit, workflowView } = useForm()

// 指令
const vShowField = createFieldVisibilityDirective<UserTrainForm>()

const UserSelectRef = ref<InstanceType<typeof UserSelect> | null>()
const CommanderSelectRef = ref<InstanceType<typeof UserSelect> | null>()

// 校验
const computedRules = computed(() => {
  const newRules: FormRules<UserTrainForm> = {}
  for (const [key, value] of Object.entries(rules.value)) {
    if (props.includeFields.includes(key as any)) {
      newRules[key] = value
    }
  }
  return newRules
})

// 更新费用总计的方法
function updateTotalAmount() {
  const { averageAmount, averageAdditionalAmount, attendNumber } = form.value
  form.value.totalAmount = (averageAmount + averageAdditionalAmount) * attendNumber
}

// 监听人数变化 ,人数是动态的，更新 totalAmount）
watch(() => form.value.attendNumber, updateTotalAmount)

function applicationTypeChange(value: string) {
  form.value.userId = undefined
  form.value.commander = undefined
  form.value.content = undefined
  form.value.attendNumber = 0
  form.value.trainType = undefined
  if (value === '0') {
    form.value.ossMessageAllBoList = [...initOssMessageList]
  }
  else {
    form.value.ossMessageAllBoList = [initOssMessageList[0], initOssMessageList[initOssMessageList.length - 1]]
  }
}

function userConfirm(_: string, selectedList: SysUserMobileVO) {
  form.value.attendNumber = selectedList.length
}

defineExpose({
  isLoading,
  updateLoading,
  reset,
  view,
  submit,
  workflowSubmit,
  workflowView,
})
</script>
