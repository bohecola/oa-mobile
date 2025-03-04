<template>
  <van-form ref="Form" v-loading="isLoading" class="reset-label" label-width="auto" label-align="top" readonly>
    <van-cell-group inset class="!my-3">
      <van-field v-show-field="['applicationType', includeFields]" name="applicationType" label="申请类型" input-align="left">
        <template #input>
          <DictSelect v-model="form.applicationType" dict-type="oa_train_application_type" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['userId', includeFields]" name="userId" label=" 员工" input-align="left">
        <template #input>
          <UserSelect v-model="form.userId" :multiple="true" readonly />
        </template>
      </van-field>

      <van-field v-show-field="['commander', includeFields]" name="commander" label="负责人" input-align="left">
        <template #input>
          <UserSelect v-model="form.commander" :multiple="true" readonly />
        </template>
      </van-field>

      <div v-if="form.applicationType === '0'">
        <van-field v-show-field="['type', includeFields]" name="type" label="培训类型" input-align="left">
          <template #input>
            <DictSelect v-model="form.type" dict-type="oa_training_type" readonly />
          </template>
        </van-field>

        <van-field v-show-field="['trainType', includeFields]" name="trainType" label="外部培训类型" input-align="left">
          <template #input>
            <DictSelect v-model="form.trainType" dict-type="oa_train_type" readonly />
          </template>
        </van-field>

        <van-field v-show-field="['startDate', includeFields]" name="startDate" label="培训开始日期" input-align="left">
          <template #input>
            {{ parseTime(form.startDate, '{y}-{m}-{d}') }}
          </template>
        </van-field>

        <van-field v-show-field="['endDate', includeFields]" name="endDate" label="培训结束日期" input-align="left">
          <template #input>
            {{ parseTime(form.endDate, '{y}-{m}-{d}') }}
          </template>
        </van-field>

        <van-field v-model="form.attendNumber" v-show-field="['attendNumber', includeFields]" name="attendNumber" label="参加人数" input-align="left" />

        <van-field v-show-field="['trainInvoicingType', includeFields]" name="trainInvoicingType" label="培训开票类型" input-align="left">
          <template #input>
            <DictSelect v-model="form.trainInvoicingType" dict-type="oa_train_invoicing_type" readonly />
          </template>
        </van-field>

        <van-field v-show-field="['isCertificate', includeFields]" name="isCertificate" label="是否取得证书" input-align="left">
          <template #input>
            <YesNoSwitch v-model="form.isCertificate" readonly />
          </template>
        </van-field>

        <van-field v-show-field="['certificateType', includeFields]" name="certificateType" label="取得证书类型" input-align="left">
          <template #input>
            <DictSelect v-model="form.certificateType" dict-type="oa_train_certificate" readonly />
          </template>
        </van-field>

        <van-field v-model="form.averageAmount" v-show-field="['averageAmount', includeFields]" name="averageAmount" label="人均费用" input-align="left" />

        <van-field v-model="form.averageAdditionalAmount" v-show-field="['averageAdditionalAmount', includeFields]" name="averageAdditionalAmount" label="人均附加费用" input-align="left" />

        <van-field v-model="form.totalAmount" v-show-field="['totalAmount', includeFields]" name="totalAmount" label="费用总计" input-align="left" />

        <van-field v-if="form.averageAdditionalAmount" v-show-field="['additionalAmountDescription', includeFields]" name="additionalAmountDescription" label="附加费用说明" input-align="left">
          <template #input>
            <TextareaView :value="form.additionalAmountDescription" />
          </template>
        </van-field>

        <van-field v-show-field="['trainAddress', includeFields]" name="trainAddress" label="培训地址" input-align="left">
          <template #input>
            <TextareaView :value="form.trainAddress" />
          </template>
        </van-field>
      </div>

      <div v-if="form.applicationType === '1'">
        <van-field v-show-field="['trainType', includeFields]" name="trainType" label="报名类型" input-align="left">
          <template #input>
            <DictSelect v-model="form.trainType" dict-type="oa_train_enroll_type" readonly />
          </template>
        </van-field>

        <van-field v-show-field="['content', includeFields]" name="content" label="名称" input-align="left">
          <template #input>
            <DictSelect v-model="form.content" dict-type="oa_train_content_type" readonly />
          </template>
        </van-field>

        <van-field v-model="form.attendNumber" v-show-field="['attendNumber', includeFields]" name="attendNumber" label="参加人数" input-align="left" />

        <van-field v-show-field="['isProduceCost', includeFields]" name="isProduceCost" label="是否产生费用" input-align="left">
          <template #input>
            <YesNoSwitch v-model="form.isProduceCost" readonly />
          </template>
        </van-field>
      </div>

      <div v-if="form.applicationType === '2'">
        <van-field v-show-field="['trainType', includeFields]" name="trainType" label="考试类型" input-align="left">
          <template #input>
            <DictSelect v-model="form.trainType" dict-type="oa_train_enroll_type" readonly />
          </template>
        </van-field>

        <van-field v-show-field="['content', includeFields]" name="content" label="名称" input-align="left">
          <template #input>
            <DictSelect v-model="form.content" dict-type="oa_train_content_type" readonly />
          </template>
        </van-field>

        <van-field v-model="form.attendNumber" v-show-field="['attendNumber', includeFields]" name="attendNumber" label="参加人数" input-align="left" />
      </div>

      <van-field v-show-field="['remark', includeFields]" name="remark" label="备注" input-align="left">
        <template #input>
          <TextareaView :value="form.remark" />
        </template>
      </van-field>
    </van-cell-group>

    <div class="px-6 text-sm text-gray-500">
      附件列表
    </div>
    <van-cell-group inset class="!my-3">
      <van-cell v-for="(item, index) in form.ossMessageAllBoList" :key="index" :name="item.type" input-align="left">
        <template #title>
          <DictSelect v-model="item.type" dict-type="oa_train_oss_type" readonly />
        </template>
        <template #default>
          <UploadFile v-model="item.files" readonly :card-size="60" />
        </template>
      </van-cell>
    </van-cell-group>
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
