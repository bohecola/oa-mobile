<template>
  <div class="p-2">
    <van-form ref="Form" v-loading="isLoading && showLoading" readonly label-width="8em">
      <van-cell-group v-show-field="['userTrainBo', includeFields]" inset class="!my-3">
        <div class="flex justify-start items-center mt-3">
          <van-checkbox v-model="form.outTrain" class="ml-4" icon-size="14px" shape="square" name="outTrain" disabled>
            <span class="text-[14px]">外部培训</span>
          </van-checkbox>
          <van-checkbox v-model="form.holdCertification" class="ml-4" icon-size="14px" shape="square" name="holdCertification" disabled>
            <span class="text-[14px]"> 持有证件</span>
          </van-checkbox>
        </div>

        <van-field v-if="form.userTrainBo" name="userTrainBo.userId" label="员工：" input-align="right">
          <template #input>
            <UserSelect v-model="form.userTrainBo.userId " :multiple="true" />
          </template>
        </van-field>
        <van-field v-if="form.userTrainBo" name="userTrainBo.commander" label="负责人：" input-align="right">
          <template #input>
            <UserSelect v-model="form.userTrainBo.commander" :multiple="true" />
          </template>
        </van-field>

        <van-field v-if="form.userTrainBo" name="userTrainBo.trainDate" label="培训日期：" input-align="right">
          <template #input>
            <span> {{ parseTime(form.userTrainBo.startDate, '{y}-{m}-{d}') }} - {{ parseTime(form.userTrainBo.endDate, '{y}-{m}-{d}') }}</span>
          </template>
        </van-field>
        <van-field v-if="form.userTrainBo" name="userTrainBo.result" label="培训结果：" input-align="right">
          <template #input>
            <dict-tag :options="task_pass" :value="form.userTrainBo.result" />
          </template>
        </van-field>

        <van-field v-if="form.userTrainBo" v-model="form.userTrainBo.amout" name="userTrainBo.amout" label="费用：" input-align="right" />

        <van-field v-if="form.userTrainBo" v-model="form.userTrainBo.content" name="userTrainBo.content" label="培训内容：" input-align="right">
          <template #input>
            <TextareaView :value="form.userTrainBo.content" />
          </template>
        </van-field>
        <van-field v-if="form.userTrainBo" v-model="form.userTrainBo.remark" name="userTrainBo.remark" label="备注：" input-align="right">
          <template #input>
            <TextareaView :value="form.userTrainBo.remark" />
          </template>
        </van-field>
      </van-cell-group>

      <div v-if="form.userCertificateBo" v-show-field="['userCertificateBo', includeFields]">
        <div class="px-6 py-2 text-sm text-gray-500">
          持有证件
        </div>
        <TableCard v-for="(item, index) in form.userCertificateBo" :key="item.userId" :title="item.name" class="mx-4 mb-2" :default-collapse="true">
          <van-field
            v-model="item.userId"
            :name="`itemList.${index}.userId`"
            :rules="[
              {
                required: true,
                message: '员工不能为空',
                trigger: 'onBlur',
              },
            ]"
            label="员工"
            input-align="right"
          >
            <template #input>
              <UserSelect v-model="item.userId" readonly />
            </template>
          </van-field>
          <van-field
            v-model="item.type"
            :name="`itemList.${index}.type`"
            label="证件类型"
            input-align="right"
          >
            <template #input>
              <dict-tag :options="oa_training_type" :value="item.type" />
            </template>
          </van-field>
          <van-field
            v-model="item.certificateStatus"
            :name="`itemList.${index}.certificateStatus`"
            label="证件状态"
            input-align="right"
          >
            <template #input>
              <dict-tag :options="sys_normal_disable" :value="item.certificateStatus" />
            </template>
          </van-field>
          <van-field
            v-model="item.name"
            :name="`itemList.${index}.name`"
            label="证件名称"
            input-align="right"
          />
          <van-field
            v-model="item.speciality"
            :name="`itemList.${index}.speciality`"
            label="专业"
            input-align="right"
          />
          <van-field
            v-model="item.no"
            :name="`itemList.${index}.no`"
            label="编号"
            input-align="right"
          />
          <van-field
            :name="`itemList.${index}.issuanceDate`"
            label="发证日期"
            input-align="right"
          >
            <template #input>
              {{ parseTime(item.issuanceDate, '{y}-{m}-{d}') }}
            </template>
          </van-field>
          <van-field

            :name="`itemList.${index}.startDate`"
            label="开始日期"
            input-align="right"
          >
            <template #input>
              {{ parseTime(item.startDate, '{y}-{m}-{d}') }}
            </template>
          </van-field>
          <van-field

            :name="`itemList.${index}.endDate`"
            label="开始日期"
            input-align="right"
          >
            <template #input>
              {{ parseTime(item.endDate, '{y}-{m}-{d}') }}
            </template>
          </van-field>
        </TableCard>
      </div>
    </van-form>
  </div>
</template>

<script name="TrainCertificationDetail" setup lang="ts">
import { useForm } from './form'
import { createFieldVisibilityDirective } from '@/directive/fieldVisibility'
import type { TrainCertificateForm } from '@/api/oa/personnel/trainCertification/types'

withDefaults(
  defineProps<{
    includeFields?: (keyof TrainCertificateForm)[]
    showLoading?: boolean
  }>(),
  {
    includeFields: () => {
      const { form } = useForm()
      return Object.keys(form.value) as (keyof TrainCertificateForm)[]
    },
    showLoading: true,
  },
)
// 实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const { oa_training_type, task_pass, sys_normal_disable } = toRefs<any>(
  proxy?.useDict('oa_training_type', 'task_pass', 'sys_normal_disable'),
)
// 表单
const { Form, form, isLoading, updateLoading, reset, workflowView } = useForm()

const vShowField = createFieldVisibilityDirective<UserTransferForm>()

defineExpose({
  isLoading,
  updateLoading,
  reset,
  // view,
  workflowView,
})
</script>
