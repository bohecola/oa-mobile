<template>
  <van-form
    ref="Form"
    v-loading="isLoading"
    class="reset-label"
    label-width="auto"
    label-align="top"
    input-align="left"
    readonly
  >
    <DictSelect
      v-model="form.applicationType"
      v-show-field="['applicationType', includeFields]"
      label="申请类型"
      name="applicationType"
      dict-type="oa_train_application_type"
    />

    <van-field
      v-show-field="['userId', includeFields]"
      name="userId"
      label=" 员工"
    >
      <template #input>
        <UserSelect
          v-model="form.userId"
          :multiple="true"
          readonly
        />
      </template>
    </van-field>

    <van-field
      v-show-field="['commander', includeFields]"
      name="commander"
      label="负责人"
    >
      <template #input>
        <UserSelect
          v-model="form.commander"
          :multiple="true"
          readonly
        />
      </template>
    </van-field>

    <div v-if="form.applicationType === '0'">
      <DictSelect
        v-model="form.type"
        v-show-field="['type', includeFields]"
        label="培训类型"
        name="type"
        dict-type="oa_training_type"
      />

      <DictSelect
        v-model="form.trainType"
        v-show-field="['trainType', includeFields]"
        label="外部培训类型"
        name="trainType"
        dict-type="oa_train_type"
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

      <van-field
        v-model="form.attendNumber"
        v-show-field="['attendNumber', includeFields]"
        name="attendNumber"
        label="参加人数"
      />

      <DictSelect
        v-model="form.trainInvoicingType"
        v-show-field="['trainInvoicingType', includeFields]"
        label="培训开票类型"
        name="trainInvoicingType"
        dict-type="oa_train_invoicing_type"
      />

      <van-field
        v-show-field="['isCertificate', includeFields]"
        name="isCertificate"
        label="是否取得证书"
      >
        <template #input>
          <YesNoSwitch
            v-model="form.isCertificate"
            readonly
          />
        </template>
      </van-field>

      <DictSelect
        v-model="form.certificateType"
        v-show-field="['certificateType', includeFields]"
        label="取得证书类型"
        name="certificateType"
        dict-type="oa_train_certificate"
      />

      <van-field
        v-model="form.averageAmount"
        v-show-field="['averageAmount', includeFields]"
        name="averageAmount"
        label="人均费用"
      />

      <van-field
        v-model="form.averageAdditionalAmount"
        v-show-field="['averageAdditionalAmount', includeFields]"
        name="averageAdditionalAmount"
        label="人均附加费用"
      />

      <van-field
        v-model="form.totalAmount"
        v-show-field="['totalAmount', includeFields]"
        name="totalAmount"
        label="费用总计"
      />

      <van-field
        v-if="form.averageAdditionalAmount"
        v-show-field="['additionalAmountDescription', includeFields]"
        name="additionalAmountDescription"
        label="附加费用说明"
      >
        <template #input>
          <TextareaView :value="form.additionalAmountDescription" />
        </template>
      </van-field>

      <van-field
        v-show-field="['trainAddress', includeFields]"
        name="trainAddress"
        label="培训地址"
      >
        <template #input>
          <TextareaView :value="form.trainAddress" />
        </template>
      </van-field>
    </div>

    <div v-if="form.applicationType === '1'">
      <DictSelect
        v-model="form.trainType"
        v-show-field="['trainType', includeFields]"
        label="报名类型"
        name="trainType"
        dict-type="oa_train_enroll_type"
      />

      <DictSelect
        v-model="form.content"
        v-show-field="['content', includeFields]"
        label="名称"
        name="content"
        dict-type="oa_train_content_type"
      />

      <van-field
        v-model="form.attendNumber"
        v-show-field="['attendNumber', includeFields]"
        name="attendNumber"
        label="参加人数"
      />

      <van-field
        v-show-field="['isProduceCost', includeFields]"
        name="isProduceCost"
        label="是否产生费用"
      >
        <template #input>
          <YesNoSwitch
            v-model="form.isProduceCost"
            readonly
          />
        </template>
      </van-field>
    </div>

    <div v-if="form.applicationType === '2'">
      <DictSelect
        v-model="form.trainType"
        v-show-field="['trainType', includeFields]"
        label="考试类型"
        name="trainType"
        dict-type="oa_train_enroll_type"
      />

      <DictSelect
        v-model="form.content"
        v-show-field="['content', includeFields]"
        label="名称"
        name="content"
        dict-type="oa_train_content_type"
      />

      <van-field
        v-model="form.attendNumber"
        v-show-field="['attendNumber', includeFields]"
        name="attendNumber"
        label="参加人数"
      />
    </div>

    <van-field
      v-show-field="['remark', includeFields]"
      name="remark"
      label="备注"
    >
      <template #input>
        <TextareaView :value="form.remark" />
      </template>
    </van-field>

    <div class="px-4 text-sm mt-3 text-gray-500">
      附件列表
    </div>
    <van-cell
      v-for="(item, index) in form.ossMessageAllBoList"
      :key="index"
      :name="item.type"
    >
      <template #title>
        <DictSelect
          v-model="item.type"
          dict-type="oa_train_oss_type"
          readonly
        />
      </template>
      <template #default>
        <UploadFile
          v-model="item.files"
          readonly
        />
      </template>
    </van-cell>
  </van-form>
</template>

<script setup lang="ts">
import { useForm } from './form'
import type { UserTrainForm } from '@/api/oa/personnel/userTrain/types'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'

withDefaults(
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

const { Form, form, isLoading, view, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserTrainForm>()

defineExpose({
  view,
  reset,
  workflowView,
})
</script>
